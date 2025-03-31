<?php /* Template Name: Contact Us */ ?>

<?php get_header(); ?>

<main class="main">
	<div class="section contacts-page">
		<div class="page-top">
			<div class="container">
          <?php breadcrumbs(); ?>
				<h1 class="page-title"><?php the_title(); ?></h1>
			</div>
		</div>
      <?php if (!empty(get_field('top_text'))): ?>
				<div class="contacts-top">
					<div class="container">
						<div class="contacts-text">
                <?= get_field('top_text'); ?>
						</div>
					</div>
				</div>
      <?php endif; ?>
		<div class="contacts-main">
			<div class="container">
				<div class="contacts-main__wrapper">
            <?php $pictures = get_field('pictures'); ?>
					<div class="contacts-pics">
              <?php if (!empty($pictures['picture_1'])):
                  $picture_1 = wp_get_attachment_image_src($pictures['picture_1']['ID'], 'page_about'); ?>
								<div class="contacts-pic" itemscope itemtype="https://schema.org/ImageObject">
									<img itemprop="contentUrl" src="<?= $picture_1[0] ?>" fetchpriority="high" alt="The Karat Shop contacts" title="The Karat Shop contacts" width="<?= $picture_1[1] ?>" height="<?= $picture_1[2] ?>">
									<meta content="<?= $picture_1[1] ?>" itemprop="width">
									<meta content="<?= $picture_1[2] ?>" itemprop="height">
								</div>
              <?php endif; ?>
              <?php if (!empty($pictures['picture_2']['url'])):
                  $picture_2 = wp_get_attachment_image_src($pictures['picture_2']['ID'], 'page_about');?>
								<div class="contacts-pic" itemscope itemtype="https://schema.org/ImageObject">
									<img itemprop="contentUrl" src="<?= $picture_2[0] ?>" fetchpriority="high" alt="The Karat Shop opening hours" title="The Karat Shop opening hours" width="<?= $picture_2[1] ?>" height="<?= $picture_2[2] ?>">
									<meta content="<?= $picture_2[1] ?>" itemprop="width">
									<meta content="<?= $picture_2[2] ?>" itemprop="height">
								</div>
              <?php endif; ?>
					</div>
					<div class="contacts-main__info">
						<a href="<?= get_field('link_location'); ?>" target="_blank" class="contacts-main__address" aria-label="Location">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
									fill="#191919"/>
							</svg>
                <?= get_field('address'); ?>
						</a>
              <?= get_field('schedule'); ?>
						<div class="contacts-main__info-footer">
							<ul class="contacts-main__socials">
                  <?php if (!empty(get_field('facebook'))): ?>
										<li>
											<a href="<?php the_field('facebook') ?>" rel="nofollow" target="_blank" aria-label="facebook">
												<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
													<path d="M16.3328 16.2005H18.2376L18.9995 13.0005H16.3328V11.4005C16.3328 10.5765 16.3328 9.80049 17.8567 9.80049H18.9995V7.11249C18.7511 7.07809 17.8132 7.00049 16.8227 7.00049C14.7542 7.00049 13.2852 8.32609 13.2852 10.7605V13.0005H10.9995V16.2005H13.2852V23.0005H16.3328V16.2005Z" fill="#191919"/>
												</svg>
											</a>
										</li>
                  <?php endif; ?>
                  <?php if (!empty(get_field('instagram'))): ?>
										<li>
											<a href="<?php the_field('instagram') ?>" rel="nofollow" target="_blank" aria-label="instagram">
												<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														d="M18.6689 7H11.3311C8.94287 7 7 8.94287 7 11.3311V18.669C7 21.0571 8.94287 23 11.3311 23H18.669C21.0571 23 23 21.0571 23 18.669V11.3311C23 8.94287 21.0571 7 18.6689 7ZM15 19.3749C12.5876 19.3749 10.6251 17.4124 10.6251 15C10.6251 12.5876 12.5876 10.6251 15 10.6251C17.4124 10.6251 19.3749 12.5876 19.3749 15C19.3749 17.4124 17.4124 19.3749 15 19.3749ZM19.4795 11.6569C18.7666 11.6569 18.1868 11.077 18.1868 10.3641C18.1868 9.65121 18.7666 9.07131 19.4795 9.07131C20.1924 9.07131 20.7723 9.65125 20.7723 10.3641C20.7723 11.077 20.1923 11.6569 19.4795 11.6569Z"
														fill="#191919"/>
													<path d="M14.9567 11.9151C13.2481 11.9151 11.8579 13.2794 11.8579 14.9564C11.8579 16.6333 13.2481 17.9977 14.9567 17.9977C16.6654 17.9977 18.0554 16.6333 18.0554 14.9564C18.0554 13.2794 16.6654 11.9151 14.9567 11.9151Z" fill="#191919"/>
												</svg>
											</a>
										</li>
                  <?php endif; ?>
							</ul>
                <?php if (!empty(get_field('email'))): ?>
									<a href="mailto:<?= get_field('email') ?>" class="contacts-main__email"><?= get_field('email') ?></a>
                <?php endif; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="contacts-form__block">
			<div class="container">
				<div class="contacts-form__main">
					<h2 class="contacts-form__pretitle">Send us a Message</h2>
					<span class="contacts-form__title">Fill Out the Form, and We'll Contact You</span>
					<form class="contacts-form ajax_form"
					      data-error-title="Sending error!"
					      data-error-message="Please try again later."
					      data-success-title="Thank you for your message."
					      data-success-message="Our sales representative will be in touch with you shortly."
					      data-success-btn="Ok">
						<input class="hidden" type="text" data-title="Request" name="request" value="Contact Form">
						<div class="input-wrapper">
							<label for="label-name">Name<span>*</span></label>
							<input class="input" type="text" data-title="Name" name="name" data-validate-required="This field is required" id="label-name">
						</div>
						<div class="input-wrapper">
							<label for="label-email">Email Address<span>*</span></label>
							<input class="input" type="text" data-title="Email" name="email" data-validate-required="This field is required" data-validate-email="Enter a valid email address" id="label-email">
						</div>
						<div class="input-wrapper">
							<label for="label-phone">Phone<span>*</span></label>
							<input class="input" type="text" data-title="Phone" name="phone" data-validate-required="This field is required" id="label-phone">
						</div>
						<div class="input-wrapper">
							<label for="label-textarea">Message</label>
							<textarea class="textarea" name="message" data-title="Message" placeholder="Do you have any questions or details  you wish to share?" id="label-textarea"></textarea>
						</div>
						<button type="submit" class="btn">
							<span>
								<span>Send Message</span>
								<svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"/>
								</svg>
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
      <?= get_template_part('parts/advantages') ?>
	</div>
</main>

<?php get_footer(); ?>
