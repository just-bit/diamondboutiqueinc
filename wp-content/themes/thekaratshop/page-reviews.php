<?php /* Template Name: Reviews */ ?>

<?php
global $wpdb;

get_header();

$rating = $wpdb->get_var ("SELECT `rating` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
$review_count = $wpdb->get_var ("SELECT `review_count` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
$current = get_query_var( 'paged' ) ? (int) get_query_var( 'paged' ) : 1;
$reviews = $wpdb->get_results("SELECT * FROM wp_grp_google_review ORDER BY `time` DESC LIMIT 16 OFFSET ".($current * 16 - 16));
$reviews_link = $wpdb->get_var ("SELECT `url` FROM `wp_grp_google_place` WHERE `id` = 1 LIMIT 1;");
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
<main class="main">
    <div class="section reviews-page">
        <div class="page-top">
            <div class="container">
                <?php breadcrumbs(); ?>
                <div class="reviews-top">
                    <h1 class="page-title">
                        <?php the_title(); ?>
                        <?php
                        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                        if ($paged > 1) {
                            echo ' - Page ' . $paged;
                        }
                        ?>
                    </h1>
                    <a href="<?=$reviews_link?>" class="shop-google-rating" target="_blank" rel="nofollow">
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
        </div>
        <div class="reviews-main">
            <div class="container">
                <ul class="reviews-main__wrapper">
                    <?php foreach($reviews as $review){ ?>
                    <li class="reviews-main__item" itemscope itemtype="https://schema.org/Review">
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
                    </li>
                    <?php } ?>
                </ul>
                <div class="pagination">
                    <nav>
                        <?php
                        $count = $wpdb->get_var("SELECT COUNT(`id`) FROM wp_grp_google_review");
                        $total = ceil($count / 16);

                        $args = [
                            'base'         => '/reviews/%_%',
                            'format'       => 'page/%#%/',
                            'total'        => $total,
                            'current'      => $current,
                            'show_all'     => false,
                            'prev_next' => true,
                            'prev_text' => '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path><line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line></svg>',
                            'next_text' => '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path><line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line></svg>',
                            'type'      => 'array',
                            'end_size'  => 3,
                            'mid_size'  => 3,
                        ];

                        $pages = paginate_links($args);

                        if($pages){
                            if($current == 1){
                                $prev = '<span class="prev disabled">
                                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"></path>
                                        <line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"></line>
                                    </svg>
                                </span>';
                            }else{
                                $prev = array_shift($pages);
                                $prev = str_replace('<a', '<a aria-label="prev page"', $prev);
                            }

                            if($total == $current){
                                $next = '<span class="next disabled">
                                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"></path>
                                        <line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"></line>
                                    </svg>
                                </span>';
                            }else{
                                $next = array_pop($pages);
                                $next = str_replace('<a', '<a aria-label="next page"', $next);
                            }
                        }
                        ?>
                        <ul>
                            <?php
                            foreach ($pages as $link) {
                                if (strpos($link, 'current') !== false) {
                                    echo '<li class="current">' . $link . '</li>';
                                } else {
                                    echo '<li>' . $link . '</li>';
                                }
                            }
                            ?>
                        </ul>
                        <div>
                            <?=$prev?>
                            <span>
                                <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995" stroke="#191919"></line>
                                </svg>
                            </span>
                            <?=$next?>
                        </div>
                    </nav>
                    <div class="btn load-more">
                        <span>
                        Load More
                            <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="reviews-google">
            <div class="container">
                <div class="reviews-google__block">
                    <h2 class="reviews-google__title">Leave Us a Review</h2>
                    <div class="reviews-google__text">We've found that customer reviews are very helpful in keeping our business thriving. We would truly appreciate a review from you! Visit a site to leave a review or comment:</div>
                    <a target="_blank" rel="nofollow" href="https://www.google.com/search?hl=en-UA&gl=ua&q=The+Karat+Shop,+102+W+Jericho+Turnpike,+Huntington+Station,+NY+11746,+United+States&ludocid=16216727264034726788&lsig=AB86z5VYcbb9pizGLkLqIdk4tboS&authuser=0&hl=en&gl=UA#lrd=0x89e82901993d56d9:0xe10d6386d82ea384,1" class="reviews-google__btn">
                        <img src="<?php echo get_template_directory_uri() ?>/images/icons/google.png" loading="lazy" alt="google">
                        <div>
                            <span>Already have a Google account?</span>
                            <span>
								Leave us a review here
								<svg xmlns="http://www.w3.org/2000/svg" width="4" height="8" viewBox="0 0 4 8" fill="none">
								  <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="#191919"/>
								</svg>
							</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <?= get_template_part('parts/advantages') ?>    </div>
</main>

<?php get_footer(); ?>
