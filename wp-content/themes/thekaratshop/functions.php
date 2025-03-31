<?php
if(!defined('ORGANIZATION_EMAIL')){
    define( 'ORGANIZATION_EMAIL', 'sam.karatshop@gmail.com' );
}

//load_theme_textdomain('thekaratshop', get_template_directory() . '/languages');
//add_image_size('aс_main_desktop', 1158, 535, true);

function thekaratshop_enqueue_scripts()
{
//    wp_dequeue_script( 'jquery' );
//    wp_deregister_script( 'jquery' );
//    wp_register_script( 'jquery', get_template_directory_uri() . '/assets/js/app.js');
//    wp_enqueue_script( 'jquery' );
    wp_enqueue_script('js', get_template_directory_uri() . '/assets/js/app.js');
    wp_enqueue_style('css', get_template_directory_uri() . '/assets/css/application.css');
    wp_localize_script('js', 'ajaxurl', admin_url('admin-ajax.php'));

    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('classic-theme-styles');

    wp_dequeue_style( 'wc-blocks-style' );
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'woof_sd_html_items_radio' );
    wp_dequeue_style( 'woof_sd_html_items_switcher' );
    wp_dequeue_style( 'woof_select_radio_check_html_items' );
    wp_dequeue_style( 'woof_by_author_html_items' );
    wp_dequeue_style( 'woof_by_backorder_html_items' );
    wp_dequeue_style( 'woof_by_instock_html_items' );
    wp_dequeue_style( 'woof_by_onsales_html_items' );
    wp_dequeue_style( 'woof_by_sku_html_items' );
    wp_dequeue_style( 'woof_by_text_html_items' );
    wp_dequeue_style( 'woof_color_html_items' );
    wp_dequeue_style( 'woof_image_html_items' );
    wp_dequeue_style( 'woof_label_html_items' );
    wp_dequeue_style( 'woof_select_hierarchy_html_items' );
    wp_dequeue_style( 'woof_slider_html_items' );
    wp_dequeue_style( 'woof_sd_html_items_checkbox' );
    wp_dequeue_style( 'woof_sd_html_items_color' );
    wp_dequeue_style( 'woof_sd_html_items_tooltip' );
    wp_dequeue_style( 'woof_sd_html_items_front' );
    wp_dequeue_style( 'woof_tooltip-css' );
    wp_dequeue_style( 'woof_tooltip-css-noir' );

    if(!is_shop() && !is_product_category()){
        wp_dequeue_style( 'woof' ) ;
        wp_dequeue_script( 'woof-husky' ) ;
    }

    if(!is_product()){
        wp_dequeue_script( 'share-this-share-buttons-mu' ) ;
        wp_dequeue_style( 'share-this-share-buttons-sticky' ) ;
    }

    wp_dequeue_style( 'woof_sections_style' );
    wp_dequeue_style( 'woof-front-builder-css' );
    wp_dequeue_style( 'woof-switcher23' );
    wp_dequeue_style( 'woof-slideout-css' );
    wp_dequeue_style( 'woof-slideout-tab-css' );
    wp_dequeue_style('woof_sections_style');
    wp_dequeue_style('woocommerce-general');
    wp_dequeue_style('woocommerce-layout');
    wp_dequeue_style('woocommerce-smallscreen');
    wp_dequeue_style('chosen-drop-down');
    wp_dequeue_style('wishlist-webtoffee');
    wp_dequeue_style('ion.range-slider');
    wp_dequeue_script('ion.range-slider');
    wp_dequeue_script('chosen-drop-down');

}

add_action('wp_enqueue_scripts', 'thekaratshop_enqueue_scripts', 10, 3);

function theme_move_jquery_to_footer() {
    wp_scripts()->add_data( 'jquery', 'group', 1 );
    wp_scripts()->add_data( 'jquery-core', 'group', 1 );
    wp_scripts()->add_data( 'jquery-migrate', 'group', 1 );
}
add_action( 'wp_enqueue_scripts', 'theme_move_jquery_to_footer' );

function thekaratshop_add_defer_attribute($tag, $handle)
{
    $handles = array(
        'vendor-js',
        'app',
    );

    foreach ($handles as $defer_script) {
        if ($defer_script === $handle) {
            return str_replace(' src', ' defer="defer" src', $tag);
        }
    }

    return $tag;
}

add_filter('script_loader_tag', 'thekaratshop_add_defer_attribute', 10, 2);
show_admin_bar(false);

add_theme_support( 'title-tag' );
add_theme_support('post-thumbnails');
add_theme_support('menus');
add_theme_support('woocommerce');

register_nav_menus(array(
    'mobile-menu' => 'Mobile menu',
    'footer-menu' => 'Footer menu',
    'pages-menu' => 'Pages menu',
));

// options
if (function_exists('acf_add_options_page')) {
    $option_page = acf_add_options_page(array(
        'page_title' => 'Contacts',
        'menu_title' => 'Contacts',
        'menu_slug' => 'contacts',
        'icon_url' => 'dashicons-location',
    ));
}

// обрезаем текст ссылки на пост
/*add_filter('excerpt_more', 'new_excerpt_more');
function new_excerpt_more($more)
{
    global $post;
    return ' ...';
}

add_filter('excerpt_length', function () {
    return 26;
});*/

