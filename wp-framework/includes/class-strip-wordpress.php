<?php

class Strip_WordPress {

    public function __construct() {
        $this->add_actions();
    }

    //Add actions and filters to WordPress.
	public function add_actions() {
		//Tools
		add_action('admin_menu', array($this, 'remove_tools_admin_menu'));
		//Comments
		add_action('init', array($this, 'remove_comments_posts_pages'));
		add_action('admin_menu', array($this, 'remove_comments_admin_menu'));
		add_action('wp_before_admin_bar_render', array($this, 'remove_comments_admin_bar'));
		add_filter('manage_pages_columns', array($this, 'remove_comments_page_overview'));
		//Posts
		add_action('admin_menu', array($this, 'remove_posts_admin_menu'));
		add_action('wp_before_admin_bar_render', array($this, 'remove_posts_admin_bar'));
		add_action('init', array($this, 'remove_posts_wordpress'));
		//Pages and Forms
		add_action('admin_init', array($this, 'remove_textarea_pages_forms'));
		add_filter( 'get_sample_permalink_html', array($this, 'remove_permalink_pages'));
		add_action('admin_head', array($this, 'remove_featured_image_pages'));
		add_action('admin_head', array($this, 'remove_attributes_pages'));
		add_action('admin_head-post.php', array($this, 'remove_visibility_pages'));
		add_action('admin_head-post-new.php', array($this, 'remove_visibility_pages'));
		//Dashboard
		add_action('load-index.php', array($this, 'dashboard_redirect'));
		add_action('admin_menu', array($this, 'remove_dashboard_admin_menu'));
		//Appearance
		add_action('admin_menu', array($this, 'remove_themes_admin_menu'));
		//Admin bar
		add_action('wp_before_admin_bar_render', array($this, 'remove_customize_admin_bar'));
		//Settings
		add_action('admin_menu', array($this, 'remove_sub_menu_settings_unused'));
	}

    public function dashboard_redirect(){
        wp_redirect(admin_url('edit.php?post_type=page'));
    }

    public function remove_comments_admin_menu() {
        remove_menu_page( 'edit-comments.php' );
    }

    public function remove_comments_admin_bar() {
        global $wp_admin_bar;
        $wp_admin_bar->remove_menu('comments');
    }

    public function remove_comments_posts_pages() {
        remove_post_type_support( 'post', 'comments' );
        remove_post_type_support( 'page', 'comments' );
    }
    
    public function remove_comments_page_overview($defaults) {
        unset($defaults['comments']);
        return $defaults;
    }
      
    public function remove_posts_admin_menu() {
        remove_menu_page( 'edit.php' );
    }

    public function remove_posts_admin_bar() {
        global $wp_admin_bar;
        $wp_admin_bar->remove_node('new-post');
        $wp_admin_bar->remove_menu('view-site');
        $wp_admin_bar->remove_menu('site-name');
        $wp_admin_bar->remove_menu('wp-logo');
    }

    public function remove_textarea_pages_forms() {
        remove_post_type_support( 'page', 'editor' );
        remove_post_type_support( 'form', 'editor' );
    }

    public function remove_permalink_pages( $return ) {
        $return = '';
        return $return;
    }

    public function remove_featured_image_pages() {
        remove_meta_box('postimagediv', 'page', 'side');
    }

    public function remove_attributes_pages() {
        remove_meta_box('pageparentdiv', 'page', 'side');
    }

    public function remove_visibility_pages() {
        global $post;
        if($post->post_type == 'page'){
        echo '<style type="text/css">
            #misc-publishing-actions,
            #minor-publishing-actions{
                display:none;
            }
        </style>';
        }
    }

    public function remove_posts_wordpress(){
        if(post_type_exists('post')) {
            unregister_post_type( 'post' );
        }
    }

    public function remove_tools_admin_menu() {
        remove_menu_page( 'tools.php' );
    }

    public function remove_themes_admin_menu() {
        remove_menu_page( 'themes.php' );
    }

    public function remove_dashboard_admin_menu() {
        remove_menu_page( 'index.php' );
    }

    public function remove_customize_admin_bar() {
        global $wp_admin_bar;
        $wp_admin_bar->remove_menu('customize');
    }

    public function remove_sub_menu_settings_unused() {
	    remove_submenu_page( 'options-general.php', 'options-writing.php' );
	    remove_submenu_page( 'options-general.php', 'options-reading.php' );
	    remove_submenu_page( 'options-general.php', 'options-discussion.php' );
	    remove_submenu_page( 'options-general.php', 'options-permalink.php' );
	    remove_submenu_page( 'options-general.php', 'privacy.php' );
    }

}
