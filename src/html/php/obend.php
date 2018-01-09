<?php
$content = ob_get_contents();
ob_end_clean();
file_put_contents("index.html", $content);

$out = microtime(true) - $start;
echo $content;
?>