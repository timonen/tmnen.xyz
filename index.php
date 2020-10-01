<?php

require __DIR__.'/sys/secret.php'; 		//	secret.php has definitions of IMG_PATH & VID_PATH
require __DIR__.'/sys/variables.php';
require __DIR__.'/sys/functions.php';
require __DIR__.'/sys/classes.php';

if(session_status() == PHP_SESSION_NONE)
	session_start();


$page = new Page(array("title" => "Main", "content" => $PAGE_FRONT));

if(isset($_GET['err']))
	switch ($_GET['err']) {
		case '400':
			$page->update(array("title" => "ERROR", "content" => $ERROR_400));
			break;

		case '500':
			$page->update(array("title" => "SERVER ERROR", "content" => $ERROR_500));
			break;
	}

if(isset($_GET['page']))
	switch ($_GET['page']) {
		case 'debug':
			$page->update(array("title" => "DEBUG", "content" => debug(), "debug" => 1));
			break;

		case 'upload':
			$page->update(array("title" => "Upload", "content" => $PAGE_UPLOAD));
			break;

		default:
			$page->update(array("title" => "ERROR", "content" => $ERROR_400));
			break;
	}

else if(isset($_GET['up'])){
	$up = new Upload($_FILES);
}

else if(isset($_GET['file']))
	switch ($_GET['file']) {
		case 'image':
			$page->update(array("title" => "Image", "content" => "<img class=\"center\" src=\"".image($_GET['fn'])."\"></img>"));
			break;
		
		case 'video':
			$page->update(array("title" => "Video", "content" => "<h1>Video</h1>"));
			break;		

		default:
			$page->update(array("title" => "ERROR", "content" => $ERROR_400));
			break;
	}



$page->send();

?>
