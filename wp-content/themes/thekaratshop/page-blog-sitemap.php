<?php /* Template Name: Blog Sitemap */ ?>

<?php get_header();
?>
<main class="main">
    <div class="section catalog-page">
        <div class="catalog-top">
            <div class="container">
                <?php breadcrumbs(); ?>
                <h1 class="page-title"><?php the_title(); ?></h1>
            </div>
        </div>
        <div class="container sitemap-wrapper">
            <?php if(wp_count_posts( 'post' )->publish){
                $args = array(
                    'post_status' => 'publish',
                    'post_type' => 'post',
                    'posts_per_page' => 100,
                    'page' => (get_query_var('paged')) ? get_query_var('paged') : 1,
                    'paged' => (get_query_var('paged')) ? get_query_var('paged') : 1,
                );
                $posts = get_posts($args);
                echo '<ul>';
                foreach ($posts as $post) {
                    echo '<li><a href="' . get_permalink($post->ID) . '">' . get_the_title($post->ID) . '</a></li>';
                }
                echo '</ul>';

                $query   = new WP_Query($args);
                $total   = $query->max_num_pages;
                $base    = isset( $base ) ? $base : esc_url_raw( str_replace( 999999999, '%#%', remove_query_arg( 'add-to-cart', get_pagenum_link( 999999999, false ) ) ) );
                $format  = isset( $format ) ? $format : '';
                $pages = paginate_links(
                    apply_filters(
                        'woocommerce_pagination_args',
                        array( // WPCS: XSS ok.
                            'base'      => $base,
                            'format'    => $format,
                            'add_args'  => false,
                            'current'   => max( 1, $args['page'] ),
                            'total'     => $total,
                            'prev_next' => false,
                            'prev_text' => '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path><line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line></svg>',
                            'next_text' => '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path><line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line></svg>',
                            'type'      => 'array',
                            'end_size'  => 3,
                            'mid_size'  => 1,
                        )
                    )
                );

                if($pages){
                    echo '<div class="pagination" style="margin-top: 40px;"><nav><ul>';
                    foreach ($pages as $link) {
                        if (strpos($link, 'current') !== false) {
                            echo '<li class="current">' . str_replace('/page/1/', '/', $link) . '</li>';
                        } else {
                            echo '<li>' . str_replace('/page/1/', '/', $link) . '</li>';
                        }
                    }
                    echo '</ul></nav></div>';
                }
            }
            wp_reset_query(); ?>
        </div>
    </div>
</main>

<?php get_footer(); ?>
