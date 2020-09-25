<?php

include __DIR__.'/sys/variables.php';
include __DIR__.'/sys/classes.php';
include __DIR__.'/sys/functions.php';

session_start();

$page = new Page("Main", $PAGE_FRONT);

if(isset($_GET['err']))
	switch ($_GET['err']) {
		case '400':
			$page->update("Server Error", $ERROR_400);
			break;

		case '500':
			$page->update("Server Error", $ERROR_500);
			break;
	}

if(isset($_GET['page']))
	switch ($_GET['page']) {
		case 'second':
			$page->update("Second", $PAGE_SECOND);
			break;

		case 'test':
			$page->update("Test", $PAGE_TEST);
			break;

		default:
			$page->update("ERROR", $PAGE_TEST);
			break;
	}






$page->render();

?>
