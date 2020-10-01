<?php

function image($fn) {
	$path = IMG_PATH.$fn;
	$type = pathinfo($path, PATHINFO_EXTENSION);
	$data = file_get_contents($path);
	$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
	return $base64;
}

function debug() {
	print "Debug";
}

?>
