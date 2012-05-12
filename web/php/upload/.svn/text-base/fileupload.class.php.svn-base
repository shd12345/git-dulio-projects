<?php
class FileUpload
{
	/*
	 * config vars
	 */
	private $filepath	='uploads';
	private $allowtype	=array('jpg','jpeg','png','gif');
	private $maxsize	=10000000;
	private $isranname	=true;

	/*
	 * normal vars
	 */
	private $errorid	=0;
	private $errorstr	='';
	private $originname;
	private $tempfilename;
	private $filetype;
	private $filesize;
	private $newfilename;

	// 初始化上传的文件
	// 1.指定上传路径
	// 2.允许类型
	// 3.限制大小
	// 4.是否使用随机文件名
	function __construct($options=array()){
		foreach($options as $key=>$value)
		{
			$key=strtolower($key);

			// 如果在这个类中有$key这个变量名，则进行赋值处理
			if (in_array($key, get_class_vars(get_class($this))))
			{
				$this->setOption($key, $value);
			}
		}
	}

	// 上传一个文件的方法
	function uploadFile($filefield)
	{
		// 如果传输的文件路径有问题，退出
		if (!$this->checkFilePath())
		{
			return false;
		}

		if (isset($_FILES[$filefield])){
			$name=		$_FILES[$filefield]['name'];
			$tmp_name=	$_FILES[$filefield]['tmp_name'];
			$size=		$_FILES[$filefield]['size'];
			$error=		$_FILES[$filefield]['error'];
			
			// 把从$_FILES数组中获取的内容赋值给类中的变量
			if ($this->setFiles($name, $tmp_name, $size, $error))
			{
				if ($this->checkFileSize() && $this->checkFileType())
				{
					$this->setNewFileName();
					if ($this->copyFile())
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return true;
				}
			}
			else
			{
				return false;
			}
		}
	}


	// 返回上传好后的文件名
	private function getFileName()
	{
		$this->setNewFileName();
		return $this->newfilename;
	}
	
	// 上传失败后可以查看错误报告
	function getErrorMsg()
	{
		
	}

	/*****************************
	 * 这是类里的隐藏方法
	 * 为类的功能实现提供辅助方法
	 *****************************/
	// 设置值的辅助函数	
	private
	function setOption($key, $value)
	{
		$this->$key= $value;
	}

	// 设置与文件上传相关的参数
	private
	function setFiles($name='', $tmp_name='', $size=0, $error=0)
	{
		$this->setOption('errorid', $error);
		if ($error)
		{
			return false;
		}

		$tmp_arr=explode('.', $name);
		$this->setOption('filetype', strtolower($tmp_arr[count($tmp_arr)-1]));
		$this->setOption('originname', $name);
		$this->setOption('tempfilename', $tmp_name);
		$this->setOption('filesize', $size);
		return true;
	}

	// 检查文件上传路径
	private
	function checkFilePath()
	{
		if (empty($this->filepath))
		{
			/********ERROR**********/
			return false;
		}
		else if (!file_exists($this->filepath) || !is_writable($this->filepath))
		{
			if (!@mkdir($this->filepath, 0755))
			{
				/********ERROR**********/
				return false;
			}
		}
		return true;
	}

	// 检查文件的上传类型
	private
	function checkFileType()
	{
		if (in_array(strtolower($this->filetype), $this->allowtype))
		{
			return true;
		}
		else
		{
			/***********ERROR**************/
			return false;
		}
	}

	// 检查文件上传的大小
	private
	function checkFileSize()
	{
		if ($this->filesize > $this->maxsize)
		{
			/**********ERROR***********/
			return false;
		}
		else
		{
			return true;
		}
	}
	
	// 设置上传好的文件的文件名
	private
	function setNewFileName()
	{
		if ($this->isranname)
		{
			$this->setOption('newfilename', $this->proRandName());
		}
		else
		{
			$this->setOption('newfilename', $this->originname);
		}
	}

	// 设置随机文件名称
	private
	function proRandName()
	{
		$filename= date('YmdHis').rand(100,999);
		return $filename.'.'.$this->filetype;
	}

	// 移动文件
	private
	function copyFile()
	{
		if (!$this->errorid)
		{
			$filepath=rtrim($this->filepath, '/').'/';
			$filepath.=$this->newfilename;

			if (@move_uploaded_file($this->tempfilename, $filepath))
			{
				return true;
			}
			else
			{
				/*********ERROR***********/
				return false;
			}
		}
		else
		{
			return false;
		}
	}
}
