<?php

class MenuItem implements ParserItem{
	protected $label;
	protected $url;

	public function __construct($label, $url) {
		$this->label = $label;
		$this->url = $url;
	}

	public function get_array() {
		return array(
			'label' => $this->label,
			'url' => $this->url,
		);
	}
}
