<?php

/**
 * WordPress main plugin file.
 * @link              https://bytecode.nl
 * @wordpress-plugin
 * Plugin Name:       Bytecode Digital Agency Compiler
 * Plugin URI:        https://bytecode.nl
 * Description:       Plugin for headless WordPress with a React compiler.
 * Version:           0.3.0
 * Author:            Bytecode Digital Agency
 * Author URI:        https://bytecode.nl
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-compiler
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

// Currently plugin version uses SemVer.
define('BCWP_COMPILER_VERSION', '0.3.0');

// Code that runs during plugin activation
function activate_wp_compiler()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-wp-compiler-activator.php';
	BCWP_Compiler_Activator::activate();
}
register_activation_hook(__FILE__, 'activate_wp_compiler');

// Code that runs during plugin deactivation
function deactivate_wp_compiler()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-wp-compiler-deactivator.php';
	BCWP_Compiler_Deactivator::deactivate();
}
register_deactivation_hook(__FILE__, 'deactivate_wp_compiler');

// Require the class file that deligates all functionality.
require plugin_dir_path(__FILE__) . 'includes/class-wp-compiler.php';

// Begins execution of the plugin. See this as the main function of the plugin.
function run_wp_compiler()
{
	$plugin = new BCWP_Compiler();
}
run_wp_compiler();

function my_format_TinyMCE($in)
{
	$in['wpautop'] = false;
	return $in;
}
add_filter('tiny_mce_before_init', 'my_format_TinyMCE');

function acf_wysiwyg_remove_wpautop() {
    remove_filter('acf_the_content', 'wpautop' );
}
add_action('acf/init', 'acf_wysiwyg_remove_wpautop');
