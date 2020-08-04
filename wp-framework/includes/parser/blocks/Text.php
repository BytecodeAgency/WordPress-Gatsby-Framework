<?php
class TextPageBlock extends PageBlock {
	protected function parse_info_array($info_array) {
		$array = array(
			'type' => 'text',
			'text' => $info_array['text'],
			'sizes' => array(
					'sm' => (int) $info_array['size_sm'],
					'md' => (int) $info_array['size_md'],
				),
		);
		return $array;
	}
}