// разрешаем svg
add_filter('upload_mimes', 'svg_upload_allow');
add_filter('wp_check_filetype_and_ext', 'fix_svg_mime_type', 10, 5);
function svg_upload_allow($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

function fix_svg_mime_type($data, $file, $filename, $mimes, $real_mime = '')
{
    if (version_compare($GLOBALS['wp_version'], '5.1.0', '>=')) {
        $dosvg = in_array($real_mime, ['image/svg', 'image/svg+xml']);
    } else {
        $dosvg = ('.svg' === strtolower(substr($filename, -4)));
    }
    if ($dosvg) {

        if (current_user_can('manage_options')) {
            $data['ext'] = 'svg';
            $data['type'] = 'image/svg+xml';
        } else {
            $data['ext'] = false;
            $data['type'] = false;
        }
    }
    return $data;
}

// Load More
function load_more_posts_ajax()
{
    $paged = isset($_POST['page']) ? $_POST['page'] : 1;
    $args = array(
        'post_type' => 'post',
        'paged' => $paged,
    );
    $query = new WP_Query($args);
    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post(); ?>
					<div class="col-lg-6 col-md-6">
						<a href="<?php the_permalink(); ?>" class="blog-item">
                            <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>">
							<span class="blog-item__date"><?php the_time('m/d/Y'); ?></span>
							<span class="blog-item__title"><?php the_title(); ?></span>
						</a>
					</div>
        <?php endwhile;
    endif;
    wp_reset_postdata();
    die();
}

add_action('wp_ajax_load_more_posts', 'load_more_posts_ajax');
add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts_ajax');


// footer menu
class Footer_Walker_Nav_Menu extends Walker_Nav_Menu
{
    function start_lvl(&$output, $depth = 0, $args = NULL)
    {
        // depth dependent classes
        $indent = ($depth > 0 ? str_repeat("\t", $depth) : ''); // code indent
        $display_depth = ($depth + 1); // because it counts the first submenu as 0
        $classes = array(
            'sub-menu',
            ($display_depth % 2 ? 'menu-odd' : 'menu-even'),
            ($display_depth >= 2 ? 'sub-sub-menu' : ''),
            'menu-depth-' . $display_depth
        );
        $class_names = implode(' ', $classes);

        // build html
        $output .= "\n" . $indent . '<ul>' . "\n";
    }

    function start_el(&$output, $data_object, $depth = 0, $args = null, $current_object_id = 0)
    {
        global $wp_query;

        $item = $data_object;

        $indent = ($depth > 0 ? str_repeat("\t", $depth) : ''); // code indent

        $depth_classes = array();
        $depth_class_names = esc_attr(implode(' ', $depth_classes));

        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $class_names = esc_attr(implode(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item)));

        if ($depth) {
            $output .= $indent . '<li>';
        } else {
            $output .= $indent . '<div class="footer-menu">';
        }

        $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
        $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
        $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) . '"' : '';
        $attributes .= '';

        if ($depth) {
            $item_output = sprintf('%1$s<a%2$s>%3$s%4$s%5$s</a>%6$s',
                $args->before,
                $attributes,
                $args->link_before,
                apply_filters('the_title', $item->title, $item->ID),
                $args->link_after,
                $args->after
            );
        } else {
            $item_output = sprintf('<span>%1$s%2$s%3$s</span>',
                $args->link_before,
                apply_filters('the_title', $item->title, $item->ID),
                $args->link_after
            );
        }

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    public function end_el(&$output, $data_object, $depth = 0, $args = null)
    {
        if (isset($args->item_spacing) && 'discard' === $args->item_spacing) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        if ($depth) {
            $output .= "</li>{$n}";
        } else {
            $output .= "</div>{$n}";
        }
    }
}


