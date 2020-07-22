<?php

declare(strict_types=1);

namespace Jfcherng\Diff;

/**
 * A longest sequence matcher.
 *
 * The logic is primarily based on the Python difflib package.
 *
 * @see https://docs.python.org/3/library/difflib.html
 */
final class SequenceMatcher
{
    /** @var int 0, opcode: no operation */
    const OP_NOP = 0;

    /** @var int 1, opcode: equal */
    const OP_EQ = 1 << 0;

    /** @var int 2, opcode: delete */
    const OP_DEL = 1 << 1;

    /** @var int 4, opcode: insert */
    const OP_INS = 1 << 2;

    /** @var int 8, opcode: replace */
    const OP_REP = 1 << 3;

    const OP_INT_TO_STR_MAP = [
        self::OP_NOP => 'nop',
        self::OP_EQ => 'eq',
        self::OP_DEL => 'del',
        self::OP_INS => 'ins',
        self::OP_REP => 'rep',
    ];

    const OP_STR_TO_INT_MAP = [
        'nop' => self::OP_NOP,
        'eq' => self::OP_EQ,
        'del' => self::OP_DEL,
        'ins' => self::OP_INS,
        'rep' => self::OP_REP,
    ];

    /**
     * @var null|callable either a string or an array containing a callback function to determine if a line is "junk" or not
     */
    private $junkCallback;

    /**
     * @var array the first sequence to compare against
     */
    private $a = [];

    /**
     * @var array the second sequence
     */
    private $b = [];

    /**
     * @var array array of characters that are considered junk from the second sequence. Characters are the array key.
     */
    private $junkDict = [];

    /**
     * @var array array of indices that do not contain junk elements
     */
    private $b2j = [];

    /**
     * @var array
     */
    private $options = [];

    /**
     * @var array
     */
    private static $defaultOptions = [
        'ignoreWhitespace' => false,
        'ignoreCase' => false,
    ];

    /**
     * @var array
     */
    private $matchingBlocks = [];

    /**
     * @var array generated opcodes which manipulates seq1 to seq2
     */
    private $opcodes = [];

    /**
     * The constructor. With the sequences being passed, they'll be set
     * for the sequence matcher and it will perform a basic cleanup &
     * calculate junk elements.
     *
     * @param string[]      $a            an array containing the lines to compare against
     * @param string[]      $b            an array containing the lines to compare
     * @param null|callable $junkCallback either an array or string that references a callback function (if there is one) to determine 'junk' characters
     * @param array         $options      the options
     */
    public function __construct(array $a, array $b, ?callable $junkCallback = null, array $options = [])
    {
        $this->junkCallback = $junkCallback;
        $this->setOptions($options);
        $this->setSequences($a, $b);
    }

    /**
     * Set the options.
     *
     * @param array $options The options
     */
    public function setOptions(array $options): self
    {
        $this->options = $options + self::$defaultOptions;

        $this->resetCachedResults();

        return $this;
    }

    /**
     * Reset cached results.
     */
    public function resetCachedResults(): self
    {
        $this->matchingBlocks = [];
        $this->opcodes = [];

        return $this;
    }

    /**
     * Set the first and second sequences to use with the sequence matcher.
     *
     * @param string[] $a an array containing the lines to compare against
     * @param string[] $b an array containing the lines to compare
     */
    public function setSequences(array $a, array $b): self
    {
        return $this->setSeq1($a)->setSeq2($b);
    }

    /**
     * Set the first sequence ($a) and reset any internal caches to indicate that
     * when calling the calculation methods, we need to recalculate them.
     *
     * @param string[] $a the sequence to set as the first sequence
     */
    public function setSeq1(array $a): self
    {
        if ($this->a !== $a) {
            $this->a = $a;
            $this->resetCachedResults();
        }

        return $this;
    }

    /**
     * Set the second sequence ($b) and reset any internal caches to indicate that
     * when calling the calculation methods, we need to recalculate them.
     *
     * @param string[] $b the sequence to set as the second sequence
     */
    public function setSeq2(array $b): self
    {
        if ($this->b !== $b) {
            $this->b = $b;
            $this->resetCachedResults();

            $this->chainB();
        }

        return $this;
    }

