<?php
class Theme implements ParserItem{

    public function get_array() {
        return array(
            'manifest' => $this->get_manifest_array(),
            'colors' => $this->get_colors_array(),
            'fonts' => $this->get_fonts_array(),
            'logo' => $this->get_logo(),
            'topbar' => $this->get_topbar(),
            'bottombar' => $this->get_bottombar(),
            'menu' => $this->get_menu_array(),
            'footer' => $this->get_footer_array(),
            'gtag' => $this->get_gtag(),
            'foot' => $this->get_foot(),
            'css' => $this->get_css(),
        );
    }

    public static function get_live_theme() {
        $theme = new Theme();
        return $theme;
    }

    private function get_manifest_array() {
        return array(
            'name' => get_field('manifest_name', 'option'),
            'shortname' => get_field('manifest_shortname', 'option'),
            'iconurl' => get_field('manifest_iconurl', 'option'),
            'themecolor' => get_field('manifest_theme_color', 'option'),
            'backgroundcolor' => get_field('manifest_background_color', 'option'),
        );
    }

    private function get_colors_array() {
        return array(
            'primary' => get_field('primary_color', 'option'),
            'secondary' => get_field('secondary_color', 'option'),
            'tertiary' => get_field('tertiary_color', 'option'),
            'pagebg' => get_field('page_background', 'option'),
            'menubg' => get_field('menu_background', 'option'),
            'menutext' => get_field('menu_text', 'option'),
            'headingtext' => get_field('heading_text', 'option'),
            'bodytext' => get_field('body_text', 'option'),
            'buttonbg' => get_field('button_background', 'option'),
            'buttontext' => get_field('button_text', 'option'),
        );
    }

    private function get_fonts_array() {
        $menu_font = new Font('menu_font');
        $heading_font = new Font('heading_font');
        $body_font = new Font('body_font');

        return array(
            'menu' => $menu_font->get_array(),
            'heading' => $heading_font->get_array(),
            'body' => $body_font->get_array(),
        );
    }

    private function get_logo() {
        $header = get_field('header', 'option');
        $logo = $header['logo'];
        return $logo;
    }

    private function get_topbar() {
        return get_field('topbar', 'option');
    }

    private function get_bottombar() {
        return get_field('bottombar', 'option');
    }

    private function get_menu_array() {
        $header = get_field('header', 'option');
        $menu_items = $header['menu_items'];
        $result = array();
        foreach($menu_items as $menu_item) {
            $label = $menu_item['menu_item_text'];
            $page = $menu_item['menu_item_url'];
            $item = new MenuItem($label, $page);
            $array = $item->get_array();
            array_push($result, $array);
        }
        return $result;
    }

    private function get_footer_array() {
        $footer = get_field('footer', 'option');
        $footer_columns = $footer['columns'];
        $result = array();
        foreach($footer_columns as $footer_column) {
            $title = $footer_column['title'];
            $content = $footer_column['content'];
            $item = new FooterItem($title, $content);
            $array = $item->get_array();
            array_push($result, $array);
        }
        return $result;
    }

    private function get_gtag() {
        return get_field('gtag', 'option');
    }

    private function get_foot() {
        return get_field('foot_js', 'option');
    }

    private function get_css() {
        return get_field('head_css', 'option');
    }
}