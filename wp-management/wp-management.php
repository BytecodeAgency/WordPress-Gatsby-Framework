<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://bytecode.nl
 * @since             1.0.0
 * @package           BCWP_Managed
 *
 * @wordpress-plugin
 * Plugin Name:       Bytecode Digital Agency Managed
 * Plugin URI:        https://bytecode.nl
 * Description:       The plugin to integrate functionalities for websites managed by Bytecode Digital Agency.
 * Version:           0.1.0
 * Author:            Bytecode Digital Agency
 * Author URI:        https://bytecode.nl
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-managed
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'BCWP_MANAGED_VERSION', '0.1.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wp-managed-activator.php
 */
function activate_wp_managed() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-managed-activator.php';
	BCWP_Managed_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wp-managed-deactivator.php
 */
function deactivate_wp_managed() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-managed-deactivator.php';
	BCWP_Managed_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wp_managed' );
register_deactivation_hook( __FILE__, 'deactivate_wp_managed' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-wp-managed.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_managed() {

	$plugin = new BCWP_Managed();
	$plugin->run();

}
run_wp_managed();
