<?php

class Bytecode {
	public static function hide_update_notice_to_all_users() {
		remove_action('admin_notices', 'update_nag', 3);
		echo "<style>.notice, .update-nag, .error, .updated{ display:none !important; }</style>";
	}

	public static function remove_dashboard_widgets() {
		global $wp_meta_boxes;
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
		//unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['wpseo-dashboard-overview']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['rg_forms_dashboard']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['backwpup_become_inpsyder']);
	}

	public static function change_role_names() {
		global $wp_roles;
		if ( ! isset( $wp_roles ) )
			$wp_roles = new WP_Roles();
		$wp_roles->roles['administrator']['name'] = 'Webmaster';
		$wp_roles->role_names['administrator'] = 'Webmaster';
		$wp_roles->roles['editor']['name'] = 'Beheerder';
		$wp_roles->role_names['editor'] = 'Beheerder';
	}

	public function remove_user_roles() {
		if( get_role('subscriber') ) remove_role( 'subscriber' );
		if( get_role('author') ) remove_role( 'author' );
		if( get_role('contributor') ) remove_role( 'contributor' );
		if( get_role('backwpup_admin') ) remove_role( 'backwpup_admin' );
		if( get_role('backwpup_check') ) remove_role( 'backwpup_check' );
		if( get_role('backwpup_helper') ) remove_role( 'backwpup_helper' );
		if( get_role('translator') ) remove_role( 'translator' );
	}
}