// Breadcrumbs
function breadcrumbs()
{
    $catalogPageTitle = 'All Jewelry';
    $HomePageTitle = 'Jewelry Store in NY';
    $search_slug = woof()->get_swoof_search_slug();
    if (!is_front_page()) {
        if (!is_home()) {
            echo '<div itemscope="" itemtype="http://schema.org/BreadcrumbList" class="breadcrumbs"><span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="'.site_url('/').'">'.$HomePageTitle.'</a><meta itemprop="position" content="1" ><meta itemprop="name" content="'.$HomePageTitle.'" ></span><span class="divider"> / </span>';
            $basePosition = 1;
            if (is_shop() and !is_search()) {
                if (strpos($_SERVER['REQUEST_URI'], '/'.$search_slug.'/') !== false){

                    $basePosition = 2;

                    $cat = get_term_by( 'slug', get_query_var('product_cat'), 'product_cat' );
                    $categories = array();
                    if($cat){
                        $categories = get_ancestors($cat->term_id, 'product_cat');
                        $categories = array_reverse($categories);
                        $categories[] = $cat->term_id;
                    }

                    $request_data = woof()->get_request_data();

                    if(!empty($categories) || is_filter_page_indexable($request_data) || $_SERVER['REQUEST_URI'] !== '/shop/'){
                        echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . home_url('/shop/') . '">' . $catalogPageTitle . '</a><meta itemprop="position" content="2"><meta itemprop="name" content="' . $catalogPageTitle . '"></span>';
//                        if(strpos($_SERVER['REQUEST_URI'], '/shop/options/') !== 0){
                            echo '<span class="divider"> / </span>';
//                        }
                    } else {
                        echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>' . $catalogPageTitle . '</span><meta itemprop="item" content="'. site_url('/shop/').'"><meta itemprop="position" content="2"><meta itemprop="name" content="' . $catalogPageTitle . '"></span><span class="divider"> / </span>';
                    }
                    foreach ($categories as $index => $category_id) {
                        $category = get_term($category_id, 'product_cat');
                        if ($category && !is_wp_error($category)) {
                            if ($index + 1 == count($categories) && !is_filter_page_indexable($request_data)) {
                                echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>' . $category->name . '</span><meta itemprop="item" content="' . get_term_link($category) . '"/><meta itemprop="position" content="' . ($basePosition + $index + 1) . '"><meta itemprop="name" content="' . $category->name . '"></span>';
                            } else {
                                echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . get_term_link($category) . '">' . $category->name . '</a><meta itemprop="position" content="' . ($basePosition + $index + 1) . '"><meta itemprop="name" content="' . $category->name . '"></span><span class="divider"> / </span>';
                            }
                        }
                    }
                    $basePosition += count($categories);
//                    if(is_filter_page_indexable($request_data)){
                        if(isset($request_data[$search_slug])){
                            unset($request_data[$search_slug]);
                        }
//                        if(isset($request_data['stock'])){
//                            unset($request_data['stock']);
//                        }
//                        if(isset($request_data['pa_new-in'])){
//                            unset($request_data['pa_new-in']);
//                        }

                        $filter_selected = get_taxonomy(key($request_data));
                        if(!empty($filter_selected)){
                            $option_selected = get_term_by('slug', $request_data[$filter_selected->name], $filter_selected->name)->name;

                            echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>' . $filter_selected->labels->singular_name . ($filter_selected->labels->singular_name != $option_selected ? ' ' . $option_selected : '') . '</span><meta itemprop="item" content="' . site_url().$_SERVER['REQUEST_URI'] . '"/><meta itemprop="position" content="' . ($basePosition + 1) . '"><meta itemprop="name" content="' . $filter_selected->labels->singular_name . ' ' . $option_selected . '"></span>';
                        }elseif(isset($request_data['stock'])){
                            echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>In stock</span><meta itemprop="item" content="' . site_url().$_SERVER['REQUEST_URI'] . '"/><meta itemprop="position" content="' . ($basePosition + 1) . '"><meta itemprop="name" content="In stock"></span>';
                        }
//                    }  else {
                        //echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>' . $catalogPageTitle . '</span><meta itemprop="item" content="'. site_url('/shop/').'"><meta itemprop="position" content="2"><meta itemprop="name" content="' . $catalogPageTitle . '"></span>';
//                    }
                } else {
                    echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>' . $catalogPageTitle . '</span><meta itemprop="item" content="'. site_url('/shop/').'"><meta itemprop="position" content="2"><meta itemprop="name" content="' . $catalogPageTitle . '"></span>';
                }
            } else if (is_product_category()) {
                echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . home_url('/shop/') . '">' . $catalogPageTitle . '</a><meta itemprop="position" content="2"><meta itemprop="name" content="' . $catalogPageTitle . '"></span><span class="divider"> / </span>';
                $basePosition = 2;
                $categories = get_ancestors(get_queried_object()->term_id, 'product_cat');
                $categories = array_reverse($categories);
                $categories[] = get_queried_object()->term_id;

                foreach ($categories as $index => $category_id) {
                    $category = get_term($category_id, 'product_cat');
                    if ($category && !is_wp_error($category)) {
                        if ($index + 1 == count($categories)) {
                            echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span>' . $category->name . '</span><meta itemprop="item" content="' . get_term_link($category) . '"/><meta itemprop="position" content="' . ($basePosition + $index + 1) . '"><meta itemprop="name" content="' . $category->name . '"></span>';
                        } else {
                            echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . get_term_link($category) . '">' . $category->name . '</a><meta itemprop="position" content="' . ($basePosition + $index + 1) . '"><meta itemprop="name" content="' . $category->name . '"></span><span class="divider"> / </span>';
                        }
                    }
                }
                $basePosition += count($categories);
            } elseif (is_single()) { // posts
                echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="'.site_url('/blog/').'">Blog</a><meta itemprop="position" content="2"><meta itemprop="name" content="Blog"></span><span class="divider"> / </span>';
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">' . get_the_title() . '<meta itemprop="item" content="' . get_the_permalink() . '"><meta itemprop="name" content="' . get_the_title() . '"><meta itemprop="position" content="3"></span>';

            } elseif (is_category()) { // tag pages
                $tag = get_queried_object();
                echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . site_url('/blog/') . '">Blog</a><meta itemprop="position" content="2"><meta itemprop="name" content="Blog"></span><span class="divider"> / </span>';
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">' . $tag->name . '<meta itemprop="item" content="' . get_tag_link($tag) . '"><meta itemprop="name" content="' . $tag->name . '"><meta itemprop="position" content="3"></span>';
            } elseif (is_page()) { // pages
                $post = get_post();
                $pos = 0;
                global $wp_query;
                $object = $wp_query->get_queried_object();
                $parent_id = $object->post_parent;
                $depth = 0;
                while ($parent_id > 0) {
                    $page = get_page($parent_id);
                    $parent_id = $page->post_parent;
                    $depth++;
                }

                if ($post->post_parent) {
                    $parent_id = $post->post_parent;
                    $breadcrumbs = array();

                    while ($parent_id) {
                        $pos++;
                        $page = get_post($parent_id);
                        $screen_1 = get_field('screen_1', $page->ID);
                        $screen_1_title = isset($screen_1['screen_1_title']) ? $screen_1['screen_1_title'] : '';
                        $crumb_title = !empty($screen_1_title) ? $screen_1_title : get_the_title($page->ID);

                        $breadcrumbs[] = '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . get_permalink($page->ID) . '">' . $crumb_title . '</a><meta itemprop="name" content="' . $crumb_title . '"><meta itemprop="position" content="' . ($depth + 2 - $pos) . '"></span><span class="divider"> / </span>';
                        $parent_id = $page->post_parent;
                    }

                    $breadcrumbs = array_reverse($breadcrumbs);

                    foreach ($breadcrumbs as $crumb) {
                        echo $crumb;
                    }
                }

                $screen_1 = get_field('screen_1', $post->ID);
                $screen_1_title = isset($screen_1['screen_1_title']) ? $screen_1['screen_1_title'] : '';
                $page_title = !empty($screen_1_title) ? $screen_1_title : get_the_title();
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">' . $page_title . '<meta itemprop="item" content="' . get_the_permalink() . '"><meta itemprop="name" content="' . $page_title . '"><meta itemprop="position" content="' . ($depth + 2) . '"></span>';
            } elseif (is_404()) { // 404 page
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">404<meta itemprop="name" content="404"/><meta itemprop="position" content="2"/></span>';
            } elseif (is_search()) { // search results
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">Search results<meta itemprop="item" content="' . site_url('/') . '?s='.$_GET['s'].'&post_type=product"><meta itemprop="name" content="Search results"><meta itemprop="position" content="2"></span>';
            }

            echo '</div>';
        } else {
            echo '<div itemscope="" itemtype="http://schema.org/BreadcrumbList" class="breadcrumbs"><span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="'.site_url('/').'">'.$HomePageTitle.'</a><meta itemprop="name" content="'.$HomePageTitle.'"><meta itemprop="position" content="1"></span><span class="divider"> / </span>';
            $pageNum = (get_query_var('paged')) ? get_query_var('paged') : 1;
            if ($pageNum > 1) {
                echo '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="' . get_post_type_archive_link('post') . '">Blog</a><meta itemprop="name" content="Blog"><meta itemprop="position" content="2"></span><span class="divider"> / </span>';
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">Page<meta itemprop="item" content="' . get_post_type_archive_link('post') . 'page/' . $pageNum . '/"><meta itemprop="name" content="Page ' . $pageNum . '"><meta itemprop="position" content="3"> ' . $pageNum . '</span>';
            } else {
                echo '<span class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">Blog<meta itemprop="item" content="' . get_post_type_archive_link('post') . '"><meta itemprop="name" content="Blog"><meta itemprop="position" content="2"></span>';
            }

            echo '</div>';
        }
    }
}


