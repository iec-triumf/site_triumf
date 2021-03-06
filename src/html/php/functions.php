<?php
function getFileTime($path){
	$file = "/".trim(trim($path),"\t .&?\\/");
	$server = $_SERVER["DOCUMENT_ROOT"];
	if(is_file($server.$file)){
		$file = $path."?".filemtime($server.$file);
	}else{
		$file = $path."?".time();
	}
	return trim($file,"\t .&?\\/");
}
function getFileContent($path, $type="html"){
	$return = "";
	$file = "/".trim(trim($path),"\t .&?\\/");
	$server = $_SERVER["DOCUMENT_ROOT"];
	if(is_file($server.$file)){
		$return = file_get_contents($server.$file);
		$re = '/((?:\/\*.+\*\/)(?:(?:\s)+)?)/Us';
		$return = trim(preg_replace($re, "", $return));
		switch($type){
			case "js":
				$return = "<script>\n".$return."\n</script>";
				break;
			case "css":
				$return = "<style>\n".$return."\n</style>";
				break;
		}
	}
	return $return;
}
?>