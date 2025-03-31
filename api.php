<?php
session_start();

require_once 'wp-load.php';

$domain = $_SERVER['HTTP_HOST'];
$_SESSION['http_host'] = $domain.$_SERVER['SCRIPT_URL'];

$token = '';
$domain = 'karatshop.com';
$from = "karatshop.website@gmail.com";
$to = get_field('mails', 'option');
$title = '';

$subject = "Request on the website $domain " . $title;

if(count($_FILES)){
    //print_r($_FILES);
    $files = array();
    foreach ($_FILES as $file) {
        if ($file["error"] == 0) {
            $tmp_name = $file["tmp_name"];
            // basename() может спасти от атак на файловую систему;
            // может понадобиться дополнительная проверка/очистка имени файла
            $name = basename($file["name"]);
            move_uploaded_file($tmp_name, "upload/$name");
            $files[] = array('path' => "upload/$name", 'name' => $tmp_name);
        }
    }
}

function prepare_data($data, $key){
    switch ($key) {
        case 'referer':
            return substr($data, 0, 30);
        case 'term':
            return urldecode($data);
        default:
            return $data;
    }
}

function send_mail($to, $thm, $html, $path) {
    $fp = fopen($path,"r");
    if (!$fp) {
        print "Файл $path не может быть прочитан";
        exit();
    }

    $file = fread($fp, filesize($path));
    fclose($fp);

    $headers = '';
    $multipart = '';
    $boundary = "--".md5(uniqid(time())); // генерируем разделитель
    $headers .= "MIME-Version: 1.0\n";
    $headers .="Content-Type: multipart/mixed; boundary=\"$boundary\"\n";
    $multipart .= "--$boundary\n";

    $kod = 'utf-8';
    $multipart .= "Content-Type: text/html; charset=$kod\n";
    $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n";
    $multipart .= "$html\n\n";

    $message_part = "--$boundary\n";
    $message_part .= "Content-Type: application/octet-stream\n";
    $message_part .= "Content-Transfer-Encoding: base64\n";
    $message_part .= "Content-Disposition: attachment; filename = \"".$path."\"\n\n";
    $message_part .= chunk_split(base64_encode($file))."\n";
    $multipart .= $message_part."--$boundary--\n";

    if(mail($to, $thm, $multipart, $headers)) {
        return 1;
    }
}

if (array_key_exists('data', $_POST)){
//	return print_r($_POST);die();

    $headers = "From: $from\nReply-To: $from\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

    $msg = "";

    $msg .= "<html><body style='font-family:Arial,sans-serif;'>";
    $msg .= "<h2 style='color:#161616;font-weight:bold;font-size:30px;border-bottom:2px dotted #bd0707;'>New request on the site $domain " . $title . "</h2>" . $eol;

    $data = json_decode(str_replace(['\\\\', '\"', "\\'"], ['\\', '"', "'"], $_POST['data']));
    $session_data = ['referer' => 'The application came from the page', 'sourse' => 'Search system', 'term' => 'Key', 'campaign' => 'Campaign'];

    foreach ($data as $key => $params) {
        if (!empty($params->title) && !empty($params->val)) {
            $val = prepare_data($params->val, $key);
            $msg .= "<p><strong>$params->title:</strong> $val</p>" . $eol;
            if (isset($session_data[$key]))
                unset($session_data[$key]);
        }
    }

    foreach ($session_data as $key => $title) {
        if (array_key_exists($key, $_SESSION)) {
            $val = prepare_data($_SESSION[$key], $key);
            $msg .= "<p><strong>$title:</strong> $val</p>" . $eol;
        }
    }

    $msg .= "</body></html>";

    $id = wp_insert_post(array(
        'post_title'    => $subject.(!empty($data->get->val)?' ('.$data->get->val.')':''),
        'post_content'  => $msg,
        'post_date'     => date('Y-m-d H:i:s'),
        'post_type'     => 'request',
        'post_status'   => 'publish',
    ));

    if(!empty($files)){
        foreach($files as $file){
            $path = $file['path'];
        }
    }

    if(!empty($path)){
        if(send_mail($to, $subject, $msg, $path)){
            header("HTTP/1.0 200 OK");
            echo '{"status":"success"}';
        }else{
            header("HTTP/1.0 404 Not Found");
            echo '{"status":"error"}';
        }
    }else{
        if((mail($to, $subject, $msg, $headers))){
            header("HTTP/1.0 200 OK");
            echo '{"status":"success"}';
        }else{
            header("HTTP/1.0 404 Not Found");
            echo '{"status":"error"}';
        }
    }
} else {
    header("HTTP/1.0 404 Not Found");
    echo '{"status":"error2"}';
}

if(!empty($files)){
    foreach($files as $file){
        unlink($file['path']);
    }
}
