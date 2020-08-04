<?php
class Page implements ParserItem{
    protected $id;

    public function __construct($id) {
        $this->id = $id;
    }

    public function get_array() {
        return array(
            'title' => $this->get_title(),
            'url' => $this->get_url(),
            'seo' => $this->get_seo(),
            'rows' => $this->get_rows(),
        );
    }

    public static function get_live_pages() {
        $result = array();
        $ids = self::get_live_page_ids();
        foreach ($ids as $id) {
            $page = new Page($id);
            $array = $page->get_array();
            array_push($result, $array);
        }
        return $result;
    }

    private static function get_live_page_ids() {
        $args = array(
            'post_type' => 'page',
            'fields' => 'ids',
            'posts_per_page' => -1,
            'meta_query'    => array(
                array(
                    'key'       => 'published',
                    'value'     => 'Published',
                    'compare'   => '=',
                )
            ),
        );
        $query = new WP_Query($args);
        return $query->posts;
    }

    private function get_title() {
        return get_field('meta_title', $this->id);
    }

    private function get_url() {
        return get_field('url', $this->id);
    }

    private function get_seo() {
        $result = array();
        $seo_array = get_field('meta_tags', $this->id);
        if($seo_array) {
            foreach($seo_array as $seo) {
                $tag = $seo['tag'];
                $contents = $seo['description'];
                $meta = new Meta($tag, $contents);
                $array = $meta->get_array();
                array_push($result, $array);
            }
        }
        return $result;
    }

    private function get_rows() {
        $result = array();
        $content = get_field('content_copy', $this->id);
        if($content) {
            foreach($content as $row) {
                $array = array(
                    'class' => $row['class'],
                    'content' => $this->get_row_content($row["row"])
                );
                array_push($result, $array);
            }
        }
        return $result;
    }

    private function get_row_content($row) {
        $result = array();
        foreach($row as $block_array) {
            $type = $block_array['acf_fc_layout'];
            $page_block = PageBlock::create_page_block($type, $block_array);
            $array = $page_block->get_array();
            array_push($result, $array);
        }
        return $result;
    }
}
