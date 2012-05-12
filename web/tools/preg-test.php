<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html ;charset=utf-8"></meta>
	<style>
		body{
			font-size: 20px;
		}
		div{
			padding: 5px;
		}
		div#input{
			background: #335678;
		}
		div#output{
			color: #fff;
			background: #663333;
		}
	</style>
</head>
<body>
<div id="input">
	<form action="" method="get">
		Reg-Expression<br/>
		<input type="text" name="regexp" value="<? echo getValue('regexp'); ?>" /><br/>
		String<br/>
		<input type="text" name="string" value="<? echo getValue('string'); ?>" /><br/>
		<input type="submit" value="OK" />
	</form>
</div>
<p/>
<div id="output">
<?php
error_reporting(E_ALL & ~E_NOTICE);
if ($_GET['regexp'] && $_GET['string'])
{
	$reg=$_GET['regexp'];
	$string=$_GET['string'];
	echo $reg.'<br/>';
	echo $string.'<br/>';
	echo preg_match($reg, $string)? '匹配成功': '匹配失败';
}
function getValue($index)
{
	if ( isset($_GET[$index]) )
	{
		return $_GET[$index];
	}
	else
	{
		return '';
	}
}
?>
</div>
</body>
</html>
