<?php

class BCWP_Compiler_Activator {

	// Fired during activation.
	public static function activate() {
		if(!function_exists('the_field')) {
			wp_die("ACF has to be active for this plugin to work.");
		}
	}

}
