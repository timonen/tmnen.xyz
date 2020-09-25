<?php

include 'sys/variables.php';
include 'sys/classes.php';
include 'sys/functions.php';


$test = new Page("Main", "", $PAGE_FRONT);

if(isset($_GET['test'])){
	$test->update("Second", "", $PAGE_SECOND);
}





$test->render();

?>
