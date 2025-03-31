<?php /* Template Name: Home */ ?>

<?php get_header(); ?>

<main class="main">
    <?php $main_screen = get_field('main_screen'); ?>
    <?php $background_picture = $main_screen['background_picture'] ?>
    <?php if (!empty($main_screen)): ?>
        <div class="section main-section">
            <?php if (!empty($background_picture['desktop']['url'])):
                $main_banner_desktop = wp_get_attachment_image_src( $main_screen['background_picture']['desktop']['ID'], 'main_banner', false );
                $main_banner_mobile = wp_get_attachment_image_src( $main_screen['background_picture']['mobile']['ID'], 'main_banner_m', false );
            ?>
                <div class="main-section__bg" itemscope itemtype="https://schema.org/ImageObject">
                    <picture>
                        <source srcset="<?= $main_banner_mobile[0] ?>" media="(max-width: 575px)">
                        <source srcset="<?= $background_picture['tablet']['url'] ?>" media="(max-width: 991px)">
                        <img itemprop="contentUrl" src="<?= $main_banner_desktop[0] ?>"
                             alt="<?= $main_screen['title'] ?>" title="<?= $main_screen['title'] ?>" fetchpriority="high" width="<?= $main_banner_desktop[1] ?>" height="<?= $main_banner_desktop[2] ?>">
                    </picture>
                    <meta content="<?= $main_banner_desktop[1] ?>" itemprop="width">
                    <meta content="<?= $main_banner_desktop[2] ?>" itemprop="height">
                </div>
            <?php endif; ?>
            <div class="container">
                <div class="row">
                    <div class="col-lg-6"></div>
                    <div class="col-lg-6">
                        <div class="main-section__inner">
                            <div class="main-section__pretitle"><?= $main_screen['pretitle'] ?></div>
                            <h1 class="main-section__title"><?= $main_screen['title'] ?></h1>
                            <?php if (!empty($main_screen['batton_link'])): ?>
                                <a href="<?= $main_screen['batton_link'] ?>" class="btn">
							<span><?= $main_screen['batton_text'] ?>
                                <svg width="4" height="8" viewBox="0 0 4 8" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
									<path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
								</svg>
							</span>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <?php $collection = get_field('collection'); ?>
    <?php $categories = get_categories(array(
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'parent' => 0
    )); ?>
    <?php if (!empty($collection)): ?>
        <div class="section collection-section">
            <div class="container">
                <h2 class="collection-section__title"><?= $collection['title'] ?></h2>
                <div class="collection-list">
                    <?php foreach($categories as $i => $category){ ?>
                        <?php if(empty(get_term_meta($category->term_id, 'is_collection', true))){ ?>
                            <?php $thumbnail = wp_get_attachment_url(get_term_meta($category->term_id, 'thumbnail_id', true)); ?>
                            <?php if(!empty($thumbnail)){ ?>
                                <a href="/product-category/<?=$category->slug?>/" class="collection-item">
                                    <div class="collection-item__pic" itemscope itemtype="https://schema.org/ImageObject">
                                        <?php $thumbnail_image = wp_get_attachment_image_src(get_term_meta($category->term_id, 'thumbnail_id', true), 'product_cat_image');?>
                                        <img itemprop="contentUrl" src="<?=$thumbnail?>" loading="lazy" alt="Jewellery Collection <?=$category->name?>" title="Jewellery Collection <?=$category->name?>" width="<?php echo $thumbnail_image[1] ?>" height="<?php echo $thumbnail_image[2] ?>">
                                        <meta content="<?php echo $thumbnail_image[1] ?>" itemprop="width">
                                        <meta content="<?php echo $thumbnail_image[2] ?>" itemprop="height">
                                    </div>
                                    <h3 class="collection-item__title"><?=$category->name?></h3>
                                </a>
                            <?php } ?>
                        <?php } ?>
                    <?php } ?>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <?php $about_us = get_field('about_us'); ?>
    <?php $video = $about_us['video'] ?>
    <?php if (!empty($about_us)): ?>
        <div class="section about-section">
            <div class="about-section__bg-text"><?= $about_us['pretitle'] ?></div>
            <div class="container">
                <h2 class="about-section__title"><?= $about_us['title'] ?></h2>
                <div class="about-section__inner">
                    <div class="about-section__text">
                        <?= $about_us['text'] ?>
                    </div>
                </div>
            </div>
            <div class="about-section__wrapper">
                <div class="container">

                    <?php if (!empty($video['small_picture']['url'])):
                        $small_picture = wp_get_attachment_image_src($video['small_picture']['ID'], 'main_about'); ?>
                        <div class="about-section__pic">
                            <div class="about-section__pic-inner" itemscope itemtype="https://schema.org/ImageObject">
                                <img itemprop="contentUrl" src="<?= $small_picture[0] ?>" loading="lazy" alt="Jewelry store in Huntington" title="Jewelry store in Huntington" width="<?php echo $small_picture[1]; ?>" height="<?php echo $small_picture[2]; ?>">
                                <meta content="<?php echo $small_picture[1]; ?>" itemprop="width">
                                <meta content="<?php echo $small_picture[2]; ?>" itemprop="height">
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
                <?php if (!empty($video['video_link'])): ?>
                    <div class="about-section__video">
	                    <video muted loop autoplay playsinline aria-hidden="true"><source src="<?= $video['video_link'] ?>" type="video/mp4"></video>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>

    <?php $novelties = get_field('novelties'); ?>
    <?php $products = new WP_Query(array(
        'post_type'      => array('product'),
        'post_status'    => 'publish',
        'posts_per_page' => 16,
        'tax_query'      => array(array(
            'taxonomy'        => 'pa_new-in',
            'field'           => 'slug',
            'terms'           =>  array('new-in'),
            'operator'        => 'IN',
        ))
    ));
    ?>
    <?php if (!empty($novelties) && $products->have_posts()): ?>
        <div class="section related-section">
            <div class="container">
                <div class="related-slider__top">
                    <h2 class="related-slider__title"><?= $novelties['title'] ?></h2>
                    <div class="related-slider__nav">
                        <div class="related-slider__arrow related-prev">
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z"
                                      fill="#191919"/>
                                <line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"/>
                            </svg>
                        </div>
                        <span>
                            <svg width="17" height="23" viewBox="0 0 17 23" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995"
                                      stroke="#191919"/>
                            </svg>
                        </span>
                        <div class="related-slider__arrow related-next">
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"/>
                                <line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="related-slider__wrapper">
                    <div class="related-slider">
                        <?php while($products->have_posts()){
                            $products->the_post();
                            $post_object = get_post(get_the_ID());

                            setup_postdata( $GLOBALS['post'] =& $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found

                            wc_get_template_part( 'content', 'product-slide' );
                        ?>
                        <?php } wp_reset_postdata(); ?>
                    </div>
	                <div class="related-progress-wrapper">
		                <div class="related-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progressbar"></div>
	                </div>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <?php $collections = get_field('collections'); ?>
    <?php $all_collections = $collections ? $collections['all_collections'] : null ?>
    <?php $collections_list = $collections ? $collections['collections_list'] : null ?>
    <?php if (!empty($collections)): ?>
        <div class="section collections-section">
            <div class="container">
                <h2 class="collections-section__title"><?= $collections['title'] ?></h2>
                <div class="collections-section__wrapper">
                    <?php if (!empty($all_collections)):
                        $all_collections_img = wp_get_attachment_image_src( $all_collections['picture']['ID'], 'main_collections', false );?>
                        <div class="collections-all">
                            <a href="<?= $all_collections['batton_link'] ?>">
                                <div itemscope itemtype="https://schema.org/ImageObject">
                                    <img itemprop="contentUrl" src="<?= $all_collections_img[0] ?>" loading="lazy"
                                         alt="All Collections" title="All Collections" width="<?= $all_collections_img[1] ?>" height="<?= $all_collections_img[2] ?>">
                                    <meta content="<?= $all_collections_img[1] ?>" itemprop="width">
                                    <meta content="<?= $all_collections_img[2] ?>" itemprop="height">
                                </div>
                                <div class="collections-all__text"><?= $all_collections['text'] ?></div>
                                <div class="btn">
                                    <span>
                                        <?= $all_collections['batton_text'] ?>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="8" viewBox="0 0 4 8" fill="none">
                                            <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="#191919"/>
                                        </svg>
                                    </span>
                                </div>
                            </a>
                        </div>
                    <?php endif; ?>
                    <?php if (!empty($collections_list)): ?>
                        <div class="collections-list">
                            <?php foreach ($collections_list as $item) {
                                $collection_img = wp_get_attachment_image_src(  $item['picture']['ID'], 'main_collection', false );?>
                                <a href="<?= $item['link'] ?>" class="collections-item">
                                    <div itemscope itemtype="https://schema.org/ImageObject">
                                        <img itemprop="contentUrl" src="<?= $collection_img[0] ?>" loading="lazy" alt="Collection <?= $item['name'] ?>"
                                             title="Collection <?= $item['name'] ?>" width="<?= $collection_img[1] ?>" height="<?= $collection_img[2] ?>">
                                        <meta content="<?= $collection_img[1] ?>" itemprop="width">
                                        <meta content="<?= $collection_img[2] ?>" itemprop="height">
                                    </div>
                                    <div class="btn"><span><?= $item['name'] ?></span></div>
                                </a>
                            <?php } ?>
                        </div>
                    <?php endif; ?>
                </div>
                <div class="collections-section__bg-text"><?= $collections['bottom_text'] ?></div>
            </div>
        </div>
    <?php endif; ?>

    <?php $shop = get_field('shop'); ?>
    <?php if (!empty($shop)): ?>
        <div class="section shop-section">
            <div class="container">
                <div class="shop-section__inner">
                    <div class="shop-section__info">
                        <h2 class="shop-section__title"><?= $shop['title'] ?></h2>
                        <div class="shop-section__text">
                            <?= $shop['text'] ?>
                        </div>
                        <div class="shop-section__links">
                            <?php if (!empty($shop['link'])): ?>
                                <a href="<?= $shop['link'] ?>" class="btn"><span> <?= $shop['button'] ?>
                                        <svg width="4" height="8" viewBox="0 0 4 8" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
                                        </svg>
                                    </span>
                                </a>
                            <?php endif; ?>
                            <?php
                                global $wpdb;
                                $rating = $wpdb->get_var ("SELECT `rating` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
                                $review_count = $wpdb->get_var ("SELECT `review_count` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
                                $reviews_link = $wpdb->get_var ("SELECT `url` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
                            ?>
                            <a href="<?=$reviews_link?>" class="shop-google-rating" target="_blank" rel="nofollow">
                                <img src="<?php echo get_template_directory_uri() ?>/images/icons/google.png"
                                     loading="lazy" alt="google" title="google" width="33" height="33">
                                <div class="reviews-average">
                                    <div class="rating-stars">
                                        <?php for ($i = 0; $i < 5; $i++) { ?>
                                            <span class="rating-star<?=$i < $rating ? ' active' : ''?>"></span>
                                        <?php } ?>
                                    </div>
                                    <span class="reviews-count">Rating <?=$rating?> (<?=$review_count?> reviews)</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <?php if (!empty($shop['picture'])):
                        $shop_picture = wp_get_attachment_image_src($shop['picture']['ID'], 'main_shop'); ?>
                        <div class="shop-section__pic">
                            <div>
                                <div itemscope itemtype="https://schema.org/ImageObject">
                                    <img itemprop="contentUrl" src="<?= $shop_picture[0] ?>" loading="lazy" alt="Selling jewelry in New York"
                                         title="Selling jewelry in New York" width="<?= $shop_picture[1] ?>" height="<?= $shop_picture[2] ?>">
                                    <meta content="<?= $shop_picture[1] ?>" itemprop="width">
                                    <meta content="<?= $shop_picture[2] ?>" itemprop="height">
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
                <?php if (!empty($shop['bottom_picture'])):
                    $shop_bottom = wp_get_attachment_image_src($shop['bottom_picture']['ID'], 'main_shop_bottom'); ?>
                    <div class="shop-section__bot">
                        <div itemscope itemtype="https://schema.org/ImageObject">
                            <img itemprop="contentUrl" class="with_mob" src="<?= $shop_bottom[0] ?>" loading="lazy" alt="Diamonds store in Huntington"
                                 title="Diamonds store in Huntington" width="<?= $shop_bottom[1] ?>" height="<?= $shop_bottom[2] ?>">
                            <meta content="<?= $shop_bottom[1] ?>" itemprop="width">
                            <meta content="<?= $shop_bottom[2] ?>" itemprop="height">
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>

    <?= get_template_part('parts/reviews') ?>

    <?php
    $args = [
        'post_type' => 'post',
        'posts_per_page' => 2,
        'post_status' => 'publish',
        'order' => 'DESC'
    ];
    $query = new WP_Query($args);
    if ($query->have_posts()) { ?>
        <div class="section blog-section">
            <div class="container">
                <div class="blog-section__head">
                    <h2 class="blog-section__title">Blog</h2>
                    <a href="/blog/" class="blog-section__link">Explore more
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="8" viewBox="0 0 4 8" fill="none">
                            <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="#191919"/>
                        </svg>
                    </a>
                    <div class="blog-section__bg-text">Learn with us</div>
                </div>
                <div class="row blog-section__wrapper">
                    <?php while ($query->have_posts()) {
                        $query->the_post(); ?>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <a href="<?php the_permalink(); ?>" class="blog-item">
                                <?php $image_size = wp_is_mobile() ? 'post_thumb_m' : 'post_thumb_d';
                                $thumbnail_image = wp_get_attachment_image_src(get_post_thumbnail_id(), $image_size);?>
                                <div itemscope itemtype="https://schema.org/ImageObject">
                                    <img itemprop="contentUrl" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>"
                                         title="<?php the_title(); ?>" loading="lazy" width="<?php echo $thumbnail_image[1] ?>" height="<?php echo $thumbnail_image[2] ?>">
                                    <meta content="<?php echo $thumbnail_image[1] ?>" itemprop="width">
                                    <meta content="<?php echo $thumbnail_image[2] ?>" itemprop="height">
                                </div>
                                <span class="blog-item__date"><?php the_time('m/d/Y'); ?></span>
                                <h3 class="blog-item__title"><?php the_title(); ?></h3>
                            </a>
                        </div>
                    <?php }
                    wp_reset_postdata();
                    ?>
                </div>
            </div>
        </div>
    <?php } ?>

    <?php $faq = get_field('faq'); ?>
    <?php $faq_list = $faq['faq_list'] ?>
    <?php $pictures = $faq['pictures'] ?>
    <?php if (!empty($faq)): ?>
        <div class="section faq-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h2 class="faq-section__title"><?= $faq['title'] ?></h2>
                        <a href="<?= $faq['link'] ?>" class="faq-section__link"><?= $faq['link_text'] ?>
                            <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="#191919"/>
                            </svg>
                        </a>
                    </div>
                    <div class="col-lg-5">
                        <div class="faq-section__img">
                            <div itemscope itemtype="https://schema.org/ImageObject">
                                <?php if (!empty($pictures['big_picture'])):
                                    $faq_big_picture = wp_get_attachment_image_src($pictures['big_picture']['ID'], 'main_faq1');?>
                                    <img itemprop="contentUrl" src="<?php echo $faq_big_picture[0] ?>" loading="lazy" alt="Fashionable women's jewelry" title="Fashionable women's jewelry" width="<?php echo $faq_big_picture[1] ?>" height="<?php echo $faq_big_picture[2] ?>">
                                    <meta content="<?php echo $faq_big_picture[1] ?>" itemprop="width">
                                    <meta content="<?php echo $faq_big_picture[2] ?>" itemprop="height">
                                <?php endif; ?>
                            </div>
                            <?php if (!empty($pictures['small_picture'])):
                                $faq_small_picture = wp_get_attachment_image_src($pictures['small_picture']['ID'], 'main_faq2');?>
                                <img src="<?php echo $faq_small_picture[0] ?>" loading="lazy" alt="Popular women's jewelry in New York" title="Popular women's jewelry in New York" width="<?php echo $faq_small_picture[1] ?>" height="<?php echo $faq_small_picture[2] ?>">
                            <?php endif; ?>
                            <div class="faq-section__img-bg-text"><?= $faq['small_text'] ?></div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="faq-section__inner">
                            <?= $faq['text'] ?>
                            <?php if (!empty($faq_list)): ?>
                                <div class="faq-items">
                                    <?php foreach ($faq_list as $item) { ?>
                                        <?php if (!empty($item['question']) && !empty($item['answer'])): ?>
                                            <div class="faq-item">
                                                <div class="faq-item__head">
                                                    <?= $item['question'] ?>
                                                    <i>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5"
                                                             viewBox="0 0 10 5" fill="none">
                                                            <path d="M5 5L0 0L5 2.5L10 0L5 5Z" fill="#191919"/>
                                                        </svg>
                                                    </i>
                                                </div>
                                                <div class="faq-item__body"
                                                     style="display: none"> <?= $item['answer'] ?></div>
                                            </div>
                                        <?php endif; ?>
                                    <?php } ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
    <?php
    $instagram_switcher = get_field('instagram_switcher');
    if ($instagram_switcher) { ?>
        <?php $instagram = get_field('instagram'); ?>
        <?php $button = $instagram['button'] ?>
        <?php $instagram_list = $instagram['list'] ?>
        <?php if (!empty($instagram)): ?>
            <div class="section instagram-section">
                <div class="container">
                    <div class="instagram-section__pretitle"><?= $instagram['pretitle'] ?></div>
                    <h2 class="instagram-section__title"><?= $instagram['title'] ?></h2>
                    <?=do_shortcode('[insta-gallery id="0"]')?>
                </div>
            </div>

        <?php endif; ?>
    <?php } ?>

    <?= get_template_part('parts/advantages') ?>
</main>

<?php get_footer(); ?>
