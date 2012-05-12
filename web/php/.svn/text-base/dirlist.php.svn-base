<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
		table
		{
			border-width: 1px;
		}
	</style>
</head>
<body>

	<table>
<?php
	echo '<tr><th>NAME</th><th>TYPE</th><th>Size</th><th>ModifyTime</th></tr>';
	$dirname= 'dirsample';
	$dir= opendir($dirname);

	while( $file_name= readdir($dir))
	{
		if ($file_name!='.' && $file_name!='..')
		{
			$file= $dirname.'/'.$file_name;
			echo '<tr><td width="100">'.$file_name.'</td><td>'.(is_dir($file)?'DIR':'FILE').'</td><td>'.(is_dir($file)?human_size(dir_size($file)):human_size(filesize($file))).'</td><td>'.date('Y-m-d h:i:s',filemtime($file)).'</td></tr>'."\n";
		}
	}
	closedir($dir);

	function dir_size($dirname)
	{
		$size=0;
		$dir= opendir($dirname);
		while($filename=readdir($dir))
		{
			if ($filename!='.' && $filename!='..')
			{
				$file=$dirname.'/'.$filename;
				if (is_dir($file))
				{
					$size+=dir_size($file);
				}
				else
				{
					$size+=filesize($file);
				}
			}
		}
		closedir($dir);
		return $size;
	}

	function human_size($size)
	{
		if ($size<pow(2,10))
		{
			return round($size,2).'B';
		}
		else if($size<pow(2,20))
		{
			return round($size/pow(2,10),2).'KB';
		}
		else
		{
			return round($size/pow(2,20),2).'MB';
		}
	}
?>
</table>
</body>
</html>
