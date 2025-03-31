<?php

namespace WP_Rplg_Google_Reviews\Includes;

class View {

    public function render($feed_id, $businesses, $reviews, $options, $is_admin = false) {
        ob_start();

        if ($options->lazy_load_img) {
            wp_enqueue_script('blazy-js');
        }

        $max_width = $options->max_width;
        if (is_numeric($max_width)) {
            $max_width = $max_width . 'px';
        }
        $max_height = $options->max_height;
        if (is_numeric($max_height)) {
            $max_height = $max_height . 'px';
        }

        $style = '';
        if (isset($max_width) && strlen($max_width) > 0) {
            $style .= 'width:' . $max_width . '!important;';
        }
        if (isset($max_height) && strlen($max_height) > 0) {
            $style .= 'height:' . $max_height . '!important;overflow-y:auto!important;';
        }
        if ($options->centered) {
            $style .= 'margin:0 auto!important;';
        }

        ?>
        <div class="rplg"<?php if ($style) { ?> style="<?php echo $style;?>"<?php } ?> data-id="<?php echo $feed_id; ?>" data-layout="<?php echo $options->view_mode; ?>" data-exec="false">
        <?php
        switch ($options->view_mode) {
            case 'slider':
                $this->render_slider($businesses, $reviews, $options, $is_admin);
                break;
            case 'badge':
                $this->render_badge($businesses, $reviews, $options);
                break;
            case 'list':
                $this->render_list($businesses, $reviews, $options, $is_admin);
                break;
            default:
                $this->render_list($businesses, $reviews, $options, $is_admin);
        }
        ?>
        </div>
        <?php
        return preg_replace('/[\n\r]|(>)\s+(<)/', '$1$2', ob_get_clean());
    }

    private function render_slider($businesses, $reviews, $options, $is_admin = false) {
        ?>
        <?php if (count($businesses)) { ?>
            <div class="rplg-grid<?php if ($options->dark_theme) { ?> rplg-dark<?php } ?>">
                <?php
                if ($businesses[0]->provider == 'summary') {
                    ?>
                    <div class="rplg-grid-row rplg-businesses">
                        <div class="rplg-col rplg-col-12">
                            <?php
                            $this->business($businesses[0], $options);
                            array_shift($businesses);
                            ?>
                        </div>
                    </div>
                    <?php
                }
                ?>
                <div class="rplg-grid-row rplg-businesses">
                    <?php
                    $count = count($businesses);
                    switch ($count) {
                        case 1:
                            $col = 12;
                            break;
                        case 2:
                        case 4:
                            $col = 6;
                            break;
                        case 3:
                            $col = 3;
                            break;
                        default:
                            $col = 3;
                    }
                    if ($count > 0) {
                        foreach ($businesses as $business) {
                            $col_class = 'rplg-col-' . $col;
                            ?><div class="rplg-col <?php echo $col_class; ?>"><?php
                            $this->business($business, $options);
                            ?></div><?php
                        }
                    }
                    ?>
                </div>
            </div>
        <?php } ?>
        <div class="rplg-slider<?php if ($options->dark_theme) { ?> rplg-dark<?php } ?>">
            <div class="rplgsw-container">
                <div class="rplgsw-wrapper">
                    <?php foreach ($reviews as $review) { ?>
                        <div class="rplgsw-slide">
                            <?php $this->grw_slider_review($review, $options, $is_admin); ?>
                        </div>
                    <?php } ?>
                </div>
                <?php if (!$options->slider_hide_pagin) { ?>
                    <div class="rplgsw-pagination"></div>
                <?php } ?>
            </div>
            <?php if (!$options->slider_hide_nextprev) { ?>
                <div class="rplg-slider-prev"><span>&lsaquo;</span></div>
                <div class="rplg-slider-next"><span>&rsaquo;</span></div>
            <?php } ?>
        </div>
        <?php
        $this->js_loader('rplg_init_slider_theme', json_encode(
            array(
                'speed'             => ($options->slider_speed             ? $options->slider_speed              : 5) * 1000,
                'effect'            => $options->slider_effect             ? $options->slider_effect             : 'slide',
                'count'             => $options->slider_count              ? $options->slider_count              : 3,
                'space'             => $options->slider_space_between      ? $options->slider_space_between      : 40,
                'pagin'             => !$options->slider_hide_pagin        || true,
                'nextprev'          => !$options->slider_hide_nextprev     || true,
                'mobileBreakpoint'  => $options->slider_mobile_breakpoint  ? $options->slider_mobile_breakpoint  : 500,
                'mobileCount'       => $options->slider_mobile_count       ? $options->slider_mobile_count       : 1,
                'tabletBreakpoint'  => $options->slider_tablet_breakpoint  ? $options->slider_tablet_breakpoint  : 800,
                'tabletCount'       => $options->slider_tablet_count       ? $options->slider_tablet_count       : 2,
                'desktopBreakpoint' => $options->slider_desktop_breakpoint ? $options->slider_desktop_breakpoint : 1024,
                'desktopCount'      => $options->slider_desktop_count      ? $options->slider_desktop_count      : 3
            )
        ));
    }

