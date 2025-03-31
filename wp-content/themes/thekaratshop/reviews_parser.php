<?php
require_once('vendor/autoload.php');
require_once '../../../wp-load.php';
global $wpdb;
$lastRreviewTimestamp = $wpdb->get_var ("SELECT `time` FROM `wp_grp_google_review` WHERE 1 ORDER BY `time` DESC LIMIT 1;");
//$results = array_reverse(json_decode(file_get_contents('reviews.json'), true));
//foreach(array_reverse($results) as $review){
//    $wpdb->insert('wp_grp_google_review', ['google_place_id' => 1, 'rating' => $review['review_rating'], 'text' => $review['review_text'], 'time' => $review['review_timestamp'], 'language' => 'en', 'author_name' => $review['author_title'], 'author_url' => $review['author_link'], 'profile_photo_url' => $review['author_image'], 'hide' => ''], ['%d', '%d', '%s', '%d', '%s', '%s', '%s', '%s', '%s']);
//}
//die();

$client = new OutscraperClient("MDY4MGRlYzBhODA4NDY4NGI4YTNlYTg2ZTI4YTUwMTh8MjczY2YzM2NiOA");
# Get reviews of the specific place by id
$results = $client->google_maps_reviews(['ChIJ2VY9mQEp6IkRhKMu2IZjDeE'], 'en', NULL, 1,
    100, NULL, $lastRreviewTimestamp, NULL,
    "newest", NULL, FALSE,
    NULL, FALSE, NULL
);

foreach($results as $place){
    $wpdb->update( 'wp_grp_google_place',
        ['rating' => $place['rating'], 'review_count' => $place['reviews']],
        ['id' => 1]
    );
    $wpdb->update( 'wp_grp_google_stats',
        ['time' => time(), 'rating' => $place['rating'], 'review_count' => $place['reviews']],
        ['id' => 1]
    );

    foreach(array_reverse($place['reviews_data']) as $review){
        $wpdb->insert('wp_grp_google_review', ['google_place_id' => 1, 'rating' => $review['review_rating'], 'text' => $review['review_text'], 'time' => $review['review_timestamp'], 'language' => 'en', 'author_name' => $review['author_title'], 'author_url' => $review['author_link'], 'profile_photo_url' => $review['author_image'], 'hide' => ''], ['%d', '%d', '%s', '%d', '%s', '%s', '%s', '%s', '%s']);
    }

    $wpdb->delete('wp_options', ['option_name' => '_transient_grw_feed_2.8_6_reviews']);

//    $data = get_option('_transient_grw_feed_2.8_6_reviews');
//    $data['businesses'][0]->rating = $place['rating'];
//    $data['businesses'][0]->review_count = $place['reviews'];
//    $data['reviews'] = [];
//    foreach($wpdb->get_results("SELECT * FROM `wp_grp_google_review` ORDER BY `id` DESC") as $review){
//        $data['reviews'][] = (object)[
//            'id' => $review->id,
//            'hide' => '',
//            'biz_id' => 'ChIJcx_VldEfm0cRw5NmB7biAIo',
//            'biz_url' => 'https://maps.google.com/?cid=9944197248670143427',
//            'rating' => $review->rating,
//            'text' => $review->text,
//            'author_avatar' => $review->profile_photo_url,
//            'author_url' =>  $review->author_url,
//            'author_name' => $review->author_name,
//            'time' => $review->time,
//            'provider' => 'google'
//        ];
//    }
//    update_option('_transient_grw_feed_2.8_6_reviews', $data);
};