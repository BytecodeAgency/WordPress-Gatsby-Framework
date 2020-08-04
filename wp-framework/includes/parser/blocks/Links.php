<?php
class LinksPageblock extends PageBlock {
	protected function parse_info_array($info_array) {
		$array = array(
			'type' => 'links',
			'links' => $info_array['links'],
			'sizes' => array(
					'sm' => (int) $info_array['size_sm'],
					'md' => (int) $info_array['size_md'],
				),
		);
		return $array;
	}
}