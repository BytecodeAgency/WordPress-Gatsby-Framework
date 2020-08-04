<?php

class FooterItem implements ParserItem{
	protected $title;
	protected $content;

	public function __construct($title, $content) {
		$this->title = $title;
		$this->content = $content;
	}

	public function get_array() {
		return array(
			'title' => $this->title,
			'content' => $this->content,
		);
	}
}