    private function business($business, $options) {
        $hide_photo    = $options->header_hide_photo;
        $hide_name     = $options->header_hide_name;
        $hide_count    = $options->header_hide_count;
        $open_link     = $options->open_link;
        $nofollow_link = $options->nofollow_link;
        $lazy_load_img = $options->lazy_load_img;

        $rich_snippets = false;
        $business_name = $business->name;
        $business_photo = '';
        if ($options->schema_rating && $options->schema_rating == $business->id) {
            $this->render_schema_fields($options);
            $rich_snippets = true;
            $business_name = '<span itemprop="name">' . $business->name . '</span>';
            $business_photo = '<meta itemprop="image" content="' . ($this->correct_url_proto($business->photo)) . '" name="' . $business->name . '"/>';
        }
        ?>
        <div class="rplg-box">
            <div class="rplg-row">
                <?php if (!$hide_photo) { ?>
                    <div class="rplg-row-left">
                        <?php $this->image($business->photo, $business->name, $lazy_load_img); echo $business_photo; ?>
                    </div>
                <?php } ?>
                <div class="rplg-row-right">
                    <?php if (!$hide_name) { ?>
                        <div class="rplg-biz-name rplg-trim">
                            <?php $this->anchor($business->url, '', $business_name, $open_link, $nofollow_link); ?>
                        </div>
                        <?php
                    }
                    $this->render_rating($business, $options, $rich_snippets);
                    $this->render_action_links($business, $options);
                    ?>
                </div>
                <span class="rplg-review-badge" data-badge="<?php echo $business->provider; ?>"></span>
            </div>
        </div>
        <?php
    }

    private function render_schema_fields($options) {
        ?>
        <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <meta itemprop="streetAddress" content="<?php echo $options->schema_address_street; ?>"/>
            <meta itemprop="addressLocality" content="<?php echo $options->schema_address_locality; ?>"/>
            <meta itemprop="addressRegion" content="<?php echo $options->schema_address_region; ?>"/>
            <meta itemprop="postalCode" content="<?php echo $options->schema_address_zip; ?>"/>
            <meta itemprop="addressCountry" content="<?php echo $options->schema_address_country; ?>"/>
        </span>
        <meta itemprop="priceRange" content="<?php echo $options->schema_price_range; ?>"/>
        <meta itemprop="telephone" content="<?php echo $options->schema_phone; ?>"/>
        <?php
    }

    private function render_rating($business, $options, $rich_snippets = false, $reviews_count = true) {
        $aggregate_rating = '';
        $rating_value = '';
        if ($rich_snippets) {
            $aggregate_rating  = 'itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating"';
            $rating_value = 'itemprop="ratingValue"';
        }
        if ($business->rating > 0) {
            ?>
            <div <?php echo $aggregate_rating; ?>>
                <div class="rplg-biz-rating rplg-trim rplg-biz-<?php echo $business->provider; ?>">
                    <div class="rplg-biz-score" <?php echo $rating_value; ?>><?php echo $business->rating; ?></div>
                    <?php $this->stars($business->rating, $business->provider, '#0caa41'); ?>
                </div>
                <?php
                if (!$options->header_hide_count && $reviews_count) {
                    $this->render_based_on_reviews($business, $rich_snippets);
                }
                ?>
            </div>
            <?php
        } else {
            ?>
            <div>
                <div class="rplg-biz-rating rplg-trim rplg-biz-<?php echo $business->provider; ?>">
                    <?php $this->stars($business->rating, $business->provider, '#0caa41'); ?>
                </div>
            </div>
            <?php
        }
    }

