<?php
require_once dirname(__FILE__).'/Interfaces.php';

class CTAPageblock extends PageBlock{
	protected function parse_info_array($info_array) {
		$link = $info_array['link'];
		if($link == "") {
			$link = null;
		}
		$array = array(
			'type' => 'cta',
			'image' => $info_array['image'],
			'text' => $info_array['text'],
			'link' => $link,
			'sizes' => array(
					'sm' => (int) $info_array['size_sm'],
					'md' => (int) $info_array['size_md'],
				),
		);
		return $array;
	}
}