if(!function_exists('woocommerce_template_loop_product_title')){

    /**
     * Show the product title in the product loop. By default this is an H2.
     */
    function woocommerce_template_loop_product_title(){
        global $product;
        echo '<div class="product-item__title ' . esc_attr( apply_filters( 'woocommerce_product_loop_title_classes', 'woocommerce-loop-product__title' ) ) . '">' . $product->get_name() . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
}

add_action('woocommerce_before_shop_loop', function () {
    ?>
<div class="catalog-main<?=is_product_search() ? ' search-results__main' : ''?>">
<div class="container">
    <div class="catalog-main__wrapper">
        <?php
        /**
         * Hook: woocommerce_sidebar.
         *
         * @hooked woocommerce_get_sidebar - 10
         */
        do_action( 'woocommerce_sidebar' );
        ?>
        <div class="catalog-main__container">
            <div class="catalog-top__bar">
                <?php if(empty($_GET['woof_text'])) { ?>
                <div class="catalog-products__filters-btn">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.5 6.5H3.5" stroke="black" stroke-linecap="round"></path>
                            <path d="M16.5 13.5H3.5" stroke="black" stroke-linecap="round"></path>
                            <path d="M13 15.5C14.1046 15.5 15 14.6046 15 13.5C15 12.3954 14.1046 11.5 13 11.5C11.8954 11.5 11 12.3954 11 13.5C11 14.6046 11.8954 15.5 13 15.5Z" fill="#F9F5F2" stroke="black"></path>
                            <path d="M7 8.5C8.10457 8.5 9 7.60457 9 6.5C9 5.39543 8.10457 4.5 7 4.5C5.89543 4.5 5 5.39543 5 6.5C5 7.60457 5.89543 8.5 7 8.5Z" fill="#F9F5F2" stroke="black"></path>
                        </svg>
                    </i>
                    <span>Filters <span class="catalog-filters__count"></span></span>
                </div>
                <?php }
}, 5);

add_action('woocommerce_before_shop_loop', function () {
    ?>
        </div>
    <?php
}, 50);

add_action('woocommerce_after_shop_loop', function () {
    $current_cat = get_queried_object();
    if ($current_cat && property_exists($current_cat, 'taxonomy') && $current_cat->taxonomy == 'product_cat') {
        $seo_text = get_field('seo_text', $current_cat);

        if (!empty($seo_text)): ?>
            <div class="txt-wrapper">
                <?= $seo_text; ?>
            </div>
        <?php endif;
    }
    ?>
                </div>
            </div>
        </div>
        <?php if (!is_search() && empty($_GET['woof_text'])) { ?>
        <div class="catalog-filters__fixed-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                <path d="M13.6752 3.17505H1.3252" stroke="white" stroke-linecap="round"></path>
                <path d="M13.6752 9.82495H1.3252" stroke="white" stroke-linecap="round"></path>
                <path d="M10.3502 11.725C11.3995 11.725 12.2502 10.8744 12.2502 9.82505C12.2502 8.77571 11.3995 7.92505 10.3502 7.92505C9.30085 7.92505 8.4502 8.77571 8.4502 9.82505C8.4502 10.8744 9.30085 11.725 10.3502 11.725Z" fill="#191919" stroke="white"></path>
                <path d="M4.65 5.0749C5.69934 5.0749 6.55 4.22424 6.55 3.1749C6.55 2.12556 5.69934 1.2749 4.65 1.2749C3.60066 1.2749 2.75 2.12556 2.75 3.1749C2.75 4.22424 3.60066 5.0749 4.65 5.0749Z" fill="#191919" stroke="white"></path>
            </svg>
            <span>Filters</span>
            <small></small>
        </div>
        <?php } ?>
    </div>
    <?php
}, 11);

add_filter('woocommerce_dropdown_variation_attribute_options_html', function($html, $args){
    $options               = $args['options'];
    $product               = $args['product'];
    $attribute             = $args['attribute'];
    $name                  = $args['name'] ? $args['name'] : 'attribute_' . sanitize_title( $attribute );
    $id                    = $args['id'] ? $args['id'] : sanitize_title( $attribute );
    $class                 = $args['class'];
    $required              = (bool) $args['required'];
    $show_option_none      = (bool) $args['show_option_none'];
    $show_option_none_text = $args['show_option_none'] ? $args['show_option_none'] : __( 'Choose an option', 'woocommerce' ); // We'll do our best to hide the placeholder, but we'll need to show something when resetting options.

    if ( empty( $options ) && ! empty( $product ) && ! empty( $attribute ) ) {
        $attributes = $product->get_variation_attributes();
        $options    = $attributes[ $attribute ];
    }

    $html  = '<select id="' . esc_attr( $id ) . '" class="' . esc_attr( $class ) . '" name="' . esc_attr( $name ) . '" data-attribute_name="attribute_' . esc_attr( sanitize_title( $attribute ) ) . '" data-show_option_none="' . ( $show_option_none ? 'yes' : 'no' ) . '"' . ( $required ? ' required' : '' ) . '>';
    $html .= '<option disabled'.(false === $args['selected'] ? ' selected' : '').' value="">' . esc_html( $show_option_none_text ) . '</option>';

    if ( ! empty( $options ) ) {
        if ( $product && taxonomy_exists( $attribute ) ) {
            // Get terms if this is a taxonomy - ordered. We need the names too.
            $terms = wc_get_product_terms(
                $product->get_id(),
                $attribute,
                array(
                    'fields' => 'all',
                )
            );

            foreach ( $terms as $term ) {
                if ( in_array( $term->slug, $options, true ) ) {
                    $html .= '<option value="' . esc_attr( $term->slug ) . '"'.(isset($args['colors']) && isset($args['colors'][$term->slug]) ? ' data-color="'.$args['colors'][$term->slug].'"' : '').' ' . selected( sanitize_title( $args['selected'] ), $term->slug, false ) . '>' . esc_html( apply_filters( 'woocommerce_variation_option_name', $term->name, $term, $attribute, $product ) ) . '</option>';
                }
            }
        } else {
            foreach ( $options as $option ) {
                // This handles < 2.4.0 bw compatibility where text attributes were not sanitized.
                $selected = sanitize_title( $args['selected'] ) === $args['selected'] ? selected( $args['selected'], sanitize_title( $option ), false ) : selected( $args['selected'], $option, false );
                $html    .= '<option value="' . esc_attr( $option ) . '" ' . $selected . '>' . esc_html( apply_filters( 'woocommerce_variation_option_name', $option, null, $attribute, $product ) ) . '</option>';
            }
        }
    }

    $html .= '</select>';

    return $html;
}, 10, 2);

remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 20 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation', 10 );

add_action( 'woocommerce_after_single_product', 'woocommerce_output_related_products', 10 );

add_action( 'woocommerce_single_variation', function(){
    echo '<div class="product-buttons">';
}, 30 );
add_action( 'woocommerce_single_variation', 'woocommerce_template_single_price', 31 );
add_action( 'woocommerce_single_variation', function(){
    global $product;
    $variation_id = milkbed_find_matching_product_variation($product, $product->default_attributes);
    echo((new Coderun\BuyOneClick\Service\Factory\ButtonFactory())->create())->getHtmlOrderButtons(['variationId' => $variation_id]);
    echo '<div class="btn btn-w btn-share">
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
    </div>';
    echo '</div>';
}, 32 );

add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );

function woo_remove_product_tabs($tabs){
    unset($tabs['additional_information']);
    unset($tabs['reviews']);
    return $tabs;
}

function milkbed_find_matching_product_variation( $product, $attributes )
{
    foreach( $attributes as $key => $value )
    {
        if( strpos( $key, 'attribute_' ) === 0 )
        {
            continue;
        }
        unset( $attributes[ $key ] );
        $attributes[ sprintf( 'attribute_%s', $key ) ] = $value;
    }
    if( class_exists('WC_Data_Store') )
    {
        $data_store = WC_Data_Store::load( 'product' );
        return $data_store->find_matching_product_variation( $product, $attributes );
    }
    else
    {
        return $product->get_matching_variation( $attributes );
    }
}

