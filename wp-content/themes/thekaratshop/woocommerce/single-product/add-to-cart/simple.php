<?php
/**
 * Simple product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/simple.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product->is_purchasable() ) {
	return;
}

echo wc_get_stock_html( $product ); // WPCS: XSS ok.

if ( $product->is_in_stock() ) : ?>

	<?php do_action( 'woocommerce_before_add_to_cart_form' ); ?>

	<form class="cart" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data'>
		<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

		<div class="single_variation_wrap">
            <div class="product-buttons">
                <div class="product-price">
                    <?php echo $product->get_price_html(); ?>
                </div>
                <?php echo((new Coderun\BuyOneClick\Service\Factory\ButtonFactory())->create())->getHtmlOrderButtons(['variationId' => '']); ?>
                <a href="javascript:void(0)" class="btn btn-w btn-share">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M13.3998 14L6.2998 10.7" stroke="#191919" stroke-width="1.1"></path>
                          <path d="M13.5 5.5L6.5 8.8" stroke="#191919" stroke-width="1.1"></path>
                          <path d="M15.5002 6.89999C16.7705 6.89999 17.8002 5.87024 17.8002 4.59999C17.8002 3.32973 16.7705 2.29999 15.5002 2.29999C14.2299 2.29999 13.2002 3.32973 13.2002 4.59999C13.2002 5.87024 14.2299 6.89999 15.5002 6.89999Z" stroke="#191919" stroke-width="1.1"></path>
                          <path d="M15.5002 17.1C16.7705 17.1 17.8002 16.0703 17.8002 14.8C17.8002 13.5297 16.7705 12.5 15.5002 12.5C14.2299 12.5 13.2002 13.5297 13.2002 14.8C13.2002 16.0703 14.2299 17.1 15.5002 17.1Z" stroke="#191919" stroke-width="1.1"></path>
                          <path d="M4.5002 12.1C5.77045 12.1 6.8002 11.0703 6.8002 9.8C6.8002 8.52975 5.77045 7.5 4.5002 7.5C3.22994 7.5 2.2002 8.52975 2.2002 9.8C2.2002 11.0703 3.22994 12.1 4.5002 12.1Z" stroke="#191919" stroke-width="1.1"></path>
                        </svg>
                        Share
                        <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="#191919"></path>
                        </svg>
                    </span>
                    <div class="tooltip" id="tooltip">URL copied.</div>
                </a>
            </div>
        </div>
		<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>
	</form>

	<?php do_action( 'woocommerce_after_add_to_cart_form' ); ?>

<?php endif; ?>
