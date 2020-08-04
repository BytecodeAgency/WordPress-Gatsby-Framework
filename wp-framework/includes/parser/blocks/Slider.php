<?php
class SliderPageblock extends PageBlock{

	protected function parse_info_array($info_array) {
		$slides = $info_array['slide'];
		$slides_array = array();

		foreach($slides as $slide) {
			$slide_array = array(
				'image' => $slide['image'],
				'text' => $slide['text'],
				'links' => $slide['links'],
			);
			array_push($slides_array, $slide_array);
		}

		$array = array(
			'type' => 'slider',
			'slides' => $slides_array,
		);
		return $array;
    }
    
}