function product_already_exists($product_id, $current_user) {

    global $wpdb;
    if (is_user_logged_in()) {
        $table_name = $wpdb->prefix . 'wt_wishlists';
        $rowcount = $wpdb->get_var("SELECT COUNT(*) FROM $table_name where `product_id` = '$product_id' and `user_id` = '$current_user'");
    }else{
        if(!WC()->session) {
            return;
        }
        $session_id = WC()->session->get('sessionid');
        $table_name = $wpdb->prefix . 'wt_guest_wishlists';
        $rowcount = $wpdb->get_var("SELECT COUNT(*) FROM $table_name where `product_id` = '$product_id' and `session_id` = '$session_id'");
    }

    return $rowcount;
}

function render_webtoffee_wishlist_button($loop = false) {

    global $product, $wt_wishlist_button_style_settings_options, $wt_wishlist_table_settings_options;

    $wt_wishlist_general_settings_options = get_option('wt_wishlist_general_settings');
    $wt_enable_for_loggedin_users = isset($wt_wishlist_general_settings_options['wt_enable_for_loggedin_users']) ? $wt_wishlist_general_settings_options['wt_enable_for_loggedin_users'] : '';

    if(! is_user_logged_in() && ($wt_enable_for_loggedin_users == 1)){
        return;
    }
    $cat_array = isset($wt_wishlist_general_settings_options['wt_enable_product_categories'])? $wt_wishlist_general_settings_options['wt_enable_product_categories']: array('all');
    if(! in_array('all', $cat_array)){

        $product_cats_ids = wc_get_product_term_ids( $product->get_id(), 'product_cat' );
        $cat_name = array();
        foreach( $product_cats_ids as $cat_id ) {
            $term = get_term_by( 'id', $cat_id, 'product_cat' );
            $cat_name[]= strtolower($term->slug);
        }
        if(!array_intersect($cat_name,$cat_array)){
            return;
        }
    }

    if (product_already_exists($product->get_id(), get_current_user_id())) {
        $action        = 'remove';
    } else {
        $action        = 'add';
    }

    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );

    if(isset($wt_wishlist_button_style_settings_options['wt_button_type'])){
        if($loop){
            echo "<div class=\"product-item__fav".($action == 'remove' ? ' active' : '')."\" data-act='add' data-action='" . $action . "' data-product_id='" . $product->get_id() . "' data-user_id='" . get_current_user_id() . "' data-product_name='" . $product->get_name() . "' data-product_link='" . get_permalink($product->get_id()) . "' data-product_image='" . (!empty($image) ? $image[0] : '') . "'>"; ?>
              <span></span>
	            <div></div>
            </div>
            <?php
        }else{
            echo "<div class=\"product-main__fav".($action == 'remove' ? ' active' : '')."\" data-act='add' data-action='" . $action . "' data-product_id='" . $product->get_id() . "' data-user_id='" . get_current_user_id() . "' data-product_name='" . $product->get_name() . "' data-product_link='" . get_permalink($product->get_id()) . "' data-product_image='" . (!empty($image) ? $image[0] : '') . "'>"; ?>
               <div></div>
	            <span></span>
            </div>
            <?php
        }
    }
}

add_action( 'woocommerce_before_single_product_summary', 'render_webtoffee_wishlist_button', 5);

function wishlist_count(){
    global $wpdb;
    $table_name = $wpdb->prefix . 'wt_wishlists';
    $user = get_current_user_id();
    if(is_user_logged_in()){
        $products = $wpdb->get_results("SELECT * FROM `$table_name` where `user_id` = '$user'", ARRAY_A);
    }else{
        $table_name = $wpdb->prefix . 'wt_guest_wishlists';
        $session_id = WC()->session->get('sessionid');
        $products = $wpdb->get_results("SELECT * FROM `$table_name` where `session_id` = '$session_id'", ARRAY_A);
    }

    return count($products);
}

add_action( 'wp_ajax_get_wishlist', 'get_wishlist_callback' );
add_action( 'wp_ajax_nopriv_get_wishlist', 'get_wishlist_callback' );

function get_wishlist_callback(){
    echo do_shortcode('[wt_mywishlist]');
    wp_die();
}

add_filter( 'loop_shop_per_page', 'new_loop_shop_per_page', 20 );

function new_loop_shop_per_page() {
    return 24;
}

function is_product_search() {
    global $wp_query;

    if(!empty($_GET['woof_text'])){
        return true;
    }

    if(!empty($_POST['action']) && $_POST['action'] == 'woof_draw_products'){
        return false;
    }

    if(strpos($_SERVER['REQUEST_URI'], '/'.woof()->get_swoof_search_slug().'/') !== false){
        return false;
    }

    if ( ! isset( $wp_query ) ) {
        _doing_it_wrong( __FUNCTION__, __( 'Conditional query tags do not work before the query is run. Before then, they always return false.' ), '3.1.0' );
        return false;
    }

    return $wp_query->is_search();
}

function get_collections(){
    global $wpdb;

    return get_categories(array(
        'taxonomy' => 'product_cat',
        'hide_empty' => 0,
        'parent' => 0,
        'meta_key' => 'is_collection',
        'meta_value' => 'a:1:{i:0;s:3:"Yes";}',
        'orderby' => 'id'
    ));
}

add_filter('woocommerce_show_variation_price', function(){
   return true;
});

function wrap_menu_link_text_in_span($items) {
    $items = preg_replace_callback(
        '/<a([^>]*)>(.*?)<\/a>/i',
        function($matches) {
            // Оставляем атрибуты ссылки и добавляем <span> вокруг текста
            return '<a' . $matches[1] . '><span>' . $matches[2] . '</span></a>';
        },
        $items
    );
    return $items;
}
add_filter('wp_nav_menu_items', 'wrap_menu_link_text_in_span');

