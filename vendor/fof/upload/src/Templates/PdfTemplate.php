<?php

namespace FoF\Upload\Templates;

class PdfTemplate extends AbstractTemplate
{
    /**
     * @var string
     */
    protected $tag = 'pdf';

    /**
     * {@inheritdoc}
     */
    public function name()
    {
	return 'PDF View';
    }

    /**
     * {@inheritdoc}
     */
    public function description()
    {
	return 'PDF View';
    }

    /**
     * The xsl template to use with this tag.
     *
     * @return string
     */
    public function template()
    {
        return $this->getView('fof-upload.templates::pdf');
    }

    /**
     * The bbcode to be parsed.
     *
     * @return string
     */
    public function bbcode()
    {
	
        return '[upl-pdf uuid={IDENTIFIER} size={SIMPLETEXT2} url={URL}]{SIMPLETEXT1}[/upl-pdf]';
	
	
    }
}
