<?php get_header(); ?>

<main class="main">
	<div class="section article-page">
      <?php while (have_posts()) : the_post(); ?>
				<div class="article-page__top">
					<div class="container">
						<div class="row">
							<div class="col-lg-6">
								<div class="article-page__top-info">
									<a href="/blog/" class="article-page__back">
										<svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
											<path d="M-7.82817e-07 7L7 0L3.5 7L7 14L-7.82817e-07 7Z" fill="#191919"/>
										</svg>
										Go to Blog
									</a>
									<h1 class="page-title"><?php the_title(); ?></h1>
									<span class="article-page__date">
                                        <?php the_time('m/d/Y'); ?>
                                    </span>
								</div>
							</div>
							<div class="col-lg-6"></div>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="row article-page__main" itemscope itemtype="https://schema.org/Article">
                        <div class="hidden" itemprop="author" itemscope="" itemtype="https://schema.org/LocalBusiness">
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
                        <meta itemprop="datePublished" content="<?php echo date('c', strtotime(get_the_date()));?>">
                        <meta itemprop="headline" content="<?php the_title(); ?>">
						<div class="col-lg-6">
							<div class="article-page__text" itemprop="articleBody">
                                <?php the_content(); ?>
							</div>
						</div>
						<div class="col-lg-6 article-page__pic" itemscope itemtype="https://schema.org/ImageObject">
                <?php $image_size = wp_is_mobile() ? 'post_thumb_m' : 'post_thumb_d';
                $thumbnail_image = wp_get_attachment_image_src(get_post_thumbnail_id(), $image_size); ?>
                            <img itemprop="contentUrl" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>" width="<?php echo $thumbnail_image[1] ?>" height="<?php echo $thumbnail_image[2] ?>">
                            <meta content="<?php echo $thumbnail_image[1] ?>" itemprop="width">
                            <meta content="<?php echo $thumbnail_image[2] ?>" itemprop="height">
                            <meta content="<?php echo get_the_post_thumbnail_url(); ?>" itemprop="url">
						</div>
					</div>
				</div>
      <?php endwhile; ?>

      <?php
      $args = [
          'post_type' => 'post',
          'posts_per_page' => 2,
          'post_status' => 'publish',
          'order' => 'DESC'
      ];
      $query = new WP_Query($args);
      if ($query->have_posts()) { ?>
				<div class="article-recent">
					<div class="container">
						<div class="article-recent__top">
							<h2 class="article-recent__title">Recent Articles</h2>
							<div class="article-recent__bg-text">Learn with us</div>
							<a href="/blog/" class="article-recent__more">
								Explore more
								<svg xmlns="http://www.w3.org/2000/svg" width="4" height="8" viewBox="0 0 4 8" fill="none">
									<path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="#191919"/>
								</svg>
							</a>
						</div>
						<div class="row article-recent__main">
                <?php while ($query->have_posts()) {
                    $query->the_post(); ?>
									<div class="col-lg-6 col-md-6">
										<a href="<?php the_permalink(); ?>" class="blog-item" itemscope itemtype="https://schema.org/ImageObject">
                        <?php $thumbnail_image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full');?>
											<img itemprop="contentUrl" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>" width="<?php echo $thumbnail_image[1] ?>" height="<?php echo $thumbnail_image[2] ?>">
                                            <meta content="<?php echo $thumbnail_image[1] ?>" itemprop="width">
                                            <meta content="<?php echo $thumbnail_image[2] ?>" itemprop="height">
											<span class="blog-item__date"><?php the_time('m/d/Y'); ?></span>
											<h3 class="blog-item__title"><?php the_title(); ?></h3>
										</a>
									</div>
                <?php } ?>
						</div>
					</div>
				</div>
      <?php } ?>

	</div>
</main>


<?php get_footer(); ?>
