<?php
/**
 * Shop breadcrumb
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/breadcrumb.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     2.3.0
 * @see         woocommerce_breadcrumb()
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! empty( $breadcrumb ) ) {

	echo '<div itemscope itemtype="https://schema.org/BreadcrumbList" class="breadcrumbs">';

	foreach ( $breadcrumb as $key => $crumb ) {

		echo $before;

		if ( ! empty( $crumb[1] ) && sizeof( $breadcrumb ) !== $key + 1 ) {
			echo '<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="' . esc_url( $crumb[1] ) . '"><meta itemprop="name" content="' . esc_html( $crumb[0] ) . '">' . esc_html( $crumb[0] ) . '</a><meta itemprop="position" content="'.($key+1).'"></span>';
		} else {
			echo '<span class="active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">' . esc_html( $crumb[0] ) . '<meta itemprop="item" content="' . esc_url( $crumb[1] ) . '"><meta itemprop="name" content="'.esc_html( $crumb[0] ).'"><meta itemprop="position" content="'.($key+1).'"></span>';
		}

		echo $after;

		if ( sizeof( $breadcrumb ) !== $key + 1 ) {
			echo '<span class="divider"> / </span>';
		}
	}

	echo '</div>';

}
