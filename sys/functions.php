<?php

function image($fn) {
	$path = IMG_PATH.$fn;
	$type = pathinfo($path, PATHINFO_EXTENSION);
	$data = file_get_contents($path);
	return array("data"=>$data, "type"=>$type);
}

function baseimg($fn){
	$path = IMG_PATH.$fn;
	$type = pathinfo($path, PATHINFO_EXTENSION);
	$data = file_get_contents($path);
	$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
	return $base64;
}

function getImages(){
	$test = IMG_PATH;
	chdir($test);
	$fileList = glob('*');
	return json_encode($fileList);
}

function debug() {
	print "Debug";
}

?>
