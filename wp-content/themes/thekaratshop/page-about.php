<?php /* Template Name: About Us */ ?>

<?php get_header(); ?>

<?php $main = get_field('main'); ?>
<?php $pictures = get_field('pictures'); ?>
<?php $more = get_field('more'); ?>

<main class="main">
	<div class="section about-page">
		<div class="page-top">
			<div class="container">
          <?php breadcrumbs(); ?>
				<h1 class="page-title"><?php the_title(); ?></h1>
			</div>
		</div>
		<div class="about-main">
			<div class="container">
				<div class="row about-main__wrapper">
					<div class="col-lg-8 col-md-8 col-sm-6">
						<div class="about-main__text">
                <?php if (!empty($main)): ?>
                    <?= $main['text'] ?>
                <?php endif; ?>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-6">
                      <?php if (!empty($main['image'])):
                          $picture_main = wp_get_attachment_image_src(get_field('main')['image']['ID'], 'page_about')?>
                        <div class="about-aside__pic" itemscope itemtype="https://schema.org/ImageObject">
                            <img itemprop="contentUrl" src="<?= $picture_main[0] ?>" fetchpriority="high" alt="Jewelry store The Karat Shop" title="Jewelry store The Karat Shop" width="<?= $picture_main[1] ?>" height="<?= $picture_main[2] ?>">
                            <meta content="<?= $picture_main[1] ?>" itemprop="width">
                            <meta content="<?= $picture_main[2] ?>" itemprop="height">
                        </div>
                      <?php endif; ?>
					</div>
				</div>
			</div>
		</div>
		<div class="about-pics">
			<div class="container">
          <?php if (!empty(get_field('middle_text'))): ?>
						<span class="about-pics__title"><?= get_field('middle_text') ?></span>
          <?php endif; ?>
          <?php if (!empty($pictures)): ?>
						<div class="row about-pics__wrapper">
                <?php if (!empty($pictures['picture_1'])):
                    $image_size = wp_is_mobile() ? 'page_about_2' : 'page_about_1_d';
                    $picture_1 = wp_get_attachment_image_src(get_field('pictures')['picture_1']['ID'], $image_size); ?>
									<div class="col-lg-7" itemscope itemtype="https://schema.org/ImageObject">
										<img itemprop="contentUrl" src="<?= $picture_1[0] ?>" fetchpriority="high" alt="Jewelry store display The Karat Shop" title="Jewelry store display The Karat Shop" width="<?= $picture_1[1] ?>" height="<?= $picture_1[2] ?>">
                                        <meta content="<?= $picture_1[1] ?>" itemprop="width">
                                        <meta content="<?= $picture_1[2] ?>" itemprop="height">
                                    </div>
                <?php endif; ?>
                <?php if (!empty($pictures['picture_2'])):
                    $picture_2 = wp_get_attachment_image_src(get_field('pictures')['picture_2']['ID'], 'page_about_2'); ?>
									<div class="col-lg-5" itemscope itemtype="https://schema.org/ImageObject">
										<img itemprop="contentUrl" src="<?= $picture_2[0] ?>" fetchpriority="high" alt="Assortment of jewelry store The Karat Shop" title="Assortment of jewelry store The Karat Shop" width="<?= $picture_2[1] ?>" height="<?= $picture_2[2] ?>">
                                        <meta content="<?= $picture_2[1] ?>" itemprop="width">
                                        <meta content="<?= $picture_2[2] ?>" itemprop="height">
                                    </div>
                <?php endif; ?>
						</div>
          <?php endif; ?>
			</div>
		</div>
		<div class="about-team">
			<div class="container">
				<div class="about-team__block">
            <?php if (!empty($more['text'])): ?>
							<h2 class="about-team__title"><?= $more['text'] ?></h2>
            <?php endif; ?>
					<a href="<?= $more['button_link'] ?>" class="btn">
						<span>
						<?= $more['button_text'] ?>
							<svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
							</svg>
						</span>
					</a>
				</div>
			</div>
		</div>
      <?= get_template_part('parts/advantages') ?>
	</div>
</main>

<?php get_footer(); ?>
