<?php //phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 * Main class
 *
 * @author YITH <plugins@yithemes.com>
 * @package YITH WooCommerce Ajax Search
 * @version 1.1.1
 */

if ( ! defined( 'YITH_WCAS' ) ) {
	exit;
} // Exit if accessed directly

if ( ! class_exists( 'YITH_WCAS' ) ) {
	/**
	 * YITH WooCommerce Ajax Search
	 *
	 * @since 1.0.0
	 */
	class YITH_WCAS {

		/**
		 * Plugin object
		 *
		 * @var string
		 * @since 1.0.0
		 */
		public $obj = null;

		/**
		 * Constructor
		 *
		 * @return mixed|YITH_WCAS_Admin|YITH_WCAS_Frontend
		 * @since 1.0.0
		 */
		public function __construct() {

			$this->obj = false;

			// Load Plugin Framework.
			if ( ! isset( $_REQUEST['action'] ) || 'yith_ajax_search_products' !== $_REQUEST['action'] ) { // phpcs:ignore
				add_action( 'plugins_loaded', array( $this, 'plugin_fw_loader' ), 15 );

				if ( is_admin() ) {
					$this->obj = new YITH_WCAS_Admin();

				} else {
					$this->obj = new YITH_WCAS_Frontend();
				}
			} else {
				if ( class_exists( 'YITH_JetPack' ) ) {
					include_once YJP_DIR . 'plugin-fw/yit-woocommerce-compatibility.php';
				} else {
					include_once YITH_WCAS_DIR . 'plugin-fw/yit-woocommerce-compatibility.php';
				}
			}

			// actions.
			add_action( 'widgets_init', array( $this, 'registerWidgets' ) );

			add_action( 'wp_ajax_yith_ajax_search_products', array( $this, 'ajax_search_products' ) );
			add_action( 'wp_ajax_nopriv_yith_ajax_search_products', array( $this, 'ajax_search_products' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_styles_scripts' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'register_styles_scripts' ) );
			// register shortcode.
			add_shortcode( 'yith_woocommerce_ajax_search', array( $this, 'add_woo_ajax_search_shortcode' ) );

			if ( defined( 'ELEMENTOR_VERSION' ) ) {
				require_once YITH_WCAS_DIR . 'includes/compatibility/elementor/class.yith-wcas-elementor.php';
			}

			add_action( 'before_woocommerce_init', array( $this, 'declare_wc_features_support' ) );

			return $this->obj;
		}


		/**
		 * Register styles and scripts
		 *
		 * @access public
		 * @return void
		 * @since 1.22.2
		 */
		public function register_styles_scripts() {
			$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
			wp_register_script( 'yith_autocomplete', YITH_WCAS_URL . 'assets/js/yith-autocomplete' . $suffix . '.js', array( 'jquery' ), YITH_WCAS_VERSION, true );
			wp_register_script( 'yith_wcas_jquery-autocomplete', YITH_WCAS_URL . 'assets/js/devbridge-jquery-autocomplete' . $suffix . '.js', array( 'jquery' ), YITH_WCAS_VERSION, true );
			wp_register_script( 'yith_wcas_frontend', YITH_WCAS_URL . 'assets/js/frontend' . $suffix . '.js', array( 'jquery' ), YITH_WCAS_VERSION, true );
			$css = file_exists( get_stylesheet_directory() . '/woocommerce/yith_ajax_search.css' ) ? get_stylesheet_directory_uri() . '/woocommerce/yith_ajax_search.css' : YITH_WCAS_URL . 'assets/css/yith_wcas_ajax_search.css';
			wp_register_style( 'yith_wcas_frontend', $css, array(), YITH_WCAS_VERSION );

			wp_localize_script(
				'yith_wcas_frontend',
				'yith_wcas_params',
				array(
					'loading'  => YITH_WCAS_ASSETS_IMAGES_URL . 'ajax-loader.gif',
					'ajax_url' => admin_url( 'admin-ajax.php' ),

				)
			);

		}

		/**
		 * Load Plugin Framework
		 *
		 * @since  1.0
		 * @access public
		 * @return void
		 */
		public function plugin_fw_loader() {
			if ( ! defined( 'YIT_CORE_PLUGIN' ) ) {
				global $plugin_fw_data;
				if ( ! empty( $plugin_fw_data ) ) {
					$plugin_fw_file = array_shift( $plugin_fw_data );
					require_once $plugin_fw_file;
				}
			}
		}



		/**
		 * Load template for [yith_woocommerce_ajax_search] shortcode
		 *
		 * @access public
		 *
		 * @param array $args Array of arguments.
		 *
		 * @return mixed
		 * @since  1.0.0
		 */
		public function add_woo_ajax_search_shortcode( $args = array() ) {
			$args = shortcode_atts( array(), $args );
			// for WC 3.6.0.
			unset( $args['template'] );

			ob_start();
			$wc_get_template = function_exists( 'wc_get_template' ) ? 'wc_get_template' : 'woocommerce_get_template';
			$wc_get_template( 'yith-woocommerce-ajax-search.php', $args, '', YITH_WCAS_DIR . 'templates/' );
			return ob_get_clean();
		}

		/**
		 * Load and register widgets
		 *
		 * @access public
		 * @since  1.0.0
		 */
		public function registerWidgets() { // phpcs:ignore
			register_widget( 'YITH_WCAS_Ajax_Search_Widget' );
		}


		/**
		 * Perform ajax search products
		 */
		public function ajax_search_products() {
			global $woocommerce;
			$time_start         = getmicrotime();
			$transient_enabled  = get_option( 'yith_wcas_enable_transient', 'no' );
			$transient_duration = get_option( 'yith_wcas_transient_duration', 12 );

			$search_keyword = sanitize_text_field( wp_unslash( $_REQUEST['query'] ) );  //phpcs:ignore

			$ordering_args = $woocommerce->query->get_catalog_ordering_args( 'title', 'asc' );
			$suggestions   = array();

			$transient_name = 'ywcas_' . $search_keyword;
			$suggestions    = get_transient( $transient_name );
			if ( 'no' === $transient_enabled || false === $suggestions ) {
				$suggestions = array();
				$args = array(
					's'                   => apply_filters( 'yith_wcas_ajax_search_products_search_query', $search_keyword ),
					'post_type'           => 'product',
					'post_status'         => 'publish',
					'ignore_sticky_posts' => 1,
					'orderby'             => $ordering_args['orderby'],
					'order'               => $ordering_args['order'],
					'posts_per_page'      => apply_filters( 'yith_wcas_ajax_search_products_posts_per_page', get_option( 'yith_wcas_posts_per_page' ) ),
					'suppress_filters'    => false,
				);

				if ( isset( $_REQUEST['product_cat'] ) ) {  //phpcs:ignore
					$args['tax_query'] = array(  //phpcs:ignore
						'relation' => 'AND',
						array(
							'taxonomy' => 'product_cat',
							'field'    => 'slug',
							'terms'    => sanitize_text_field( wp_unslash( $_REQUEST['product_cat'] ) ),   //phpcs:ignore
						),
					);
				}

				if ( version_compare( WC()->version, '2.7.0', '<' ) ) {
					$args['meta_query'] = array(  //phpcs:ignore
						array(
							'key'     => '_visibility',
							'value'   => array( 'search', 'visible' ),
							'compare' => 'IN',
						),
					);
				} else {
					$product_visibility_term_ids = wc_get_product_visibility_term_ids();
					$args['tax_query'][]         = array(
						'taxonomy' => 'product_visibility',
						'field'    => 'term_taxonomy_id',
						'terms'    => $product_visibility_term_ids['exclude-from-search'],
						'operator' => 'NOT IN',
					);
				}

                $products = get_posts( $args );

                global $wpdb;
                $include = [];
				foreach($wpdb->get_results("SELECT wp_posts.*
					 FROM wp_posts LEFT JOIN wp_postmeta ON ( wp_posts.ID = wp_postmeta.post_id )
					 WHERE ( 
  wp_posts.ID NOT IN (
				SELECT object_id
				FROM wp_term_relationships
				WHERE term_taxonomy_id IN (6)
			)
) AND ( 
  ( wp_postmeta.meta_key = '_sku' AND wp_postmeta.meta_value LIKE '%".trim($args['s'])."%' )
) AND wp_posts.post_type IN ('product', 'product_variation') AND ((wp_posts.post_status = 'publish'))") as $product){
                    $include[] = $product->post_type == 'product' ? $product->ID : $product->post_parent;
                }

                if(!empty($include)){
                    $args['include'] = $include;
                    unset($args['s']);
                    $products = array_merge($products, get_posts($args));
                }

				if ( ! empty( $products ) ) {
					foreach ( $products as $post ) {
						$product = wc_get_product( $post );
                        $attributes = '<ul>';
                        foreach($product->get_attributes() as $attr){
                            $attributes .= '<li>'.wc_attribute_label($attr['name'], $product).': '.$product->get_attribute($attr['name']).'</li>';
                        }
                        $attributes .= '</ul>';

						$suggestions[] = apply_filters(
							'yith_wcas_suggestion',
							array(
								'id'    => $product->get_id(),
								'value' => wp_strip_all_tags( $product->get_title() ),
								'url'   => $product->get_permalink(),
								'price' => $product->get_price_html(),
								'img'   => $product->get_image('thumbnail', [], true),
								'attributes'   => $attributes,
							),
							$product
						);
					}
				} else {
					$suggestions[] = array(
						'id'    => - 1,
						'value' => __( 'No results', 'yith-woocommerce-ajax-search' ),
						'url'   => '',
					);
				}
				wp_reset_postdata();

				if ( 'yes' === $transient_enabled ) {
					set_transient( $transient_name, $suggestions, $transient_duration * HOUR_IN_SECONDS );
				}
			}

			$time_end    = getmicrotime();
			$time        = $time_end - $time_start;
			$suggestions = array(
				'suggestions' => $suggestions,
				'time'        => $time,
			);
			echo wp_json_encode( $suggestions );
			die();

		}

		/***
		 * Declare support for WooCommerce features.
		 */
		public function declare_wc_features_support() {
			if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
				\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', YITH_WCAS_FREE_INIT, true );
			}
		}

	}
}
