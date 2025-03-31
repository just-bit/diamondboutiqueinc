<?php
// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}
global $wt_wishlist_table_settings_options;
?>
<?php if ($products) { ?>
	<div class="row catalog-items">
      <?php
      foreach ($products as $p) {
          global $product;
          $product = wc_get_product($p['product_id']);
          if ($product) {
              // Ensure visibility.
              if (empty($product) || !$product->is_visible()) {
                  return;
              }
              do_action('woocommerce_shop_loop');

              wc_get_template_part('content', 'product');
          }
      }
      ?>
	</div>
<?php } else { ?>
	<div class="wishlist-popup__empty">Your wishlist is empty! Let's add some items there!</div>
<?php } ?>

<?php

/**
 *
 * @since 2.0.8
 *
 * Compatability with in Twenty-Twenty-Two & Twenty-Twenty-Three Themes
 *
 */

if (strstr(wp_get_theme()->get('Name'), 'Twenty Twenty-Two') || strstr(wp_get_theme()->get('Name'), 'Twenty Twenty-Three')) {

    if (is_cart()) {
        ?>

			<style>
				.woocommerce .quantity input[type=number] {
					width: 5em !important;
				}

			</style>
        <?php
    }
    ?>

	<style>
		.wt_frontend_wishlist_table td {
			padding: 10px;
		}

		.wt_frontend_wishlist_table {
			padding: 10px;
		}

	</style>

    <?php

}

?>

