<?php if(is_woocommerce() && !is_product() && !is_product_search()){ ?>
<aside class="catalog-sidebar">
    <div class="catalog-filters__top">
        <div class="catalog-filters__title">
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.5 6.5H3.5" stroke="black" stroke-linecap="round"/>
                    <path d="M16.5 13.5H3.5" stroke="black" stroke-linecap="round"/>
                    <path d="M13 15.5C14.1046 15.5 15 14.6046 15 13.5C15 12.3954 14.1046 11.5 13 11.5C11.8954 11.5 11 12.3954 11 13.5C11 14.6046 11.8954 15.5 13 15.5Z" fill="#F9F5F2" stroke="black"/>
                    <path d="M7 8.5C8.10457 8.5 9 7.60457 9 6.5C9 5.39543 8.10457 4.5 7 4.5C5.89543 4.5 5 5.39543 5 6.5C5 7.60457 5.89543 8.5 7 8.5Z" fill="#F9F5F2" stroke="black"/>
                </svg>
            </i>
            <span>Filters</span>
        </div>
        <div class="woof_products_top_panel" style="margin: 0;width: 100%;"></div>
    </div>
    <?= do_shortcode('[woof]') ?>
</aside>
<?php } ?>