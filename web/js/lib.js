function text2html(str){
    var reg=new RegExp("\n","g");
    var reg1=new RegExp(" ","g");
    str = str.replace(reg,"<br>");
    str = str.replace(reg1,"&nbsp;");
    return str;
}

function html2text(str){
    var reg=new RegExp("<br>","g");
    var reg1=new RegExp("<p>","g");
    str = str.replace(reg,"\r\n");
    str = str.replace(reg1," ");
    return str;
}

function AjaxBuilder(url, func, method){
	url= url==void 0 ?'':url;
	method= method==void 0 ?'GET':method;
	var var_ajax;
	if(window.XMLHttpRequest){
		var_ajax=new XMLHttpRequest();
	}else{
		var_ajax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var_ajax.onreadystatechange=function(){
		//Execute Function;
		if (var_ajax.readyState==4 && var_ajax.status==200)
		{
			func();
		}
	}
	var_ajax.open(method,url+'?seed='+rnd(),true);
	var_ajax.send();
}

rnd.today=new Date();
rnd.seed=rnd.today.getTime();
function rnd() {
　　　　rnd.seed = (rnd.seed*9301+49297) % 233280;
　　　　return rnd.seed/(233280.0);
};
function rand(number) {
　　　　return Math.ceil(rnd()*number);
};