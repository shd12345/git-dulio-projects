<?php
$file= fopen('demo','w');
flock($file, LOCK_EX);

fwrite($file, "djiwjq/ndwquwqr");
fwrite($file, "djiwjq\ndwquwqr");
fwrite($file, "djiwjq\ndwquwqr");

fclose($file);

$file= fopen('demo','r');
echo fread($file, filesize('demo')).'<br />';
echo ftell($file);
fseek($file, -3, SEEK_END);
echo fread($file, 3);
rewind($file);
echo fread($file, 3);
fseek($file, 5, SEEK_SET);
echo '['.fread($file, 3).']';
fseek($file, 5, SEEK_CUR);
echo '['.fread($file, 3).']';
fseek($file, -1, SEEK_END);
echo '['.fread($file, 1).']';
?>
