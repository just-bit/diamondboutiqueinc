<?php /* Template Name: Our Team */ ?>

<?php get_header(); ?>

<main class="main">
	<div class="section team-page">
		<div class="page-top">
			<div class="container">
				<div class="breadcrumbs">
            <?php breadcrumbs(); ?>
					<h1 class="page-title"><?php the_title(); ?></h1>
				</div>
			</div>
		</div>
		<div class="team-main">
			<div class="container">
				<div class="team-text">
            <?php $picture = get_field('picture'); ?>
            <?php if (!empty($picture['picture_desktop'])):
                $picture_desktop = wp_get_attachment_image_src(get_field('picture')['picture_desktop']['ID'], 'page_team_d');
                $picture_mobile = wp_get_attachment_image_src(get_field('picture')['picture_mobile']['ID'], 'page_team_m'); ?>
							<div class="team-pic" itemscope itemtype="https://schema.org/ImageObject">
								<picture>
									<source srcset="<?= $picture_desktop[0] ?>" media="(min-width: 575px)" width="<?= $picture_desktop[1] ?>" height="<?= $picture_desktop[2] ?>">
									<source srcset="<?= $picture_mobile[0] ?>" media="(max-width: 574px)" width="<?= $picture_mobile[1] ?>" height="<?= $picture_mobile[2] ?>">
									<img itemprop="contentUrl" src="<?= $picture_desktop[0] ?>" fetchpriority="high" alt="The Karat Shop Team" title="The Karat Shop Team" width="<?= wp_is_mobile() ? $picture_mobile[1] : $picture_desktop[1] ?>" height="<?= wp_is_mobile() ? $picture_mobile[2] : $picture_desktop[2] ?>">
								</picture>
								<meta content="<?= $picture_desktop[1] ?>" itemprop="width">
								<meta content="<?= $picture_desktop[2] ?>" itemprop="height">
							</div>
            <?php endif; ?>
            <?= get_field('text'); ?>
				</div>
          <?php $bottom = get_field('bottom'); ?>
				<div class="team-help">
					<span class="team-help__title"><?= $bottom['text'] ?></span>
					<a href="<?= $bottom['button_link'] ?>" class="btn">
						<span>
							<?= $bottom['button__text'] ?>
							<svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
							</svg>
						</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</main>

<?php get_footer(); ?>