add_filter('get_pagenum_link', function($result, $pagenum){
    global $wp_rewrite;

    $pagenum = (int) $pagenum;
    $request = remove_query_arg( 'paged' );
    $home_root = parse_url( home_url() );
    $home_root = ( isset( $home_root['path'] ) ) ? $home_root['path'] : '';
    $home_root = preg_quote( $home_root, '|' );
    $request = preg_replace( '|^' . $home_root . '|i', '', $request );
    $request = preg_replace( '|^/+|', '', $request );

    if ( ! $wp_rewrite->using_permalinks() || is_admin() && (!is_ajax() || empty($_POST['link']))) {
        $base = trailingslashit( get_bloginfo( 'url' ) );

        if ( $pagenum > 1 ) {
            $result = add_query_arg( 'paged', $pagenum, $base . $request );
        } else {
            $result = $base . $request;
        }
    } else {
        $qs_regex = '|\?.*?$|';
        preg_match( $qs_regex, $request, $qs_match );

        if ( ! empty( $qs_match[0] ) ) {
            $query_string = $qs_match[0];
            $request      = preg_replace( $qs_regex, '', $request );
        } else {
            $query_string = '';
        }

        $request = preg_replace( "|$wp_rewrite->pagination_base/\d+/?$|", '', $request );
        $request = preg_replace( '|^' . preg_quote( $wp_rewrite->index, '|' ) . '|i', '', $request );
        $request = ltrim( $request, '/' );

        $base = trailingslashit( get_bloginfo( 'url' ) );

        if(is_ajax() && !empty($_POST['link'])){
            $path = explode('?', str_replace($base, '', $_POST['link']));
            $request = $path[0];
            if(isset($path[1])){
                $query_string = '?'.$path[1];
            }
        }

        if ( $wp_rewrite->using_index_permalinks() && ( $pagenum > 1 || '' !== $request ) ) {
            $base .= $wp_rewrite->index . '/';
        }

        if ( $pagenum > 1 ) {
            $request = ( ( ! empty( $request ) ) ? trailingslashit( $request ) : $request ) . user_trailingslashit( $wp_rewrite->pagination_base . '/' . $pagenum, 'paged' );
        }

        $result = $base . $request . $query_string;
    }

    return $result;
}, 10, 2);

add_filter('woocommerce_output_related_products_args', function(){
    return array(
        'posts_per_page' => 5,
        'columns'        => 4,
        'orderby'        => 'rand',
    );
});


add_action('init', function () {
    $labels = array(
        'name'               => 'Requests',
        'singular_name'      => 'Request',
        'menu_name'          => 'Requests',
        'name_admin_bar'     => 'Requests',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Request',
        'new_item'           => 'New Request',
        'edit_item'          => 'Edit Request',
        'view_item'          => 'View Request',
        'all_items'          => 'All Requests',
        'search_items'       => 'Search Requests',
        'not_found'          => 'No Requests found',
        'not_found_in_trash' => 'No Requests found in Trash'
    );

    $args = array(
        'labels'    => $labels,
        'public'    => true,
        'show_ui'   => null,
        'supports'  => array('title'),
        'capabilities' => array(
            'create_posts' => false,
        ),
        'query_var' => false,
        'publicly_queryable' => false,
        'exclude_from_search' => true,
        'show_in_nav_menus' => false,
        'map_meta_cap' => true,
        'menu_icon' => 'dashicons-email-alt'
    );

    register_post_type('request', $args);

});

add_action('add_meta_boxes', 'karat_add_custom_box');
function karat_add_custom_box(){
    add_meta_box( 'karat_sectionid', 'Request', 'karat_meta_box_request_callback', 'request' );
}

function karat_meta_box_request_callback( $post, $meta ){
    global $post;
    $request_uploads = json_decode(get_field('request_uploads',   $post->ID));

    echo html_entity_decode($post->post_content);

    if($request_uploads){
        echo '<p><strong>Attachments:</strong></p>';
        foreach($request_uploads as $file){
            echo '<a target="_blank" href="' . $file->url . '">' . $file->name . '</a><br>';
        }
    }

}

add_action( 'pre_get_posts', 'pre_get_posts_callback' );

function pre_get_posts_callback( $query ) {
    if ( ! is_admin() && $query->is_main_query() ) {
        if ( is_search() ) {
            $query->set( 'posts_per_page', 25 );
        }
    }
}


add_filter( 'woocommerce_get_breadcrumb', 'woocommerce_get_breadcrumb_filter', 10, 2 );

function woocommerce_get_breadcrumb_filter( $crumbs, $that ){
    if(is_product()) {
        array_splice( $crumbs, 1, 0, [array('All Jewelry', home_url('/shop/'))] );
    }
    return $crumbs;
}

add_filter( 'wpseo_sitemap_exclude_taxonomy', 'wpseo_sitemap_exclude_taxonomy_filter', 10, 2 );

function wpseo_sitemap_exclude_taxonomy_filter( $exclude, $taxonomy_name ){
    return  strpos($taxonomy_name, 'pa_') === 0;
}

add_filter('woof_seo_do_index', function($do_index, $curr_url, $request_data){
    if(!get_option('blog_public')){
        return false;
    }

    return is_filter_page_indexable($request_data);
}, 10, 3);

function is_filter_page_indexable($request_data){

    $search_slug = woof()->get_swoof_search_slug();
    if(isset($request_data[$search_slug])){
        unset($request_data[$search_slug]);
    }

    return !(count($request_data) > 1 || isset($request_data['stock']) || isset($request_data['pa_new-in']) || isset($request_data['pa_size']) || isset($request_data['pa_length-mm']) || isset($request_data['pa_bestsellers']) || isset($request_data['pa_sales']) || (count($request_data) == 1 && count(explode(',', current($request_data))) > 1));
}

add_filter( 'woocommerce_breadcrumb_defaults', 'wcc_change_breadcrumb_home_text' );
function wcc_change_breadcrumb_home_text( $defaults ) {
    $defaults['home'] = 'Jewelry Store in NY';
    return $defaults;
}

add_action('init', function(){
    if(strpos($_SERVER['REQUEST_URI'], '/feed/') !== false){
        status_header( '404' );
        locate_template( array ( '404.php', 'index.php ' ), TRUE, TRUE );
        exit;
    }
}, 10);

add_filter('post_comments_feed_link', '__return_null');

remove_action( 'wp_head', 'feed_links_extra', 3);

add_filter('wpseo_robots', 'wpseo_robots_filter', 10, 2);
function wpseo_robots_filter( $robots, $presentation ){
    if(!empty($_GET)){
        $robots = 'noindex, nofollow';
    }
    return $robots;
}

add_filter( 'wpseo_title', 'wpseo_title_callback', 10, 2 );
function wpseo_title_callback( $title, $presentation) {
    if(is_product()){
        global $product;
        $title = $product->get_name() . ' buy online - The Karat Shop';
    }
    if(is_product_category()){
        $cat = get_queried_object();
        $title = $cat->name . ' buy in online jewelry store - The Karat Shop';
    }

    return  $title;
}

add_filter( 'wpseo_metadesc', 'wpseo_descr_callback' );
function wpseo_descr_callback( $description ) {
    if(is_product()){
        global $product;
        $description = $product->get_name() . ' at the best price ✔️ Product in stock ✔️ Delivery service!';
    }
    return $description;
}

function remove_product_structured_data( $types ) {
    return array();
}
add_filter( 'woocommerce_structured_data_breadcrumblist', 'remove_product_structured_data' );

function ea_acf_options_page() {
    acf_add_options_page('Mails settings');
}
add_action('init', 'ea_acf_options_page');

