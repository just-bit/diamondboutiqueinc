<?php /* Template Name: Text */ ?>

<?php get_header(); ?>

<main class="main">
	<div class="section text-page">
		<div class="page-top">
			<div class="container">
          <?php breadcrumbs(); ?>
				<h1 class="page-title"><?php the_title(); ?></h1>
			</div>
		</div>
		<div class="text-page__main">
			<div class="container">
				<div class="text-page__inner"><?php the_content(); ?></div>
			</div>
		</div>
	</div>
</main>

<?php get_footer(); ?>