    private function render_action_links($business, $options, $in_menu = false) {
        if ($business->provider != 'summary') {
            ?><div class="rplg-links"><?php
            if (!$options->header_hide_seeall) {
                $this->get_allreview_link($business, $options->google_def_rev_link, $in_menu);
            }
            if (!$options->header_hide_write) {
                $this->get_writereview_link($business, $in_menu);
            }
            ?></div><?php
        }
    }

    private function get_allreview_link($business, $google_def_rev_link, $in_menu = false) {
        ?><a href="<?php echo $this->get_allreview_url($business, $google_def_rev_link); ?>" target="_blank" rel="nofollow noopener" onclick="<?php if ($in_menu) { ?>this.parentNode.parentNode.style.display='none';<?php } ?>return true;"><?php echo __('See all reviews', 'widget-google-reviews'); ?></a><?php
    }

    private function get_writereview_link($business, $in_menu = false) {
        ?><a href="javascript:void(0)" onclick="<?php if ($in_menu) { ?>this.parentNode.parentNode.style.display='none';<?php } ?>_rplg_popup('<?php echo $this->get_writereview_url($business); ?>', 800, 600)" rel="nofollow"><?php echo __('Write a review', 'widget-google-reviews'); ?></a><?php
    }

    private function stars($rating, $provider = '', $color = '#777') {
        ?><div class="rplg-stars" data-info="<?php echo $rating . ',' . $provider . ',' . $color ?>"></div><?php
    }

    private function render_based_on_reviews($business, $rich_snippets = false) {
        $review_count = isset($business->review_count_manual) && $business->review_count_manual > 0
            ? $business->review_count_manual : $business->review_count;

        if ($rich_snippets) {
            $review_count = '<span itemprop="ratingCount">' . $review_count . '</span>';
        }
        ?>
        <div class="rplg-biz-based rplg-trim">
            <span class="rplg-biz-based-text"><?php printf(esc_html__('Based on %s reviews', 'widget-google-reviews'), $review_count); ?></span>
            <?php if ($rich_snippets) { ?>
                <meta itemprop="bestRating" content="5"/>
            <?php } ?>
        </div>
        <?php
    }

    private function render_list($businesses, $reviews, $options, $is_admin = false) {
        ?>
        <div class="rplg-list2<?php if ($options->dark_theme) { ?> rplg-dark<?php } ?>">
            <div class="rplg-businesses">
                <?php
                foreach ($businesses as $business) {
                    $this->business($business, $options);
                }
                ?>
            </div>
            <div class="rplg-reviews">
                <?php
                $hide_review = false;
                if (count($reviews) > 0) {
                    $i = 0;
                    foreach ($reviews as $review) {
                        if ($options->pagination > 0 && $options->pagination <= $i++) {
                            $hide_review = true;
                        }
                        $this->review($review, $options, true, $hide_review);
                    }
                }
                ?>
            </div>
            <?php
            if ($options->pagination > 0 && $hide_review) {
                $this->anchor('#', 'rplg-url', __('Next Reviews', 'brb'), false, false, 'return rplg_next_reviews.call(this, ' . $options->pagination . ');');
            }
            ?>
        </div>
        <?php
        $this->js_loader('rplg_init_list_theme');
    }

    private function review($review, $options, $stars_in_body=false, $hide_review=false) {
        ?>
        <div class="rplg-box<?php if ($hide_review) { ?> rplg-hide<?php } ?>">
            <div class="rplg-row">
                <?php if (!$options->hide_avatar) { ?>
                    <div class="rplg-row-left">
                        <?php $this->author_avatar($review, $options); ?>
                    </div>
                <?php } ?>
                <div class="rplg-row-right">
                    <?php
                    $this->author_name($review, $options);
                    if (!$stars_in_body) {
                        $this->stars($review->rating, $review->provider);
                    }
                    $this->review_time($review, $options);
                    ?>
                </div>
            </div>
            <div class="rplg-box-content">
                <?php if ($stars_in_body) {
                    $this->stars($review->rating, $review->provider);
                } ?>
                <span class="rplg-review-text"><?php if (isset($review->text)) { $this->trim_text($review->text, $options->text_size); } ?></span>
                <span class="rplg-review-badge" data-badge="<?php echo $review->provider; ?>"></span>
            </div>
        </div>
        <?php
    }

    private function _strrpos($haystack, $needle, $offset = 0) {
        return function_exists('mb_strrpos') ? mb_strrpos($haystack, $needle, $offset, 'UTF-8') : strrpos($haystack, $needle, $offset);
    }