add_filter('wpseo_canonical', function($canonical){
    global $wp_query;

    if(strpos($_SERVER['REQUEST_URI'], '/options/') !== false){
        $canonical = home_url().(!empty($wp_query->query['paged']) ? str_replace('/page/'.$wp_query->query['paged'], '', $_SERVER['REQUEST_URI']) : $_SERVER['REQUEST_URI']);
    }elseif(!empty($wp_query->query['paged']) && $wp_query->query['paged'] > 1){
        $canonical = home_url().str_replace('/page/'.$wp_query->query['paged'], '', $_SERVER['REQUEST_URI']);
    }elseif(!empty($_GET['orderby'])){
        $canonical = home_url(rtrim(str_replace('orderby='.$_GET['orderby'], '', $_SERVER['REQUEST_URI']), '?'));
    }else{
        $canonical = home_url().$_SERVER['REQUEST_URI'];
    }

    return $canonical;
}, 100);

function add_image_to_opengraph_tags( $image_container ) {
    $image = get_template_directory_uri() . '/images/opengraph_default.png';
    if(is_single()){
        global $post;
        $image = get_the_post_thumbnail_url($post->ID);
    }
    if(empty($image_container->get_images())){
        $image_container->add_image( $image );
    }
}
add_filter( 'wpseo_add_opengraph_images', 'add_image_to_opengraph_tags' );

function add_image_to_twitter_tags( $image ) {
    if(is_single()){
        global $post;
        $image = get_the_post_thumbnail_url($post->ID);
    }
    if(empty($image)){
        $image = get_template_directory_uri() . '/images/twitter_default.png';
    }
    return $image;
}
add_filter( 'wpseo_twitter_image', 'add_image_to_twitter_tags' );

add_filter('wpseo_opengraph_url', function($open_graph_url, $presentation){
    if($open_graph_url == 'https://www.karatshop.com/?page_id=49'){
        $open_graph_url = 'https://www.karatshop.com/shop/';
    }
    return $open_graph_url;
}, 10, 2);

add_filter('wpseo_prev_rel_link', function($output){
    if($output == '<link rel="prev" href="https://www.karatshop.com/?page_id=49">'){
        $output = '<link rel="prev" href="https://www.karatshop.com/shop/">';
    }
    return $output;
}, 10);

add_filter( 'wpseo_opengraph_title', 'wpseo_opengraphtwitter_title_filter', 10, 2 );
add_filter( 'wpseo_twitter_title', 'wpseo_opengraphtwitter_title_filter', 10, 2 );

function wpseo_opengraphtwitter_title_filter( $title, $presentation ){
    if(is_product()){
        global $product;
        $title = $product->get_name() . ' buy online - The Karat Shop';
    }
    if(is_product_category()){
        $cat = get_queried_object();
        $title = $cat->name . ' buy in online jewelry store - The Karat Shop';
    }
    if(is_shop()){
        $cat = get_term_by( 'slug',get_query_var('product_cat'), 'product_cat' );
        if (strpos($_SERVER['REQUEST_URI'], '/'.woof()->get_swoof_search_slug().'/') !== false && $cat){
            $title = $cat->name . ' buy in online jewelry store - The Karat Shop';
        } else {
            $title = 'Store jewelry catalog - The Karat Shop';
        }
    }

    return $title;
}

add_filter( 'wpseo_opengraph_desc', 'wpseo_opengraphtwitter_desc_filter', 10, 2 );
add_filter( 'wpseo_twitter_description', 'wpseo_opengraphtwitter_desc_filter', 10, 2 );

function wpseo_opengraphtwitter_desc_filter( $description, $presentation ){

    if(is_product()){
        global $product;
        $description = $product->get_name() . ' at the best price ✔️ Product in stock ✔️ Delivery service!';
    }
    if(is_product_category()){
        $cat = get_queried_object();
        $description = $cat->name . ' at the best price ✔️ Only we have the best prices ✔️ We guarantee the quality of our products, see for yourself!';
    }
    if(is_shop()){
        $cat = get_term_by( 'slug',get_query_var('product_cat'), 'product_cat' );
        if (strpos($_SERVER['REQUEST_URI'], '/'.woof()->get_swoof_search_slug().'/') !== false && $cat){
            $description = $cat->name . ' at the best price ✔️ Only we have the best prices ✔️ We guarantee the quality of our products, see for yourself!';
        } else {
            $description = 'List of jewelry from a jewelry store in New York. Selling jewelry at a good price, come in and choose!';
        }
    }

    return $description;
}


add_image_size('post_thumb_m', 571, 360, true);
add_image_size('post_thumb_d', 1140, 720, true);
add_image_size('page_about', 600, 690, true);
add_image_size('page_about_1_d', 1340, 740, true);
add_image_size('page_about_2', 940, 740, true);
add_image_size('page_team_m', 630, 500, true);
add_image_size('page_team_d', 1340, 850, true);
add_image_size('product_cat_image', 164, 178, true);
add_image_size('main_banner', 2560, 1244, true);
add_image_size('main_banner_m', 750, 1390, true);
add_image_size('main_about', 540, 680, true);
add_image_size('main_collections', 750, 760, true);
add_image_size('main_collection', 490, 360, true);
add_image_size('main_shop', 816, 814, true);
add_image_size('main_shop_bottom', 1040, 320, true);
add_image_size('main_faq1', 740, 940, true);
add_image_size('main_faq2', 520, 540, true);

