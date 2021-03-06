<?php

class Page {
	function __construct($arr) {
		$this->title = $arr['title'];
		$this->content = $arr['content'];
		$this->css = $arr['css'];
		$this->sjs = $arr['sjs'];
		$this->ejs = $arr['ejs'];
		$this->u_body($arr['body']);
	}

	function update($arr) {
		$this->title = $arr['title'];
		$this->content = $arr['content'];
		$this->css = $arr['css'];
		$this->sjs = $arr['sjs'];
		$this->ejs = $arr['ejs'];
		$this->u_body($arr['debug']);
	}

	function u_body($id) {
		if(isset($id)){
			$this->body = "
				<html lang=\"Fi\">
				<head>
				<title>".$this->title."</title>
				</head>
				<body>
					".$this->content."
				</body>
				</html>";

		}else{
			$this->body = "<!doctype html>
				<html lang=\"Fi\">
				<head>
					<meta charset=\"utf-8\">
					<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">
					<meta name=\"description\" content=\"spagetti\">
				    <meta name=viewport content=\"width=device-width, initial-scale=.75\">
	
						<title>".$this->title."</title>
	
					<link href=\"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap\" rel=\"stylesheet\">
					<link rel=\"stylesheet\" href=\"../css/def.css\">
					<link rel=\"stylesheet\" href=\"../css/main.css\">
					".$this->css."
	
					<script src=\"../js/functions.js\"></script>
					".$this->sjs."
				</head>
				<body>
				
				<canvas id=\"bg\"></canvas>
				<div id=\"inside\">
					<div id=\"nav\">
						<a href=\"/\">main</a>
						<a href=\"/p/gallery\">gallery</a>
						<a href=\"/p/upload\">upload</a>
					</div>
					<div id=\"content\">
					". $this->content ."
					</div>
					<div id=\"footer\">
						<p>".$this->title." | tmnen.xyz</p>
					</div>
				</div>
					".$this->ejs."
					<script async src=\"../js/draw.js\"></script>
					<script src=\"../js/main.js\"></script>
				</body>
			</html>";
		}
	}

	function send() {
		echo $this->body;
	}
}

class Upload {
	private $ifolder = IMG_PATH;
	private $vfolder = VID_PATH;

	private $img_mime = array("image/gif", "image/jpeg", "image/png", "image/pjpeg");
	private $vid_mime = array("video/webm", "video/ogg", "video/mpeg");

	private $file;
	private $name;

	function __construct($f) {
		$this->file = $f;
		if(in_array($f["file"]["type"], $this->img_mime)) {
			$this->image();
		} 
		else if(in_array($f["file"]["type"], $this->vid_mime)) {
			$this->video();
		}
	}

	function newname() {
		return time().'.'.pathinfo($this->file["file"]["name"], PATHINFO_EXTENSION);
	}

	function image() {
		$this->name = $this->newname();
		$this->img_compress($this->ifolder.$this->name);
	}

	function img_compress($out) {
			
		move_uploaded_file($this->file["file"]["tmp_name"], $out);

		$img = new Imagick(realpath($out));
		$profiles = $img->getImageProfiles("icc", true);
		$img->stripImage();

		if(!empty($profiles))
			$img->profileImage("icc", $profiles['icc']);

		$img->setImageCompressionQuality(85);
		$img->writeImage(realpath($out));
		$img->clear();
		$img->destroy();

		header('Location: /img/'.$this->name);
	}

	function video() {
		$this->name = $this->newname();
		move_uploaded_file($this->file["file"]["tmp_name"], $this->vfolder.$this->name);
		header('Location: /v/'.$this->name);
	}

	function __destruct() {
		
	}
}

?>
