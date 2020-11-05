<?php

require __DIR__.'/sys/secret.php'; 		//	secret.php has definitions of IMG_PATH & VID_PATH
require __DIR__.'/sys/variables.php';
require __DIR__.'/sys/functions.php';
require __DIR__.'/sys/classes.php';

if(session_status() == PHP_SESSION_NONE)
	session_start();

$page = new Page(array("title" => "Main", "content" => $PAGE_FRONT));

$pages = array(
	"main" => array("title" => "Main", "content" => $PAGE_FRONT),
	"gallery" => array("title" => "Gallery", 
		"content" => "<div id=\"gallery\"></div>", 
		"css" => "<link rel=\"stylesheet\" href=\"../css/gallery.css\">", 
		"ejs" => "<script src=\"../js/gallery.js\"></script>"
	),

	"upload" => array("title" => "Upload", "content" => $PAGE_UPLOAD),
	"err"	=> array("title" => "ERROR", "content" => $ERROR_400)
);

if(isset($_GET['err']))
	switch ($_GET['err']) {
		case '400':
			$page->update(array("title" => "ERROR", "content" => $ERROR_400));
			break;

		case '500':
			$page->update(array("title" => "SERVER ERROR", "content" => $ERROR_500));
			break;
	}

if(isset($_GET['page'])){
	if($pages[$_GET['page']] != ""){
		$np = $pages[$_GET['page']];
	}else{
		$np = $pages['err'];
	}
	$page->update($np);
}

else if(isset($_GET['up'])) new Upload($_FILES);

else if(isset($_GET['file']))
	switch ($_GET['file']) {
		case 'image':
			if(isset($_GET['emble'])){
				$page->update(array("title" => "Image", "content" => "<img class=\"center\" src=\"".baseimg($_GET['fn'])."\"></img>"));
			}else{
				$img = image($_GET['fn']);
				header("Content-Type: image/".$img['type']);
				die($img['data']);
			}
			break;
		
		case 'video':
			$page->update(array("title" => "Video", "content" => "<h1>Video</h1>"));
			break;		

		default:
			$page->update(array("title" => "ERROR", "content" => $ERROR_400));
			break;
	}

else if(isset($_GET['api'])){
	if($_GET['q'] != ""){
		switch ($_GET['q']) {
			case 'images.json':
				die(getImages());
				break;
			
			default:
				die('error on query');
				break;
		}
	}else{
		die('no query');
	}
}


$page->send();

?>
