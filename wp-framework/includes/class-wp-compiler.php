<?php

// The core plugin class. This is used to define internationalization and admin-specific hooks.
class BCWP_Compiler {

	// The unique identifier of the plugin.
	protected $plugin_name;

	// The WordPress strip object of the plugin.
	protected $strip;

	// The acf handler of the plugin.
	protected $acf;

	// The form handler of the plugin.
	protected $forms;

	// The current version of the plugin.
	protected $version;

	// Define the core functionality of the plugin.
	public function __construct() {
		if (defined('BCWP_COMPILER_VERSION')) {
			$this->version = BCWP_COMPILER_VERSION;
		} else {
			$this->version = '9.9.9';
		}
		$this->plugin_name = 'wp-compiler';
		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
	}

	// Load the required dependencies for this plugin.
	private function load_dependencies() {

		// The class responsible for defining internationalization functionality of the plugin.
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-wp-compiler-i18n.php';

		// The class responsible for defining all actions that occur in the admin area.
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-wp-compiler-admin.php';

		// The class responsible for stripping WordPress functionality.
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-strip-wordpress.php';

		// The class responsible for loading custom field functionality.
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-custom-fields.php';

		// The class responsible for forms.
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-form-posts.php';

		// The class responsible for site-parsing.
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/parser/class-site-parser.php';

		$this->strip = new Strip_WordPress();
		$this->acf = new Custom_Fields_Handler();
		$this->forms = new Form_Handler();
	}

	// Define the locale for this plugin for internationalization.
	private function set_locale() {
		$plugin_i18n = new BCWP_Compiler_i18n();
		add_action('plugins_loaded', array($plugin_i18n, 'load_plugin_textdomain'));
	}

	// Register all of the hooks related to the admin area functionality of the plugin.
	private function define_admin_hooks() {
		$plugin_admin = new BCWP_Compiler_Admin( $this->get_plugin_name(), $this->get_version() );
		add_action('admin_enqueue_scripts', array($plugin_admin, 'enqueue_styles'));
		add_action('admin_enqueue_scripts', array($plugin_admin, 'enqueue_scripts'));
		add_action('admin_menu', array($plugin_admin, 'add_options_page_deploy'));
	}

	// The name of the plugin used to uniquely identify it within the context of WordPress and to define internationalization functionality.
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	// Retrieve the version number of the plugin.
	public function get_version() {
		return $this->version;
	}

}
