<?php
/**
 * Pagination - Show numbered pagination for catalog pages
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/loop/pagination.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 9.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$total   = isset( $total ) ? $total : wc_get_loop_prop( 'total_pages' );
$current = isset( $current ) ? $current : wc_get_loop_prop( 'current_page' );
$base    = isset( $base ) ? $base : esc_url_raw( str_replace( 999999999, '%#%', remove_query_arg( 'add-to-cart', get_pagenum_link( 999999999, false ) ) ) );
$format  = isset( $format ) ? $format : '';

if ( $total <= 1 ) {
	return;
}
?>
<div class="pagination">
    <nav>
        <?php
        global $wp_query;
        $total   = isset( $wp_query->max_num_pages ) ? $wp_query->max_num_pages : 1;
        $current = get_query_var( 'paged' ) ? (int) get_query_var( 'paged' ) : 1;
        $pages = paginate_links(
            apply_filters(
                'woocommerce_pagination_args',
                array( // WPCS: XSS ok.
                    'base'      => $base,
                    'format'    => $format,
                    'add_args'  => false,
                    'current'   => max( 1, $current ),
                    'total'     => $total,
                    'prev_next' => true,
                    'prev_text' => '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path><line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line></svg>',
                    'next_text' => '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path><line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line></svg>',
                    'type'      => 'array',
                    'end_size'  => 3,
                    'mid_size'  => 1,
                )
            )
        );
        if($pages){
            if($current == 1){
                $prev = '<span class="prev disabled">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path>
                        <line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line>
                    </svg>
                </span>';
            }else{
                $prev = array_shift($pages);
                $prev = str_replace('<a', '<a aria-label="prev page"', $prev);
            }

            if($total == $current){
                $next = '<span class="next disabled">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path>
                        <line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line>
                    </svg>
                </span>';
            }else{
                $next = array_pop($pages);
                $next = str_replace('<a', '<a aria-label="next page"', $next);
            }
        }
        ?>
        <ul>
            <?php
            foreach ($pages as $link) {
                if (strpos($link, 'current') !== false) {
                    echo '<li class="current">' . str_replace('/page/1/', '/', $link) . '</li>';
                } else {
                    echo '<li>' . str_replace('/page/1/', '/', $link) . '</li>';
                }
            }
            ?>
        </ul>
        <div>
            <?=str_replace('/page/1/', '/', $prev)?>
            <span>
                <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995" stroke="#191919"></line>
                </svg>
            </span>
            <?=$next?>
        </div>
    </nav>
    <div class="btn load-more">
        <span>
        Load More
            <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
            </svg>
        </span>
    </div>
</div>
