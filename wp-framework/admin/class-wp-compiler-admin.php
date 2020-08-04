<?php

// The admin-specific functionality of the plugin.
class BCWP_Compiler_Admin {

	// The ID of this plugin.
	private $plugin_name;

	// The version of this plugin.
	private $version;

	// Initialize the class and set its properties.
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	// Register the stylesheets for the admin area.
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/wp-compiler-admin.css', array(), $this->version, 'all' );
	}

	// Register the JavaScript for the admin area.
	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/wp-compiler-admin.js', array( 'jquery' ), $this->version, false );
	}

	public function display_options_page() {
		include_once 'partials/wp-compiler-admin-display.php';
	}

	public function add_options_page_deploy() {
		add_options_page(
			'Deploy',
			'BCWP Management',
			'edit_pages',
			$this->plugin_name,
			array($this, 'display_options_page')
		);
	}

}
