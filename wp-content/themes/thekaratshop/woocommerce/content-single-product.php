<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'section product-page', $product ); ?>>
    <div class="container">
        <?php woocommerce_breadcrumb(); ?>
        <?php woocommerce_template_single_title(); ?>
        <div class="product-main__wrapper">
            <div class="product-main__pic">
                <?php
                /**
                 * Hook: woocommerce_before_single_product_summary.
                 *
                 * @hooked woocommerce_show_product_sale_flash - 10
                 * @hooked woocommerce_show_product_images - 20
                 */
                do_action( 'woocommerce_before_single_product_summary' );
                ?>
            </div>
            <div class="product-main__info">
                <?php if ( wc_product_sku_enabled() && ( $product->get_sku() || $product->is_type( 'variable' ) ) ) : ?>
                    <span class="product-style">SKU: <?php echo ( $sku = $product->get_sku() ) ? $sku : esc_html__( 'N/A', 'woocommerce' ); ?></span>
                <?php endif; ?>
                <?php if($product->get_stock_status() == 'instock'){ ?>
                    <span class="product-availability">In Stock</span>
                <?php }else{ ?>
                    <span class="product-availability out-of-stock">Out of stock</span>
                <?php } ?>
                <?php
                woocommerce_template_single_excerpt();
                /**
                 * Hook: woocommerce_single_product_summary.
                 *
                 * @hooked woocommerce_template_single_title - 5
                 * @hooked woocommerce_template_single_rating - 10
                 * @hooked woocommerce_template_single_price - 10
                 * @hooked woocommerce_template_single_excerpt - 20
                 * @hooked woocommerce_template_single_add_to_cart - 30
                 * @hooked woocommerce_template_single_meta - 40
                 * @hooked woocommerce_template_single_sharing - 50
                 * @hooked WC_Structured_Data::generate_product_data() - 60
                 */
                do_action( 'woocommerce_single_product_summary' );
                ?>

                <?php
                /**
                 * Hook: woocommerce_after_single_product_summary.
                 *
                 * @hooked woocommerce_output_product_data_tabs - 10
                 * @hooked woocommerce_upsell_display - 15
                 * @hooked woocommerce_output_related_products - 20
                 */
                do_action( 'woocommerce_after_single_product_summary' );
                ?>
            </div>
        </div>
        <?php $description_image = get_field('description_image'); ?>
        <?php if(!empty($description_image)){ ?>
        <div class="product-img__container" itemscope itemtype="https://schema.org/ImageObject">
            <img itemprop="contentUrl" src="<?php echo $description_image; ?>" loading="lazy" alt="Order <?php echo $product->get_name(); ?> online at The Karat Shop" title="Order <?php echo $product->get_name(); ?> online at The Karat Shop">
            <meta content="1171" itemprop="width">
            <meta content="459" itemprop="height">
        </div>
        <?php } ?>
    </div>
</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>

<?= get_template_part('parts/reviews') ?>
<?= get_template_part('parts/advantages') ?>