    private function trim_text($text, $size) {
        if ($size > 0 && $this->_strlen($text) > $size) {
            $sub_text = $this->_substr($text, 0, $size);
            $idx = $this->_strrpos($sub_text, ' ') + 1;

            if ($idx < 1 || $size - $idx > ($size / 2)) {
                $idx = $size;
            }
            if ($idx > 0) {
                $visible_text = $this->_substr($text, 0, $idx - 1);
                $invisible_text = $this->_substr($text, $idx - 1, $this->_strlen($text));
            }
            echo $visible_text;
            if ($this->_strlen($invisible_text) > 0) {
                ?><span>... </span><span class="rplg-more"><?php echo $invisible_text; ?></span><span class="rplg-more-toggle"><?php echo __('read more', 'brb'); ?></span><?php
            }
        } else {
            echo $text;
        }
    }

    private function review_time($review, $opts) {
        if (!$opts->disable_review_time) {
            if (strlen($opts->time_format) > 0) {
                $attr = '';
                $format = $opts->time_format;
            } else {
                $attr = 'data-time="' . $review->time . '"';
                $format = "H:i d M y";
            }
            ?><div class="rplg-review-time rplg-trim" <?php echo $attr; ?>><?php echo gmdate($format, $review->time); ?></div><?php
        }
    }

    private function author_avatar($review, $opts, $img_width='56', $img_height='56') {
        switch ($review->provider) {
            case 'google':
                $regexp = '/googleusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\/photo\.jpg/';
                $matches = array();
                preg_match($regexp, $review->author_avatar, $matches, PREG_OFFSET_CAPTURE);
                if (count($matches) > 4 && $matches[3][0] == 'AAAAAAAAAAA') {
                    $review->author_avatar = str_replace('/photo.jpg', '/s128-c0x00000000-cc-rp-mo/photo.jpg', $review->author_avatar);
                }
                if (strlen($review->author_avatar) > 0) {
                    if (strpos($review->author_avatar, "s128") != false) {
                        $review->author_avatar = str_replace('s128', 's' . $opts->reviewer_avatar_size, $review->author_avatar);
                    } elseif (strpos($review->author_avatar, "-mo") != false) {
                        $review->author_avatar = str_replace('-mo', '-mo-s' . $opts->reviewer_avatar_size, $review->author_avatar);
                    } else {
                        $review->author_avatar = str_replace('-rp', '-rp-s' . $opts->reviewer_avatar_size, $review->author_avatar);
                    }
                }
                $default_avatar = BRB_GOOGLE_AVATAR;
                break;
            case 'facebook':
                $default_avatar = BRB_FACEBOOK_AVATAR;
                break;
            case 'yelp':
                if (strlen($review->author_avatar) > 0) {
                    $avatar_size = '';
                    if ($opts->reviewer_avatar_size <= 128) {
                        $avatar_size = 'ms';
                    } else {
                        $avatar_size = 'o';
                    }
                    $review->author_avatar = str_replace('ms.jpg', $avatar_size . '.jpg', $review->author_avatar);
                }
                $default_avatar = BRB_YELP_AVATAR;
                break;
        }
        $author_avatar = strlen($review->author_avatar) > 0 ? $review->author_avatar : $default_avatar;
        $author_name = $opts->short_last_name ? $this->get_short_last_name($review->author_name) : $review->author_name;
        $this->image($author_avatar, $author_name, $opts->lazy_load_img, $img_width, $img_height, $default_avatar);
    }

    private function author_name($review, $opts) {
        if ($opts->hide_name) {
            return;
        }

        $author_name = $this->short_last_name($review, $opts->short_last_name);

        if (strlen($review->author_url) > 0 && !$opts->disable_user_link) {
            $this->anchor($review->author_url, 'rplg-review-name rplg-trim', $author_name, $opts->open_link, $opts->nofollow_link, '', $author_name);
        } else {
            echo '<div class="rplg-review-name rplg-trim" title="' . $author_name . '">' . $author_name . '</div>';
        }
    }

    private function short_last_name($review, $short_last_name) {
        if ($this->_strlen($review->author_name) > 0) {
            return $short_last_name ? $this->get_short_last_name($review->author_name) : $review->author_name;
        } else {
            return __(ucfirst($review->provider) . ' User', 'brb');
        }
    }

