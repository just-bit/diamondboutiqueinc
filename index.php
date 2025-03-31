<?php
$isSecure = (!empty($_SERVER['HTTPS'])) && ($_SERVER['HTTPS'] != 'off');
$method = ($isSecure ? 'https://' : 'http://');
$parts = explode('?', $_SERVER['REQUEST_URI']);

$data = explode(PHP_EOL, file_get_contents(__DIR__.'/redirects.csv'));
$redirects = [];
foreach($data as $row){
    $cells = explode(',', $row);
    if(count($cells) == 2){
        $redirects[$cells[0]] = $cells[1];
    }
}
if(isset($redirects[$_SERVER['REQUEST_URI']])){
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: ".$redirects[$_SERVER['REQUEST_URI']]);
    exit();
}

/**
 * Front to the WordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells WordPress to load the theme.
 *
 * @package WordPress
 */

/**
 * Tells WordPress to load the WordPress theme and output it.
 *
 * @var bool
 */
define( 'WP_USE_THEMES', true );

/** Loads the WordPress Environment and Template */
require __DIR__ . '/wp-blog-header.php';
