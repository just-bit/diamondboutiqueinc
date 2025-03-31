<?php get_header(); ?>
<main class="main">
	<div class="section blog-page">
		<div class="page-top">
			<div class="container">
          <?php breadcrumbs(); ?>
				<h1 class="page-title">
                    Blog
                    <?php
                        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                        if ($paged > 1) {
                            echo ' - Page ' . $paged;
                        }
                    ?>
                </h1>
			</div>
		</div>
		<div class="blog-main">
			<div class="container">
				<div class="blog-title">Learn with us</div>
				<div class="row blog-main__wrapper js-items">
            <?php if (have_posts()) {
                while (have_posts()) {
                    the_post(); ?>
									<div class="col-lg-6 col-md-6">
										<a href="<?php the_permalink(); ?>" class="blog-item" itemscope itemtype="https://schema.org/ImageObject">
                        <?php  $image_size = wp_is_mobile() ? 'post_thumb_m' : 'post_thumb_d';
                        $thumbnail_image = wp_get_attachment_image_src(get_post_thumbnail_id(), $image_size);?>
                                            <img itemprop="contentUrl" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>" width="<?php echo $thumbnail_image[1] ?>" height="<?php echo $thumbnail_image[2] ?>">
                                            <meta content="<?php echo $thumbnail_image[1] ?>" itemprop="width">
                                            <meta content="<?php echo $thumbnail_image[2] ?>" itemprop="height">
											<span class="blog-item__date"><?php the_time('m/d/Y'); ?></span>
											<h2 class="blog-item__title"><?php the_title(); ?></h2>
										</a>
									</div>
                <?php }
                wp_reset_query();
            } else { ?>
							<p>Nothing</p>
            <?php } ?>
				</div>
          <?php if ($wp_query->max_num_pages > 1) : ?>
						<div class="pagination">
							<nav>
								<ul>
                    <?php
                    $pagination_args = array(
                        'total' => $wp_query->max_num_pages,
                        'current' => max(1, get_query_var('paged')),
                        'format' => '?paged=%#%',
                        'show_all' => false,
                        'end_size' => 1,
                        'mid_size' => 1,
                        'prev_next' => false,
                        'type' => 'array',
                    );

                    $links = paginate_links($pagination_args);

                    if ($links) {
                        foreach ($links as $link) {
                            if (strpos($link, 'current') !== false) {
                                echo '<li class="current">' . $link . '</li>';
                            } else {
                                echo '<li>' . $link . '</li>';
                            }
                        }
                    }
                    ?>
								</ul>
								<div>
                    <?php if (get_previous_posts_link()) : ?>
											<a href="<?php echo get_previous_posts_page_link(); ?>" class="prev" aria-label="prev page">
												<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"/>
													<line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"/>
												</svg>
											</a>
                    <?php else : ?>
											<span class="prev disabled">
												<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M-7.82817e-07 7.71289L7 0.712891L3.5 7.71289L7 14.7129L-7.82817e-07 7.71289Z" fill="#191919"/>
													<line x1="2" y1="7.70605" x2="18" y2="7.70606" stroke="#191919"/>
												</svg>
											</span>
                    <?php endif; ?>
									<span>
                <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="16.1615" y1="0.286788" x2="0.958119" y2="21.9995" stroke="#191919"/>
                </svg>
            </span>
                    <?php if (get_next_posts_link()) : ?>
											<a href="<?php echo get_next_posts_page_link(); ?>" class="next" aria-label="next page">
												<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"/>
													<line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"/>
												</svg>
											</a>
                    <?php else : ?>
											<span class="next disabled">
												<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M18 7.71289L11 14.7129L14.5 7.71289L11 0.712891L18 7.71289Z" fill="#191919"/>
													<line x1="16" y1="7.71973" x2="-4.37113e-08" y2="7.71973" stroke="#191919"/>
												</svg>
											</span>
                    <?php endif; ?>
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
          <?php endif; ?>
			</div>
		</div>
	</div>
</main>

<?php get_footer(); ?>