    private function get_short_last_name($author_name){
        $names = explode(" ", $author_name);
        if (count($names) > 1) {
            $last_index = count($names) - 1;
            $last_name = $names[$last_index];
            if ($this->_strlen($last_name) > 1) {
                $last_char = $this->_substr($last_name, 0, 1);
                $last_name = $this->_strtoupper($last_char) . ".";
                $names[$last_index] = $last_name;
                return implode(" ", $names);
            }
        }
        return $author_name;
    }

    private function _substr($str, $start, $length = NULL) {
        return function_exists('mb_substr') ? mb_substr($str, $start, $length, 'UTF-8') : substr($str, $start, $length);
    }

    private function _strtoupper($str) {
        return function_exists('mb_strtoupper') ? mb_strtoupper($str, 'UTF-8') : strtoupper($str);
    }

    private function anchor($url, $class, $text, $open_link, $nofollow_link, $onclick = '', $title = '') {
        ?><a href="<?php echo $url; ?>" class="<?php echo $class; ?>" <?php if ($open_link) { ?>target="_blank" rel="noopener"<?php } ?> <?php if ($nofollow_link) { ?>rel="nofollow"<?php } ?> <?php if (strlen($onclick) > 0) { ?>onclick="<?php echo $onclick; ?>"<?php } ?> <?php if ($this->_strlen($title) > 0) { ?>title="<?php echo $title; ?>"<?php } ?>><?php echo $text; ?></a><?php
    }

    private function _strlen($str) {
        return function_exists('mb_strlen') ? mb_strlen($str, 'UTF-8') : strlen($str);
    }

    private function render_badge($businesses, $reviews, $options) {
        ?>
        <div class="rplg-badge-cnt
                    <?php if ($options->view_mode != 'badge_inner') { ?> rplg-<?php echo $options->view_mode; ?>-fixed<?php } ?>
                    <?php if ($options->badge_center) { ?> rplg-badge-center<?php } ?>
                    <?php if ($options->hide_float_badge) { ?> rplg-badge-hide<?php } ?>
        ">
            <?php foreach ($businesses as $business) { ?>
                <div class="rplg-badge2<?php if ($options->badge_display_block) { ?> rplg-badge-block<?php } ?>"
                     <?php
                     if (strlen($options->badge_space_between) > 0) {
                     $space = $options->badge_space_between;
                     if (is_numeric($space)) {
                         $space = $space . 'px';
                     }
                     ?>style="margin:0 <?php echo $space . ' ' . $space; ?> 0!important;"<?php
                }
                ?>
                     data-provider="<?php echo $business->provider; ?>"
                >
                    <div class="rplg-badge2-border"></div>
                    <?php
                    $rich_snippets = false;
                    if ($options->schema_rating && $options->schema_rating == $business->id) {
                        echo '<meta itemprop="name" content="' . $business->name . '">' .
                            '<meta itemprop="image" content="' . ($this->correct_url_proto($business->photo)) . '" name="' . $business->name . '"/>';
                        $this->render_schema_fields($options);
                        $rich_snippets = true;
                    }
                    ?>
                    <div class="rplg-badge2-btn<?php if ($options->badge_click != 'disable') {?> rplg-badge2-clickable<?php } ?>"
                         <?php
                         if ($business->provider != 'summary') {
                         if ($options->badge_click == 'reviews') {
                         ?>onclick="window.open('<?php echo $this->get_allreview_url($business, $options->google_def_rev_link); ?>', '_blank');return false;"<?php
                         }
                         if ($options->badge_click == 'writereview') {
                         ?>onclick="_rplg_popup('<?php echo $this->get_writereview_url($business); ?>', 800, 600);return false;"<?php
                    }
                    }
                    ?>
                    >
                    <span class="rplg-badge-logo">
                        <?php
                        $provider_name = ucfirst($business->provider);
                        if ($business->provider == 'summary') {
                            $this->image($business->photo, $business->name, $options->lazy_load_img, '44', '44');
                            $provider_name = 'Social';
                        }
                        ?>
                    </span>
                        <div class="rplg-badge2-score">
                            <div><?php printf(esc_html__('Google Rating', 'widget-google-reviews'), $provider_name); ?></div>
                            <?php $this->render_rating($business, $options, $rich_snippets); ?>
                        </div>
                    </div>
                    <div class="rplg-form rplg-form-left" style="display:none">
                        <div class="rplg-form-head">
                            <div class="rplg-form-head-inner">
                                <div class="rplg-row">
                                    <?php if (!$options->header_hide_photo) { ?>
                                        <div class="rplg-row-left">
                                            <?php $this->image($business->photo, $business->name, $options->lazy_load_img, '50', '50'); ?>
                                        </div>
                                    <?php } ?>
                                    <div class="rplg-row-right rplg-trim">
                                        <?php
                                        echo $business->name;
                                        $this->render_rating($business, $options, false, false);
                                        ?>
                                    </div>
                                </div>
                            </div>
                            <button class="rplg-form-close" type="button" onclick="_rplg_get_parent(this, 'rplg-form').style.display='none'">×</button>
                        </div>
                        <div class="rplg-form-body"></div>
                        <div class="rplg-form-content">
                            <div class="rplg-form-content-inner">
                                <?php
                                    $this->grw_place_reviews($reviews, $options);
                                    $this->render_action_links($business, $options);
                                ?>
                            </div>
                        </div>
                        <div class="rplg-form-footer">
                            <img src="<?php echo GRW_ASSETS_URL; ?>img/powered_by_google_on_<?php if ($options->dark_theme) { ?>non_<?php } ?>white.png" alt="powered by Google" width="144" height="18" title="powered by Google">
                        </div>
                    </div>
                    <?php  if ($options->view_mode != 'badge_inner' && $options->badge_close) { echo '<div class="rplg-badge2-close">×</div>'; } ?>
                </div>
            <?php } ?>
        </div>
        <?php
        $this->js_loader('rplg_init_badge_theme');
    }

