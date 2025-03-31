<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

?>
<div class="section catalog-page">
    <div class="catalog-top">
        <div class="container">
            <?php breadcrumbs(); ?>
            <?php
            /**
             * Hook: woocommerce_shop_loop_header.
             *
             * @since 8.6.0
             *
             * @hooked woocommerce_product_taxonomy_archive_header - 10
             */

            do_action( 'woocommerce_shop_loop_header' );
            ?>
        </div>
    </div>

    <?php
    if ( woocommerce_product_loop() ) {

        /**
         * Hook: woocommerce_before_shop_loop.
         *
         * @hooked woocommerce_output_all_notices - 10
         * @hooked woocommerce_result_count - 20
         * @hooked woocommerce_catalog_ordering - 30
         */
        do_action( 'woocommerce_before_shop_loop' );

        woocommerce_product_loop_start();

        if ( wc_get_loop_prop( 'total' ) ) {
            while ( have_posts() ) {
                the_post();

                /**
                 * Hook: woocommerce_shop_loop.
                 */
                do_action( 'woocommerce_shop_loop' );

                wc_get_template_part( 'content', 'product' );
            }
        }

        woocommerce_product_loop_end();

        /**
         * Hook: woocommerce_after_shop_loop.
         *
         * @hooked woocommerce_pagination - 10
         */
        do_action( 'woocommerce_after_shop_loop' );
    } else {
        /**
         * Hook: woocommerce_no_products_found.
         *
         * @hooked wc_no_products_found - 10
         */
        do_action( 'woocommerce_no_products_found' );
    }
    ?>
</div>
<div class="catalog-mob__filters">
    <div class="catalog-mob__filters-head">
        <div class="catalog-mob__filters-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.3333 9.99999H18.6666C18.6674 12.0051 17.9728 13.9484 16.7013 15.4989C15.4299 17.0493 13.6601 18.1109 11.6937 18.5027C9.72721 18.8946 7.68572 18.5924 5.91706 17.6478C4.14839 16.7032 2.76199 15.1745 1.99409 13.3223C1.22618 11.47 1.12429 9.40882 1.70576 7.48987C2.28724 5.57091 3.51611 3.91296 5.18299 2.79849C6.84986 1.68403 8.8516 1.18203 10.8471 1.37802C12.8426 1.57401 14.7084 2.45587 16.1266 3.87333C16.9328 4.6768 17.5723 5.6317 18.0082 6.68313C18.4441 7.73456 18.6679 8.86178 18.6666 9.99999H20C20 8.02218 19.4135 6.08878 18.3147 4.44429C17.2159 2.79981 15.6541 1.51808 13.8268 0.761208C11.9996 0.00433293 9.98889 -0.1937 8.04909 0.192151C6.10928 0.578003 4.32745 1.53041 2.92893 2.92893C1.53041 4.32745 0.578003 6.10928 0.192151 8.04909C-0.1937 9.98889 0.00433293 11.9996 0.761208 13.8268C1.51808 15.6541 2.79981 17.2159 4.44429 18.3147C6.08878 19.4135 8.02218 20 9.99999 20C12.6521 20 15.1957 18.9464 17.071 17.071C18.9464 15.1957 20 12.6521 20 9.99999H19.3333Z" fill="#191919"></path>
                <path d="M6.2305 14.7133L14.7138 6.23001C14.8389 6.10492 14.9092 5.93525 14.9092 5.75834C14.9092 5.58144 14.8389 5.41177 14.7138 5.28668C14.5887 5.16159 14.4191 5.09131 14.2422 5.09131C14.0652 5.09131 13.8956 5.16159 13.7705 5.28668L5.28717 13.77C5.22523 13.8319 5.17609 13.9055 5.14257 13.9864C5.10905 14.0673 5.0918 14.1541 5.0918 14.2417C5.0918 14.3293 5.10905 14.416 5.14257 14.4969C5.17609 14.5779 5.22523 14.6514 5.28717 14.7133C5.34911 14.7753 5.42264 14.8244 5.50357 14.8579C5.5845 14.8914 5.67124 14.9087 5.75883 14.9087C5.84643 14.9087 5.93317 14.8914 6.0141 14.8579C6.09503 14.8244 6.16856 14.7753 6.2305 14.7133Z" fill="#191919"></path>
                <path d="M5.28717 6.23001L13.7705 14.7133C13.8956 14.8384 14.0652 14.9087 14.2422 14.9087C14.4191 14.9087 14.5887 14.8384 14.7138 14.7133C14.8389 14.5882 14.9092 14.4186 14.9092 14.2417C14.9092 14.0648 14.8389 13.8951 14.7138 13.77L6.2305 5.28668C6.16856 5.22474 6.09503 5.17561 6.0141 5.14208C5.93317 5.10856 5.84643 5.09131 5.75883 5.09131C5.67124 5.09131 5.5845 5.10856 5.50357 5.14208C5.42264 5.17561 5.34911 5.22474 5.28717 5.28668C5.22523 5.34862 5.17609 5.42215 5.14257 5.50308C5.10905 5.58401 5.0918 5.67075 5.0918 5.75834C5.0918 5.84594 5.10905 5.93268 5.14257 6.01361C5.17609 6.09454 5.22523 6.16807 5.28717 6.23001Z" fill="#191919"></path>
            </svg>
        </div>
        <div class="catalog-mob-filters__title">Filters</div>
    </div>
    <div class="woof_products_top_panel mob" style="margin: 0;width: 100%;"></div>
    <?= do_shortcode('[woof]') ?>
</div>
<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );

get_footer( 'shop' );

