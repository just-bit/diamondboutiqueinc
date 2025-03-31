<?php
$reviews = $wpdb->get_results("SELECT * FROM wp_grp_google_review ORDER BY `time` DESC LIMIT 9 ");
$rating = $wpdb->get_var ("SELECT `rating` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
$review_count = $wpdb->get_var ("SELECT `review_count` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
?>
<script type="application/ld+json">
    {
        "@context": "https://schema.org/",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "LocalBusiness",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressCountry": "US",
                "postalCode": "11746",
                "streetAddress": "102 W. Jericho Turnpike"
            },
            "email": "<?php echo ORGANIZATION_EMAIL; ?>",
            "name": "Diamonds & Jewelry Store - The Karat Shop",
            "telephone": "+1 (631) 271-5151",
            "image": "<?php echo get_template_directory_uri(); ?>/images/logo.png"
        },
        "ratingValue": <?php echo $rating; ?>,
        "bestRating": 5,
        "ratingCount": <?php echo $review_count; ?>
    }
</script>
<div class="section reviews-section">
    <div class="container">
        <?php
        global $wpdb;
        $rating = $wpdb->get_var ("SELECT `rating` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
        $review_count = $wpdb->get_var ("SELECT `review_count` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
        $reviews_link = $wpdb->get_var ("SELECT `url` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
        ?>
	    <div class="reviews-section__pretitle-top">
		    <span class="reviews-section__pretitle">Customer reviews</span>
		    <a href="<?=$reviews_link?>" class="shop-google-rating" target="_blank" rel="nofollow">
			    <img src="<?php echo get_template_directory_uri() ?>/images/icons/google.png"
			         loading="lazy" alt="google" width="33" height="33">
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
	    <h2 class="reviews-section__title">What Our Customers Are Saying</h2>
	    <div class="reviews-slider__top">
		    <div class="reviews-slider__nav">
			    <div class="reviews-slider__arrow reviews-prev">
				    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					    <path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path>
					    <line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line>
				    </svg>
			    </div>
			    <span>
                        <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995" stroke="#191919"></line>
                        </svg>
                    </span>
			    <div class="reviews-slider__arrow reviews-next">
				    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					    <path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path>
					    <line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line>
				    </svg>
			    </div>
		    </div>
	    </div>
        <div class="reviews-slider__wrapper">
            <div class="reviews-slider">
                <?php foreach($reviews as $review){ ?>
                <div class="slide">
                    <a href="/reviews/" class="reviews-item"  itemscope itemtype="https://schema.org/Review">
                        <div class="hidden" itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/LocalBusiness">
                            <meta itemprop="name" content="Diamonds & Jewelry Store - The Karat Shop">
                            <meta itemprop="telephone" content="+1 (631) 271-5151">
                            <link itemprop="url" href="<?php echo site_url('/'); ?>">
                            <meta itemprop="email" content="<?php echo ORGANIZATION_EMAIL; ?>">
                            <meta itemprop="image" content="<?php echo get_template_directory_uri(); ?>/images/logo.png">
                            <p itemprop="address" itemscope="" itemtype="https://schema.org/PostalAddress">
                                <meta itemprop="postalCode" content="11746">
                                <meta itemprop="addressCountry" content="US">
                                <meta itemprop="addressLocality" content="New York">
                                <meta itemprop="streetAddress" content="102 W. Jericho Turnpike">
                            </p>
                        </div>
                        <div class="rating-stars" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                            <?php for ($i = 0; $i < 5; $i++) { ?>
                                <span class="rating-star<?=$i < $review->rating ? ' active' : ''?>"></span>
                            <?php } ?>
                            <meta itemprop="ratingValue" content="<?php echo $review->rating; ?>">
                        </div>
                        <div class="reviews-item__text" itemprop="reviewBody">
                            <p><?=$review->text?></p>
                        </div>
                        <div class="reviews-item__author" itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                            <?php if($review->author_name){ ?>
                                <span itemprop="name"><?=$review->author_name?></span>,&nbsp;
                            <?php } ?>
                            <span class="reviews-item__date"><?=date('d/m/Y', $review->time)?></span>
                        </div>
                    </a>
                </div>
                <?php } ?>
            </div>
	        <div class="reviews-progress-wrapper">
		        <div class="reviews-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progressbar"></div>
	        </div>
        </div>
    </div>
</div>
