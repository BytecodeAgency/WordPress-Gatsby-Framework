<?php
class Font implements ParserItem{
    protected $option_key;

    public function __construct($option_key) {
        $this->option_key = $option_key;
    }

    public function get_array() {
        $font = get_field($this->option_key, 'option');
        return array(
            'name' => $font['font_name'],
            'weightsavailable' => $font['font_weights_available'],
            'weightdefault' => $font['font_weight_default'],
        );
    }
}