<?php

class Form_Handler
{

    public function __construct()
    {
        $this->add_form_handler();
    }

    public static function create_posttype_form()
    {
        register_post_type(
            'form',
            array(
                'labels' => array(
                    'name' => __('Forms'),
                    'singular_name' => __('Form')
                ),
                'public' => true,
                'show_in_rest' => true,
                'show_in_menu' => true,
                'menu_icon' => 'dashicons-text-page',
            )
        );
    }

    private function add_form_handler()
    {
        add_action('init', array('Form_Handler', 'create_posttype_form'));
    }
}

function create_form_from_api_post($request_data)
{
    $parameters = $request_data->get_params();
    $message = "";
    foreach ($parameters as $param_key => $param_val) {
        $message .= $param_key;
        $message .= " = ";
        $message .= $param_val;
        $message .= "<br>";
    }

    return create_new_form($message);
}

function upload_if_exists($key, $id)
{
    if (isset($_FILES[$key])) {
        if (!function_exists('wp_handle_upload')) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
        }
        $uploadedfile = $_FILES[$key];
        $movefile = wp_handle_upload($uploadedfile, array('test_form' => false));
        if ($movefile && !isset($movefile['error'])) {
            $path = $movefile['url'];
            update_field($key, $path, $id);
            return $movefile['url'];
        }
        return null;
    }
}

function get_image_id($image_url) {
    global $wpdb;
    $attachment = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE guid='%s';", $image_url )); 
        return $attachment[0]; 
}

function create_new_form($message)
{
    $post_data = array(
        'post_title'    => rand(0, 999999),
        'post_type'    => 'form',
        'post_status'    => 'publish',
        'meta_input'   => array(
            'message' => $message,
        ),
    );

    $id = wp_insert_post($post_data);
    if (!empty($_FILES)) {
        $path1 = upload_if_exists('file0', $id);
        if(!is_null($path1)) {
            $message .= "Bijlage 1: ".$path1;
        }
        $path2 = upload_if_exists('file1', $id);
        if(!is_null($path2)) {
            $message .= "Bijlage 2: ".$path1;
        }
        $path3 = upload_if_exists('file2', $id);
        if(!is_null($path3)) {
            $message .= "Bijlage 3: ".$path1;
        }
    }

    send_email($message);
    return $id;
}

function send_email($message)
{
    $to = get_field('form_email', 'option');
    $body = 'Bericht: ' . $message . "<br>";
    $headers = array('Content-Type: text/html; charset=UTF-8');
    wp_mail($to, substr($message, 0, 20), $body, $headers);
}

function add_post_endpoint()
{
    register_rest_route('form', '/new', array(
        'methods'  => 'POST',
        'callback' => 'create_form_from_api_post'
    ));
}
add_action('rest_api_init', 'add_post_endpoint');