    /**
     * Find the longest matching block in the two sequences, as defined by the
     * lower and upper constraints for each sequence. (for the first sequence,
     * $alo - $ahi and for the second sequence, $blo - $bhi).
     *
     * Essentially, of all of the maximal matching blocks, return the one that
     * startest earliest in $a, and all of those maximal matching blocks that
     * start earliest in $a, return the one that starts earliest in $b.
     *
     * If the junk callback is defined, do the above but with the restriction
     * that the junk element appears in the block. Extend it as far as possible
     * by matching only junk elements in both $a and $b.
     *
     * @param int $alo the lower constraint for the first sequence
     * @param int $ahi the upper constraint for the first sequence
     * @param int $blo the lower constraint for the second sequence
     * @param int $bhi the upper constraint for the second sequence
     *
     * @return int[] an array containing the longest match that includes the starting position in $a, start in $b and the length/size
     */
    public function findLongestMatch(int $alo, int $ahi, int $blo, int $bhi): array
    {
        $a = $this->a;
        $b = $this->b;

        $bestI = $alo;
        $bestJ = $blo;
        $bestSize = 0;

        $j2Len = [];

        for ($i = $alo; $i < $ahi; ++$i) {
            $newJ2Len = [];
            $jDict = $this->b2j[$a[$i]] ?? [];

            foreach ($jDict as $j) {
                if ($j < $blo) {
                    continue;
                }

                if ($j >= $bhi) {
                    break;
                }

                $k = ($j2Len[$j - 1] ?? 0) + 1;
                $newJ2Len[$j] = $k;

                if ($k > $bestSize) {
                    $bestI = $i - $k + 1;
                    $bestJ = $j - $k + 1;
                    $bestSize = $k;
                }
            }

            $j2Len = $newJ2Len;
        }

        while (
            $bestI > $alo &&
            $bestJ > $blo &&
            !$this->isBJunk($b[$bestJ - 1]) &&
            !$this->linesAreDifferent($bestI - 1, $bestJ - 1)
        ) {
            --$bestI;
            --$bestJ;
            ++$bestSize;
        }

        while (
            $bestI + $bestSize < $ahi &&
            ($bestJ + $bestSize) < $bhi &&
            !$this->isBJunk($b[$bestJ + $bestSize]) &&
            !$this->linesAreDifferent($bestI + $bestSize, $bestJ + $bestSize)
        ) {
            ++$bestSize;
        }

        while (
            $bestI > $alo &&
            $bestJ > $blo &&
            $this->isBJunk($b[$bestJ - 1]) &&
            !$this->linesAreDifferent($bestI - 1, $bestJ - 1)
        ) {
            --$bestI;
            --$bestJ;
            ++$bestSize;
        }

        while (
            $bestI + $bestSize < $ahi &&
            $bestJ + $bestSize < $bhi &&
            $this->isBJunk($b[$bestJ + $bestSize]) &&
            !$this->linesAreDifferent($bestI + $bestSize, $bestJ + $bestSize)
        ) {
            ++$bestSize;
        }

        return [$bestI, $bestJ, $bestSize];
    }

    /**
     * Return a nested set of arrays for all of the matching sub-sequences
     * in the strings $a and $b.
     *
     * Each block contains the lower constraint of the block in $a, the lower
     * constraint of the block in $b and finally the number of lines that the
     * block continues for.
     *
     * @return int[][] a nested array of the matching blocks, as described by the function
     */
    public function getMatchingBlocks(): array
    {
        if (!empty($this->matchingBlocks)) {
            return $this->matchingBlocks;
        }

        $aCount = \count($this->a);
        $bCount = \count($this->b);

        $queue = [
            [0, $aCount, 0, $bCount],
        ];

        $matchingBlocks = [];
        while (!empty($queue)) {
            [$alo, $ahi, $blo, $bhi] = \array_pop($queue);
            $x = $this->findLongestMatch($alo, $ahi, $blo, $bhi);
            [$i, $j, $k] = $x;

            if ($k) {
                $matchingBlocks[] = $x;

                if ($alo < $i && $blo < $j) {
                    $queue[] = [$alo, $i, $blo, $j];
                }

                if ($i + $k < $ahi && $j + $k < $bhi) {
                    $queue[] = [$i + $k, $ahi, $j + $k, $bhi];
                }
            }
        }

        \usort($matchingBlocks, function (array $a, array $b): int {
            $aCount = \count($a);
            $bCount = \count($b);
            $min = \min($aCount, $bCount);

            for ($i = 0; $i < $min; ++$i) {
                if ($a[$i] !== $b[$i]) {
                    return $a[$i] <=> $b[$i];
                }
            }

            return $aCount <=> $bCount;
        });

        $i1 = $j1 = $k1 = 0;
        $nonAdjacent = [];
        foreach ($matchingBlocks as [$i2, $j2, $k2]) {
            if ($i1 + $k1 === $i2 && $j1 + $k1 === $j2) {
                $k1 += $k2;

                continue;
            }

            if ($k1) {
                $nonAdjacent[] = [$i1, $j1, $k1];
            }

            $i1 = $i2;
            $j1 = $j2;
            $k1 = $k2;
        }

        if ($k1) {
            $nonAdjacent[] = [$i1, $j1, $k1];
        }

        $nonAdjacent[] = [$aCount, $bCount, 0];

        $this->matchingBlocks = $nonAdjacent;

        return $this->matchingBlocks;
    }

