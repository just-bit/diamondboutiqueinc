<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preload" href="<?php echo get_template_directory_uri() . '/fonts/CrimsonText-Regular.woff2'; ?>" crossorigin="anonymous" as="font" type="font/woff2">
	<link rel="preload" href="<?php echo get_template_directory_uri() . '/fonts/CrimsonText-Italic.woff2'; ?>" crossorigin="anonymous" as="font" type="font/woff2">
	<link rel="preload" href="<?php echo get_template_directory_uri() . '/fonts/PTSans-Regular.woff2'; ?>" crossorigin="anonymous" as="font" type="font/woff2">
	<link rel="preload" href="<?php echo get_template_directory_uri() . '/fonts/PTSans-Bold.woff2'; ?>" crossorigin="anonymous" as="font" type="font/woff2">
	<link rel="preload" href="<?php echo get_template_directory_uri() . '/fonts/WindSong-Regular.woff2'; ?>" crossorigin="anonymous" as="font" type="font/woff2">
	<link rel="preload" href="<?php echo get_template_directory_uri() . '/assets/css/application.css'; ?>" as="style">
    <?php wp_head(); ?>
	<link rel="icon" href="<?php echo get_template_directory_uri() ?>/images/favicon.ico" type="image/x-icon">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri() ?>/images/favicon.png"
	      type="image/png">
	<meta name="theme-color" content="#F9F5F2">
	<meta name="msapplication-navbutton-color" content="#F9F5F2">
	<meta name="apple-mobile-web-app-status-bar-style" content="#F9F5F2">

    <?php if (is_page() && in_array(get_page_template_slug(), ['page-about.php', 'page-home.php'])): ?>
			<script type="application/ld+json">
				{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressCountry": "US",
                "postalCode": "11050",
                "streetAddress": "77 Main Street, Port Washington NY"
            },
            "email": "<?php echo ORGANIZATION_EMAIL; ?>",
        "name": "Diamonds & Jewelry Store - The Karat Shop",
        "telephone": "+1 (516) 767 2400",
        "image": "<?php echo get_template_directory_uri(); ?>/images/logo.png",
        "priceRange": "$$$-$$$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Friday",
            "Saturday"
          ],
          "opens": "11:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Thursday"
          ],
          "opens": "11:00",
          "closes": "19:00"
        }
      ],
       "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.828467,
        "longitude": -73.413585
      },
      "url": "<?php echo site_url('/'); ?>"
    }
			</script>
    <?php endif; ?>
    <?php if (is_page() && in_array(get_page_template_slug(), ['page-home.php'])): ?>
			<script type="application/ld+json">
				{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "<?php echo site_url('/'); ?>",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "<?php echo site_url('/'); ?>?s={text}&post_type=product",
                "query": "required"
            }
        }
			</script>
    <?php endif; ?>
    <?php if (0 && isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome-Lighthouse') === false): ?>
			<!-- Google Tag Manager -->
			<script>(function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                  'gtm.start':
                      new Date().getTime(), event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-TR73D7MK');</script>
			<!-- End Google Tag Manager -->
			<!-- Google tag (gtag.js) -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-752ZFM0122"></script>
			<script>
          window.dataLayer = window.dataLayer || [];

          function gtag() {
              dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-752ZFM0122');
			</script>
    <?php endif; ?>
</head>
<body>
<?php if (isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome-Lighthouse') === false): ?>
	<!-- Google Tag Manager (noscript) -->
	<noscript>
		<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TR73D7MK"
		        height="0" width="0" style="display:none;visibility:hidden"></iframe>
	</noscript>
	<!-- End Google Tag Manager (noscript) -->
<?php endif; ?>
<header class="header">
	<div class="header__top">
		<div class="container">
			<div class="header__top-left">Engagement & Wedding Rings Shop in Huntington, Long Island NY</div>
			<div class="header__top-right">
          <?php if (!empty(get_field('phone', 'option'))): ?>
						<a href="tel:<?php echo str_replace(array(' ', '.', '(', ')', '-'), '', get_field('phone', 'option')); ?>" aria-label="phone"><?php the_field('phone', 'option'); ?></a>
          <?php endif; ?>
          <?php if (!empty(get_field('address', 'option'))): ?>
						<a href="https://www.google.com/maps/place/102+W+Jericho+Turnpike,+Huntington+Station,+NY+11746,+%D0%A1%D0%A8%D0%90/@40.8283112,-73.4162131,1194m/data=!3m2!1e3!4b1!4m6!3m5!1s0x89e82901a1fb4369:0x96c20ae445aead6!8m2!3d40.8283072!4d-73.4136328!16s%2Fg%2F11csk0h_6h?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="nofollow"><?php the_field('address', 'option'); ?></a>
          <?php endif; ?>
			</div>
		</div>
	</div>
	<div class="header__main">
		<div class="container">
			<div class="mobile-btn">
				<svg xmlns="http://www.w3.org/2000/svg" width="25" height="13" viewBox="0 0 25 13" fill="none">
					<rect width="19.1176" height="1.44444" rx="0.722222" fill="#191919"/>
					<rect y="5.77783" width="25" height="1.44444" rx="0.722222" fill="#191919"/>
					<rect y="11.5552" width="19.1176" height="1.44444" rx="0.722222" fill="#191919"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M19.3333 9.99999H18.6666C18.6674 12.0051 17.9728 13.9484 16.7013 15.4989C15.4299 17.0493 13.6601 18.1109 11.6937 18.5027C9.72721 18.8946 7.68572 18.5924 5.91706 17.6478C4.14839 16.7032 2.76199 15.1745 1.99409 13.3223C1.22618 11.47 1.12429 9.40882 1.70576 7.48987C2.28724 5.57091 3.51611 3.91296 5.18299 2.79849C6.84986 1.68403 8.8516 1.18203 10.8471 1.37802C12.8426 1.57401 14.7084 2.45587 16.1266 3.87333C16.9328 4.6768 17.5723 5.6317 18.0082 6.68313C18.4441 7.73456 18.6679 8.86178 18.6666 9.99999H20C20 8.02218 19.4135 6.08878 18.3147 4.44429C17.2159 2.79981 15.6541 1.51808 13.8268 0.761208C11.9996 0.00433293 9.98889 -0.1937 8.04909 0.192151C6.10928 0.578003 4.32745 1.53041 2.92893 2.92893C1.53041 4.32745 0.578003 6.10928 0.192151 8.04909C-0.1937 9.98889 0.00433293 11.9996 0.761208 13.8268C1.51808 15.6541 2.79981 17.2159 4.44429 18.3147C6.08878 19.4135 8.02218 20 9.99999 20C12.6521 20 15.1957 18.9464 17.071 17.071C18.9464 15.1957 20 12.6521 20 9.99999H19.3333Z"
						fill="#191919"/>
					<path
						d="M6.2305 14.7133L14.7138 6.23001C14.8389 6.10492 14.9092 5.93525 14.9092 5.75834C14.9092 5.58144 14.8389 5.41177 14.7138 5.28668C14.5887 5.16159 14.4191 5.09131 14.2422 5.09131C14.0652 5.09131 13.8956 5.16159 13.7705 5.28668L5.28717 13.77C5.22523 13.8319 5.17609 13.9055 5.14257 13.9864C5.10905 14.0673 5.0918 14.1541 5.0918 14.2417C5.0918 14.3293 5.10905 14.416 5.14257 14.4969C5.17609 14.5779 5.22523 14.6514 5.28717 14.7133C5.34911 14.7753 5.42264 14.8244 5.50357 14.8579C5.5845 14.8914 5.67124 14.9087 5.75883 14.9087C5.84643 14.9087 5.93317 14.8914 6.0141 14.8579C6.09503 14.8244 6.16856 14.7753 6.2305 14.7133Z"
						fill="#191919"/>
					<path
						d="M5.28717 6.23001L13.7705 14.7133C13.8956 14.8384 14.0652 14.9087 14.2422 14.9087C14.4191 14.9087 14.5887 14.8384 14.7138 14.7133C14.8389 14.5882 14.9092 14.4186 14.9092 14.2417C14.9092 14.0648 14.8389 13.8951 14.7138 13.77L6.2305 5.28668C6.16856 5.22474 6.09503 5.17561 6.0141 5.14208C5.93317 5.10856 5.84643 5.09131 5.75883 5.09131C5.67124 5.09131 5.5845 5.10856 5.50357 5.14208C5.42264 5.17561 5.34911 5.22474 5.28717 5.28668C5.22523 5.34862 5.17609 5.42215 5.14257 5.50308C5.10905 5.58401 5.0918 5.67075 5.0918 5.75834C5.0918 5.84594 5.10905 5.93268 5.14257 6.01361C5.17609 6.09454 5.22523 6.16807 5.28717 6.23001Z"
						fill="#191919"/>
				</svg>
			</div>
        <?php if (is_front_page()): ?>
					<span class="header__main-logo">
		        <img src="<?php echo get_template_directory_uri() ?>/images/logo.png" alt="Diamonds & Jewelry Store in Port Washington" title="Diamonds & Jewelry Store in New York" width="245" height="30" decoding="async" fetchpriority="high">
            </span>
        <?php else: ?>
					<a href="/" class="header__main-logo">
						<img src="<?php echo get_template_directory_uri() ?>/images/logo.png" alt="Diamonds & Jewelry Store in Port Washington" title="Diamonds & Jewelry Store in New York" width="245" height="30" decoding="async" fetchpriority="high">
					</a>
        <?php endif; ?>
			<div class="header__main-menu">
				<ul>
					<li class="has-children">
						<a href="<?= home_url('/shop/') ?>"><span>JEWELRY</span></a>
						<div class="header__main-submenu header__jewelry-submenu" style="display: none;">
							<div class="container">
								<div class="header__jewelry-menu__left">
									<span>Selection</span>
									<ul>
										<li><a href="<?= home_url('/shop/') ?>">All Jewelry</a></li>
										<li><a href="<?= home_url('/shop/options/new-in-new-in/') ?>">New In</a></li>
										<li><a href="<?= home_url('/shop/options/bestsellers-bestsellers/') ?>">Bestsellers</a></li>
										<li class="sale"><a href="<?= home_url('/shop/options/sales-sales/') ?>">Sales</a></li>
									</ul>
								</div>
								<div class="header__jewelry-menu__categories">
									<span>Categories</span>
                    <?php
                    $all_categories = get_categories(array(
                        'taxonomy' => 'product_cat',
                        'hide_empty' => false,
                        'parent' => 0,
                    ));
                    ?>
									<ul>
                      <?php foreach ($all_categories as $category) { ?>
                          <?php $thumbnail = wp_get_attachment_url(get_term_meta($category->term_id, 'thumbnail_id', true)); ?>
                          <?php if ($category->count > 0 && !empty($thumbnail) && empty(get_term_meta($category->term_id, 'is_collection', true))) { ?>
													<li>
                                                        <a href="<?= get_term_link($category->slug, 'product_cat') ?>">
                                                            <div itemscope itemtype="https://schema.org/ImageObject">
                                  <?php $thumbnail_image = wp_get_attachment_image_src(get_term_meta($category->term_id, 'thumbnail_id', true), 'product_cat_image'); ?>
																<img itemprop="contentUrl" src="<?= $thumbnail ?>" alt="<?= $category->name ?>" title="<?= $category->name ?>" width="<?php echo $thumbnail_image[1] ?>" height="<?php echo $thumbnail_image[2] ?>" loading="lazy">
                                                                <meta content="<?php echo $thumbnail_image[1] ?>" itemprop="width">
                                                                <meta content="<?php echo $thumbnail_image[2] ?>" itemprop="height">
                                                            </div>
															<span><?= $category->name ?></span>
														</a>
													</li>
                          <?php } ?>
                      <?php } ?>
									</ul>
									<script type="application/ld+json">
										{
                        "@context":"http://schema.org",
                        "@type":"ItemList",
                        "itemListElement":[
                      <?php
                      $i = 0;
                      foreach ($all_categories as $category) { ?>
                          <?php $thumbnail = wp_get_attachment_url(get_term_meta($category->term_id, 'thumbnail_id', true)); ?>
                          <?php if ($category->count > 0 && !empty($thumbnail) && empty(get_term_meta($category->term_id, 'is_collection', true))) { ?>
                                                {
                                                    "@type":"SiteNavigationElement",
                                                    "position": <?= $i + 1 ?>,
                                                    "name": "<?= $category->name ?>",
                                                    "description": "<?= $category->name . ' at the best price ✔️ Only we have the best prices ✔️ We guarantee the quality of our products, see for yourself!'; ?>",
                                                    "url":"<?= get_term_link($category->slug, 'product_cat') ?>"
                                                },
                                                    <?php $i++;
                          } ?>
                      <?php } ?>
										{
                        "@type":"SiteNavigationElement",
                        "position": <?= $i + 1 ?>,
                                                    "name": "About Us",
                                                    "description": "The Karat Shop story begins in 1976 as a jewelry wholesaler in New York",
                                                    "url":"<?= site_url('/about-us/'); ?>"
                                                },
                                                {
                                                    "@type":"SiteNavigationElement",
                                                    "position": <?= $i + 2 ?>,
                                                    "name": "Contact Us",
                                                    "description": "Any questions? Just contact us!",
                                                    "url":"<?= site_url('/contact-us/'); ?>"
                                                }
                                            ]
                                        }
									</script>
								</div>
								<a href="<?= home_url('/shop/') ?>" class="header__main-submenu-more">All Jewelry</a>
							</div>
						</div>
					</li>
            <?php $collections = get_collections(); ?>
					<li class="has-children">
						<a href="<?= home_url('/shop/') ?>"><span>COLLECTIONS</span></a>
						<div class="header__main-submenu header__collections-submenu" style="display: none;">
							<div class="container">
								<ul class="header__collections-menu__main">
                    <?php foreach ($collections as $collection) { ?>
											<li><a href="/product-category/<?= $collection->slug ?>/"<?= get_term_meta($collection->term_id, 'new_collection', true) ? ' data-attr="new"' : '' ?> data-category="<?= $collection->name ?>"><?= $collection->name ?></a></li>
                    <?php } ?>
								</ul>
								<div class="header__collections-menu__pic">
                    <?php foreach ($collections as $collection) { ?>
                        <?php $thumbnail = wp_get_attachment_url(get_term_meta($collection->term_id, 'thumbnail_id', true)); ?>
                        <?php if (!empty($thumbnail)) { ?>
												<img src="<?= $thumbnail ?>" loading="lazy" data-image="<?= $collection->name ?>" alt="<?= $collection->name ?>" title="<?= $collection->name ?>" width="245" height="215">
                        <?php } ?>
                    <?php } ?>
								</div>
							</div>
						</div>
					</li>
            <?php
            wp_nav_menu([
                'container' => false,
                'menu_class' => '',
                'menu_id' => '',
                'theme_location' => 'pages-menu',
                'depth' => 1,
                'items_wrap' => '%3$s'
            ]);
            ?>
				</ul>
			</div>
			<div class="header__main-controls">
          <?php $wishlist_count = wishlist_count(); ?>
				<span class="header__main-wishlist wishlist-popup-btn<?= $wishlist_count ? ' active' : '' ?>" data-mfp-src="#wishlist-popup">
					<i>
						<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6.99989 12C6.78207 12 6.58405 11.9209 6.41573 11.7924C5.87118 11.3377 5.34643 10.9028 4.88108 10.5272C3.42563 9.34102 2.22761 8.35255 1.38603 7.37397C0.435535 6.26689 -0.0100098 5.229 -0.0100098 4.08237C-0.0100098 2.93575 0.395931 1.9374 1.1187 1.18616C1.85138 0.415157 2.85138 0 3.94049 0C4.75237 0 5.50484 0.247117 6.15831 0.741351C6.46524 0.968699 6.74247 1.24547 6.99989 1.57166C7.24742 1.25535 7.53454 0.978583 7.84148 0.741351C8.49494 0.257002 9.24742 0 10.0593 0C11.1484 0 12.1484 0.415157 12.8811 1.18616C13.6039 1.9374 13.9999 2.9654 13.9999 4.08237C13.9999 5.19934 13.5543 6.27677 12.6039 7.37397C11.7623 8.35255 10.5543 9.34102 9.15831 10.4876C8.66326 10.9028 8.1286 11.3278 7.57415 11.7924C7.41573 11.9308 7.20781 12 6.98999 12H6.99989ZM3.94049 0.919275C3.1187 0.919275 2.36623 1.23558 1.81177 1.8089C1.25732 2.39209 0.950386 3.19275 0.950386 4.08237C0.950386 5.01153 1.31672 5.85173 2.1187 6.79077C2.90088 7.70016 4.0791 8.66886 5.43553 9.77595C5.95039 10.201 6.48504 10.6359 7.0395 11.1005C7.51474 10.626 8.0593 10.1812 8.54445 9.78583C9.91078 8.66886 11.089 7.70016 11.8811 6.78089C12.693 5.84185 13.0494 5.00165 13.0494 4.07249C13.0494 3.19275 12.7425 2.38221 12.188 1.79901C11.6435 1.2257 10.8811 0.90939 10.0593 0.90939C9.45534 0.90939 8.91078 1.0972 8.41573 1.45305C7.98009 1.77924 7.67316 2.18451 7.49494 2.48105C7.38603 2.64909 7.19791 2.75783 6.99989 2.75783C6.80187 2.75783 6.60385 2.65898 6.50484 2.48105C6.32662 2.1944 6.01969 1.77924 5.58405 1.45305C5.0989 1.08731 4.54445 0.90939 3.94049 0.90939V0.919275Z"
								fill="#191919"/>
						</svg>
						<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.85083 11.5041L5.851 11.5042C6.33209 11.8992 6.87724 12.3468 7.44268 12.8232C7.59703 12.9534 7.79488 13.025 8 13.025C8.20481 13.0251 8.40282 12.9535 8.55721 12.8234C9.12394 12.3459 9.66993 11.8976 10.1519 11.502L10.136 11.4827L10.1519 11.502L10.1536 11.5005C11.5625 10.3437 12.7817 9.34273 13.6305 8.35591C14.5806 7.25148 15.025 6.2017 15.025 5.05354C15.025 3.93931 14.6285 2.91049 13.9076 2.15707C13.178 1.39469 12.1768 0.975 11.0891 0.975C10.2755 0.975 9.53023 1.22291 8.87448 1.71152C8.55189 1.95184 8.25908 2.2445 8 2.58475C7.741 2.2445 7.44811 1.95184 7.12564 1.71152C6.46988 1.22291 5.72456 0.975 4.911 0.975C3.82317 0.975 2.82216 1.39469 2.09256 2.15707L2.09256 2.15707C1.37162 2.91049 0.975 3.93931 0.975 5.05354C0.975 6.20172 1.41949 7.25151 2.36959 8.35601C3.21863 9.343 4.43832 10.3444 5.84794 11.5017L5.84837 11.5021L5.84853 11.5022L5.85083 11.5041Z"
								fill="#191919" stroke="#191919" stroke-width="0.05"/>
						</svg>
					</i>
					<span>Wishlist<?= $wishlist_count ? ' (' . $wishlist_count . ')' : '' ?></span>
				</span>

				<div class="header__main-search">
					<div class="header-search__btn">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9.84838 10.5407L13.1645 13.8568C13.2589 13.9512 13.3847 13.9998 13.5104 13.9998C13.6362 13.9998 13.762 13.9512 13.8563 13.8568C14.0479 13.6653 14.0479 13.3537 13.8563 13.1622L10.5402 9.84601C11.4264 8.80257 11.961 7.45324 11.961 5.98099C11.961 2.68199 9.27663 0.000488281 5.9805 0.000488281C2.68436 0.000488281 0 2.68202 0 5.98105C0 9.28007 2.68436 11.9615 5.98336 11.9615C7.45561 11.9615 8.80494 11.4269 9.84838 10.5407ZM0.98055 5.98105C0.98055 3.22235 3.22467 0.981096 5.9805 0.981096C8.73633 0.981096 10.9804 3.22521 10.9804 5.98105C10.9804 8.73688 8.73633 10.981 5.9805 10.981C3.22467 10.981 0.98055 8.73682 0.98055 5.98105Z"
								fill="#191919"/>
						</svg>
						<span>Search</span>
					</div>
					<div class="header-search__wrapper">
						<div class="header-search">
							<div class="header-search__form">
                  <?php echo do_shortcode('[yith_woocommerce_ajax_search preset=\'default\']'); ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
<div class="header-spacer" id="top"></div>
<div class="mobile-menu">
	<div class="container">

		<div class="menu-mobile-container">
			<ul class="mobile-menu__main" style="margin-bottom: 20px">
          <?php
          $all_categories = get_categories(array(
              'taxonomy' => 'product_cat',
              'hide_empty' => false,
              'parent' => 0,
          ));
          ?>
				<li class="opened menu-item-has-children">
					<a href="/shop/"><span>JEWELRY</span></a>
            <?php if ($all_categories): ?>
							<span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <path d="M5 5L0 0L5 2.5L10 0L5 5Z" fill="#191919"></path>
                </svg>
            </span>
							<ul class="sub-menu" style="display: block;">
                  <?php foreach ($all_categories as $category) { ?>
                      <?php $thumbnail = wp_get_attachment_url(get_term_meta($category->term_id, 'thumbnail_id', true)); ?>
                      <?php if ($category->count > 0 && !empty($thumbnail) && empty(get_term_meta($category->term_id, 'is_collection', true))) { ?>
											<li>
												<a href="<?= get_term_link($category->slug, 'product_cat') ?>"><?= $category->name ?></a>
											</li>
                      <?php } ?>
                  <?php } ?>
							</ul>
            <?php endif; ?>
				</li>
				<li class="menu-item-has-children">
					<a href="/shop/"><span>COLLECTIONS</span></a>
            <?php $collections = get_collections(); ?>
            <?php if (!empty($collections)): ?>
							<span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <path d="M5 5L0 0L5 2.5L10 0L5 5Z" fill="#191919"></path>
                </svg>
            </span>
							<ul class="sub-menu" style="display: none;">
                  <?php foreach ($collections as $collection) { ?>
										<li><a href="/product-category/<?= $collection->slug ?>/"<?= get_term_meta($collection->term_id, 'new_collection', true) ? ' data-attr="new"' : '' ?> data-category="<?= $collection->name ?>"><?= $collection->name ?></a></li>
                  <?php } ?>
							</ul>
            <?php endif; ?>
				</li>
			</ul>
        <?php
        wp_nav_menu([
            'theme_location' => 'mobile-menu',
            'menu_class' => 'mobile-menu__main',
            'container' => false,
        ]);
        ?>
		</div>
      <?php if (!empty(get_field('phone', 'option'))): ?>
				<a href="tel:<?php echo str_replace(array(' ', '.', '(', ')', '-'), '', get_field('phone', 'option')); ?>" class="mobile-menu__phone" aria-label="phone"><?php the_field('phone', 'option'); ?></a>
      <?php endif; ?>

      <?php if (!empty(get_field('address', 'option'))): ?>
				<a href="<?php the_field('address_location', 'option'); ?>" target="_blank" rel="nofollow" class="mobile-menu__address" aria-label="address"><?php the_field('address', 'option'); ?></a>
      <?php endif; ?>
	</div>
</div>

