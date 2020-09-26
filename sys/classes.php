<?php

class Page {
	function __construct($arr){
		$this->title = $arr['title'];
		$this->content = $arr['content'];
		$this->css = $arr['css'];
		$this->sjs = $arr['sjs'];
		$this->ejs = $arr['ejs'];
		$this->u_body($arr['body']);
	}

	function update($arr){
		$this->title = $arr['title'];
		$this->content = $arr['content'];
		$this->css = $arr['css'];
		$this->sjs = $arr['sjs'];
		$this->ejs = $arr['ejs'];
		$this->u_body($arr['debug']);
	}

	function u_body($id){
		if(isset($id)){
			$this->body = '
				<html lang="Fi">
				<head>
				<title>'.$this->title.'</title>
				</head>
				<body>
					<h1>'.$this->content.'</h1>
				</body>
				</html>';

		}else{
			$this->body = '<!doctype html>
				<html lang="Fi">
				<head>
					<meta charset="utf-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
					<meta name="description" content="spagetti">
				    <meta name=viewport content="width=device-width, initial-scale=.75">
	
						<title>'.$this->title.'</title>
	
					<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
					<link rel="stylesheet" href="../css/def.css">
					'.$this->css.'
	
					<script src="../js/functions.js"></script>
					'.$this->sjs.'
				</head>
				<body>
				
				<div id="nav"></div>
				<canvas id="bg"></canvas>
				<div id="inside">
	
					'. $this->content .'
	
					<div id="footer">
						<p>'.$this->title.' | tmnen.xyz</p>
					</div>
				</div>
					<script src="../js/main.js"></script>
					'.$this->ejs.'
					<script async src="../js/draw.js"></script>
				</body>
			</html>';
		}
	}

	function send(){
		echo $this->body;
	}
}


?>
