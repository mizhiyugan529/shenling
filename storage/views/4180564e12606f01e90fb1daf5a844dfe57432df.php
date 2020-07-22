Hey <?php echo e($user->display_name); ?>!

<?php echo e($blueprint->user->display_name); ?> just joined <?php echo e(app()->url()); ?>.

To view this new user's profile, please click on following link:
<?php echo e(app()->url()); ?>/u/<?php echo e($blueprint->user->id); ?>

