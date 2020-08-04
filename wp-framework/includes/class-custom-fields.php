<?php

class Custom_Fields_Handler {

	public function __construct() {
		$this->add_custom_fields();
	}

    public function createOptionsPage($name) {
        acf_add_options_page(array(
            'page_title' => $name,
        ));
    }

    public function acf_json_save_point() {
        return plugin_dir_path(__DIR__) . 'acf';
    }

    public function acf_json_load_point($paths) {
        $paths[] = plugin_dir_path(__DIR__) . 'acf';
        return $paths;
    }

    public function addGoogleApiKeyThroughField() {
        acf_update_setting('google_api_key', get_field('maps_api_key', 'option'));
	}

	private function add_custom_fields() {
		add_filter('acf/settings/save_json', array($this, 'acf_json_save_point'));
		add_filter('acf/settings/load_json', array($this, 'acf_json_load_point'));
		add_action('acf/init', array($this, 'addGoogleApiKeyThroughField'));
		$this->createOptionsPage("Theme Options");
		$this->createOptionsPage("Website Options");
	}

}
