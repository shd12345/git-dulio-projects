<!DOCTYPE html>
<html>
<head>
	<title>PHP CONFIGURATION SAMPLE</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"></meta>
</head>
<body>
	<form action="" method="post">
		主机
		<input type="text" name="DB_HOST"></input><br/>
		用户名
		<input type="text" name="DB_USER"></input><br/>
		密码
		<input type="text" name="DB_PWD"></input><br/>
		<input type="submit" name="submit" value="Sure"></input>
	</form>
</body>
</html>

<?php
if (isset($_POST['submit']))
{
	modify_config($_POST);
}
function modify_config($post)
{
	/* get config content */
	$str= file_get_contents('main.config.php');

	/* modify config content */
	/* generate pattern and string */
	$pattern= array();
	$string= array();
	foreach ($post as $key=>$value)
	{
		$pattern[]= "/define\('$key','.*'\)/";
		$string[]= "define('$key','$value')";
	}
	$str= preg_replace($pattern, $string, $str);
	/* test
	echo '<pre>';
	print_r($_POST);
	print_r($pattern);
	print_r($string);
	echo $str;
	echo '</pre>';
	 */

	/* write back to config file */
	file_put_contents('main.config.php', $str);
}
?>