    /**
     * Return a list of all of the opcodes for the differences between the
     * two strings.
     *
     * The nested array returned contains an array describing the opcode
     * which includes:
     * 0 - The type of tag (as described below) for the opcode.
     * 1 - The beginning line in the first sequence.
     * 2 - The end line in the first sequence.
     * 3 - The beginning line in the second sequence.
     * 4 - The end line in the second sequence.
     *
     * The different types of tags include:
     * replace - The string from $i1 to $i2 in $a should be replaced by
     *           the string in $b from $j1 to $j2.
     * delete -  The string in $a from $i1 to $j2 should be deleted.
     * insert -  The string in $b from $j1 to $j2 should be inserted at
     *           $i1 in $a.
     * equal  -  The two strings with the specified ranges are equal.
     *
     * @return int[][] array of the opcodes describing the differences between the strings
     */
    public function getOpcodes(): array
    {
        if (!empty($this->opcodes)) {
            return $this->opcodes;
        }

        $i = $j = 0;
        $this->opcodes = [];

        foreach ($this->getMatchingBlocks() as [$ai, $bj, $size]) {
            if ($i < $ai && $j < $bj) {
                $tag = self::OP_REP;
            } elseif ($i < $ai) {
                $tag = self::OP_DEL;
            } elseif ($j < $bj) {
                $tag = self::OP_INS;
            } else {
                $tag = self::OP_NOP;
            }

            if ($tag) {
                $this->opcodes[] = [$tag, $i, $ai, $j, $bj];
            }

            $i = $ai + $size;
            $j = $bj + $size;

            if ($size) {
                $this->opcodes[] = [self::OP_EQ, $ai, $i, $bj, $j];
            }
        }

        return $this->opcodes;
    }

    /**
     * Return a series of nested arrays containing different groups of generated
     * opcodes for the differences between the strings with up to $context lines
     * of surrounding content.
     *
     * Essentially what happens here is any big equal blocks of strings are stripped
     * out, the smaller subsets of changes are then arranged in to their groups.
     * This means that the sequence matcher and diffs do not need to include the full
     * content of the different files but can still provide context as to where the
     * changes are.
     *
     * @param int $context the number of lines of context to provide around the groups
     *
     * @return int[][][] nested array of all of the grouped opcodes
     */
    public function getGroupedOpcodes(int $context = 3): array
    {
        $opcodes = $this->getOpcodes();

        if (empty($opcodes)) {
            $opcodes = [
                [self::OP_EQ, 0, 1, 0, 1],
            ];
        }

        if ($opcodes[0][0] === self::OP_EQ) {
            // fix the leading sequence which is out of context.
            $opcodes[0] = [
                $opcodes[0][0],
                \max($opcodes[0][1], $opcodes[0][2] - $context),
                $opcodes[0][2],
                \max($opcodes[0][3], $opcodes[0][4] - $context),
                $opcodes[0][4],
            ];
        }

        $lastItem = \count($opcodes) - 1;
        if ($opcodes[$lastItem][0] === self::OP_EQ) {
            [$tag, $i1, $i2, $j1, $j2] = $opcodes[$lastItem];
            // fix the trailing sequence which is out of context.
            $opcodes[$lastItem] = [
                $tag,
                $i1,
                \min($i2, $i1 + $context),
                $j1,
                \min($j2, $j1 + $context),
            ];
        }

        $maxRange = $context << 1;
        $groups = $group = [];
        foreach ($opcodes as [$tag, $i1, $i2, $j1, $j2]) {
            if ($tag === self::OP_EQ && $i2 - $i1 > $maxRange) {
                $group[] = [
                    $tag,
                    $i1,
                    \min($i2, $i1 + $context),
                    $j1,
                    \min($j2, $j1 + $context),
                ];
                $groups[] = $group;
                $group = [];
                $i1 = \max($i1, $i2 - $context);
                $j1 = \max($j1, $j2 - $context);
            }

            $group[] = [$tag, $i1, $i2, $j1, $j2];
        }

        if (
            !empty($group) &&
            (
                \count($group) !== 1 ||
                $group[0][0] !== self::OP_EQ
            )
        ) {
            $groups[] = $group;
        }

        // there will be at least leading/trailing OP_EQ blocks
        // if we want really zero-context, we keep only non-equal blocks
        if ($context <= 0) {
            $groupsNew = [];

            foreach ($groups as $group) {
                $groupNew = [];

                foreach ($group as $block) {
                    if ($block[0] !== self::OP_EQ) {
                        $groupNew[] = $block;
                    }
                }

                if (!empty($groupNew)) {
                    $groupsNew[] = $groupNew;
                }
            }

            return $groupsNew;
        }

        return $groups;
    }

