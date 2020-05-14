<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <?php if (get_field('isMain') == false): ?>
        <meta name="robots" content="noindex, nofollow">
    <?php endif; ?>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <?php wp_head(); ?>
</head>

<body <?php body_class()?>>