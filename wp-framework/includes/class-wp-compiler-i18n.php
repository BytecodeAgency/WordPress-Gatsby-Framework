<?php
// Define the internationalization functionality
class BCWP_Compiler_i18n {
	// Load the plugin text domain for translation.
	public function load_plugin_textdomain() {
		load_plugin_textdomain(
			'wp-compiler',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);
	}
}