    private function correct_url_proto($url){
        return substr($url, 0, 2) == '//' ? 'https:' . $url : $url;
    }

    private function get_allreview_url($business, $google_def_rev_link) {
        switch ($business->provider) {
            case 'google':
                return $google_def_rev_link ? $business->url : 'https://search.google.com/local/reviews?placeid=' . $business->id;
            case 'facebook':
                return 'https://facebook.com/' . $business->id . '/reviews';
            case 'yelp':
                return $business->url;
        }
    }

    private function get_writereview_url($business) {
        switch ($business->provider) {
            case 'google':
                return 'https://search.google.com/local/writereview?placeid=' . $business->id;
            case 'facebook':
                return 'https://facebook.com/' . $business->id . '/reviews';
            case 'yelp':
                return 'https://www.yelp.com/writeareview/biz/' . $business->id;
        }
    }

    function image($src, $alt, $lazy, $width = '56', $height = '56', $def_ava = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', $atts = '') {
        ?><img <?php if ($lazy) { ?>src="<?php echo $def_ava; ?>" data-<?php } ?>src="<?php echo $src; ?>" class="rplg-review-avatar<?php if ($lazy) { ?> rplg-blazy<?php } ?>" alt="<?php echo $alt; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" title="<?php echo $alt; ?>" onerror="if(this.src!='<?php echo $def_ava; ?>')this.src='<?php echo $def_ava; ?>';" <?php echo $atts; ?>><?php
    }

    function grw_place_rating($rating, $review_count, $hide_based_on) {
        ?>
        <div>
            <span class="rplg-form-rating"><?php echo $rating; ?></span>
            <span class="rplg-form-stars"><?php $this->grw_stars($rating); ?></span>
        </div>
        <?php if (!$hide_based_on && isset($review_count)) { ?>
        <div class="rplg-form-powered"><?php echo vsprintf(__('Based on %s reviews', 'widget-google-reviews'), $this->grw_array($review_count)); ?></div>
        <?php }
    }

    function grw_place_reviews($reviews, $options, $is_admin = false) {
        ?>
        <?php
        $place_id = null;
        $place_url = null;

        $hr = false;
        if (count($reviews) > 0) {
            $i = 0;
            foreach ($reviews as $review) {
                if (!$place_id) {
                    $place_id = $review->biz_id;
                    $place_url = $review->biz_url;
                }
                if ($options->pagination > 0 && $options->pagination <= $i++) {
                    $hr = true;
                }
                $this->grw_place_review($review, $hr, $options, $is_admin);
            }
        }
    }

