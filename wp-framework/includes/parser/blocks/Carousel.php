<?php
class CarouselPageBlock extends PageBlock{
	protected function parse_info_array($info_array) {
		$carousel = $info_array['item'];
		if(!$carousel) {
			$carousel = array();
		}

		$array = array(
			'type' => 'carousel',
			'images' => $carousel,
		);
		return $array;
	}
}