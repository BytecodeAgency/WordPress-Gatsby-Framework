<?php
class Meta implements ParserItem{
	protected $tag;
	protected $contents;

	public function __construct($tag, $contents) {
		$this->tag = $tag;
		$this->contents = $contents;
	}

	public function get_array() {
		return array(
			$this->tag,
			$this->contents,
		);
	}
}