    function grw_place_review($review, $hr, $options, $is_admin = false) {
        ?>
        <div class="rplg-form-review<?php if ($hr) { echo ' rplg-form-hide'; } if ($is_admin && $review->hide != '') { echo ' wp-review-hidden'; } ?>">
            <div class="rplg-row rplg-row-start">
                <?php if (!$options->hide_avatar) { ?>
                <div class="rplg-row-left">
                    <?php
                    $default_avatar = GRW_ASSETS_URL . 'img/guest.png';
                    if (strlen($review->author_avatar) > 0) {
                        $author_avatar = $review->author_avatar;
                    } else {
                        $author_avatar = $default_avatar;
                    }
                    if (isset($options->reviewer_avatar_size)) {
                        $author_avatar = str_replace('s128', 's' . $options->reviewer_avatar_size, $author_avatar);
                        $default_avatar = str_replace('s128', 's' . $options->reviewer_avatar_size, $default_avatar);
                    }
                    $this->grw_image($author_avatar, $review->author_name, $options->lazy_load_img, $default_avatar);
                    ?>
                </div>
                <?php } ?>
                <div class="rplg-row-right">
                    <?php
                    if (strlen($review->author_url) > 0) {
                        $this->grw_anchor($review->author_url, 'rplg-review-name rplg-trim', $review->author_name, $options->open_link, $options->nofollow_link);
                    } else {
                        if (strlen($review->author_name) > 0) {
                            $author_name = $review->author_name;
                        } else {
                            $author_name = __('Google User', 'widget-google-reviews');
                        }
                        ?><div class="rplg-review-name rplg-trim"><?php echo $author_name; ?></div><?php
                    }
                    ?>
                    <div class="rplg-review-time rplg-trim" data-time="<?php echo $review->time; ?>"><?php echo gmdate("H:i d M y", $review->time); ?></div>
                    <div class="rplg-box-content">
                        <span class="rplg-form-stars"><?php echo $this->grw_stars($review->rating); ?></span>
                        <span class="rplg-form-text"><?php echo $this->grw_trim_text($review->text, $options->text_size); ?></span>
                    </div>
                    <?php if ($is_admin) {
                        echo '<a href="#" class="wp-review-hide" data-id=' . $review->id . '>' . ($review->hide == '' ? 'Hide' : 'Show') . ' review</a>';
                    } ?>
                </div>
            </div>
        </div>
        <?php
    }

    function grw_slider_review($review, $options, $is_admin = false) {
        ?>
        <div class="rplg-form-review<?php if ($is_admin && $review->hide != '') { echo ' wp-review-hidden'; } ?>">
            <div class="rplg-row rplg-row-start">
                <div class="rplg-form-left">
                    <?php
                    // Google reviewer avatar
                    $default_avatar = GRW_ASSETS_URL . 'img/guest.png';
                    if (strlen($review->author_avatar) > 0) {
                        $author_avatar = $review->author_avatar;
                    } else {
                        $author_avatar = $default_avatar;
                    }
                    if (isset($options->reviewer_avatar_size)) {
                        $author_avatar = str_replace('s128', 's' . $options->reviewer_avatar_size, $author_avatar);
                        $default_avatar = str_replace('s128', 's' . $options->reviewer_avatar_size, $default_avatar);
                    }
                    $this->grw_image($author_avatar, $review->author_name, $options->lazy_load_img, $default_avatar);

                    // Google reviewer name
                    if (strlen($review->author_url) > 0) {
                        $this->grw_anchor($review->author_url, 'rplg-form-name', $review->author_name, $options->open_link, $options->nofollow_link);
                    } else {
                        if (strlen($review->author_name) > 0) {
                            $author_name = $review->author_name;
                        } else {
                            $author_name = __('Google User', 'widget-google-reviews');
                        }
                        ?><div class="rplg-form-name"><?php echo $author_name; ?></div><?php
                    }
                    ?>
                    <div class="rplg-form-time" data-time="<?php echo $review->time; ?>"><?php echo gmdate("H:i d M y", $review->time); ?></div>
                </div>
                <div class="rplg-form-stars"><?php echo $this->grw_stars($review->rating); ?></div>
                <div>
                    <div class="rplg-form-feedback" <?php if (strlen($options->slider_text_height) > 0) {?> style="height:<?php echo $options->slider_text_height; ?>!important"<?php } ?>>
                        <?php if (strlen($review->text) > 0) { ?>
                        <span class="rplg-form-text"><?php echo $this->grw_trim_text($review->text, $options->text_size); ?></span>
                        <?php } ?>
                    </div>
                    <?php if ($is_admin) {
                        echo '<a href="#" class="wp-review-hide" data-id=' . $review->id . '>' . ($review->hide == '' ? 'Hide' : 'Show') . ' review</a>';
                    } ?>
                </div>
            </div>
        </div>
        <?php
    }

