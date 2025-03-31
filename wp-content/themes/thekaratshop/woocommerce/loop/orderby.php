<?php
/**
 * Show options for ordering
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/loop/orderby.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<form class="dropdown-sort" method="get">
    <div class="dropdown-sort-top">
        Sort By&nbsp;:&nbsp;
        <div class="dropdown-sort-top-text">
            <?php foreach($catalog_orderby_options as $id => $name): ?>
                <?php if(!empty(selected( $orderby, $id, false ))){ ?>
                    <?php echo str_replace(['Sort by ', ':'], '', esc_html( $name )); ?>
                <?php } ?>
            <?php endforeach; ?>
        </div>
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                <path d="M5 5L0 0L5 2.5L10 0L5 5Z" fill="#191919"></path>
            </svg>
        </i>
    </div>
    <div class="dropdown-sort-bot">
        <?php foreach ( $catalog_orderby_options as $id => $name ) : ?>
            <div class="dropdown-sort-bot-item" data-value="<?php echo esc_attr( $id ); ?>"><?php echo esc_html( $name ); ?></div>
        <?php endforeach; ?>
    </div>

	<select name="orderby" class="orderby" style="display: none" aria-label="<?php esc_attr_e( 'Shop order', 'woocommerce' ); ?>">
		<?php foreach ( $catalog_orderby_options as $id => $name ) : ?>
			<option value="<?php echo esc_attr( $id ); ?>" <?php selected( $orderby, $id ); ?>><?php echo esc_html( $name ); ?></option>
		<?php endforeach; ?>
	</select>
	<input type="hidden" name="paged" value="1" />
	<?php wc_query_string_form_fields( null, array( 'orderby', 'submit', 'paged', 'product-page' ) ); ?>
</form>
