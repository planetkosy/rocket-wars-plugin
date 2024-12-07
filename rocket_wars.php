<?php
/*
 * Plugin Name: Rocket-Wars
 * Plugin URI: https://github.com/planetkosy/rocket-wars-plugin
 * Description: Very simple Game like Space Invaders.
 * Version: 1.0
 * Author: planetkosy
 * Author URI: https://planetkosy.de/
 * Github: https://github.com/planetkosy
 * Tested on WordPress 6.7.1
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
*/

if (!defined('ABSPATH')) {
    exit;
}

include_once plugin_dir_path(__FILE__) . 'includes/rocket_wars_ajax.php';

function rocket_wars_shortcode()
{
    ob_start();
    include plugin_dir_path(__FILE__) . 'assets/html/index.html';
    $html = ob_get_clean();

    return $html;
}
add_shortcode('rocket_wars_game', 'rocket_wars_shortcode');

function rocket_wars_enqueue_scripts()
{
	$plugin_url = plugin_dir_url(__FILE__);
	
    wp_enqueue_style('rocket-wars-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', array(), filemtime(plugin_dir_path(__FILE__) . 'assets/css/style.css'));
    wp_enqueue_script('rocket-wars-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), filemtime(plugin_dir_path(__FILE__) . 'assets/js/script.js'), true);
    wp_enqueue_script('rocket-wars-ajax-handler', plugin_dir_url(__FILE__) . 'assets/js/ajax-handler.js', array('jquery'), filemtime(plugin_dir_path(__FILE__) . 'assets/js/ajax-handler.js'), true);

    wp_localize_script('rocket-wars-script', 'rocketWarsData', array(
		'pluginUrl' => plugin_dir_url(__FILE__),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('rocket_wars_nonce')
    ));
	
	wp_add_inline_style(
        'rocket-wars-style',
        "#space-game { background-image: url('{$plugin_url}assets/icons/rocket-wars.jpg'); }"
    );
}
add_action('wp_enqueue_scripts', 'rocket_wars_enqueue_scripts');

// Datenbank-Tabellen für Highscores erstellen
function rocket_wars_create_highscore_table()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'rocket_wars_highscores';

    // Prüfen, ob die Tabelle bereits existiert
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            difficulty ENUM('Easy', 'Normal', 'Hard') NOT NULL,
            name VARCHAR(3) NOT NULL,
            score INT NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
register_activation_hook(__FILE__, 'rocket_wars_create_highscore_table');