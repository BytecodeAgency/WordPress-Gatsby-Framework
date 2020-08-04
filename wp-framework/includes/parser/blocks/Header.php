<?php
class HeaderPageBlock extends PageBlock{
	protected function parse_info_array($info_array) {
		$array = array(
			'type' => 'header',
			'image' => $info_array['image'],
			'text' => $info_array['text'],
		);
		if($info_array['links']) {
			$array['links'] = $info_array['links'];
		}
		return $array;
	}
}