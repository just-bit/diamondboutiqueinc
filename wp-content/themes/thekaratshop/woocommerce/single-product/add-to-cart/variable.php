<?php
/**
 * Variable product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/variable.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 6.1.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

$attribute_keys  = array_keys( $attributes );
$variations_json = wp_json_encode( $available_variations );
$variations_attr = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );

do_action( 'woocommerce_before_add_to_cart_form' ); ?>

<form class="variations_form cart" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data' data-product_id="<?php echo absint( $product->get_id() ); ?>" data-product_variations="<?php echo $variations_attr; // WPCS: XSS ok. ?>">
	<?php do_action( 'woocommerce_before_variations_form' ); ?>

	<?php if ( empty( $available_variations ) && false !== $available_variations ) : ?>
		<p class="stock out-of-stock"><?php echo esc_html( apply_filters( 'woocommerce_out_of_stock_message', __( 'This product is currently out of stock and unavailable.', 'woocommerce' ) ) ); ?></p>
	<?php else : ?>
        <div class="product-parameters variations wc-variation-form">
            <?php foreach ( $attributes as $attribute_name => $options ) : ?>
                <label class="product-parameter__row<?=$attribute_name == 'pa_color' ? ' color-select' : ''?>">
                    <span class="product-parameter__item"><?php echo wc_attribute_label( $attribute_name ); // WPCS: XSS ok. ?></span>
                    <?php
                        $data = array(
                            'options'   => $options,
                            'attribute' => $attribute_name,
                            'product'   => $product,
                            'class'     => 'select',
                            'show_option_none' => 'Select '.strtolower(wc_attribute_label($attribute_name)),
                        );
                        if($attribute_name == 'pa_color'){
                            $data['colors'] = [];
                            foreach($options as $option){
                                $term = get_term_by('slug', $option, 'pa_color');
                                $data['colors'][$option] = get_field('color', $term);
                            }
                        }
                        wc_dropdown_variation_attribute_options($data);
                    ?>
                    <?php if($attribute_name == 'pa_size'){ ?>
                    <span class="product-size__link">See <a href="/wp-content/uploads/2024/11/ring_sizer-2.pdf" target="_blank">size guide</a></span>
                    <?php } ?>
                </label>
            <?php endforeach; ?>
        </div>

		<?php do_action( 'woocommerce_after_variations_table' ); ?>

		<div class="single_variation_wrap">
			<?php
				/**
				 * Hook: woocommerce_before_single_variation.
				 */
				do_action( 'woocommerce_before_single_variation' );

				/**
				 * Hook: woocommerce_single_variation. Used to output the cart button and placeholder for variation data.
				 *
				 * @since 2.4.0
				 * @hooked woocommerce_single_variation - 10 Empty div for variation data.
				 * @hooked woocommerce_single_variation_add_to_cart_button - 20 Qty and cart button.
				 */
				do_action( 'woocommerce_single_variation' );

				/**
				 * Hook: woocommerce_after_single_variation.
				 */
				do_action( 'woocommerce_after_single_variation' );
			?>
		</div>
	<?php endif; ?>

	<?php do_action( 'woocommerce_after_variations_form' ); ?>
</form>
<script>
    jQuery(document).on('found_variation', '.variations_form', function(event, variation){
        jQuery('.clickBuyButton').attr('data-variation_id', variation.variation_id);
    });

    jQuery(document).on('woocommerce_update_variation_values', '.variations_form', function(){
        window.initSumo();
    });
</script>
<?php
do_action( 'woocommerce_after_add_to_cart_form' );