add_action('wp_head', function(){
    $image = '';

    if(is_front_page()){
        if(!wp_is_mobile()){
            global $post;
            $main_screen = get_field('main_screen', $post->ID);
            $image = wp_get_attachment_image_src( $main_screen['background_picture']['desktop']['ID'], 'main_banner', false );
        }else{
            global $post;
            $main_screen = get_field('main_screen', $post->ID);
            $image = wp_get_attachment_image_src( $main_screen['background_picture']['mobile']['ID'], 'main_banner_m', false );
        }
    } elseif(is_product()){
        global $product;
        if(!empty($product) && is_object($product)){
            $attachment_id = $product->get_image_id();
            $image_size = apply_filters( 'woocommerce_gallery_image_size', 'woocommerce_single' );
            $image = wp_get_attachment_image_src( $attachment_id, $image_size, false );
        }
    } elseif (is_home()){
        global $wp_query;
        $image_size = wp_is_mobile() ? 'post_thumb_m' : 'post_thumb_d';
        $image = wp_get_attachment_image_src(get_post_thumbnail_id($wp_query->get_posts()[0]->ID), $image_size);
    } elseif(is_single()){
        global $post;
        $image_size = wp_is_mobile() ? 'post_thumb_m' : 'post_thumb_d';
        $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), $image_size);
    } elseif(get_page_template_slug() == 'page-about.php'){
        global $post;
        if(wp_is_mobile()){
            $image = wp_get_attachment_image_src(get_field('main', $post->ID)['image']['ID'], 'page_about');
        } else{
            $image = wp_get_attachment_image_src(get_field('pictures', $post->ID)['picture_1']['ID'], 'page_about_1_d');
        }
    }
    elseif(get_page_template_slug() == 'page-team.php'){
        global $post;
        if(wp_is_mobile()){
            $image = wp_get_attachment_image_src(get_field('picture', $post->ID)['picture_desktop']['ID'], 'page_team_d');
        } else{
            $image = wp_get_attachment_image_src(get_field('picture', $post->ID)['picture_mobile']['ID'], 'page_team_m');
        }
    }
    elseif(get_page_template_slug() == 'page-contacts.php'){
        global $post;
        if(!wp_is_mobile()){
            $image = wp_get_attachment_image_src(get_field('pictures', $post->ID)['picture_2']['ID'], 'page_about');
        }
    }
    elseif(get_page_template_slug() == 'page-faq.php'){
        global $post;
        $image = wp_get_attachment_image_src(get_field('picture', $post->ID)['ID'], 'page_about');
    }

    if($image){
        ?>
        <link rel="preload" fetchpriority="high" as="image" href="<?=$image[0]?>">
        <?php
    }
});

function start_output_buffering() {
    ob_start('filter_output_buffer');
}
add_action('template_redirect', 'start_output_buffering');
function filter_output_buffer($buffer) {
    $buffer = str_replace(' />', '>', $buffer);
    $buffer = str_replace('"/><', '"><', $buffer);
    $buffer = preg_replace('/\s*type=(["\'])text\/css\1/', '', $buffer);
    $buffer = preg_replace('/<script\b([^>]*?)\s*type=("|\')text\/javascript("|\')([^>]*)>/i', '<script$1$4>', $buffer);
    return $buffer;
}

function is_lighthouse(){
    return !(!isset($_SERVER['HTTP_USER_AGENT']) || strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome-Lighthouse') === false);
}

add_action('wp_footer', function () {
    wp_dequeue_style('core-block-supports');
});

function wc_dropdown_variation_attribute_options( $args = array() ) {
    $args = wp_parse_args(
        apply_filters( 'woocommerce_dropdown_variation_attribute_options_args', $args ),
        array(
            'options'          => false,
            'attribute'        => false,
            'product'          => false,
            'selected'         => false,
            'required'         => false,
            'name'             => '',
            'id'               => '',
            'class'            => '',
            'show_option_none' => __( 'Choose an option', 'woocommerce' ),
        )
    );

    // Get selected value.
    if ( false === $args['selected'] && $args['attribute'] && $args['product'] instanceof WC_Product ) {
        $selected_key = 'attribute_' . sanitize_title( $args['attribute'] );
        // phpcs:disable WordPress.Security.NonceVerification.Recommended
//        $args['selected'] = isset( $_REQUEST[ $selected_key ] ) ? wc_clean( wp_unslash( $_REQUEST[ $selected_key ] ) ) : $args['product']->get_variation_default_attribute( $args['attribute'] );
        // phpcs:enable WordPress.Security.NonceVerification.Recommended
    }

    $options               = $args['options'];
    $product               = $args['product'];
    $attribute             = $args['attribute'];
    $name                  = $args['name'] ? $args['name'] : 'attribute_' . sanitize_title( $attribute );
    $id                    = $args['id'] ? $args['id'] : sanitize_title( $attribute );
    $class                 = $args['class'];
    $required              = (bool) $args['required'];
    $show_option_none      = (bool) $args['show_option_none'];
    $show_option_none_text = $args['show_option_none'] ? $args['show_option_none'] : __( 'Choose an option', 'woocommerce' ); // We'll do our best to hide the placeholder, but we'll need to show something when resetting options.

    if ( empty( $options ) && ! empty( $product ) && ! empty( $attribute ) ) {
        $attributes = $product->get_variation_attributes();
        $options    = $attributes[ $attribute ];
    }

    $html  = '<select id="' . esc_attr( $id ) . '" class="' . esc_attr( $class ) . '" name="' . esc_attr( $name ) . '" data-attribute_name="attribute_' . esc_attr( sanitize_title( $attribute ) ) . '" data-show_option_none="' . ( $show_option_none ? 'yes' : 'no' ) . '"' . ( $required ? ' required' : '' ) . '>';
    $html .= '<option value="">' . esc_html( $show_option_none_text ) . '</option>';

    if ( ! empty( $options ) ) {
        if ( $product && taxonomy_exists( $attribute ) ) {
            // Get terms if this is a taxonomy - ordered. We need the names too.
            $terms = wc_get_product_terms(
                $product->get_id(),
                $attribute,
                array(
                    'fields' => 'all',
                )
            );

            foreach ( $terms as $term ) {
                if ( in_array( $term->slug, $options, true ) ) {
                    $html .= '<option value="' . esc_attr( $term->slug ) . '" ' . selected( sanitize_title( $args['selected'] ), $term->slug, false ) . '>' . esc_html( apply_filters( 'woocommerce_variation_option_name', $term->name, $term, $attribute, $product ) ) . '</option>';
                }
            }
        } else {
            foreach ( $options as $option ) {
                // This handles < 2.4.0 bw compatibility where text attributes were not sanitized.
                $selected = sanitize_title( $args['selected'] ) === $args['selected'] ? selected( $args['selected'], sanitize_title( $option ), false ) : selected( $args['selected'], $option, false );
                $html    .= '<option value="' . esc_attr( $option ) . '" ' . $selected . '>' . esc_html( apply_filters( 'woocommerce_variation_option_name', $option, null, $attribute, $product ) ) . '</option>';
            }
        }
    }

    $html .= '</select>';

    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    echo apply_filters( 'woocommerce_dropdown_variation_attribute_options_html', $html, $args );
}

add_action('wp_ajax_get_wishkist_share_link', 'get_wishkist_share_link_callback');
add_action('wp_ajax_nopriv_get_wishkist_share_link', 'get_wishkist_share_link_callback');

function get_wishkist_share_link_callback(){
    echo home_url('/wishlist/') . '?key=' . (get_current_user_id() ? get_current_user_id() : WC()->session->get('sessionid'));
    wp_die();
}

add_action('init', function () {
    if (isset($_GET['post']) && in_array(get_page_template_slug($_GET['post']), array(
            'page-contacts.php',
            'page-home.php',
            'page-team.php',
            'page-reviews.php',
            'page-faq.php',
        ))) {
        remove_post_type_support('page', 'editor');
    }
});


add_filter('woof_init_archive_by_default', function($is) {
    return false;
}, 99, 1);
