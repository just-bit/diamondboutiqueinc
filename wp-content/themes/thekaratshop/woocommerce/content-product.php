<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
    return;
}

?>
<div class="<?=empty($_GET['woof_text']) ? 'col-lg-3' : 'col-lg-4'?>">
    <div class="product-item">
        <a href="<?=esc_url( apply_filters( 'woocommerce_loop_product_link', get_the_permalink($product->get_id()), $product ) )?>" aria-label="Product <?=esc_attr( $product->get_name() ); ?>"></a>
        <div class="product-item__labels"></div>
        <?php
        render_webtoffee_wishlist_button(true);

        if(get_class($product) == 'WC_Product_Variable'){
            $colors = [];
            $images = [];
            $available_variations = $product->get_available_variations();
            foreach($available_variations as $key => $value){
                if(!empty($value['image']) && !empty($value['attributes']['attribute_pa_color']) && !isset($colors[$value['attributes']['attribute_pa_color']])){
                    $term = get_term_by('slug', $value['attributes']['attribute_pa_color'], 'pa_color');
                    $colors[$value['attributes']['attribute_pa_color']] = get_field('color', $term);
                    $itemprop = !$key ? 'itemprop="contentUrl"' : '';
                    $meta = !$key ? '<meta content="'.$value['image']['src_w'].'" itemprop="width"><meta content="'.$value['image']['src_h'].'" itemprop="height">' : '';
                    $images[$value['attributes']['attribute_pa_color']] = '<img fetchpriority="high" '.$itemprop.' loading="lazy" data-color="'.$value['attributes']['attribute_pa_color'].'" decoding="async" width="'.(!empty($value['image']['src_w']) ? $value['image']['src_w'] : '').'" height="'.(!empty($value['image']['src_h']) ? $value['image']['src_h'] : '').'" src="'.$value['image']['src'].'" class="attachment- size-" alt="'.esc_html($product->get_name()).'" title="'.esc_html($product->get_name()).'" srcset="'.$value['image']['srcset'].'" sizes="'.$value['image']['sizes'].'.">'.$meta;
                }
            }
        }
        ?>
        <div class="product-item__pic" itemscope itemtype="https://schema.org/ImageObject">
            <?php
            /**
             * Hook: woocommerce_before_shop_loop_item_title.
             *
             * @hooked woocommerce_show_product_loop_sale_flash - 10
             * @hooked woocommerce_template_loop_product_thumbnail - 10
             */
//            do_action( 'woocommerce_before_shop_loop_item_title' );

            if(!empty($images)){
                foreach($images as $image){
                    echo $image;
                }
            }else{
                $image_size = apply_filters('single_product_archive_thumbnail_size', 'woocommerce_thumbnail');
                echo $product ? $product->get_image($image_size, ['alt' => $product->get_name(), 'title' => $product->get_name(), 'itemprop' => 'contentUrl'], true) : '';
                $product_image_size =  wp_get_attachment_image_src($product->get_image_id(), 'woocommerce_thumbnail');
                echo '<meta content="'.$product_image_size[1].'" itemprop="width"><meta content="'.$product_image_size[2].'" itemprop="height">';
            }
            ?>
        </div>
        <?php woocommerce_template_loop_price() ?>
        <?php
        /**
         * Hook: woocommerce_shop_loop_item_title.
         *
         * @hooked woocommerce_template_loop_product_title - 10
         */
        do_action( 'woocommerce_shop_loop_item_title' );
        ?>
        <?php if(!empty($colors)){ ?>
            <div class="product-item__spacer"></div>
            <div class="product-item__colors">
                <?php foreach($colors as $color => $code){ ?>
	                  <span class="product-item__color" data-color="<?=$color?>"<?= $code ? ' style="background-color: ' . $code . ';"' : '' ?>></span>
                <?php } ?>
            </div>
        <?php } ?>
    </div>
</div>
