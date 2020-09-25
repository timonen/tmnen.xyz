<?php

class Page {
	private $title;
	private $css;
	private $content;

	function __construct($t, $cs, $cn){
		$this->title = $t;
		$this->css = $cs;
		$this->content = $cn;
	}

	function update($t, $cs, $cn){
		$this->title = $t;
		$this->css = $cs;
		$this->content = $cn;
	}

	function render(){
		echo '<!doctype html>
			<html lang="Fi">
			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
				<title>',$this->title,'</title>
				<meta name="description" content="Startpage">
			    <meta name=viewport content="width=device-width, initial-scale=.75">
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
				<link rel="stylesheet" href="./css/def.css">
				<link rel="stylesheet" href="./css/basic.css">
				',$this->css,'
				<script src="./js/functions.js"></script>
			</head>
			<body>
			
			<div id="nav"></div>
			<canvas id="bg"></canvas>
			<div id="inside">
				', $this->content ,'
					
				<div id="footer">
					<p>',$this->title,' | tmnen.xyz © 2015-',date("Y"),'</p>
				</div>
			</div>
				<script src="./js/main.js"></script>
				<script async src="./js/draw.js"></script>
			</body>
			</html>';
	}
}



?>
