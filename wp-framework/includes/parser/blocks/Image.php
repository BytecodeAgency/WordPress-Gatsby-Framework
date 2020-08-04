<?php

class ImagePageblock extends PageBlock {
    protected function parse_info_array($info_array) {
        $array = array(
            'type' => 'image',
            'image' => $info_array['image'],
            'hover_content' => $info_array['hover_content'],
			'sizes' => array(
					'sm' => (int) $info_array['size_sm'],
					'md' => (int) $info_array['size_md'],
				),
        );
        return $array;
    }
}
