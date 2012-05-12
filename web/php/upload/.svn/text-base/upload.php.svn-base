<?php
require_once 'fileupload.class.php';

$up=new fileupload(array('filepath'=>'./uploads', 'allowtype'=>array('jpeg','jpg','png'), 'maxsize'=>10000000, 'isranname'=>true));

if ($up->uploadfile('pic'))
{
	echo 'File Upload Success!';
}
else
{
	echo 'File Upload Failed!';
}

/*
 * TEST UNITS
 */
echo '<pre>';
//print_r($_FILES);
//var_dump($up);
//$f=date('YmdHis').rand(100,999);
//echo $f;
echo '</pre>';
