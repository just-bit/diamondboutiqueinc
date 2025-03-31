<?php /* Template Name: FAQ */ ?>

<?php get_header(); ?>

<main class="main">
	<div class="section faq-page">
		<div class="page-top">
			<div class="container">
          <?php breadcrumbs(); ?>
				<h1 class="page-title">Frequently Asked Questions</h1>
			</div>
		</div>
		<div class="faq-main">
			<div class="container">
				<div class="row faq-main__wrapper">
					<div class="col-lg-8">
              <?php $faq = get_field('faq'); ?>
              <?php if (!empty($faq)): ?>
								<div class="faq-main__items" itemscope itemtype="https://schema.org/FAQPage">
									<div class="faq-items">
                      <?php foreach ($faq as $item) { ?>
                          <?php if (!empty($item['question']) && !empty($item['answer'])): ?>
                                <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                                    <div class="faq-item__head">
                                        <?= $item['question'] ?>
                                        <meta itemprop="name" content="<?= $item['question'] ?>" />
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                                                <path d="M5 5L0 0L5 2.5L10 0L5 5Z" fill="#191919"/>
                                            </svg>
                                        </i>
                                    </div>
                                    <div class="faq-item__body" style="display: none" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><?= $item['answer'] ?>
                                    <meta itemprop="text" content="<?= $item['answer'] ?>" />
                                    </div>
                                </div>
                          <?php endif; ?>
                      <?php } ?>
									</div>
								</div>
              <?php endif; ?>
					</div>
					<div class="col-lg-4">
              <?php $picture = get_field('picture'); ?>
              <?php if (!empty($picture)):
                  $picture_faq = wp_get_attachment_image_src(get_field('picture')['ID'], 'page_about')?>
                <div class="faq-aside__pic" itemscope itemtype="https://schema.org/ImageObject">
                    <img itemprop="contentUrl" src="<?= $picture_faq[0] ?>" fetchpriority="high" alt="Frequently asked questions about The Karat Shop" title="Frequently asked questions about The Karat Shop" width="<?= $picture_faq[1] ?>" height="<?= $picture_faq[2] ?>">
                    <meta content="<?= $picture_faq[1] ?>" itemprop="width">
                    <meta content="<?= $picture_faq[2] ?>" itemprop="height">
                </div>
              <?php endif; ?>
					</div>
				</div>
			</div>
		</div>
      <?= get_template_part('parts/advantages') ?>
	</div>
</main>

<?php get_footer(); ?>
