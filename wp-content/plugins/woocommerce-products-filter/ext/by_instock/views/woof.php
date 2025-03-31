<?php
if (!defined('ABSPATH'))
    die('No direct access allowed');


$woof_ext_instock_label = apply_filters('woof_ext_custom_title_by_instock', __('In stock', 'woocommerce-products-filter'));
if (isset(woof()->settings['by_instock']) AND woof()->settings['by_instock']['show']) {
    if (isset(woof()->settings['by_instock']['view']) && woof()->settings['by_instock']['view'] === 'switcher') {
        $unique_id = uniqid('woof_checkbox_instock-');
        ?>
        <div data-css-class="woof_checkbox_instock_container" class="woof_checkbox_instock_container woof_container woof_container_stock <?php echo WOOF_HELPER::generate_container_css_classes('by_instock') ?>">
            <div class="woof_container_overlay_item"></div>
            <div class="woof_container_inner">

                <div class="switcher23-container">

                    <input type="checkbox" class="woof_checkbox_instock_as_switcher switcher23" id="<?php echo $unique_id ?>" name="stock" value="0" <?php checked('instock', woof()->is_isset_in_request_data('stock') ? 'instock' : '', true) ?> />

                    <label for="<?php echo $unique_id ?>" class="switcher23-toggle">
                        <div class="switcher23-title2"><?php esc_html_e($woof_ext_instock_label) ?></div>
                        <span></span>
                    </label>
                </div>

            </div>
        </div>
        <?php
    } else {
        $inique_id = uniqid();
        ?>
        <div class="catalog-filer__block">
            <span class="catalog-filer__title active">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                      <path d="M5 -4.37114e-07L10 5L5 2.5L0 5L5 -4.37114e-07Z" fill="#191919"></path>
                    </svg>
                </i>
                Availability
            </span>
            <div class="catalog-filter__body">
                <ul class="catalog-filters">
                    <li class="woof_checkbox_instock_container woof_container woof_container_stock <?php echo WOOF_HELPER::generate_container_css_classes('by_instock') ?>">
                        <div class="<?php if (checked('instock', woof()->is_isset_in_request_data('stock') ? 'instock' : '', false)): ?>current<?php endif; ?>">
                            <label for="woof_checkbox_instock<?php echo '_' . $inique_id ?>">
	                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		                            <rect x="0.5" y="0.5" width="14" height="14" rx="0.5" stroke="#191919"></rect>
		                            <rect x="5" y="5" width="5" height="5" fill="#191919"></rect>
	                            </svg>
                                <input type="checkbox" id="woof_checkbox_instock<?php echo '_' . $inique_id ?>" class="hidden woof_checkbox_instock" name="stock" value="0" <?php checked('instock', woof()->is_isset_in_request_data('stock') ? 'instock' : '', true) ?> />
                                <span><?php esc_html_e($woof_ext_instock_label) ?></span>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <?php
    }
}


