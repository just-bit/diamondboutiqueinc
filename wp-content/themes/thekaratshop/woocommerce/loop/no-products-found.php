<?php
/**
 * Displayed when no products are found matching the current query
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/loop/no-products-found.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.8.0
 */

defined( 'ABSPATH' ) || exit;
$search_query = isset( $_GET['s'] ) ? esc_html( $_GET['s'] ) : '';
?>
<div class="catalog-main">
    <div class="container">
        <div class="search-results__empty">
            <div class="search-results__empty-text">
                <?php if ( ! empty( $search_query ) ) : ?>
                    <p><?php printf( esc_html__( 'We are sorry! We couldn\'t find results for "%s".', 'woocommerce' ), $search_query ); ?></p>
                    <p>But don't give up – check the spelling or try less specific search terms.</p>
                <?php else : ?>
                    <?php if(is_product_category() && get_queried_object()->term_id == 18){ ?>
                        <p>These rings are coming soon</p>
                    <?php }else{ ?>
                        <p><?php esc_html_e( 'We are sorry! No results were found.', 'woocommerce' ); ?></p>
                    <?php } ?>
                <?php endif; ?>
            </div>
            <a href="/shop/" class="btn">
                <span>
                    Go to Jewelry
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"></path>
                    </svg>
                </span>
            </a>
        </div>
    </div>
</div>
