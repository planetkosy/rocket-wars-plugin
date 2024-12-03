<?php
// AJAX-Handler für Highscore-Speicherung
function rocket_wars_save_highscore()
{
    check_ajax_referer('rocket_wars_nonce', 'security');

    if (!isset($_POST['difficulty'], $_POST['name'], $_POST['score'])) {
        wp_send_json_error('Invalid data.');
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'rocket_wars_highscores';

    $difficulty = sanitize_text_field($_POST['difficulty']);
    $name = strtoupper(substr(sanitize_text_field($_POST['name']), 0, 3));
    $score = intval($_POST['score']);

    $wpdb->insert(
        $table_name,
        array(
            'difficulty' => $difficulty,
            'name' => $name,
            'score' => $score,
        ),
        array('%s', '%s', '%d')
    );

    wp_send_json_success('Highscore saved!');
}
add_action('wp_ajax_save_highscore', 'rocket_wars_save_highscore');
add_action('wp_ajax_nopriv_save_highscore', 'rocket_wars_save_highscore');

// AJAX-Handler für Highscore-Abruf
function rocket_wars_load_highscores() {
    check_ajax_referer('rocket_wars_nonce', 'security');

    if (!isset($_POST['difficulty'])) {
        wp_send_json_error('Invalid data.');
    }

    global $wpdb;

    $difficulty = sanitize_text_field($_POST['difficulty']);
    $table_name = $wpdb->prefix . 'rocket_wars_highscores';

    $results = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT name, score FROM $table_name WHERE difficulty = %s ORDER BY score DESC LIMIT 10",
            $difficulty
        ),
        ARRAY_A
    );

    if (!empty($results)) {
        wp_send_json_success($results);
    } else {
        wp_send_json_error('No highscores found');
    }
}
add_action('wp_ajax_load_highscores', 'rocket_wars_load_highscores');
add_action('wp_ajax_nopriv_load_highscores', 'rocket_wars_load_highscores');