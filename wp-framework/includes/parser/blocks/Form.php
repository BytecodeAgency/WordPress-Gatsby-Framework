<?php

class FormPageblock extends PageBlock {
	protected function parse_info_array($info_array) {
		$array = array(
			'type' => 'form',
			'title' => $info_array['title'],
			'fields' => $info_array['fields'],
			'submit' => $info_array['submit'],
			'submit_url' => get_site_url().'/wp-json/form/new',
			'sizes' => array(
					'sm' => (int) $info_array['size_sm'],
					'md' => (int) $info_array['size_md'],
				),
		);
		return $array;
	}
}
