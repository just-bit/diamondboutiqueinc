<?php
/**
 * Single Product Image
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-image.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.8.0
 */

defined( 'ABSPATH' ) || exit;

// Note: `wc_get_gallery_image_html` was added in WC 3.3.2 and did not exist prior. This check protects against theme overrides being used on older versions of WC.
if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
    return;
}

global $product;
$terms = get_the_terms( $product->ID, 'product_cat' );

$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
$attachment_id = $product->get_image_id();
$attachment_ids = $product->get_gallery_image_ids();
$wrapper_classes   = apply_filters(
    'woocommerce_single_product_image_gallery_classes',
    array(
        'woocommerce-product-gallery',
        'woocommerce-product-gallery--' . ( !empty($post_thumbnail_id) ? 'with-images' : 'without-images' ),
        'woocommerce-product-gallery--columns-' . absint( $columns ),
        'images',
    )
);

$main_image = true;
$flexslider        = (bool) apply_filters( 'woocommerce_single_product_flexslider_enabled', get_theme_support( 'wc-product-gallery-slider' ) );
$gallery_thumbnail = wc_get_image_size( 'gallery_thumbnail' );
$thumbnail_size    = apply_filters( 'woocommerce_gallery_thumbnail_size', array( $gallery_thumbnail['width'], $gallery_thumbnail['height'] ) );
$image_size        = apply_filters( 'woocommerce_gallery_image_size', $flexslider || $main_image ? 'woocommerce_single' : $thumbnail_size );
$full_size         = apply_filters( 'woocommerce_gallery_full_size', apply_filters( 'woocommerce_product_thumbnails_large_size', 'full' ) );
$thumbnail_src     = wp_get_attachment_image_src( $attachment_id, $thumbnail_size );
$full_src          = wp_get_attachment_image_src( $attachment_id, $full_size );
if($full_src){
$alt_text          = trim( wp_strip_all_tags( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ) );
$image             = wp_get_attachment_image(
    $attachment_id,
    $image_size,
    false,
    apply_filters(
        'woocommerce_gallery_image_html_attachment_image_params',
        array(
            'alt'                     => _wp_specialchars( (!empty($terms) ? $terms[0]->name.' ' : '').$product->name . ' buy in Huntington, NY', ENT_QUOTES, 'UTF-8', true ),
            'title'                   => _wp_specialchars( (!empty($terms) ? $terms[0]->name.' ' : '').$product->name . ' buy in Huntington, NY', ENT_QUOTES, 'UTF-8', true ),
            'data-caption'            => _wp_specialchars( get_post_field( 'post_excerpt', $attachment_id ), ENT_QUOTES, 'UTF-8', true ),
            'data-src'                => esc_url( $full_src[0] ),
            'data-large_image'        => esc_url( $full_src[0] ),
            'data-large_image_width'  => esc_attr( $full_src[1] ),
            'data-large_image_height' => esc_attr( $full_src[2] ),
            'class'                   => esc_attr( $main_image ? 'wp-post-image' : '' ),
            'itemprop'                => 'contentUrl',
        ),
        $attachment_id,
        $image_size,
        $main_image
    )
);
$product_image_size =  wp_get_attachment_image_src($attachment_id, 'woocommerce_single');

?>
<div class="product-main__slider slick-slider lightgallery"
     data-slick='{"slidesToShow": 1, "slidesToScroll": 1, "arrows": true, "dots": false, "infinite": true, "cssEase": "linear", "fade": true, "asNavFor": ".product-main__nav", "prevArrow": "#product-prev", "nextArrow": "#product-next"}'>
    <?php
    if ( $attachment_id ) {
        $html = $image;
        $html .= '<meta content="' . esc_attr( $product_image_size[1] ) . '" itemprop="width">';
        $html .= '<meta content="' . esc_attr( $product_image_size[2] ) . '" itemprop="height">';
    } else {
        $html  = sprintf(
            '<img itemprop="contentUrl" src="%s" alt="%s" title="%s" class="wp-post-image" data-zoom-image="" />',
            esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ),
            esc_attr( $product->name . ' buy in Huntington, NY' ),
            esc_attr( $product->name . ' buy in Huntington, NY' )
        );
    }

    ?>
    <div class="slide" data-src="<?php echo esc_url( $full_src[0] ); ?>">
        <div itemscope itemtype="https://schema.org/ImageObject">
            <?php echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $attachment_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped ?>
            <?php //echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, !empty($post_thumbnail_id) ? $post_thumbnail_id : 0); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped?>
        </div>
    </div>
    <?php do_action( 'woocommerce_product_thumbnails' ); ?>
</div>
<div class="product-main__nav slick-slider"
     data-slick='{"slidesToShow": 8, "slidesToScroll": 1, "arrows": false, "dots": false, "infinite": true, "vertical": true, "variableHeight": true, "focusOnSelect": true, "asNavFor": ".product-main__slider"}'>
    <?php
    if ( $attachment_id ) {
        $html = $image;
        $html .= '<meta content="' . esc_attr( $product_image_size[1] ) . '" itemprop="width">';
        $html .= '<meta content="' . esc_attr( $product_image_size[2] ) . '" itemprop="height">';
    } else {
        $html  = sprintf(
            '<img src="%s" alt="%s" title="%s" class="wp-post-image" data-zoom-image="" />',
            esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ),
            esc_attr( $product->name . ' buy in Huntington, NY' ),
            esc_attr( $product->name . ' buy in Huntington, NY' )
        );
    }
    ?>
    <div class="slide">
        <div itemscope itemtype="https://schema.org/ImageObject">
            <?php echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $attachment_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped ?>
        </div>
    </div>
    <?php do_action( 'woocommerce_product_thumbnails' ); ?>
</div>
<?php if(!empty($attachment_ids)){ ?>
<div class="product-slider__nav">
    <div class="product-slider__arrow" id="product-prev">
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"/>
            <line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"/>
        </svg>
    </div>
    <span>
        <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995" stroke="#191919"/>
        </svg>
    </span>
    <div class="product-slider__arrow" id="product-next">
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"/>
            <line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"/>
        </svg>
    </div>
</div>
<?php } ?>
<?php } ?>