    function grw_stars($rating) {
        ?><span class="wp-stars"><?php
        foreach (array(1,2,3,4,5) as $val) {
            $score = $rating - $val;
            if ($score >= 0) {
                ?><span class="wp-star"><svg width="17" height="17" viewBox="0 0 1792 1792"><path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="#fb8e28"></path></svg></span><?php
            } else if ($score > -1 && $score < 0) {
                ?><span class="wp-star"><svg width="17" height="17" viewBox="0 0 1792 1792"><path d="M1250 957l257-250-356-52-66-10-30-60-159-322v963l59 31 318 168-60-355-12-66zm452-262l-363 354 86 500q5 33-6 51.5t-34 18.5q-17 0-40-12l-449-236-449 236q-23 12-40 12-23 0-34-18.5t-6-51.5l86-500-364-354q-32-32-23-59.5t54-34.5l502-73 225-455q20-41 49-41 28 0 49 41l225 455 502 73q45 7 54 34.5t-24 59.5z" fill="#fb8e28"></path></svg></span><?php
            } else {
                ?><span class="wp-star"><svg width="17" height="17" viewBox="0 0 1792 1792"><path d="M1201 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="#ccc"></path></svg></span><?php
            }
        }
        ?></span><?php
    }

    function grw_anchor($url, $class, $text, $open_link, $nofollow_link) {
        echo '<a href="' . $url . '"' . ($class ? ' class="' . $class . '"' : '') . ($open_link ? ' target="_blank"' : '') . ' rel="' . ($nofollow_link ? 'nofollow ' : '') . 'noopener">' . $text . '</a>';
    }

    function grw_image($src, $alt, $lazy, $def_ava = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', $atts = '') {
        ?><img <?php if ($lazy) { ?>src="<?php echo $def_ava; ?>" data-<?php } ?>src="<?php echo $src; ?>" class="rplg-review-avatar<?php if ($lazy) { ?> rplg-blazy<?php } ?>" alt="<?php echo $alt; ?>" width="50" height="50" title="<?php echo $alt; ?>" onerror="if(this.src!='<?php echo $def_ava; ?>')this.src='<?php echo $def_ava; ?>';" <?php echo $atts; ?>><?php
    }

    private function js_loader($func, $data = '') {
        ?><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" onload="(function(el, data) { var t = setInterval(function () { if (window.<?php echo $func; ?>){ <?php echo $func; ?>(el, data); clearInterval(t); } }, 200); })(this.parentNode<?php if (strlen($data) > 0) { ?>, <?php echo str_replace('"', '\'', $data); } ?>);" data-exec="false" style="display:none"><?php
    }

    function grw_trim_text($text, $size) {
        if ($size > 0 && $this->grw_strlen($text) > $size) {
            $sub_text = $this->grw_substr($text, 0, $size);
            $idx = $this->grw_strrpos($sub_text, ' ') + 1;

            if ($idx < 1 || $size - $idx > ($size / 2)) {
                $idx = $size;
            }
            if ($idx > 0) {
                $visible_text = $this->grw_substr($text, 0, $idx - 1);
                $invisible_text = $this->grw_substr($text, $idx - 1, $this->grw_strlen($text));
            }
            echo $visible_text;
            if ($this->grw_strlen($invisible_text) > 0) {
                ?><span>... </span><span class="wp-more"><?php echo $invisible_text; ?></span><span class="wp-more-toggle"><?php echo __('read more', 'widget-google-reviews'); ?></span><?php
            }
        } else {
            echo $text;
        }
    }

    function grw_strlen($str) {
        return function_exists('mb_strlen') ? mb_strlen($str, 'UTF-8') : strlen($str);
    }

    function grw_strrpos($haystack, $needle, $offset = 0) {
        return function_exists('mb_strrpos') ? mb_strrpos($haystack, $needle, $offset, 'UTF-8') : strrpos($haystack, $needle, $offset);
    }

    function grw_substr($str, $start, $length = NULL) {
        return function_exists('mb_substr') ? mb_substr($str, $start, $length, 'UTF-8') : substr($str, $start, $length);
    }

    function grw_array($params=null) {
        if (!is_array($params)) {
            $params = func_get_args();
            $params = array_slice($params, 0);
        }
        return $params;
    }
}
