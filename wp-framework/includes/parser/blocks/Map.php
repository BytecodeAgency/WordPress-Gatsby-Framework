<?php
class MapPageblock extends PageBlock {
	protected function parse_info_array($info_array) {
		$array = array(
			'type' => 'map',
			'map' => $info_array['map'],
			'sizes' => array(
					'sm' => (int) $info_array['size_sm'],
					'md' => (int) $info_array['size_md'],
				),
		);
		return $array;
	}
}
