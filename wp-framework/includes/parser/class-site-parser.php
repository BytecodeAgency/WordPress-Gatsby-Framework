<?php
//Load all blocks for the parser
$path = dirname(__FILE__);
foreach (glob($path.'/blocks/*.php') as $filename){
    require_once $filename;
}

class Site_Parser {

	protected $pages;
	protected $theme;

    public function __construct($pages, $theme) {
		$this->pages = $pages;
		$this->theme = $theme;
	}

	public static function get_build_request_json() {
		$pages = Page::get_live_pages();
		$theme = Theme::get_live_theme();
		$parser = new Site_Parser($pages, $theme);
		return json_encode($parser->get_build_request());
	}

	private function get_build_request() {
		$apikey = $this->get_api_key();
		$mapskey = $this->get_maps_api_key();
		$theme = $this->theme->get_array();
		$pages = $this->pages;
		return array(
			'apikey' => $apikey,
			'mapskey' => $mapskey,
			'theme' => $theme,
			'pages' => $pages,
		);
	}

	private function get_api_key() {
		return get_field('compiler_api_key', 'option');
	}

	private function get_maps_api_key() {
		return get_field('maps_api_key', 'option');
	}


}
