<?php

namespace WP_Rplg_Google_Reviews\Includes;

use WP_Rplg_Google_Reviews\Includes\Core\Core;

class Feed_Block {

    private $version;

    public function __construct($version) {
        $this->version = $version;
    }

    public function register() {
        add_action('init', [$this, 'register_block'], 999);
        add_action('block_categories_all', [$this, 'register_category']);
    }

    public function register_block() {

        $assets = require(GRW_PLUGIN_PATH . 'build/index.asset.php');

        wp_register_script('grw-reviews-block-js', plugins_url('build/index.js', GRW_PLUGIN_FILE), array( 'wp-plugins', 'wp-edit-post', 'wp-element' ), $assets['version']);

        wp_localize_script('grw-reviews-block-js', 'grwBlockData', array(
            'nonce' => wp_create_nonce('grw_wpnonce')
        ));

        register_block_type(GRW_PLUGIN_PATH, [
            'editor_script' => 'grw-reviews-block-js',
            'render_callback' => [$this, 'render']
        ]);
    }

    public function register_category($cats) {
        return array_merge($cats, [['slug' => 'grw', 'title' => 'Google Reviews Block']]);
    }

    public function render($atts) {
        /*if (isset($atts['id'])) {
            echo do_shortcode('[grw id="' .  $atts['id'] . '"]');
        }*/
    }
}
