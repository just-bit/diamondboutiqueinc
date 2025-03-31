<?php
/**
 * Related Products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/related.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.9.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( $related_products ) : ?>

    <div class="section related-section">
        <div class="container">
            <div class="related-slider__top">
                <h2 class="related-slider__title">You Might Also Like</h2>
                <div class="related-slider__nav">
                    <div class="related-slider__arrow related-prev">
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path>
                            <line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line>
                        </svg>
                    </div>
                    <span>
                        <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995" stroke="#191919"></line>
                        </svg>
                    </span>
                    <div class="related-slider__arrow related-next">
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path>
                            <line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="related-slider__wrapper">
                <div class="related-slider">

                    <?php foreach ( $related_products as $related_product ) : ?>
                        <?php
                        $post_object = get_post( $related_product->get_id() );

                        setup_postdata( $GLOBALS['post'] =& $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found

                        wc_get_template_part( 'content', 'product-slide' );
                        ?>
                    <?php endforeach; ?>

                </div>
            </div>

	        <div class="related-progress-wrapper">
		        <div class="related-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progressbar"></div>
	        </div>
        </div>
    </div>

<?php
endif;

wp_reset_postdata();
