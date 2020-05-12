<?php
$postsPerPage = get_option( 'posts_per_page' );

if ( get_query_var('paged') ) { $paged = get_query_var('paged'); } else if ( get_query_var('page') ) {$paged = get_query_var('page'); } else {$paged = 1; }
$paged = (isset($_GET['paged']) && !empty($_GET['paged'])) ? (int) $_GET['paged'] : $paged;
$offset = (($paged-1)*$postsPerPage);
$cat = (isset($_GET['category']) ? $_GET['category'] : null);

$args = array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'order_by' => 'date',
    'order' => 'DESC',
    'posts_per_page' => $postsPerPage,
    'offset' => $offset,
);

if ($cat) {
    $args['category_name'] = $cat;
}

$posts = new WP_Query($args);

// set to global variable for later processing
$totalposts = (int) $posts->found_posts;
$currentViewedposts = (int) $posts->post_count;

if($posts->have_posts()):
    foreach($posts->posts as $p): ?>

        <a href="<?php echo get_permalink($p->ID); ?>" title="<?php echo get_the_title($p->ID); ?>" class="item_magazine responsive col3 col2_mq2">
            MY ARTICLE :)
        </a>

    <?php
    endforeach;
    wp_reset_postdata();

endif;

?>