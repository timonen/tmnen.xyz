<?php

include __DIR__.'/sys/variables.php';
include __DIR__.'/sys/classes.php';
include __DIR__.'/sys/functions.php';

session_start();

$page = new Page(array("title"=>"Main", "content"=>$PAGE_FRONT));

if(isset($_GET['err']))
	switch ($_GET['err']) {
		case '400':
			$page->update(array("title"=>"ERROR", "content"=>$ERROR_400));
			break;

		case '500':
			$page->update(array("title"=>"Server Error", "content"=>$ERROR_500));
			break;
	}

if(isset($_GET['page']))
	switch ($_GET['page']) {
		case 'second':
			$page->update(array("title"=>"Second", "content"=>$PAGE_SECOND));
			break;

		case 'test':
			$page->update(array("title"=>"TEST", "content"=>$PAGE_TEST));
			break;

		case 'debug':
			$page->update(array("body"=>1, "title"=>"TEST", "content"=>"REEEE"));
			break;

		default:
			$page->update(array("title"=>"ERROR", "content"=>$ERROR_400));
			break;
	}

if(isset($_GET['file']))
	switch ($_GET['file']) {
		case 'image':
			$page->update(array("title"=>"Image", "content"=>'<h1>'.$_GET['fn'].'<h1>'));
			break;
		
		case 'vid':
			$page->update(array("title"=>"Video", "content"=>'<h1>'.$_GET['fn'].'<h1>'));
			break;		

		default:
			$page->update(array("title"=>"ERROR", "content"=>$ERROR_400));
			break;
	}




$page->send();

?>