    /**
     * Convert an operation code from int into its string form.
     *
     * @param int $op the operation code
     *
     * @throws \InvalidArgumentException
     *
     * @return string the string representation of the operation code
     */
    public static function opIntToStr(int $op): string
    {
        if (!isset(self::OP_INT_TO_STR_MAP[$op])) {
            throw new \InvalidArgumentException("Invalid OP: {$op}");
        }

        return self::OP_INT_TO_STR_MAP[$op];
    }

    /**
     * Convert an operation code from string into its int form.
     *
     * @param string $op the operation code
     *
     * @throws \InvalidArgumentException
     *
     * @return int the int representation of the operation code
     */
    public static function opStrToInt(string $op): int
    {
        if (!isset(self::OP_STR_TO_INT_MAP[$op])) {
            throw new \InvalidArgumentException("Invalid OP: {$op}");
        }

        return self::OP_STR_TO_INT_MAP[$op];
    }

    /**
     * Check if the two lines at the given indexes are different or not.
     *
     * @param int $aIndex line number to check against in a
     * @param int $bIndex line number to check against in b
     *
     * @return bool true if the lines are different and false if not
     */
    private function linesAreDifferent(int $aIndex, int $bIndex): bool
    {
        $lineA = $this->a[$aIndex];
        $lineB = $this->b[$bIndex];

        if ($this->options['ignoreWhitespace']) {
            static $whitespaces = ["\t", ' '];

            $lineA = \str_replace($whitespaces, '', $lineA);
            $lineB = \str_replace($whitespaces, '', $lineB);
        }

        if ($this->options['ignoreCase']) {
            $lineA = \strtolower($lineA);
            $lineB = \strtolower($lineB);
        }

        return $lineA !== $lineB;
    }

    /**
     * Generate the internal arrays containing the list of junk and non-junk
     * characters for the second ($b) sequence.
     */
    private function chainB(): self
    {
        $length = \count($this->b);
        $this->b2j = [];
        $popularDict = [];

        for ($i = 0; $i < $length; ++$i) {
            $char = $this->b[$i];

            if (isset($this->b2j[$char])) {
                if ($length >= 200 && \count($this->b2j[$char]) * 100 > $length) {
                    $popularDict[$char] = 1;

                    unset($this->b2j[$char]);
                } else {
                    $this->b2j[$char][] = $i;
                }

                continue;
            }

            $this->b2j[$char] = [$i];
        }

        // remove leftovers
        foreach (\array_keys($popularDict) as $char) {
            unset($this->b2j[$char]);
        }

        $this->junkDict = [];
        if (\is_callable($this->junkCallback)) {
            foreach (\array_keys($popularDict) as $char) {
                if (($this->junkCallback)($char)) {
                    $this->junkDict[$char] = 1;
                    unset($popularDict[$char]);
                }
            }

            foreach (\array_keys($this->b2j) as $char) {
                if (($this->junkCallback)($char)) {
                    $this->junkDict[$char] = 1;
                    unset($this->b2j[$char]);
                }
            }
        }

        return $this;
    }

    /**
     * Checks if a particular character is in the junk dictionary
     * for the list of junk characters.
     *
     * @return bool $b True if the character is considered junk. False if not.
     */
    private function isBJunk(string $b): bool
    {
        return isset($this->junkDict[$b]);
    }
}
