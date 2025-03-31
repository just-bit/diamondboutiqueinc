<?php get_header(); ?>

<main class="main">
    <div class="section catalog-page">
        <div class="catalog-top">
            <div class="container">
                <?php breadcrumbs(); ?>
                <h1 class="page-title"><?php the_title(); ?></h1>
            </div>
        </div>
        <?php while ( have_posts() ) : the_post(); ?>

            <?php the_content(); ?>

        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
