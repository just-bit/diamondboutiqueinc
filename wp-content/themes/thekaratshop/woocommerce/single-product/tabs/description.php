<?php
/**
 * Description tab
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/description.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.0.0
 */

defined( 'ABSPATH' ) || exit;

global $post, $product;

$heading = apply_filters( 'woocommerce_product_description_heading', 'More Details' );

?>

<?php if ( $heading ) : ?>
    <span class="product-details__title active">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
          <path d="M5 -4.37114e-07L10 5L5 2.5L0 5L5 -4.37114e-07Z" fill="#191919"></path>
        </svg>
        <?php echo esc_html( $heading ); ?>
    </span>
<?php endif; ?>
<div class="product-details__description" style="">
    <?php the_content(); ?>
    <?php wc_display_product_attributes($product); ?>
</div>

