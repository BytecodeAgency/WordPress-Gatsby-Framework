<?php

interface ParserItem{
    public function get_array();
}

abstract class PageBlockType {
    const Header = 'header';
    const Slider = 'slider';
    const Carousel = 'carousel';
    const CTA = 'cta';
    const Text_Image = 'image';
    const Links = 'links';
    const Text = 'text';
    const Form = 'form';
	const Map = 'map';

	public static function is_page_block($item) {
		$constants = self::get_constants();
		return in_array($item, $constants);
	}

	private static function get_constants() {
        $oClass = new ReflectionClass(__CLASS__);
        return $oClass->getConstants();
	}
}

abstract class PageBlock implements ParserItem{

	protected $array;

	public function __construct($info_array) {
		$this->array = $this->parse_info_array($info_array);
	}

	public function get_array() {
		return $this->array;
	}

	public static function create_page_block($type, $info_array) {
		if(!PageBlockType::is_page_block($type)) {
			return new WP_Error( 'invalid_page_block_type', __( 'Invalid PageBlockType when creating PageBlock!', 'wp-compiler' ) );
		}
		switch($type) {
			case 'header':
				return new HeaderPageblock($info_array);
			case 'slider':
				return new SliderPageblock($info_array);
			case 'carousel':
				return new CarouselPageblock($info_array);
			case 'cta':
				return new CTAPageblock($info_array);
			case 'image':
				return new ImagePageblock($info_array);
			case 'links':
				return new LinksPageblock($info_array);
			case 'text':
				return new TextPageblock($info_array);
			case 'form':
				return new FormPageblock($info_array);
			case 'map':
				return new MapPageblock($info_array);
		}
	}

}
