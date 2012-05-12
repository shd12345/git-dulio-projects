varPrototype={
Version:'1.7',
Browser:(function(){
varua=navigator.userAgent;
varisOpera=Object.prototype.toString.call(window.opera)=='[objectOpera]';
return{
IE:!!window.attachEvent&&!isOpera,
Opera:isOpera,
WebKit:ua.indexOf('AppleWebKit/')>-1,
Gecko:ua.indexOf('Gecko')>-1&&ua.indexOf('KHTML')===-1,
MobileSafari:/Apple.*Mobile/.test(ua)
}
})(),

BrowserFeatures:{
XPath:!!document.evaluate,

SelectorsAPI:!!document.querySelector,

ElementExtensions:(function(){
varconstructor=window.Element||window.HTMLElement;
return!!(constructor&&constructor.prototype);
})(),
SpecificElementExtensions:(function(){
if(typeofwindow.HTMLDivElement!=='undefined')
returntrue;

vardiv=document.createElement('div'),
form=document.createElement('form'),
isSupported=false;

if(div['__proto__']&&(div['__proto__']!==form['__proto__'])){
isSupported=true;
}

div=form=null;

returnisSupported;
})()
},

ScriptFragment:'<script[^>]*>([\\S\\s]*?)<\/script>',
JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,

emptyFunction:function(){},

K:function(x){returnx}
};

if(Prototype.Browser.MobileSafari)
Prototype.BrowserFeatures.SpecificElementExtensions=false;


varAbstract={};


varTry={
these:function(){
varreturnValue;

for(vari=0,length=arguments.length;i<length;i++){
varlambda=arguments[i];
try{
returnValue=lambda();
break;
}catch(e){}
}

returnreturnValue;
}
};
varClass=(function(){

varIS_DONTENUM_BUGGY=(function(){
for(varpin{toString:1}){
if(p==='toString')returnfalse;
}
returntrue;
})();

functionsubclass(){};
functioncreate(){
varparent=null,properties=$A(arguments);
if(Object.isFunction(properties[0]))
parent=properties.shift();

functionklass(){
this.initialize.apply(this,arguments);
}

Object.extend(klass,Class.Methods);
klass.superclass=parent;
klass.subclasses=[];

if(parent){
subclass.prototype=parent.prototype;
klass.prototype=newsubclass;
parent.subclasses.push(klass);
}

for(vari=0,length=properties.length;i<length;i++)
klass.addMethods(properties[i]);

if(!klass.prototype.initialize)
klass.prototype.initialize=Prototype.emptyFunction;

klass.prototype.constructor=klass;
returnklass;
}

functionaddMethods(source){
varancestor=this.superclass&&this.superclass.prototype,
properties=Object.keys(source);

if(IS_DONTENUM_BUGGY){
if(source.toString!=Object.prototype.toString)
properties.push("toString");
if(source.valueOf!=Object.prototype.valueOf)
properties.push("valueOf");
}

for(vari=0,length=properties.length;i<length;i++){
varproperty=properties[i],value=source[property];
if(ancestor&&Object.isFunction(value)&&
value.argumentNames()[0]=="$super"){
varmethod=value;
value=(function(m){
returnfunction(){returnancestor[m].apply(this,arguments);};
})(property).wrap(method);

value.valueOf=method.valueOf.bind(method);
value.toString=method.toString.bind(method);
}
this.prototype[property]=value;
}

returnthis;
}

return{
create:create,
Methods:{
addMethods:addMethods
}
};
})();
(function(){

var_toString=Object.prototype.toString,
NULL_TYPE='Null',
UNDEFINED_TYPE='Undefined',
BOOLEAN_TYPE='Boolean',
NUMBER_TYPE='Number',
STRING_TYPE='String',
OBJECT_TYPE='Object',
FUNCTION_CLASS='[objectFunction]',
BOOLEAN_CLASS='[objectBoolean]',
NUMBER_CLASS='[objectNumber]',
STRING_CLASS='[objectString]',
ARRAY_CLASS='[objectArray]',
DATE_CLASS='[objectDate]',
NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&
typeofJSON.stringify==='function'&&
JSON.stringify(0)==='0'&&
typeofJSON.stringify(Prototype.K)==='undefined';

functionType(o){
switch(o){
casenull:returnNULL_TYPE;
case(void0):returnUNDEFINED_TYPE;
}
vartype=typeofo;
switch(type){
case'boolean':returnBOOLEAN_TYPE;
case'number':returnNUMBER_TYPE;
case'string':returnSTRING_TYPE;
}
returnOBJECT_TYPE;
}

functionextend(destination,source){
for(varpropertyinsource)
destination[property]=source[property];
returndestination;
}

functioninspect(object){
try{
if(isUndefined(object))return'undefined';
if(object===null)return'null';
returnobject.inspect?object.inspect():String(object);
}catch(e){
if(einstanceofRangeError)return'...';
throwe;
}
}

functiontoJSON(value){
returnStr('',{'':value},[]);
}

functionStr(key,holder,stack){
varvalue=holder[key],
type=typeofvalue;

if(Type(value)===OBJECT_TYPE&&typeofvalue.toJSON==='function'){
value=value.toJSON(key);
}

var_class=_toString.call(value);

switch(_class){
caseNUMBER_CLASS:
caseBOOLEAN_CLASS:
caseSTRING_CLASS:
value=value.valueOf();
}

switch(value){
casenull:return'null';
casetrue:return'true';
casefalse:return'false';
}

type=typeofvalue;
switch(type){
case'string':
returnvalue.inspect(true);
case'number':
returnisFinite(value)?String(value):'null';
case'object':

for(vari=0,length=stack.length;i<length;i++){
if(stack[i]===value){thrownewTypeError();}
}
stack.push(value);

varpartial=[];
if(_class===ARRAY_CLASS){
for(vari=0,length=value.length;i<length;i++){
varstr=Str(i,value,stack);
partial.push(typeofstr==='undefined'?'null':str);
}
partial='['+partial.join(',')+']';
}else{
varkeys=Object.keys(value);
for(vari=0,length=keys.length;i<length;i++){
varkey=keys[i],str=Str(key,value,stack);
if(typeofstr!=="undefined"){
partial.push(key.inspect(true)+':'+str);
}
}
partial='{'+partial.join(',')+'}';
}
stack.pop();
returnpartial;
}
}

functionstringify(object){
returnJSON.stringify(object);
}

functiontoQueryString(object){
return$H(object).toQueryString();
}

functiontoHTML(object){
returnobject&&object.toHTML?object.toHTML():String.interpret(object);
}

functionkeys(object){
if(Type(object)!==OBJECT_TYPE){thrownewTypeError();}
varresults=[];
for(varpropertyinobject){
if(object.hasOwnProperty(property)){
results.push(property);
}
}
returnresults;
}

functionvalues(object){
varresults=[];
for(varpropertyinobject)
results.push(object[property]);
returnresults;
}

functionclone(object){
returnextend({},object);
}

functionisElement(object){
return!!(object&&object.nodeType==1);
}

functionisArray(object){
return_toString.call(object)===ARRAY_CLASS;
}

varhasNativeIsArray=(typeofArray.isArray=='function')
&&Array.isArray([])&&!Array.isArray({});

if(hasNativeIsArray){
isArray=Array.isArray;
}

functionisHash(object){
returnobjectinstanceofHash;
}

functionisFunction(object){
return_toString.call(object)===FUNCTION_CLASS;
}

functionisString(object){
return_toString.call(object)===STRING_CLASS;
}

functionisNumber(object){
return_toString.call(object)===NUMBER_CLASS;
}

functionisDate(object){
return_toString.call(object)===DATE_CLASS;
}

functionisUndefined(object){
returntypeofobject==="undefined";
}

extend(Object,{
extend:extend,
inspect:inspect,
toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,
toQueryString:toQueryString,
toHTML:toHTML,
keys:Object.keys||keys,
values:values,
clone:clone,
isElement:isElement,
isArray:isArray,
isHash:isHash,
isFunction:isFunction,
isString:isString,
isNumber:isNumber,
isDate:isDate,
isUndefined:isUndefined
});
})();
Object.extend(Function.prototype,(function(){
varslice=Array.prototype.slice;

functionupdate(array,args){
vararrayLength=array.length,length=args.length;
while(length--)array[arrayLength+length]=args[length];
returnarray;
}

functionmerge(array,args){
array=slice.call(array,0);
returnupdate(array,args);
}

functionargumentNames(){
varnames=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,'')
.replace(/\s+/g,'').split(',');
returnnames.length==1&&!names[0]?[]:names;
}

functionbind(context){
if(arguments.length<2&&Object.isUndefined(arguments[0]))returnthis;
var__method=this,args=slice.call(arguments,1);
returnfunction(){
vara=merge(args,arguments);
return__method.apply(context,a);
}
}

functionbindAsEventListener(context){
var__method=this,args=slice.call(arguments,1);
returnfunction(event){
vara=update([event||window.event],args);
return__method.apply(context,a);
}
}

functioncurry(){
if(!arguments.length)returnthis;
var__method=this,args=slice.call(arguments,0);
returnfunction(){
vara=merge(args,arguments);
return__method.apply(this,a);
}
}

functiondelay(timeout){
var__method=this,args=slice.call(arguments,1);
timeout=timeout*1000;
returnwindow.setTimeout(function(){
return__method.apply(__method,args);
},timeout);
}

functiondefer(){
varargs=update([0.01],arguments);
returnthis.delay.apply(this,args);
}

functionwrap(wrapper){
var__method=this;
returnfunction(){
vara=update([__method.bind(this)],arguments);
returnwrapper.apply(this,a);
}
}

functionmethodize(){
if(this._methodized)returnthis._methodized;
var__method=this;
returnthis._methodized=function(){
vara=update([this],arguments);
return__method.apply(null,a);
};
}

return{
argumentNames:argumentNames,
bind:bind,
bindAsEventListener:bindAsEventListener,
curry:curry,
delay:delay,
defer:defer,
wrap:wrap,
methodize:methodize
}
})());



(function(proto){


functiontoISOString(){
returnthis.getUTCFullYear()+'-'+
(this.getUTCMonth()+1).toPaddedString(2)+'-'+
this.getUTCDate().toPaddedString(2)+'T'+
this.getUTCHours().toPaddedString(2)+':'+
this.getUTCMinutes().toPaddedString(2)+':'+
this.getUTCSeconds().toPaddedString(2)+'Z';
}


functiontoJSON(){
returnthis.toISOString();
}

if(!proto.toISOString)proto.toISOString=toISOString;
if(!proto.toJSON)proto.toJSON=toJSON;

})(Date.prototype);


RegExp.prototype.match=RegExp.prototype.test;

RegExp.escape=function(str){
returnString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g,'\\$1');
};
varPeriodicalExecuter=Class.create({
initialize:function(callback,frequency){
this.callback=callback;
this.frequency=frequency;
this.currentlyExecuting=false;

this.registerCallback();
},

registerCallback:function(){
this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);
},

execute:function(){
this.callback(this);
},

stop:function(){
if(!this.timer)return;
clearInterval(this.timer);
this.timer=null;
},

onTimerEvent:function(){
if(!this.currentlyExecuting){
try{
this.currentlyExecuting=true;
this.execute();
this.currentlyExecuting=false;
}catch(e){
this.currentlyExecuting=false;
throwe;
}
}
}
});
Object.extend(String,{
interpret:function(value){
returnvalue==null?'':String(value);
},
specialChar:{
'\b':'\\b',
'\t':'\\t',
'\n':'\\n',
'\f':'\\f',
'\r':'\\r',
'\\':'\\\\'
}
});

Object.extend(String.prototype,(function(){
varNATIVE_JSON_PARSE_SUPPORT=window.JSON&&
typeofJSON.parse==='function'&&
JSON.parse('{"test":true}').test;

functionprepareReplacement(replacement){
if(Object.isFunction(replacement))returnreplacement;
vartemplate=newTemplate(replacement);
returnfunction(match){returntemplate.evaluate(match)};
}

functiongsub(pattern,replacement){
varresult='',source=this,match;
replacement=prepareReplacement(replacement);

if(Object.isString(pattern))
pattern=RegExp.escape(pattern);

if(!(pattern.length||pattern.source)){
replacement=replacement('');
returnreplacement+source.split('').join(replacement)+replacement;
}

while(source.length>0){
if(match=source.match(pattern)){
result+=source.slice(0,match.index);
result+=String.interpret(replacement(match));
source=source.slice(match.index+match[0].length);
}else{
result+=source,source='';
}
}
returnresult;
}

functionsub(pattern,replacement,count){
replacement=prepareReplacement(replacement);
count=Object.isUndefined(count)?1:count;

returnthis.gsub(pattern,function(match){
if(--count<0)returnmatch[0];
returnreplacement(match);
});
}

functionscan(pattern,iterator){
this.gsub(pattern,iterator);
returnString(this);
}

functiontruncate(length,truncation){
length=length||30;
truncation=Object.isUndefined(truncation)?'...':truncation;
returnthis.length>length?
this.slice(0,length-truncation.length)+truncation:String(this);
}

functionstrip(){
returnthis.replace(/^\s+/,'').replace(/\s+$/,'');
}

functionstripTags(){
returnthis.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,'');
}

functionstripScripts(){
returnthis.replace(newRegExp(Prototype.ScriptFragment,'img'),'');
}

functionextractScripts(){
varmatchAll=newRegExp(Prototype.ScriptFragment,'img'),
matchOne=newRegExp(Prototype.ScriptFragment,'im');
return(this.match(matchAll)||[]).map(function(scriptTag){
return(scriptTag.match(matchOne)||['',''])[1];
});
}

functionevalScripts(){
returnthis.extractScripts().map(function(script){returneval(script)});
}

functionescapeHTML(){
returnthis.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

functionunescapeHTML(){
returnthis.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}


functiontoQueryParams(separator){
varmatch=this.strip().match(/([^?#]*)(#.*)?$/);
if(!match)return{};

returnmatch[1].split(separator||'&').inject({},function(hash,pair){
if((pair=pair.split('='))[0]){
varkey=decodeURIComponent(pair.shift()),
value=pair.length>1?pair.join('='):pair[0];

if(value!=undefined)value=decodeURIComponent(value);

if(keyinhash){
if(!Object.isArray(hash[key]))hash[key]=[hash[key]];
hash[key].push(value);
}
elsehash[key]=value;
}
returnhash;
});
}

functiontoArray(){
returnthis.split('');
}

functionsucc(){
returnthis.slice(0,this.length-1)+
String.fromCharCode(this.charCodeAt(this.length-1)+1);
}

functiontimes(count){
returncount<1?'':newArray(count+1).join(this);
}

functioncamelize(){
returnthis.replace(/-+(.)?/g,function(match,chr){
returnchr?chr.toUpperCase():'';
});
}

functioncapitalize(){
returnthis.charAt(0).toUpperCase()+this.substring(1).toLowerCase();
}

functionunderscore(){
returnthis.replace(/::/g,'/')
.replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2')
.replace(/([a-z\d])([A-Z])/g,'$1_$2')
.replace(/-/g,'_')
.toLowerCase();
}

functiondasherize(){
returnthis.replace(/_/g,'-');
}

functioninspect(useDoubleQuotes){
varescapedString=this.replace(/[\x00-\x1f\\]/g,function(character){
if(characterinString.specialChar){
returnString.specialChar[character];
}
return'\\u00'+character.charCodeAt().toPaddedString(2,16);
});
if(useDoubleQuotes)return'"'+escapedString.replace(/"/g,'\\"')+'"';
return"'"+escapedString.replace(/'/g,'\\\'')+"'";
}

functionunfilterJSON(filter){
returnthis.replace(filter||Prototype.JSONFilter,'$1');
}

functionisJSON(){
varstr=this;
if(str.blank())returnfalse;
str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@');
str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');
str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,'');
return(/^[\],:{}\s]*$/).test(str);
}

functionevalJSON(sanitize){
varjson=this.unfilterJSON(),
cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
if(cx.test(json)){
json=json.replace(cx,function(a){
return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
});
}
try{
if(!sanitize||json.isJSON())returneval('('+json+')');
}catch(e){}
thrownewSyntaxError('BadlyformedJSONstring:'+this.inspect());
}

functionparseJSON(){
varjson=this.unfilterJSON();
returnJSON.parse(json);
}

functioninclude(pattern){
returnthis.indexOf(pattern)>-1;
}

functionstartsWith(pattern){
returnthis.lastIndexOf(pattern,0)===0;
}

functionendsWith(pattern){
vard=this.length-pattern.length;
returnd>=0&&this.indexOf(pattern,d)===d;
}

functionempty(){
returnthis=='';
}

functionblank(){
return/^\s*$/.test(this);
}

functioninterpolate(object,pattern){
returnnewTemplate(this,pattern).evaluate(object);
}

return{
gsub:gsub,
sub:sub,
scan:scan,
truncate:truncate,
strip:String.prototype.trim||strip,
stripTags:stripTags,
stripScripts:stripScripts,
extractScripts:extractScripts,
evalScripts:evalScripts,
escapeHTML:escapeHTML,
unescapeHTML:unescapeHTML,
toQueryParams:toQueryParams,
parseQuery:toQueryParams,
toArray:toArray,
succ:succ,
times:times,
camelize:camelize,
capitalize:capitalize,
underscore:underscore,
dasherize:dasherize,
inspect:inspect,
unfilterJSON:unfilterJSON,
isJSON:isJSON,
evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,
include:include,
startsWith:startsWith,
endsWith:endsWith,
empty:empty,
blank:blank,
interpolate:interpolate
};
})());

varTemplate=Class.create({
initialize:function(template,pattern){
this.template=template.toString();
this.pattern=pattern||Template.Pattern;
},

evaluate:function(object){
if(object&&Object.isFunction(object.toTemplateReplacements))
object=object.toTemplateReplacements();

returnthis.template.gsub(this.pattern,function(match){
if(object==null)return(match[1]+'');

varbefore=match[1]||'';
if(before=='\\')returnmatch[2];

varctx=object,expr=match[3],
pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

match=pattern.exec(expr);
if(match==null)returnbefore;

while(match!=null){
varcomp=match[1].startsWith('[')?match[2].replace(/\\\\]/g,']'):match[1];
ctx=ctx[comp];
if(null==ctx||''==match[3])break;
expr=expr.substring('['==match[3]?match[1].length:match[0].length);
match=pattern.exec(expr);
}

returnbefore+String.interpret(ctx);
});
}
});
Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;

var$break={};

varEnumerable=(function(){
functioneach(iterator,context){
varindex=0;
try{
this._each(function(value){
iterator.call(context,value,index++);
});
}catch(e){
if(e!=$break)throwe;
}
returnthis;
}

functioneachSlice(number,iterator,context){
varindex=-number,slices=[],array=this.toArray();
if(number<1)returnarray;
while((index+=number)<array.length)
slices.push(array.slice(index,index+number));
returnslices.collect(iterator,context);
}

functionall(iterator,context){
iterator=iterator||Prototype.K;
varresult=true;
this.each(function(value,index){
result=result&&!!iterator.call(context,value,index);
if(!result)throw$break;
});
returnresult;
}

functionany(iterator,context){
iterator=iterator||Prototype.K;
varresult=false;
this.each(function(value,index){
if(result=!!iterator.call(context,value,index))
throw$break;
});
returnresult;
}

functioncollect(iterator,context){
iterator=iterator||Prototype.K;
varresults=[];
this.each(function(value,index){
results.push(iterator.call(context,value,index));
});
returnresults;
}

functiondetect(iterator,context){
varresult;
this.each(function(value,index){
if(iterator.call(context,value,index)){
result=value;
throw$break;
}
});
returnresult;
}

functionfindAll(iterator,context){
varresults=[];
this.each(function(value,index){
if(iterator.call(context,value,index))
results.push(value);
});
returnresults;
}

functiongrep(filter,iterator,context){
iterator=iterator||Prototype.K;
varresults=[];

if(Object.isString(filter))
filter=newRegExp(RegExp.escape(filter));

this.each(function(value,index){
if(filter.match(value))
results.push(iterator.call(context,value,index));
});
returnresults;
}

functioninclude(object){
if(Object.isFunction(this.indexOf))
if(this.indexOf(object)!=-1)returntrue;

varfound=false;
this.each(function(value){
if(value==object){
found=true;
throw$break;
}
});
returnfound;
}

functioninGroupsOf(number,fillWith){
fillWith=Object.isUndefined(fillWith)?null:fillWith;
returnthis.eachSlice(number,function(slice){
while(slice.length<number)slice.push(fillWith);
returnslice;
});
}

functioninject(memo,iterator,context){
this.each(function(value,index){
memo=iterator.call(context,memo,value,index);
});
returnmemo;
}

functioninvoke(method){
varargs=$A(arguments).slice(1);
returnthis.map(function(value){
returnvalue[method].apply(value,args);
});
}

functionmax(iterator,context){
iterator=iterator||Prototype.K;
varresult;
this.each(function(value,index){
value=iterator.call(context,value,index);
if(result==null||value>=result)
result=value;
});
returnresult;
}

functionmin(iterator,context){
iterator=iterator||Prototype.K;
varresult;
this.each(function(value,index){
value=iterator.call(context,value,index);
if(result==null||value<result)
result=value;
});
returnresult;
}

functionpartition(iterator,context){
iterator=iterator||Prototype.K;
vartrues=[],falses=[];
this.each(function(value,index){
(iterator.call(context,value,index)?
trues:falses).push(value);
});
return[trues,falses];
}

functionpluck(property){
varresults=[];
this.each(function(value){
results.push(value[property]);
});
returnresults;
}

functionreject(iterator,context){
varresults=[];
this.each(function(value,index){
if(!iterator.call(context,value,index))
results.push(value);
});
returnresults;
}

functionsortBy(iterator,context){
returnthis.map(function(value,index){
return{
value:value,
criteria:iterator.call(context,value,index)
};
}).sort(function(left,right){
vara=left.criteria,b=right.criteria;
returna<b?-1:a>b?1:0;
}).pluck('value');
}

functiontoArray(){
returnthis.map();
}

functionzip(){
variterator=Prototype.K,args=$A(arguments);
if(Object.isFunction(args.last()))
iterator=args.pop();

varcollections=[this].concat(args).map($A);
returnthis.map(function(value,index){
returniterator(collections.pluck(index));
});
}

functionsize(){
returnthis.toArray().length;
}

functioninspect(){
return'#<Enumerable:'+this.toArray().inspect()+'>';
}









return{
each:each,
eachSlice:eachSlice,
all:all,
every:all,
any:any,
some:any,
collect:collect,
map:collect,
detect:detect,
findAll:findAll,
select:findAll,
filter:findAll,
grep:grep,
include:include,
member:include,
inGroupsOf:inGroupsOf,
inject:inject,
invoke:invoke,
max:max,
min:min,
partition:partition,
pluck:pluck,
reject:reject,
sortBy:sortBy,
toArray:toArray,
entries:toArray,
zip:zip,
size:size,
inspect:inspect,
find:detect
};
})();

function$A(iterable){
if(!iterable)return[];
if('toArray'inObject(iterable))returniterable.toArray();
varlength=iterable.length||0,results=newArray(length);
while(length--)results[length]=iterable[length];
returnresults;
}


function$w(string){
if(!Object.isString(string))return[];
string=string.strip();
returnstring?string.split(/\s+/):[];
}

Array.from=$A;


(function(){
vararrayProto=Array.prototype,
slice=arrayProto.slice,
_each=arrayProto.forEach;//usenativebrowserJS1.6implementationifavailable

functioneach(iterator,context){
for(vari=0,length=this.length>>>0;i<length;i++){
if(iinthis)iterator.call(context,this[i],i,this);
}
}
if(!_each)_each=each;

functionclear(){
this.length=0;
returnthis;
}

functionfirst(){
returnthis[0];
}

functionlast(){
returnthis[this.length-1];
}

functioncompact(){
returnthis.select(function(value){
returnvalue!=null;
});
}

functionflatten(){
returnthis.inject([],function(array,value){
if(Object.isArray(value))
returnarray.concat(value.flatten());
array.push(value);
returnarray;
});
}

functionwithout(){
varvalues=slice.call(arguments,0);
returnthis.select(function(value){
return!values.include(value);
});
}

functionreverse(inline){
return(inline===false?this.toArray():this)._reverse();
}

functionuniq(sorted){
returnthis.inject([],function(array,value,index){
if(0==index||(sorted?array.last()!=value:!array.include(value)))
array.push(value);
returnarray;
});
}

functionintersect(array){
returnthis.uniq().findAll(function(item){
returnarray.detect(function(value){returnitem===value});
});
}


functionclone(){
returnslice.call(this,0);
}

functionsize(){
returnthis.length;
}

functioninspect(){
return'['+this.map(Object.inspect).join(',')+']';
}

functionindexOf(item,i){
i||(i=0);
varlength=this.length;
if(i<0)i=length+i;
for(;i<length;i++)
if(this[i]===item)returni;
return-1;
}

functionlastIndexOf(item,i){
i=isNaN(i)?this.length:(i<0?this.length+i:i)+1;
varn=this.slice(0,i).reverse().indexOf(item);
return(n<0)?n:i-n-1;
}

functionconcat(){
vararray=slice.call(this,0),item;
for(vari=0,length=arguments.length;i<length;i++){
item=arguments[i];
if(Object.isArray(item)&&!('callee'initem)){
for(varj=0,arrayLength=item.length;j<arrayLength;j++)
array.push(item[j]);
}else{
array.push(item);
}
}
returnarray;
}

Object.extend(arrayProto,Enumerable);

if(!arrayProto._reverse)
arrayProto._reverse=arrayProto.reverse;

Object.extend(arrayProto,{
_each:_each,
clear:clear,
first:first,
last:last,
compact:compact,
flatten:flatten,
without:without,
reverse:reverse,
uniq:uniq,
intersect:intersect,
clone:clone,
toArray:clone,
size:size,
inspect:inspect
});

varCONCAT_ARGUMENTS_BUGGY=(function(){
return[].concat(arguments)[0][0]!==1;
})(1,2)

if(CONCAT_ARGUMENTS_BUGGY)arrayProto.concat=concat;

if(!arrayProto.indexOf)arrayProto.indexOf=indexOf;
if(!arrayProto.lastIndexOf)arrayProto.lastIndexOf=lastIndexOf;
})();
function$H(object){
returnnewHash(object);
};

varHash=Class.create(Enumerable,(function(){
functioninitialize(object){
this._object=Object.isHash(object)?object.toObject():Object.clone(object);
}


function_each(iterator){
for(varkeyinthis._object){
varvalue=this._object[key],pair=[key,value];
pair.key=key;
pair.value=value;
iterator(pair);
}
}

functionset(key,value){
returnthis._object[key]=value;
}

functionget(key){
if(this._object[key]!==Object.prototype[key])
returnthis._object[key];
}

functionunset(key){
varvalue=this._object[key];
deletethis._object[key];
returnvalue;
}

functiontoObject(){
returnObject.clone(this._object);
}



functionkeys(){
returnthis.pluck('key');
}

functionvalues(){
returnthis.pluck('value');
}

functionindex(value){
varmatch=this.detect(function(pair){
returnpair.value===value;
});
returnmatch&&match.key;
}

functionmerge(object){
returnthis.clone().update(object);
}

functionupdate(object){
returnnewHash(object).inject(this,function(result,pair){
result.set(pair.key,pair.value);
returnresult;
});
}

functiontoQueryPair(key,value){
if(Object.isUndefined(value))returnkey;
returnkey+'='+encodeURIComponent(String.interpret(value));
}

functiontoQueryString(){
returnthis.inject([],function(results,pair){
varkey=encodeURIComponent(pair.key),values=pair.value;

if(values&&typeofvalues=='object'){
if(Object.isArray(values)){
varqueryValues=[];
for(vari=0,len=values.length,value;i<len;i++){
value=values[i];
queryValues.push(toQueryPair(key,value));
}
returnresults.concat(queryValues);
}
}elseresults.push(toQueryPair(key,values));
returnresults;
}).join('&');
}

functioninspect(){
return'#<Hash:{'+this.map(function(pair){
returnpair.map(Object.inspect).join(':');
}).join(',')+'}>';
}

functionclone(){
returnnewHash(this);
}

return{
initialize:initialize,
_each:_each,
set:set,
get:get,
unset:unset,
toObject:toObject,
toTemplateReplacements:toObject,
keys:keys,
values:values,
index:index,
merge:merge,
update:update,
toQueryString:toQueryString,
inspect:inspect,
toJSON:toObject,
clone:clone
};
})());

Hash.from=$H;
Object.extend(Number.prototype,(function(){
functiontoColorPart(){
returnthis.toPaddedString(2,16);
}

functionsucc(){
returnthis+1;
}

functiontimes(iterator,context){
$R(0,this,true).each(iterator,context);
returnthis;
}

functiontoPaddedString(length,radix){
varstring=this.toString(radix||10);
return'0'.times(length-string.length)+string;
}

functionabs(){
returnMath.abs(this);
}

functionround(){
returnMath.round(this);
}

functionceil(){
returnMath.ceil(this);
}

functionfloor(){
returnMath.floor(this);
}

return{
toColorPart:toColorPart,
succ:succ,
times:times,
toPaddedString:toPaddedString,
abs:abs,
round:round,
ceil:ceil,
floor:floor
};
})());

function$R(start,end,exclusive){
returnnewObjectRange(start,end,exclusive);
}

varObjectRange=Class.create(Enumerable,(function(){
functioninitialize(start,end,exclusive){
this.start=start;
this.end=end;
this.exclusive=exclusive;
}

function_each(iterator){
varvalue=this.start;
while(this.include(value)){
iterator(value);
value=value.succ();
}
}

functioninclude(value){
if(value<this.start)
returnfalse;
if(this.exclusive)
returnvalue<this.end;
returnvalue<=this.end;
}

return{
initialize:initialize,
_each:_each,
include:include
};
})());



varAjax={
getTransport:function(){
returnTry.these(
function(){returnnewXMLHttpRequest()},
function(){returnnewActiveXObject('Msxml2.XMLHTTP')},
function(){returnnewActiveXObject('Microsoft.XMLHTTP')}
)||false;
},

activeRequestCount:0
};

Ajax.Responders={
responders:[],

_each:function(iterator){
this.responders._each(iterator);
},

register:function(responder){
if(!this.include(responder))
this.responders.push(responder);
},

unregister:function(responder){
this.responders=this.responders.without(responder);
},

dispatch:function(callback,request,transport,json){
this.each(function(responder){
if(Object.isFunction(responder[callback])){
try{
responder[callback].apply(responder,[request,transport,json]);
}catch(e){}
}
});
}
};

Object.extend(Ajax.Responders,Enumerable);

Ajax.Responders.register({
onCreate:function(){Ajax.activeRequestCount++},
onComplete:function(){Ajax.activeRequestCount--}
});
Ajax.Base=Class.create({
initialize:function(options){
this.options={
method:'post',
asynchronous:true,
contentType:'application/x-www-form-urlencoded',
encoding:'UTF-8',
parameters:'',
evalJSON:true,
evalJS:true
};
Object.extend(this.options,options||{});

this.options.method=this.options.method.toLowerCase();

if(Object.isHash(this.options.parameters))
this.options.parameters=this.options.parameters.toObject();
}
});
Ajax.Request=Class.create(Ajax.Base,{
_complete:false,

initialize:function($super,url,options){
$super(options);
this.transport=Ajax.getTransport();
this.request(url);
},

request:function(url){
this.url=url;
this.method=this.options.method;
varparams=Object.isString(this.options.parameters)?
this.options.parameters:
Object.toQueryString(this.options.parameters);

if(!['get','post'].include(this.method)){
params+=(params?'&':'')+"_method="+this.method;
this.method='post';
}

if(params&&this.method==='get'){
this.url+=(this.url.include('?')?'&':'?')+params;
}

this.parameters=params.toQueryParams();

try{
varresponse=newAjax.Response(this);
if(this.options.onCreate)this.options.onCreate(response);
Ajax.Responders.dispatch('onCreate',this,response);

this.transport.open(this.method.toUpperCase(),this.url,
this.options.asynchronous);

if(this.options.asynchronous)this.respondToReadyState.bind(this).defer(1);

this.transport.onreadystatechange=this.onStateChange.bind(this);
this.setRequestHeaders();

this.body=this.method=='post'?(this.options.postBody||params):null;
this.transport.send(this.body);

/*ForceFirefoxtohandlereadystate4forsynchronousrequests*/
if(!this.options.asynchronous&&this.transport.overrideMimeType)
this.onStateChange();

}
catch(e){
this.dispatchException(e);
}
},

onStateChange:function(){
varreadyState=this.transport.readyState;
if(readyState>1&&!((readyState==4)&&this._complete))
this.respondToReadyState(this.transport.readyState);
},

setRequestHeaders:function(){
varheaders={
'X-Requested-With':'XMLHttpRequest',
'X-Prototype-Version':Prototype.Version,
'Accept':'text/javascript,text/html,application/xml,text/xml,*/*'
};

if(this.method=='post'){
headers['Content-type']=this.options.contentType+
(this.options.encoding?';charset='+this.options.encoding:'');

/*Force"Connection:close"forolderMozillabrowserstowork
*aroundabugwhereXMLHttpRequestsendsanincorrect
*Content-lengthheader.SeeMozillaBugzilla#246651.
*/
if(this.transport.overrideMimeType&&
(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005)
headers['Connection']='close';
}

if(typeofthis.options.requestHeaders=='object'){
varextras=this.options.requestHeaders;

if(Object.isFunction(extras.push))
for(vari=0,length=extras.length;i<length;i+=2)
headers[extras[i]]=extras[i+1];
else
$H(extras).each(function(pair){headers[pair.key]=pair.value});
}

for(varnameinheaders)
this.transport.setRequestHeader(name,headers[name]);
},

success:function(){
varstatus=this.getStatus();
return!status||(status>=200&&status<300)||status==304;
},

getStatus:function(){
try{
if(this.transport.status===1223)return204;
returnthis.transport.status||0;
}catch(e){return0}
},

respondToReadyState:function(readyState){
varstate=Ajax.Request.Events[readyState],response=newAjax.Response(this);

if(state=='Complete'){
try{
this._complete=true;
(this.options['on'+response.status]
||this.options['on'+(this.success()?'Success':'Failure')]
||Prototype.emptyFunction)(response,response.headerJSON);
}catch(e){
this.dispatchException(e);
}

varcontentType=response.getHeader('Content-type');
if(this.options.evalJS=='force'
||(this.options.evalJS&&this.isSameOrigin()&&contentType
&&contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
this.evalResponse();
}

try{
(this.options['on'+state]||Prototype.emptyFunction)(response,response.headerJSON);
Ajax.Responders.dispatch('on'+state,this,response,response.headerJSON);
}catch(e){
this.dispatchException(e);
}

if(state=='Complete'){
this.transport.onreadystatechange=Prototype.emptyFunction;
}
},

isSameOrigin:function(){
varm=this.url.match(/^\s*https?:\/\/[^\/]*/);
return!m||(m[0]=='#{protocol}//#{domain}#{port}'.interpolate({
protocol:location.protocol,
domain:document.domain,
port:location.port?':'+location.port:''
}));
},

getHeader:function(name){
try{
returnthis.transport.getResponseHeader(name)||null;
}catch(e){returnnull;}
},

evalResponse:function(){
try{
returneval((this.transport.responseText||'').unfilterJSON());
}catch(e){
this.dispatchException(e);
}
},

dispatchException:function(exception){
(this.options.onException||Prototype.emptyFunction)(this,exception);
Ajax.Responders.dispatch('onException',this,exception);
}
});

Ajax.Request.Events=
['Uninitialized','Loading','Loaded','Interactive','Complete'];








Ajax.Response=Class.create({
initialize:function(request){
this.request=request;
vartransport=this.transport=request.transport,
readyState=this.readyState=transport.readyState;

if((readyState>2&&!Prototype.Browser.IE)||readyState==4){
this.status=this.getStatus();
this.statusText=this.getStatusText();
this.responseText=String.interpret(transport.responseText);
this.headerJSON=this._getHeaderJSON();
}

if(readyState==4){
varxml=transport.responseXML;
this.responseXML=Object.isUndefined(xml)?null:xml;
this.responseJSON=this._getResponseJSON();
}
},

status:0,

statusText:'',

getStatus:Ajax.Request.prototype.getStatus,

getStatusText:function(){
try{
returnthis.transport.statusText||'';
}catch(e){return''}
},

getHeader:Ajax.Request.prototype.getHeader,

getAllHeaders:function(){
try{
returnthis.getAllResponseHeaders();
}catch(e){returnnull}
},

getResponseHeader:function(name){
returnthis.transport.getResponseHeader(name);
},

getAllResponseHeaders:function(){
returnthis.transport.getAllResponseHeaders();
},

_getHeaderJSON:function(){
varjson=this.getHeader('X-JSON');
if(!json)returnnull;
json=decodeURIComponent(escape(json));
try{
returnjson.evalJSON(this.request.options.sanitizeJSON||
!this.request.isSameOrigin());
}catch(e){
this.request.dispatchException(e);
}
},

_getResponseJSON:function(){
varoptions=this.request.options;
if(!options.evalJSON||(options.evalJSON!='force'&&
!(this.getHeader('Content-type')||'').include('application/json'))||
this.responseText.blank())
returnnull;
try{
returnthis.responseText.evalJSON(options.sanitizeJSON||
!this.request.isSameOrigin());
}catch(e){
this.request.dispatchException(e);
}
}
});

Ajax.Updater=Class.create(Ajax.Request,{
initialize:function($super,container,url,options){
this.container={
success:(container.success||container),
failure:(container.failure||(container.success?null:container))
};

options=Object.clone(options);
varonComplete=options.onComplete;
options.onComplete=(function(response,json){
this.updateContent(response.responseText);
if(Object.isFunction(onComplete))onComplete(response,json);
}).bind(this);

$super(url,options);
},

updateContent:function(responseText){
varreceiver=this.container[this.success()?'success':'failure'],
options=this.options;

if(!options.evalScripts)responseText=responseText.stripScripts();

if(receiver=$(receiver)){
if(options.insertion){
if(Object.isString(options.insertion)){
varinsertion={};insertion[options.insertion]=responseText;
receiver.insert(insertion);
}
elseoptions.insertion(receiver,responseText);
}
elsereceiver.update(responseText);
}
}
});

Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{
initialize:function($super,container,url,options){
$super(options);
this.onComplete=this.options.onComplete;

this.frequency=(this.options.frequency||2);
this.decay=(this.options.decay||1);

this.updater={};
this.container=container;
this.url=url;

this.start();
},

start:function(){
this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent();
},

stop:function(){
this.updater.options.onComplete=undefined;
clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments);
},

updateComplete:function(response){
if(this.options.decay){
this.decay=(response.responseText==this.lastText?
this.decay*this.options.decay:1);

this.lastText=response.responseText;
}
this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency);
},

onTimerEvent:function(){
this.updater=newAjax.Updater(this.container,this.url,this.options);
}
});


function$(element){
if(arguments.length>1){
for(vari=0,elements=[],length=arguments.length;i<length;i++)
elements.push($(arguments[i]));
returnelements;
}
if(Object.isString(element))
element=document.getElementById(element);
returnElement.extend(element);
}

if(Prototype.BrowserFeatures.XPath){
document._getElementsByXPath=function(expression,parentElement){
varresults=[];
varquery=document.evaluate(expression,$(parentElement)||document,
null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(vari=0,length=query.snapshotLength;i<length;i++)
results.push(Element.extend(query.snapshotItem(i)));
returnresults;
};
}

/*--------------------------------------------------------------------------*/

if(!Node)varNode={};

if(!Node.ELEMENT_NODE){
Object.extend(Node,{
ELEMENT_NODE:1,
ATTRIBUTE_NODE:2,
TEXT_NODE:3,
CDATA_SECTION_NODE:4,
ENTITY_REFERENCE_NODE:5,
ENTITY_NODE:6,
PROCESSING_INSTRUCTION_NODE:7,
COMMENT_NODE:8,
DOCUMENT_NODE:9,
DOCUMENT_TYPE_NODE:10,
DOCUMENT_FRAGMENT_NODE:11,
NOTATION_NODE:12
});
}



(function(global){
functionshouldUseCache(tagName,attributes){
if(tagName==='select')returnfalse;
if('type'inattributes)returnfalse;
returntrue;
}

varHAS_EXTENDED_CREATE_ELEMENT_SYNTAX=(function(){
try{
varel=document.createElement('<inputname="x">');
returnel.tagName.toLowerCase()==='input'&&el.name==='x';
}
catch(err){
returnfalse;
}
})();

varelement=global.Element;

global.Element=function(tagName,attributes){
attributes=attributes||{};
tagName=tagName.toLowerCase();
varcache=Element.cache;

if(HAS_EXTENDED_CREATE_ELEMENT_SYNTAX&&attributes.name){
tagName='<'+tagName+'name="'+attributes.name+'">';
deleteattributes.name;
returnElement.writeAttribute(document.createElement(tagName),attributes);
}

if(!cache[tagName])cache[tagName]=Element.extend(document.createElement(tagName));

varnode=shouldUseCache(tagName,attributes)?
cache[tagName].cloneNode(false):document.createElement(tagName);

returnElement.writeAttribute(node,attributes);
};

Object.extend(global.Element,element||{});
if(element)global.Element.prototype=element.prototype;

})(this);

Element.idCounter=1;
Element.cache={};

Element._purgeElement=function(element){
varuid=element._prototypeUID;
if(uid){
Element.stopObserving(element);
element._prototypeUID=void0;
deleteElement.Storage[uid];
}
}

Element.Methods={
visible:function(element){
return$(element).style.display!='none';
},

toggle:function(element){
element=$(element);
Element[Element.visible(element)?'hide':'show'](element);
returnelement;
},

hide:function(element){
element=$(element);
element.style.display='none';
returnelement;
},

show:function(element){
element=$(element);
element.style.display='';
returnelement;
},

remove:function(element){
element=$(element);
element.parentNode.removeChild(element);
returnelement;
},

update:(function(){

varSELECT_ELEMENT_INNERHTML_BUGGY=(function(){
varel=document.createElement("select"),
isBuggy=true;
el.innerHTML="<optionvalue=\"test\">test</option>";
if(el.options&&el.options[0]){
isBuggy=el.options[0].nodeName.toUpperCase()!=="OPTION";
}
el=null;
returnisBuggy;
})();

varTABLE_ELEMENT_INNERHTML_BUGGY=(function(){
try{
varel=document.createElement("table");
if(el&&el.tBodies){
el.innerHTML="<tbody><tr><td>test</td></tr></tbody>";
varisBuggy=typeofel.tBodies[0]=="undefined";
el=null;
returnisBuggy;
}
}catch(e){
returntrue;
}
})();

varLINK_ELEMENT_INNERHTML_BUGGY=(function(){
try{
varel=document.createElement('div');
el.innerHTML="<link>";
varisBuggy=(el.childNodes.length===0);
el=null;
returnisBuggy;
}catch(e){
returntrue;
}
})();

varANY_INNERHTML_BUGGY=SELECT_ELEMENT_INNERHTML_BUGGY||
TABLE_ELEMENT_INNERHTML_BUGGY||LINK_ELEMENT_INNERHTML_BUGGY;

varSCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING=(function(){
vars=document.createElement("script"),
isBuggy=false;
try{
s.appendChild(document.createTextNode(""));
isBuggy=!s.firstChild||
s.firstChild&&s.firstChild.nodeType!==3;
}catch(e){
isBuggy=true;
}
s=null;
returnisBuggy;
})();


functionupdate(element,content){
element=$(element);
varpurgeElement=Element._purgeElement;

vardescendants=element.getElementsByTagName('*'),
i=descendants.length;
while(i--)purgeElement(descendants[i]);

if(content&&content.toElement)
content=content.toElement();

if(Object.isElement(content))
returnelement.update().insert(content);

content=Object.toHTML(content);

vartagName=element.tagName.toUpperCase();

if(tagName==='SCRIPT'&&SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING){
element.text=content;
returnelement;
}

if(ANY_INNERHTML_BUGGY){
if(tagNameinElement._insertionTranslations.tags){
while(element.firstChild){
element.removeChild(element.firstChild);
}
Element._getContentFromAnonymousElement(tagName,content.stripScripts())
.each(function(node){
element.appendChild(node)
});
}elseif(LINK_ELEMENT_INNERHTML_BUGGY&&Object.isString(content)&&content.indexOf('<link')>-1){
while(element.firstChild){
element.removeChild(element.firstChild);
}
varnodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts(),true);
nodes.each(function(node){element.appendChild(node)});
}
else{
element.innerHTML=content.stripScripts();
}
}
else{
element.innerHTML=content.stripScripts();
}

content.evalScripts.bind(content).defer();
returnelement;
}

returnupdate;
})(),

replace:function(element,content){
element=$(element);
if(content&&content.toElement)content=content.toElement();
elseif(!Object.isElement(content)){
content=Object.toHTML(content);
varrange=element.ownerDocument.createRange();
range.selectNode(element);
content.evalScripts.bind(content).defer();
content=range.createContextualFragment(content.stripScripts());
}
element.parentNode.replaceChild(content,element);
returnelement;
},

insert:function(element,insertions){
element=$(element);

if(Object.isString(insertions)||Object.isNumber(insertions)||
Object.isElement(insertions)||(insertions&&(insertions.toElement||insertions.toHTML)))
insertions={bottom:insertions};

varcontent,insert,tagName,childNodes;

for(varpositionininsertions){
content=insertions[position];
position=position.toLowerCase();
insert=Element._insertionTranslations[position];

if(content&&content.toElement)content=content.toElement();
if(Object.isElement(content)){
insert(element,content);
continue;
}

content=Object.toHTML(content);

tagName=((position=='before'||position=='after')
?element.parentNode:element).tagName.toUpperCase();

childNodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts());

if(position=='top'||position=='after')childNodes.reverse();
childNodes.each(insert.curry(element));

content.evalScripts.bind(content).defer();
}

returnelement;
},

wrap:function(element,wrapper,attributes){
element=$(element);
if(Object.isElement(wrapper))
$(wrapper).writeAttribute(attributes||{});
elseif(Object.isString(wrapper))wrapper=newElement(wrapper,attributes);
elsewrapper=newElement('div',wrapper);
if(element.parentNode)
element.parentNode.replaceChild(wrapper,element);
wrapper.appendChild(element);
returnwrapper;
},

inspect:function(element){
element=$(element);
varresult='<'+element.tagName.toLowerCase();
$H({'id':'id','className':'class'}).each(function(pair){
varproperty=pair.first(),
attribute=pair.last(),
value=(element[property]||'').toString();
if(value)result+=''+attribute+'='+value.inspect(true);
});
returnresult+'>';
},

recursivelyCollect:function(element,property,maximumLength){
element=$(element);
maximumLength=maximumLength||-1;
varelements=[];

while(element=element[property]){
if(element.nodeType==1)
elements.push(Element.extend(element));
if(elements.length==maximumLength)
break;
}

returnelements;
},

ancestors:function(element){
returnElement.recursivelyCollect(element,'parentNode');
},

descendants:function(element){
returnElement.select(element,"*");
},

firstDescendant:function(element){
element=$(element).firstChild;
while(element&&element.nodeType!=1)element=element.nextSibling;
return$(element);
},

immediateDescendants:function(element){
varresults=[],child=$(element).firstChild;
while(child){
if(child.nodeType===1){
results.push(Element.extend(child));
}
child=child.nextSibling;
}
returnresults;
},

previousSiblings:function(element,maximumLength){
returnElement.recursivelyCollect(element,'previousSibling');
},

nextSiblings:function(element){
returnElement.recursivelyCollect(element,'nextSibling');
},

siblings:function(element){
element=$(element);
returnElement.previousSiblings(element).reverse()
.concat(Element.nextSiblings(element));
},

match:function(element,selector){
element=$(element);
if(Object.isString(selector))
returnPrototype.Selector.match(element,selector);
returnselector.match(element);
},

up:function(element,expression,index){
element=$(element);
if(arguments.length==1)return$(element.parentNode);
varancestors=Element.ancestors(element);
returnObject.isNumber(expression)?ancestors[expression]:
Prototype.Selector.find(ancestors,expression,index);
},

down:function(element,expression,index){
element=$(element);
if(arguments.length==1)returnElement.firstDescendant(element);
returnObject.isNumber(expression)?Element.descendants(element)[expression]:
Element.select(element,expression)[index||0];
},

previous:function(element,expression,index){
element=$(element);
if(Object.isNumber(expression))index=expression,expression=false;
if(!Object.isNumber(index))index=0;

if(expression){
returnPrototype.Selector.find(element.previousSiblings(),expression,index);
}else{
returnelement.recursivelyCollect("previousSibling",index+1)[index];
}
},

next:function(element,expression,index){
element=$(element);
if(Object.isNumber(expression))index=expression,expression=false;
if(!Object.isNumber(index))index=0;

if(expression){
returnPrototype.Selector.find(element.nextSiblings(),expression,index);
}else{
varmaximumLength=Object.isNumber(index)?index+1:1;
returnelement.recursivelyCollect("nextSibling",index+1)[index];
}
},


select:function(element){
element=$(element);
varexpressions=Array.prototype.slice.call(arguments,1).join(',');
returnPrototype.Selector.select(expressions,element);
},

adjacent:function(element){
element=$(element);
varexpressions=Array.prototype.slice.call(arguments,1).join(',');
returnPrototype.Selector.select(expressions,element.parentNode).without(element);
},

identify:function(element){
element=$(element);
varid=Element.readAttribute(element,'id');
if(id)returnid;
do{id='anonymous_element_'+Element.idCounter++}while($(id));
Element.writeAttribute(element,'id',id);
returnid;
},

readAttribute:function(element,name){
element=$(element);
if(Prototype.Browser.IE){
vart=Element._attributeTranslations.read;
if(t.values[name])returnt.values[name](element,name);
if(t.names[name])name=t.names[name];
if(name.include(':')){
return(!element.attributes||!element.attributes[name])?null:
element.attributes[name].value;
}
}
returnelement.getAttribute(name);
},

writeAttribute:function(element,name,value){
element=$(element);
varattributes={},t=Element._attributeTranslations.write;

if(typeofname=='object')attributes=name;
elseattributes[name]=Object.isUndefined(value)?true:value;

for(varattrinattributes){
name=t.names[attr]||attr;
value=attributes[attr];
if(t.values[attr])name=t.values[attr](element,value);
if(value===false||value===null)
element.removeAttribute(name);
elseif(value===true)
element.setAttribute(name,name);
elseelement.setAttribute(name,value);
}
returnelement;
},

getHeight:function(element){
returnElement.getDimensions(element).height;
},

getWidth:function(element){
returnElement.getDimensions(element).width;
},

classNames:function(element){
returnnewElement.ClassNames(element);
},

hasClassName:function(element,className){
if(!(element=$(element)))return;
varelementClassName=element.className;
return(elementClassName.length>0&&(elementClassName==className||
newRegExp("(^|\\s)"+className+"(\\s|$)").test(elementClassName)));
},

addClassName:function(element,className){
if(!(element=$(element)))return;
if(!Element.hasClassName(element,className))
element.className+=(element.className?'':'')+className;
returnelement;
},

removeClassName:function(element,className){
if(!(element=$(element)))return;
element.className=element.className.replace(
newRegExp("(^|\\s+)"+className+"(\\s+|$)"),'').strip();
returnelement;
},

toggleClassName:function(element,className){
if(!(element=$(element)))return;
returnElement[Element.hasClassName(element,className)?
'removeClassName':'addClassName'](element,className);
},

cleanWhitespace:function(element){
element=$(element);
varnode=element.firstChild;
while(node){
varnextNode=node.nextSibling;
if(node.nodeType==3&&!/\S/.test(node.nodeValue))
element.removeChild(node);
node=nextNode;
}
returnelement;
},

empty:function(element){
return$(element).innerHTML.blank();
},

descendantOf:function(element,ancestor){
element=$(element),ancestor=$(ancestor);

if(element.compareDocumentPosition)
return(element.compareDocumentPosition(ancestor)&8)===8;

if(ancestor.contains)
returnancestor.contains(element)&&ancestor!==element;

while(element=element.parentNode)
if(element==ancestor)returntrue;

returnfalse;
},

scrollTo:function(element){
element=$(element);
varpos=Element.cumulativeOffset(element);
window.scrollTo(pos[0],pos[1]);
returnelement;
},

getStyle:function(element,style){
element=$(element);
style=style=='float'?'cssFloat':style.camelize();
varvalue=element.style[style];
if(!value||value=='auto'){
varcss=document.defaultView.getComputedStyle(element,null);
value=css?css[style]:null;
}
if(style=='opacity')returnvalue?parseFloat(value):1.0;
returnvalue=='auto'?null:value;
},

getOpacity:function(element){
return$(element).getStyle('opacity');
},

setStyle:function(element,styles){
element=$(element);
varelementStyle=element.style,match;
if(Object.isString(styles)){
element.style.cssText+=';'+styles;
returnstyles.include('opacity')?
element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]):element;
}
for(varpropertyinstyles)
if(property=='opacity')element.setOpacity(styles[property]);
else
elementStyle[(property=='float'||property=='cssFloat')?
(Object.isUndefined(elementStyle.styleFloat)?'cssFloat':'styleFloat'):
property]=styles[property];

returnelement;
},

setOpacity:function(element,value){
element=$(element);
element.style.opacity=(value==1||value==='')?'':
(value<0.00001)?0:value;
returnelement;
},

makePositioned:function(element){
element=$(element);
varpos=Element.getStyle(element,'position');
if(pos=='static'||!pos){
element._madePositioned=true;
element.style.position='relative';
if(Prototype.Browser.Opera){
element.style.top=0;
element.style.left=0;
}
}
returnelement;
},

undoPositioned:function(element){
element=$(element);
if(element._madePositioned){
element._madePositioned=undefined;
element.style.position=
element.style.top=
element.style.left=
element.style.bottom=
element.style.right='';
}
returnelement;
},

makeClipping:function(element){
element=$(element);
if(element._overflow)returnelement;
element._overflow=Element.getStyle(element,'overflow')||'auto';
if(element._overflow!=='hidden')
element.style.overflow='hidden';
returnelement;
},

undoClipping:function(element){
element=$(element);
if(!element._overflow)returnelement;
element.style.overflow=element._overflow=='auto'?'':element._overflow;
element._overflow=null;
returnelement;
},

clonePosition:function(element,source){
varoptions=Object.extend({
setLeft:true,
setTop:true,
setWidth:true,
setHeight:true,
offsetTop:0,
offsetLeft:0
},arguments[2]||{});

source=$(source);
varp=Element.viewportOffset(source),delta=[0,0],parent=null;

element=$(element);

if(Element.getStyle(element,'position')=='absolute'){
parent=Element.getOffsetParent(element);
delta=Element.viewportOffset(parent);
}

if(parent==document.body){
delta[0]-=document.body.offsetLeft;
delta[1]-=document.body.offsetTop;
}

if(options.setLeft)element.style.left=(p[0]-delta[0]+options.offsetLeft)+'px';
if(options.setTop)element.style.top=(p[1]-delta[1]+options.offsetTop)+'px';
if(options.setWidth)element.style.width=source.offsetWidth+'px';
if(options.setHeight)element.style.height=source.offsetHeight+'px';
returnelement;
}
};

Object.extend(Element.Methods,{
getElementsBySelector:Element.Methods.select,

childElements:Element.Methods.immediateDescendants
});

Element._attributeTranslations={
write:{
names:{
className:'class',
htmlFor:'for'
},
values:{}
}
};

if(Prototype.Browser.Opera){
Element.Methods.getStyle=Element.Methods.getStyle.wrap(
function(proceed,element,style){
switch(style){
case'height':case'width':
if(!Element.visible(element))returnnull;

vardim=parseInt(proceed(element,style),10);

if(dim!==element['offset'+style.capitalize()])
returndim+'px';

varproperties;
if(style==='height'){
properties=['border-top-width','padding-top',
'padding-bottom','border-bottom-width'];
}
else{
properties=['border-left-width','padding-left',
'padding-right','border-right-width'];
}
returnproperties.inject(dim,function(memo,property){
varval=proceed(element,property);
returnval===null?memo:memo-parseInt(val,10);
})+'px';
default:returnproceed(element,style);
}
}
);

Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(
function(proceed,element,attribute){
if(attribute==='title')returnelement.title;
returnproceed(element,attribute);
}
);
}

elseif(Prototype.Browser.IE){
Element.Methods.getStyle=function(element,style){
element=$(element);
style=(style=='float'||style=='cssFloat')?'styleFloat':style.camelize();
varvalue=element.style[style];
if(!value&&element.currentStyle)value=element.currentStyle[style];

if(style=='opacity'){
if(value=(element.getStyle('filter')||'').match(/alpha\(opacity=(.*)\)/))
if(value[1])returnparseFloat(value[1])/100;
return1.0;
}

if(value=='auto'){
if((style=='width'||style=='height')&&(element.getStyle('display')!='none'))
returnelement['offset'+style.capitalize()]+'px';
returnnull;
}
returnvalue;
};

Element.Methods.setOpacity=function(element,value){
functionstripAlpha(filter){
returnfilter.replace(/alpha\([^\)]*\)/gi,'');
}
element=$(element);
varcurrentStyle=element.currentStyle;
if((currentStyle&&!currentStyle.hasLayout)||
(!currentStyle&&element.style.zoom=='normal'))
element.style.zoom=1;

varfilter=element.getStyle('filter'),style=element.style;
if(value==1||value===''){
(filter=stripAlpha(filter))?
style.filter=filter:style.removeAttribute('filter');
returnelement;
}elseif(value<0.00001)value=0;
style.filter=stripAlpha(filter)+
'alpha(opacity='+(value*100)+')';
returnelement;
};

Element._attributeTranslations=(function(){

varclassProp='className',
forProp='for',
el=document.createElement('div');

el.setAttribute(classProp,'x');

if(el.className!=='x'){
el.setAttribute('class','x');
if(el.className==='x'){
classProp='class';
}
}
el=null;

el=document.createElement('label');
el.setAttribute(forProp,'x');
if(el.htmlFor!=='x'){
el.setAttribute('htmlFor','x');
if(el.htmlFor==='x'){
forProp='htmlFor';
}
}
el=null;

return{
read:{
names:{
'class':classProp,
'className':classProp,
'for':forProp,
'htmlFor':forProp
},
values:{
_getAttr:function(element,attribute){
returnelement.getAttribute(attribute);
},
_getAttr2:function(element,attribute){
returnelement.getAttribute(attribute,2);
},
_getAttrNode:function(element,attribute){
varnode=element.getAttributeNode(attribute);
returnnode?node.value:"";
},
_getEv:(function(){

varel=document.createElement('div'),f;
el.onclick=Prototype.emptyFunction;
varvalue=el.getAttribute('onclick');

if(String(value).indexOf('{')>-1){
f=function(element,attribute){
attribute=element.getAttribute(attribute);
if(!attribute)returnnull;
attribute=attribute.toString();
attribute=attribute.split('{')[1];
attribute=attribute.split('}')[0];
returnattribute.strip();
};
}
elseif(value===''){
f=function(element,attribute){
attribute=element.getAttribute(attribute);
if(!attribute)returnnull;
returnattribute.strip();
};
}
el=null;
returnf;
})(),
_flag:function(element,attribute){
return$(element).hasAttribute(attribute)?attribute:null;
},
style:function(element){
returnelement.style.cssText.toLowerCase();
},
title:function(element){
returnelement.title;
}
}
}
}
})();

Element._attributeTranslations.write={
names:Object.extend({
cellpadding:'cellPadding',
cellspacing:'cellSpacing'
},Element._attributeTranslations.read.names),
values:{
checked:function(element,value){
element.checked=!!value;
},

style:function(element,value){
element.style.cssText=value?value:'';
}
}
};

Element._attributeTranslations.has={};

$w('colSpanrowSpanvAligndateTimeaccessKeytabIndex'+
'encTypemaxLengthreadOnlylongDescframeBorder').each(function(attr){
Element._attributeTranslations.write.names[attr.toLowerCase()]=attr;
Element._attributeTranslations.has[attr.toLowerCase()]=attr;
});

(function(v){
Object.extend(v,{
href:v._getAttr2,
src:v._getAttr2,
type:v._getAttr,
action:v._getAttrNode,
disabled:v._flag,
checked:v._flag,
readonly:v._flag,
multiple:v._flag,
onload:v._getEv,
onunload:v._getEv,
onclick:v._getEv,
ondblclick:v._getEv,
onmousedown:v._getEv,
onmouseup:v._getEv,
onmouseover:v._getEv,
onmousemove:v._getEv,
onmouseout:v._getEv,
onfocus:v._getEv,
onblur:v._getEv,
onkeypress:v._getEv,
onkeydown:v._getEv,
onkeyup:v._getEv,
onsubmit:v._getEv,
onreset:v._getEv,
onselect:v._getEv,
onchange:v._getEv
});
})(Element._attributeTranslations.read.values);

if(Prototype.BrowserFeatures.ElementExtensions){
(function(){
function_descendants(element){
varnodes=element.getElementsByTagName('*'),results=[];
for(vari=0,node;node=nodes[i];i++)
if(node.tagName!=="!")//Filteroutcommentnodes.
results.push(node);
returnresults;
}

Element.Methods.down=function(element,expression,index){
element=$(element);
if(arguments.length==1)returnelement.firstDescendant();
returnObject.isNumber(expression)?_descendants(element)[expression]:
Element.select(element,expression)[index||0];
}
})();
}

}

elseif(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){
Element.Methods.setOpacity=function(element,value){
element=$(element);
element.style.opacity=(value==1)?0.999999:
(value==='')?'':(value<0.00001)?0:value;
returnelement;
};
}

elseif(Prototype.Browser.WebKit){
Element.Methods.setOpacity=function(element,value){
element=$(element);
element.style.opacity=(value==1||value==='')?'':
(value<0.00001)?0:value;

if(value==1)
if(element.tagName.toUpperCase()=='IMG'&&element.width){
element.width++;element.width--;
}elsetry{
varn=document.createTextNode('');
element.appendChild(n);
element.removeChild(n);
}catch(e){}

returnelement;
};
}

if('outerHTML'indocument.documentElement){
Element.Methods.replace=function(element,content){
element=$(element);

if(content&&content.toElement)content=content.toElement();
if(Object.isElement(content)){
element.parentNode.replaceChild(content,element);
returnelement;
}

content=Object.toHTML(content);
varparent=element.parentNode,tagName=parent.tagName.toUpperCase();

if(Element._insertionTranslations.tags[tagName]){
varnextSibling=element.next(),
fragments=Element._getContentFromAnonymousElement(tagName,content.stripScripts());
parent.removeChild(element);
if(nextSibling)
fragments.each(function(node){parent.insertBefore(node,nextSibling)});
else
fragments.each(function(node){parent.appendChild(node)});
}
elseelement.outerHTML=content.stripScripts();

content.evalScripts.bind(content).defer();
returnelement;
};
}

Element._returnOffset=function(l,t){
varresult=[l,t];
result.left=l;
result.top=t;
returnresult;
};

Element._getContentFromAnonymousElement=function(tagName,html,force){
vardiv=newElement('div'),
t=Element._insertionTranslations.tags[tagName];

varworkaround=false;
if(t)workaround=true;
elseif(force){
workaround=true;
t=['','',0];
}

if(workaround){
div.innerHTML='&nbsp;'+t[0]+html+t[1];
div.removeChild(div.firstChild);
for(vari=t[2];i--;){
div=div.firstChild;
}
}
else{
div.innerHTML=html;
}
return$A(div.childNodes);
};

Element._insertionTranslations={
before:function(element,node){
element.parentNode.insertBefore(node,element);
},
top:function(element,node){
element.insertBefore(node,element.firstChild);
},
bottom:function(element,node){
element.appendChild(node);
},
after:function(element,node){
element.parentNode.insertBefore(node,element.nextSibling);
},
tags:{
TABLE:['<table>','</table>',1],
TBODY:['<table><tbody>','</tbody></table>',2],
TR:['<table><tbody><tr>','</tr></tbody></table>',3],
TD:['<table><tbody><tr><td>','</td></tr></tbody></table>',4],
SELECT:['<select>','</select>',1]
}
};

(function(){
vartags=Element._insertionTranslations.tags;
Object.extend(tags,{
THEAD:tags.TBODY,
TFOOT:tags.TBODY,
TH:tags.TD
});
})();

Element.Methods.Simulated={
hasAttribute:function(element,attribute){
attribute=Element._attributeTranslations.has[attribute]||attribute;
varnode=$(element).getAttributeNode(attribute);
return!!(node&&node.specified);
}
};

Element.Methods.ByTag={};

Object.extend(Element,Element.Methods);

(function(div){

if(!Prototype.BrowserFeatures.ElementExtensions&&div['__proto__']){
window.HTMLElement={};
window.HTMLElement.prototype=div['__proto__'];
Prototype.BrowserFeatures.ElementExtensions=true;
}

div=null;

})(document.createElement('div'));

Element.extend=(function(){

functioncheckDeficiency(tagName){
if(typeofwindow.Element!='undefined'){
varproto=window.Element.prototype;
if(proto){
varid='_'+(Math.random()+'').slice(2),
el=document.createElement(tagName);
proto[id]='x';
varisBuggy=(el[id]!=='x');
deleteproto[id];
el=null;
returnisBuggy;
}
}
returnfalse;
}

functionextendElementWith(element,methods){
for(varpropertyinmethods){
varvalue=methods[property];
if(Object.isFunction(value)&&!(propertyinelement))
element[property]=value.methodize();
}
}

varHTMLOBJECTELEMENT_PROTOTYPE_BUGGY=checkDeficiency('object');

if(Prototype.BrowserFeatures.SpecificElementExtensions){
if(HTMLOBJECTELEMENT_PROTOTYPE_BUGGY){
returnfunction(element){
if(element&&typeofelement._extendedByPrototype=='undefined'){
vart=element.tagName;
if(t&&(/^(?:object|applet|embed)$/i.test(t))){
extendElementWith(element,Element.Methods);
extendElementWith(element,Element.Methods.Simulated);
extendElementWith(element,Element.Methods.ByTag[t.toUpperCase()]);
}
}
returnelement;
}
}
returnPrototype.K;
}

varMethods={},ByTag=Element.Methods.ByTag;

varextend=Object.extend(function(element){
if(!element||typeofelement._extendedByPrototype!='undefined'||
element.nodeType!=1||element==window)returnelement;

varmethods=Object.clone(Methods),
tagName=element.tagName.toUpperCase();

if(ByTag[tagName])Object.extend(methods,ByTag[tagName]);

extendElementWith(element,methods);

element._extendedByPrototype=Prototype.emptyFunction;
returnelement;

},{
refresh:function(){
if(!Prototype.BrowserFeatures.ElementExtensions){
Object.extend(Methods,Element.Methods);
Object.extend(Methods,Element.Methods.Simulated);
}
}
});

extend.refresh();
returnextend;
})();

if(document.documentElement.hasAttribute){
Element.hasAttribute=function(element,attribute){
returnelement.hasAttribute(attribute);
};
}
else{
Element.hasAttribute=Element.Methods.Simulated.hasAttribute;
}

Element.addMethods=function(methods){
varF=Prototype.BrowserFeatures,T=Element.Methods.ByTag;

if(!methods){
Object.extend(Form,Form.Methods);
Object.extend(Form.Element,Form.Element.Methods);
Object.extend(Element.Methods.ByTag,{
"FORM":Object.clone(Form.Methods),
"INPUT":Object.clone(Form.Element.Methods),
"SELECT":Object.clone(Form.Element.Methods),
"TEXTAREA":Object.clone(Form.Element.Methods),
"BUTTON":Object.clone(Form.Element.Methods)
});
}

if(arguments.length==2){
vartagName=methods;
methods=arguments[1];
}

if(!tagName)Object.extend(Element.Methods,methods||{});
else{
if(Object.isArray(tagName))tagName.each(extend);
elseextend(tagName);
}

functionextend(tagName){
tagName=tagName.toUpperCase();
if(!Element.Methods.ByTag[tagName])
Element.Methods.ByTag[tagName]={};
Object.extend(Element.Methods.ByTag[tagName],methods);
}

functioncopy(methods,destination,onlyIfAbsent){
onlyIfAbsent=onlyIfAbsent||false;
for(varpropertyinmethods){
varvalue=methods[property];
if(!Object.isFunction(value))continue;
if(!onlyIfAbsent||!(propertyindestination))
destination[property]=value.methodize();
}
}

functionfindDOMClass(tagName){
varklass;
vartrans={
"OPTGROUP":"OptGroup","TEXTAREA":"TextArea","P":"Paragraph",
"FIELDSET":"FieldSet","UL":"UList","OL":"OList","DL":"DList",
"DIR":"Directory","H1":"Heading","H2":"Heading","H3":"Heading",
"H4":"Heading","H5":"Heading","H6":"Heading","Q":"Quote",
"INS":"Mod","DEL":"Mod","A":"Anchor","IMG":"Image","CAPTION":
"TableCaption","COL":"TableCol","COLGROUP":"TableCol","THEAD":
"TableSection","TFOOT":"TableSection","TBODY":"TableSection","TR":
"TableRow","TH":"TableCell","TD":"TableCell","FRAMESET":
"FrameSet","IFRAME":"IFrame"
};
if(trans[tagName])klass='HTML'+trans[tagName]+'Element';
if(window[klass])returnwindow[klass];
klass='HTML'+tagName+'Element';
if(window[klass])returnwindow[klass];
klass='HTML'+tagName.capitalize()+'Element';
if(window[klass])returnwindow[klass];

varelement=document.createElement(tagName),
proto=element['__proto__']||element.constructor.prototype;

element=null;
returnproto;
}

varelementPrototype=window.HTMLElement?HTMLElement.prototype:
Element.prototype;

if(F.ElementExtensions){
copy(Element.Methods,elementPrototype);
copy(Element.Methods.Simulated,elementPrototype,true);
}

if(F.SpecificElementExtensions){
for(vartaginElement.Methods.ByTag){
varklass=findDOMClass(tag);
if(Object.isUndefined(klass))continue;
copy(T[tag],klass.prototype);
}
}

Object.extend(Element,Element.Methods);
deleteElement.ByTag;

if(Element.extend.refresh)Element.extend.refresh();
Element.cache={};
};


document.viewport={

getDimensions:function(){
return{width:this.getWidth(),height:this.getHeight()};
},

getScrollOffsets:function(){
returnElement._returnOffset(
window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,
window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);
}
};

(function(viewport){
varB=Prototype.Browser,doc=document,element,property={};

functiongetRootElement(){
if(B.WebKit&&!doc.evaluate)
returndocument;

if(B.Opera&&window.parseFloat(window.opera.version())<9.5)
returndocument.body;

returndocument.documentElement;
}

functiondefine(D){
if(!element)element=getRootElement();

property[D]='client'+D;

viewport['get'+D]=function(){returnelement[property[D]]};
returnviewport['get'+D]();
}

viewport.getWidth=define.curry('Width');

viewport.getHeight=define.curry('Height');
})(document.viewport);


Element.Storage={
UID:1
};

Element.addMethods({
getStorage:function(element){
if(!(element=$(element)))return;

varuid;
if(element===window){
uid=0;
}else{
if(typeofelement._prototypeUID==="undefined")
element._prototypeUID=Element.Storage.UID++;
uid=element._prototypeUID;
}

if(!Element.Storage[uid])
Element.Storage[uid]=$H();

returnElement.Storage[uid];
},

store:function(element,key,value){
if(!(element=$(element)))return;

if(arguments.length===2){
Element.getStorage(element).update(key);
}else{
Element.getStorage(element).set(key,value);
}

returnelement;
},

retrieve:function(element,key,defaultValue){
if(!(element=$(element)))return;
varhash=Element.getStorage(element),value=hash.get(key);

if(Object.isUndefined(value)){
hash.set(key,defaultValue);
value=defaultValue;
}

returnvalue;
},

clone:function(element,deep){
if(!(element=$(element)))return;
varclone=element.cloneNode(deep);
clone._prototypeUID=void0;
if(deep){
vardescendants=Element.select(clone,'*'),
i=descendants.length;
while(i--){
descendants[i]._prototypeUID=void0;
}
}
returnElement.extend(clone);
},

purge:function(element){
if(!(element=$(element)))return;
varpurgeElement=Element._purgeElement;

purgeElement(element);

vardescendants=element.getElementsByTagName('*'),
i=descendants.length;

while(i--)purgeElement(descendants[i]);

returnnull;
}
});

(function(){

functiontoDecimal(pctString){
varmatch=pctString.match(/^(\d+)%?$/i);
if(!match)returnnull;
return(Number(match[1])/100);
}

functiongetPixelValue(value,property,context){
varelement=null;
if(Object.isElement(value)){
element=value;
value=element.getStyle(property);
}

if(value===null){
returnnull;
}

if((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)){
returnwindow.parseFloat(value);
}

varisPercentage=value.include('%'),isViewport=(context===document.viewport);

if(/\d/.test(value)&&element&&element.runtimeStyle&&!(isPercentage&&isViewport)){
varstyle=element.style.left,rStyle=element.runtimeStyle.left;
element.runtimeStyle.left=element.currentStyle.left;
element.style.left=value||0;
value=element.style.pixelLeft;
element.style.left=style;
element.runtimeStyle.left=rStyle;

returnvalue;
}

if(element&&isPercentage){
context=context||element.parentNode;
vardecimal=toDecimal(value);
varwhole=null;
varposition=element.getStyle('position');

varisHorizontal=property.include('left')||property.include('right')||
property.include('width');

varisVertical=property.include('top')||property.include('bottom')||
property.include('height');

if(context===document.viewport){
if(isHorizontal){
whole=document.viewport.getWidth();
}elseif(isVertical){
whole=document.viewport.getHeight();
}
}else{
if(isHorizontal){
whole=$(context).measure('width');
}elseif(isVertical){
whole=$(context).measure('height');
}
}

return(whole===null)?0:whole*decimal;
}

return0;
}

functiontoCSSPixels(number){
if(Object.isString(number)&&number.endsWith('px')){
returnnumber;
}
returnnumber+'px';
}

functionisDisplayed(element){
varoriginalElement=element;
while(element&&element.parentNode){
vardisplay=element.getStyle('display');
if(display==='none'){
returnfalse;
}
element=$(element.parentNode);
}
returntrue;
}

varhasLayout=Prototype.K;
if('currentStyle'indocument.documentElement){
hasLayout=function(element){
if(!element.currentStyle.hasLayout){
element.style.zoom=1;
}
returnelement;
};
}

functioncssNameFor(key){
if(key.include('border'))key=key+'-width';
returnkey.camelize();
}

Element.Layout=Class.create(Hash,{
initialize:function($super,element,preCompute){
$super();
this.element=$(element);

Element.Layout.PROPERTIES.each(function(property){
this._set(property,null);
},this);

if(preCompute){
this._preComputing=true;
this._begin();
Element.Layout.PROPERTIES.each(this._compute,this);
this._end();
this._preComputing=false;
}
},

_set:function(property,value){
returnHash.prototype.set.call(this,property,value);
},

set:function(property,value){
throw"PropertiesofElement.Layoutareread-only.";
},

get:function($super,property){
varvalue=$super(property);
returnvalue===null?this._compute(property):value;
},

_begin:function(){
if(this._prepared)return;

varelement=this.element;
if(isDisplayed(element)){
this._prepared=true;
return;
}

varoriginalStyles={
position:element.style.position||'',
width:element.style.width||'',
visibility:element.style.visibility||'',
display:element.style.display||''
};

element.store('prototype_original_styles',originalStyles);

varposition=element.getStyle('position'),
width=element.getStyle('width');

if(width==="0px"||width===null){
element.style.display='block';
width=element.getStyle('width');
}

varcontext=(position==='fixed')?document.viewport:
element.parentNode;

element.setStyle({
position:'absolute',
visibility:'hidden',
display:'block'
});

varpositionedWidth=element.getStyle('width');

varnewWidth;
if(width&&(positionedWidth===width)){
newWidth=getPixelValue(element,'width',context);
}elseif(position==='absolute'||position==='fixed'){
newWidth=getPixelValue(element,'width',context);
}else{
varparent=element.parentNode,pLayout=$(parent).getLayout();

newWidth=pLayout.get('width')-
this.get('margin-left')-
this.get('border-left')-
this.get('padding-left')-
this.get('padding-right')-
this.get('border-right')-
this.get('margin-right');
}

element.setStyle({width:newWidth+'px'});

this._prepared=true;
},

_end:function(){
varelement=this.element;
varoriginalStyles=element.retrieve('prototype_original_styles');
element.store('prototype_original_styles',null);
element.setStyle(originalStyles);
this._prepared=false;
},

_compute:function(property){
varCOMPUTATIONS=Element.Layout.COMPUTATIONS;
if(!(propertyinCOMPUTATIONS)){
throw"Propertynotfound.";
}

returnthis._set(property,COMPUTATIONS[property].call(this,this.element));
},

toObject:function(){
varargs=$A(arguments);
varkeys=(args.length===0)?Element.Layout.PROPERTIES:
args.join('').split('');
varobj={};
keys.each(function(key){
if(!Element.Layout.PROPERTIES.include(key))return;
varvalue=this.get(key);
if(value!=null)obj[key]=value;
},this);
returnobj;
},

toHash:function(){
varobj=this.toObject.apply(this,arguments);
returnnewHash(obj);
},

toCSS:function(){
varargs=$A(arguments);
varkeys=(args.length===0)?Element.Layout.PROPERTIES:
args.join('').split('');
varcss={};

keys.each(function(key){
if(!Element.Layout.PROPERTIES.include(key))return;
if(Element.Layout.COMPOSITE_PROPERTIES.include(key))return;

varvalue=this.get(key);
if(value!=null)css[cssNameFor(key)]=value+'px';
},this);
returncss;
},

inspect:function(){
return"#<Element.Layout>";
}
});

Object.extend(Element.Layout,{
PROPERTIES:$w('heightwidthtopleftrightbottomborder-leftborder-rightborder-topborder-bottompadding-leftpadding-rightpadding-toppadding-bottommargin-topmargin-bottommargin-leftmargin-rightpadding-box-widthpadding-box-heightborder-box-widthborder-box-heightmargin-box-widthmargin-box-height'),

COMPOSITE_PROPERTIES:$w('padding-box-widthpadding-box-heightmargin-box-widthmargin-box-heightborder-box-widthborder-box-height'),

COMPUTATIONS:{
'height':function(element){
if(!this._preComputing)this._begin();

varbHeight=this.get('border-box-height');
if(bHeight<=0){
if(!this._preComputing)this._end();
return0;
}

varbTop=this.get('border-top'),
bBottom=this.get('border-bottom');

varpTop=this.get('padding-top'),
pBottom=this.get('padding-bottom');

if(!this._preComputing)this._end();

returnbHeight-bTop-bBottom-pTop-pBottom;
},

'width':function(element){
if(!this._preComputing)this._begin();

varbWidth=this.get('border-box-width');
if(bWidth<=0){
if(!this._preComputing)this._end();
return0;
}

varbLeft=this.get('border-left'),
bRight=this.get('border-right');

varpLeft=this.get('padding-left'),
pRight=this.get('padding-right');

if(!this._preComputing)this._end();

returnbWidth-bLeft-bRight-pLeft-pRight;
},

'padding-box-height':function(element){
varheight=this.get('height'),
pTop=this.get('padding-top'),
pBottom=this.get('padding-bottom');

returnheight+pTop+pBottom;
},

'padding-box-width':function(element){
varwidth=this.get('width'),
pLeft=this.get('padding-left'),
pRight=this.get('padding-right');

returnwidth+pLeft+pRight;
},

'border-box-height':function(element){
if(!this._preComputing)this._begin();
varheight=element.offsetHeight;
if(!this._preComputing)this._end();
returnheight;
},

'border-box-width':function(element){
if(!this._preComputing)this._begin();
varwidth=element.offsetWidth;
if(!this._preComputing)this._end();
returnwidth;
},

'margin-box-height':function(element){
varbHeight=this.get('border-box-height'),
mTop=this.get('margin-top'),
mBottom=this.get('margin-bottom');

if(bHeight<=0)return0;

returnbHeight+mTop+mBottom;
},

'margin-box-width':function(element){
varbWidth=this.get('border-box-width'),
mLeft=this.get('margin-left'),
mRight=this.get('margin-right');

if(bWidth<=0)return0;

returnbWidth+mLeft+mRight;
},

'top':function(element){
varoffset=element.positionedOffset();
returnoffset.top;
},

'bottom':function(element){
varoffset=element.positionedOffset(),
parent=element.getOffsetParent(),
pHeight=parent.measure('height');

varmHeight=this.get('border-box-height');

returnpHeight-mHeight-offset.top;
},

'left':function(element){
varoffset=element.positionedOffset();
returnoffset.left;
},

'right':function(element){
varoffset=element.positionedOffset(),
parent=element.getOffsetParent(),
pWidth=parent.measure('width');

varmWidth=this.get('border-box-width');

returnpWidth-mWidth-offset.left;
},

'padding-top':function(element){
returngetPixelValue(element,'paddingTop');
},

'padding-bottom':function(element){
returngetPixelValue(element,'paddingBottom');
},

'padding-left':function(element){
returngetPixelValue(element,'paddingLeft');
},

'padding-right':function(element){
returngetPixelValue(element,'paddingRight');
},

'border-top':function(element){
returngetPixelValue(element,'borderTopWidth');
},

'border-bottom':function(element){
returngetPixelValue(element,'borderBottomWidth');
},

'border-left':function(element){
returngetPixelValue(element,'borderLeftWidth');
},

'border-right':function(element){
returngetPixelValue(element,'borderRightWidth');
},

'margin-top':function(element){
returngetPixelValue(element,'marginTop');
},

'margin-bottom':function(element){
returngetPixelValue(element,'marginBottom');
},

'margin-left':function(element){
returngetPixelValue(element,'marginLeft');
},

'margin-right':function(element){
returngetPixelValue(element,'marginRight');
}
}
});

if('getBoundingClientRect'indocument.documentElement){
Object.extend(Element.Layout.COMPUTATIONS,{
'right':function(element){
varparent=hasLayout(element.getOffsetParent());
varrect=element.getBoundingClientRect(),
pRect=parent.getBoundingClientRect();

return(pRect.right-rect.right).round();
},

'bottom':function(element){
varparent=hasLayout(element.getOffsetParent());
varrect=element.getBoundingClientRect(),
pRect=parent.getBoundingClientRect();

return(pRect.bottom-rect.bottom).round();
}
});
}

Element.Offset=Class.create({
initialize:function(left,top){
this.left=left.round();
this.top=top.round();

this[0]=this.left;
this[1]=this.top;
},

relativeTo:function(offset){
returnnewElement.Offset(
this.left-offset.left,
this.top-offset.top
);
},

inspect:function(){
return"#<Element.Offsetleft:#{left}top:#{top}>".interpolate(this);
},

toString:function(){
return"[#{left},#{top}]".interpolate(this);
},

toArray:function(){
return[this.left,this.top];
}
});

functiongetLayout(element,preCompute){
returnnewElement.Layout(element,preCompute);
}

functionmeasure(element,property){
return$(element).getLayout().get(property);
}

functiongetDimensions(element){
element=$(element);
vardisplay=Element.getStyle(element,'display');

if(display&&display!=='none'){
return{width:element.offsetWidth,height:element.offsetHeight};
}

varstyle=element.style;
varoriginalStyles={
visibility:style.visibility,
position:style.position,
display:style.display
};

varnewStyles={
visibility:'hidden',
display:'block'
};

if(originalStyles.position!=='fixed')
newStyles.position='absolute';

Element.setStyle(element,newStyles);

vardimensions={
width:element.offsetWidth,
height:element.offsetHeight
};

Element.setStyle(element,originalStyles);

returndimensions;
}

functiongetOffsetParent(element){
element=$(element);

if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element))
return$(document.body);

varisInline=(Element.getStyle(element,'display')==='inline');
if(!isInline&&element.offsetParent)return$(element.offsetParent);

while((element=element.parentNode)&&element!==document.body){
if(Element.getStyle(element,'position')!=='static'){
returnisHtml(element)?$(document.body):$(element);
}
}

return$(document.body);
}


functioncumulativeOffset(element){
element=$(element);
varvalueT=0,valueL=0;
if(element.parentNode){
do{
valueT+=element.offsetTop||0;
valueL+=element.offsetLeft||0;
element=element.offsetParent;
}while(element);
}
returnnewElement.Offset(valueL,valueT);
}

functionpositionedOffset(element){
element=$(element);

varlayout=element.getLayout();

varvalueT=0,valueL=0;
do{
valueT+=element.offsetTop||0;
valueL+=element.offsetLeft||0;
element=element.offsetParent;
if(element){
if(isBody(element))break;
varp=Element.getStyle(element,'position');
if(p!=='static')break;
}
}while(element);

valueL-=layout.get('margin-top');
valueT-=layout.get('margin-left');

returnnewElement.Offset(valueL,valueT);
}

functioncumulativeScrollOffset(element){
varvalueT=0,valueL=0;
do{
valueT+=element.scrollTop||0;
valueL+=element.scrollLeft||0;
element=element.parentNode;
}while(element);
returnnewElement.Offset(valueL,valueT);
}

functionviewportOffset(forElement){
element=$(element);
varvalueT=0,valueL=0,docBody=document.body;

varelement=forElement;
do{
valueT+=element.offsetTop||0;
valueL+=element.offsetLeft||0;
if(element.offsetParent==docBody&&
Element.getStyle(element,'position')=='absolute')break;
}while(element=element.offsetParent);

element=forElement;
do{
if(element!=docBody){
valueT-=element.scrollTop||0;
valueL-=element.scrollLeft||0;
}
}while(element=element.parentNode);
returnnewElement.Offset(valueL,valueT);
}

functionabsolutize(element){
element=$(element);

if(Element.getStyle(element,'position')==='absolute'){
returnelement;
}

varoffsetParent=getOffsetParent(element);
vareOffset=element.viewportOffset(),
pOffset=offsetParent.viewportOffset();

varoffset=eOffset.relativeTo(pOffset);
varlayout=element.getLayout();

element.store('prototype_absolutize_original_styles',{
left:element.getStyle('left'),
top:element.getStyle('top'),
width:element.getStyle('width'),
height:element.getStyle('height')
});

element.setStyle({
position:'absolute',
top:offset.top+'px',
left:offset.left+'px',
width:layout.get('width')+'px',
height:layout.get('height')+'px'
});

returnelement;
}

functionrelativize(element){
element=$(element);
if(Element.getStyle(element,'position')==='relative'){
returnelement;
}

varoriginalStyles=
element.retrieve('prototype_absolutize_original_styles');

if(originalStyles)element.setStyle(originalStyles);
returnelement;
}

if(Prototype.Browser.IE){
getOffsetParent=getOffsetParent.wrap(
function(proceed,element){
element=$(element);

if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element))
return$(document.body);

varposition=element.getStyle('position');
if(position!=='static')returnproceed(element);

element.setStyle({position:'relative'});
varvalue=proceed(element);
element.setStyle({position:position});
returnvalue;
}
);

positionedOffset=positionedOffset.wrap(function(proceed,element){
element=$(element);
if(!element.parentNode)returnnewElement.Offset(0,0);
varposition=element.getStyle('position');
if(position!=='static')returnproceed(element);

varoffsetParent=element.getOffsetParent();
if(offsetParent&&offsetParent.getStyle('position')==='fixed')
hasLayout(offsetParent);

element.setStyle({position:'relative'});
varvalue=proceed(element);
element.setStyle({position:position});
returnvalue;
});
}elseif(Prototype.Browser.Webkit){
cumulativeOffset=function(element){
element=$(element);
varvalueT=0,valueL=0;
do{
valueT+=element.offsetTop||0;
valueL+=element.offsetLeft||0;
if(element.offsetParent==document.body)
if(Element.getStyle(element,'position')=='absolute')break;

element=element.offsetParent;
}while(element);

returnnewElement.Offset(valueL,valueT);
};
}


Element.addMethods({
getLayout:getLayout,
measure:measure,
getDimensions:getDimensions,
getOffsetParent:getOffsetParent,
cumulativeOffset:cumulativeOffset,
positionedOffset:positionedOffset,
cumulativeScrollOffset:cumulativeScrollOffset,
viewportOffset:viewportOffset,
absolutize:absolutize,
relativize:relativize
});

functionisBody(element){
returnelement.nodeName.toUpperCase()==='BODY';
}

functionisHtml(element){
returnelement.nodeName.toUpperCase()==='HTML';
}

functionisDocument(element){
returnelement.nodeType===Node.DOCUMENT_NODE;
}

functionisDetached(element){
returnelement!==document.body&&
!Element.descendantOf(element,document.body);
}

if('getBoundingClientRect'indocument.documentElement){
Element.addMethods({
viewportOffset:function(element){
element=$(element);
if(isDetached(element))returnnewElement.Offset(0,0);

varrect=element.getBoundingClientRect(),
docEl=document.documentElement;
returnnewElement.Offset(rect.left-docEl.clientLeft,
rect.top-docEl.clientTop);
}
});
}
})();
window.$$=function(){
varexpression=$A(arguments).join(',');
returnPrototype.Selector.select(expression,document);
};

Prototype.Selector=(function(){

functionselect(){
thrownewError('Method"Prototype.Selector.select"mustbedefined.');
}

functionmatch(){
thrownewError('Method"Prototype.Selector.match"mustbedefined.');
}

functionfind(elements,expression,index){
index=index||0;
varmatch=Prototype.Selector.match,length=elements.length,matchIndex=0,i;

for(i=0;i<length;i++){
if(match(elements[i],expression)&&index==matchIndex++){
returnElement.extend(elements[i]);
}
}
}

functionextendElements(elements){
for(vari=0,length=elements.length;i<length;i++){
Element.extend(elements[i]);
}
returnelements;
}


varK=Prototype.K;

return{
select:select,
match:match,
find:find,
extendElements:(Element.extend===K)?K:extendElements,
extendElement:Element.extend
};
})();
Prototype._original_property=window.Sizzle;
/*!
*SizzleCSSSelectorEngine-v1.0
*Copyright2009,TheDojoFoundation
*ReleasedundertheMIT,BSD,andGPLLicenses.
*Moreinformation:http://sizzlejs.com/
*/
(function(){

varchunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^>+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
done=0,
toString=Object.prototype.toString,
hasDuplicate=false,
baseHasDuplicate=true;

[0,0].sort(function(){
baseHasDuplicate=false;
return0;
});

varSizzle=function(selector,context,results,seed){
results=results||[];
varorigContext=context=context||document;

if(context.nodeType!==1&&context.nodeType!==9){
return[];
}

if(!selector||typeofselector!=="string"){
returnresults;
}

varparts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),
soFar=selector;

while((chunker.exec(""),m=chunker.exec(soFar))!==null){
soFar=m[3];

parts.push(m[1]);

if(m[2]){
extra=m[3];
break;
}
}

if(parts.length>1&&origPOS.exec(selector)){
if(parts.length===2&&Expr.relative[parts[0]]){
set=posProcess(parts[0]+parts[1],context);
}else{
set=Expr.relative[parts[0]]?
[context]:
Sizzle(parts.shift(),context);

while(parts.length){
selector=parts.shift();

if(Expr.relative[selector])
selector+=parts.shift();

set=posProcess(selector,set);
}
}
}else{
if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&
Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){
varret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];
}

if(context){
varret=seed?
{expr:parts.pop(),set:makeArray(seed)}:
Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);
set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;

if(parts.length>0){
checkSet=makeArray(set);
}else{
prune=false;
}

while(parts.length){
varcur=parts.pop(),pop=cur;

if(!Expr.relative[cur]){
cur="";
}else{
pop=parts.pop();
}

if(pop==null){
pop=context;
}

Expr.relative[cur](checkSet,pop,contextXML);
}
}else{
checkSet=parts=[];
}
}

if(!checkSet){
checkSet=set;
}

if(!checkSet){
throw"Syntaxerror,unrecognizedexpression:"+(cur||selector);
}

if(toString.call(checkSet)==="[objectArray]"){
if(!prune){
results.push.apply(results,checkSet);
}elseif(context&&context.nodeType===1){
for(vari=0;checkSet[i]!=null;i++){
if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){
results.push(set[i]);
}
}
}else{
for(vari=0;checkSet[i]!=null;i++){
if(checkSet[i]&&checkSet[i].nodeType===1){
results.push(set[i]);
}
}
}
}else{
makeArray(checkSet,results);
}

if(extra){
Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results);
}

returnresults;
};

Sizzle.uniqueSort=function(results){
if(sortOrder){
hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);

if(hasDuplicate){
for(vari=1;i<results.length;i++){
if(results[i]===results[i-1]){
results.splice(i--,1);
}
}
}
}

returnresults;
};

Sizzle.matches=function(expr,set){
returnSizzle(expr,null,null,set);
};

Sizzle.find=function(expr,context,isXML){
varset,match;

if(!expr){
return[];
}

for(vari=0,l=Expr.order.length;i<l;i++){
vartype=Expr.order[i],match;

if((match=Expr.leftMatch[type].exec(expr))){
varleft=match[1];
match.splice(1,1);

if(left.substr(left.length-1)!=="\\"){
match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);
if(set!=null){
expr=expr.replace(Expr.match[type],"");
break;
}
}
}
}

if(!set){
set=context.getElementsByTagName("*");
}

return{set:set,expr:expr};
};

Sizzle.filter=function(expr,set,inplace,not){
varold=expr,result=[],curLoop=set,match,anyFound,
isXMLFilter=set&&set[0]&&isXML(set[0]);

while(expr&&set.length){
for(vartypeinExpr.filter){
if((match=Expr.match[type].exec(expr))!=null){
varfilter=Expr.filter[type],found,item;
anyFound=false;

if(curLoop==result){
result=[];
}

if(Expr.preFilter[type]){
match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);

if(!match){
anyFound=found=true;
}elseif(match===true){
continue;
}
}

if(match){
for(vari=0;(item=curLoop[i])!=null;i++){
if(item){
found=filter(item,match,i,curLoop);
varpass=not^!!found;

if(inplace&&found!=null){
if(pass){
anyFound=true;
}else{
curLoop[i]=false;
}
}elseif(pass){
result.push(item);
anyFound=true;
}
}
}
}

if(found!==undefined){
if(!inplace){
curLoop=result;
}

expr=expr.replace(Expr.match[type],"");

if(!anyFound){
return[];
}

break;
}
}
}

if(expr==old){
if(anyFound==null){
throw"Syntaxerror,unrecognizedexpression:"+expr;
}else{
break;
}
}

old=expr;
}

returncurLoop;
};

varExpr=Sizzle.selectors={
order:["ID","NAME","TAG"],
match:{
ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
},
leftMatch:{},
attrMap:{
"class":"className",
"for":"htmlFor"
},
attrHandle:{
href:function(elem){
returnelem.getAttribute("href");
}
},
relative:{
"+":function(checkSet,part,isXML){
varisPartStr=typeofpart==="string",
isTag=isPartStr&&!/\W/.test(part),
isPartStrNotTag=isPartStr&&!isTag;

if(isTag&&!isXML){
part=part.toUpperCase();
}

for(vari=0,l=checkSet.length,elem;i<l;i++){
if((elem=checkSet[i])){
while((elem=elem.previousSibling)&&elem.nodeType!==1){}

checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?
elem||false:
elem===part;
}
}

if(isPartStrNotTag){
Sizzle.filter(part,checkSet,true);
}
},
">":function(checkSet,part,isXML){
varisPartStr=typeofpart==="string";

if(isPartStr&&!/\W/.test(part)){
part=isXML?part:part.toUpperCase();

for(vari=0,l=checkSet.length;i<l;i++){
varelem=checkSet[i];
if(elem){
varparent=elem.parentNode;
checkSet[i]=parent.nodeName===part?parent:false;
}
}
}else{
for(vari=0,l=checkSet.length;i<l;i++){
varelem=checkSet[i];
if(elem){
checkSet[i]=isPartStr?
elem.parentNode:
elem.parentNode===part;
}
}

if(isPartStr){
Sizzle.filter(part,checkSet,true);
}
}
},
"":function(checkSet,part,isXML){
vardoneName=done++,checkFn=dirCheck;

if(!/\W/.test(part)){
varnodeCheck=part=isXML?part:part.toUpperCase();
checkFn=dirNodeCheck;
}

checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);
},
"~":function(checkSet,part,isXML){
vardoneName=done++,checkFn=dirCheck;

if(typeofpart==="string"&&!/\W/.test(part)){
varnodeCheck=part=isXML?part:part.toUpperCase();
checkFn=dirNodeCheck;
}

checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);
}
},
find:{
ID:function(match,context,isXML){
if(typeofcontext.getElementById!=="undefined"&&!isXML){
varm=context.getElementById(match[1]);
returnm?[m]:[];
}
},
NAME:function(match,context,isXML){
if(typeofcontext.getElementsByName!=="undefined"){
varret=[],results=context.getElementsByName(match[1]);

for(vari=0,l=results.length;i<l;i++){
if(results[i].getAttribute("name")===match[1]){
ret.push(results[i]);
}
}

returnret.length===0?null:ret;
}
},
TAG:function(match,context){
returncontext.getElementsByTagName(match[1]);
}
},
preFilter:{
CLASS:function(match,curLoop,inplace,result,not,isXML){
match=""+match[1].replace(/\\/g,"")+"";

if(isXML){
returnmatch;
}

for(vari=0,elem;(elem=curLoop[i])!=null;i++){
if(elem){
if(not^(elem.className&&(""+elem.className+"").indexOf(match)>=0)){
if(!inplace)
result.push(elem);
}elseif(inplace){
curLoop[i]=false;
}
}
}

returnfalse;
},
ID:function(match){
returnmatch[1].replace(/\\/g,"");
},
TAG:function(match,curLoop){
for(vari=0;curLoop[i]===false;i++){}
returncurLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();
},
CHILD:function(match){
if(match[1]=="nth"){
vartest=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(
match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||
!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);

match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0;
}

match[0]=done++;

returnmatch;
},
ATTR:function(match,curLoop,inplace,result,not,isXML){
varname=match[1].replace(/\\/g,"");

if(!isXML&&Expr.attrMap[name]){
match[1]=Expr.attrMap[name];
}

if(match[2]==="~="){
match[4]=""+match[4]+"";
}

returnmatch;
},
PSEUDO:function(match,curLoop,inplace,result,not){
if(match[1]==="not"){
if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){
match[3]=Sizzle(match[3],null,null,curLoop);
}else{
varret=Sizzle.filter(match[3],curLoop,inplace,true^not);
if(!inplace){
result.push.apply(result,ret);
}
returnfalse;
}
}elseif(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){
returntrue;
}

returnmatch;
},
POS:function(match){
match.unshift(true);
returnmatch;
}
},
filters:{
enabled:function(elem){
returnelem.disabled===false&&elem.type!=="hidden";
},
disabled:function(elem){
returnelem.disabled===true;
},
checked:function(elem){
returnelem.checked===true;
},
selected:function(elem){
elem.parentNode.selectedIndex;
returnelem.selected===true;
},
parent:function(elem){
return!!elem.firstChild;
},
empty:function(elem){
return!elem.firstChild;
},
has:function(elem,i,match){
return!!Sizzle(match[3],elem).length;
},
header:function(elem){
return/h\d/i.test(elem.nodeName);
},
text:function(elem){
return"text"===elem.type;
},
radio:function(elem){
return"radio"===elem.type;
},
checkbox:function(elem){
return"checkbox"===elem.type;
},
file:function(elem){
return"file"===elem.type;
},
password:function(elem){
return"password"===elem.type;
},
submit:function(elem){
return"submit"===elem.type;
},
image:function(elem){
return"image"===elem.type;
},
reset:function(elem){
return"reset"===elem.type;
},
button:function(elem){
return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";
},
input:function(elem){
return/input|select|textarea|button/i.test(elem.nodeName);
}
},
setFilters:{
first:function(elem,i){
returni===0;
},
last:function(elem,i,match,array){
returni===array.length-1;
},
even:function(elem,i){
returni%2===0;
},
odd:function(elem,i){
returni%2===1;
},
lt:function(elem,i,match){
returni<match[3]-0;
},
gt:function(elem,i,match){
returni>match[3]-0;
},
nth:function(elem,i,match){
returnmatch[3]-0==i;
},
eq:function(elem,i,match){
returnmatch[3]-0==i;
}
},
filter:{
PSEUDO:function(elem,match,i,array){
varname=match[1],filter=Expr.filters[name];

if(filter){
returnfilter(elem,i,match,array);
}elseif(name==="contains"){
return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0;
}elseif(name==="not"){
varnot=match[3];

for(vari=0,l=not.length;i<l;i++){
if(not[i]===elem){
returnfalse;
}
}

returntrue;
}
},
CHILD:function(elem,match){
vartype=match[1],node=elem;
switch(type){
case'only':
case'first':
while((node=node.previousSibling)){
if(node.nodeType===1)returnfalse;
}
if(type=='first')returntrue;
node=elem;
case'last':
while((node=node.nextSibling)){
if(node.nodeType===1)returnfalse;
}
returntrue;
case'nth':
varfirst=match[2],last=match[3];

if(first==1&&last==0){
returntrue;
}

vardoneName=match[0],
parent=elem.parentNode;

if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){
varcount=0;
for(node=parent.firstChild;node;node=node.nextSibling){
if(node.nodeType===1){
node.nodeIndex=++count;
}
}
parent.sizcache=doneName;
}

vardiff=elem.nodeIndex-last;
if(first==0){
returndiff==0;
}else{
return(diff%first==0&&diff/first>=0);
}
}
},
ID:function(elem,match){
returnelem.nodeType===1&&elem.getAttribute("id")===match;
},
TAG:function(elem,match){
return(match==="*"&&elem.nodeType===1)||elem.nodeName===match;
},
CLASS:function(elem,match){
return(""+(elem.className||elem.getAttribute("class"))+"")
.indexOf(match)>-1;
},
ATTR:function(elem,match){
varname=match[1],
result=Expr.attrHandle[name]?
Expr.attrHandle[name](elem):
elem[name]!=null?
elem[name]:
elem.getAttribute(name),
value=result+"",
type=match[2],
check=match[4];

returnresult==null?
type==="!=":
type==="="?
value===check:
type==="*="?
value.indexOf(check)>=0:
type==="~="?
(""+value+"").indexOf(check)>=0:
!check?
value&&result!==false:
type==="!="?
value!=check:
type==="^="?
value.indexOf(check)===0:
type==="$="?
value.substr(value.length-check.length)===check:
type==="|="?
value===check||value.substr(0,check.length+1)===check+"-":
false;
},
POS:function(elem,match,i,array){
varname=match[2],filter=Expr.setFilters[name];

if(filter){
returnfilter(elem,i,match,array);
}
}
}
};

varorigPOS=Expr.match.POS;

for(vartypeinExpr.match){
Expr.match[type]=newRegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);
Expr.leftMatch[type]=newRegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source);
}

varmakeArray=function(array,results){
array=Array.prototype.slice.call(array,0);

if(results){
results.push.apply(results,array);
returnresults;
}

returnarray;
};

try{
Array.prototype.slice.call(document.documentElement.childNodes,0);

}catch(e){
makeArray=function(array,results){
varret=results||[];

if(toString.call(array)==="[objectArray]"){
Array.prototype.push.apply(ret,array);
}else{
if(typeofarray.length==="number"){
for(vari=0,l=array.length;i<l;i++){
ret.push(array[i]);
}
}else{
for(vari=0;array[i];i++){
ret.push(array[i]);
}
}
}

returnret;
};
}

varsortOrder;

if(document.documentElement.compareDocumentPosition){
sortOrder=function(a,b){
if(!a.compareDocumentPosition||!b.compareDocumentPosition){
if(a==b){
hasDuplicate=true;
}
return0;
}

varret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;
if(ret===0){
hasDuplicate=true;
}
returnret;
};
}elseif("sourceIndex"indocument.documentElement){
sortOrder=function(a,b){
if(!a.sourceIndex||!b.sourceIndex){
if(a==b){
hasDuplicate=true;
}
return0;
}

varret=a.sourceIndex-b.sourceIndex;
if(ret===0){
hasDuplicate=true;
}
returnret;
};
}elseif(document.createRange){
sortOrder=function(a,b){
if(!a.ownerDocument||!b.ownerDocument){
if(a==b){
hasDuplicate=true;
}
return0;
}

varaRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();
aRange.setStart(a,0);
aRange.setEnd(a,0);
bRange.setStart(b,0);
bRange.setEnd(b,0);
varret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);
if(ret===0){
hasDuplicate=true;
}
returnret;
};
}

(function(){
varform=document.createElement("div"),
id="script"+(newDate).getTime();
form.innerHTML="<aname='"+id+"'/>";

varroot=document.documentElement;
root.insertBefore(form,root.firstChild);

if(!!document.getElementById(id)){
Expr.find.ID=function(match,context,isXML){
if(typeofcontext.getElementById!=="undefined"&&!isXML){
varm=context.getElementById(match[1]);
returnm?m.id===match[1]||typeofm.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];
}
};

Expr.filter.ID=function(elem,match){
varnode=typeofelem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
returnelem.nodeType===1&&node&&node.nodeValue===match;
};
}

root.removeChild(form);
root=form=null;//releasememoryinIE
})();

(function(){

vardiv=document.createElement("div");
div.appendChild(document.createComment(""));

if(div.getElementsByTagName("*").length>0){
Expr.find.TAG=function(match,context){
varresults=context.getElementsByTagName(match[1]);

if(match[1]==="*"){
vartmp=[];

for(vari=0;results[i];i++){
if(results[i].nodeType===1){
tmp.push(results[i]);
}
}

results=tmp;
}

returnresults;
};
}

div.innerHTML="<ahref='#'></a>";
if(div.firstChild&&typeofdiv.firstChild.getAttribute!=="undefined"&&
div.firstChild.getAttribute("href")!=="#"){
Expr.attrHandle.href=function(elem){
returnelem.getAttribute("href",2);
};
}

div=null;//releasememoryinIE
})();

if(document.querySelectorAll)(function(){
varoldSizzle=Sizzle,div=document.createElement("div");
div.innerHTML="<pclass='TEST'></p>";

if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){
return;
}

Sizzle=function(query,context,extra,seed){
context=context||document;

if(!seed&&context.nodeType===9&&!isXML(context)){
try{
returnmakeArray(context.querySelectorAll(query),extra);
}catch(e){}
}

returnoldSizzle(query,context,extra,seed);
};

for(varpropinoldSizzle){
Sizzle[prop]=oldSizzle[prop];
}

div=null;//releasememoryinIE
})();

if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)(function(){
vardiv=document.createElement("div");
div.innerHTML="<divclass='teste'></div><divclass='test'></div>";

if(div.getElementsByClassName("e").length===0)
return;

div.lastChild.className="e";

if(div.getElementsByClassName("e").length===1)
return;

Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){
if(typeofcontext.getElementsByClassName!=="undefined"&&!isXML){
returncontext.getElementsByClassName(match[1]);
}
};

div=null;//releasememoryinIE
})();

functiondirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){
varsibDir=dir=="previousSibling"&&!isXML;
for(vari=0,l=checkSet.length;i<l;i++){
varelem=checkSet[i];
if(elem){
if(sibDir&&elem.nodeType===1){
elem.sizcache=doneName;
elem.sizset=i;
}
elem=elem[dir];
varmatch=false;

while(elem){
if(elem.sizcache===doneName){
match=checkSet[elem.sizset];
break;
}

if(elem.nodeType===1&&!isXML){
elem.sizcache=doneName;
elem.sizset=i;
}

if(elem.nodeName===cur){
match=elem;
break;
}

elem=elem[dir];
}

checkSet[i]=match;
}
}
}

functiondirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){
varsibDir=dir=="previousSibling"&&!isXML;
for(vari=0,l=checkSet.length;i<l;i++){
varelem=checkSet[i];
if(elem){
if(sibDir&&elem.nodeType===1){
elem.sizcache=doneName;
elem.sizset=i;
}
elem=elem[dir];
varmatch=false;

while(elem){
if(elem.sizcache===doneName){
match=checkSet[elem.sizset];
break;
}

if(elem.nodeType===1){
if(!isXML){
elem.sizcache=doneName;
elem.sizset=i;
}
if(typeofcur!=="string"){
if(elem===cur){
match=true;
break;
}

}elseif(Sizzle.filter(cur,[elem]).length>0){
match=elem;
break;
}
}

elem=elem[dir];
}

checkSet[i]=match;
}
}
}

varcontains=document.compareDocumentPosition?function(a,b){
returna.compareDocumentPosition(b)&16;
}:function(a,b){
returna!==b&&(a.contains?a.contains(b):true);
};

varisXML=function(elem){
returnelem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||
!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML";
};

varposProcess=function(selector,context){
vartmpSet=[],later="",match,
root=context.nodeType?[context]:context;

while((match=Expr.match.PSEUDO.exec(selector))){
later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"");
}

selector=Expr.relative[selector]?selector+"*":selector;

for(vari=0,l=root.length;i<l;i++){
Sizzle(selector,root[i],tmpSet);
}

returnSizzle.filter(later,tmpSet);
};


window.Sizzle=Sizzle;

})();

;(function(engine){
varextendElements=Prototype.Selector.extendElements;

functionselect(selector,scope){
returnextendElements(engine(selector,scope||document));
}

functionmatch(element,selector){
returnengine.matches(selector,[element]).length==1;
}

Prototype.Selector.engine=engine;
Prototype.Selector.select=select;
Prototype.Selector.match=match;
})(Sizzle);

window.Sizzle=Prototype._original_property;
deletePrototype._original_property;

varForm={
reset:function(form){
form=$(form);
form.reset();
returnform;
},

serializeElements:function(elements,options){
if(typeofoptions!='object')options={hash:!!options};
elseif(Object.isUndefined(options.hash))options.hash=true;
varkey,value,submitted=false,submit=options.submit,accumulator,initial;

if(options.hash){
initial={};
accumulator=function(result,key,value){
if(keyinresult){
if(!Object.isArray(result[key]))result[key]=[result[key]];
result[key].push(value);
}elseresult[key]=value;
returnresult;
};
}else{
initial='';
accumulator=function(result,key,value){
returnresult+(result?'&':'')+encodeURIComponent(key)+'='+encodeURIComponent(value);
}
}

returnelements.inject(initial,function(result,element){
if(!element.disabled&&element.name){
key=element.name;value=$(element).getValue();
if(value!=null&&element.type!='file'&&(element.type!='submit'||(!submitted&&
submit!==false&&(!submit||key==submit)&&(submitted=true)))){
result=accumulator(result,key,value);
}
}
returnresult;
});
}
};

Form.Methods={
serialize:function(form,options){
returnForm.serializeElements(Form.getElements(form),options);
},

getElements:function(form){
varelements=$(form).getElementsByTagName('*'),
element,
arr=[],
serializers=Form.Element.Serializers;
for(vari=0;element=elements[i];i++){
arr.push(element);
}
returnarr.inject([],function(elements,child){
if(serializers[child.tagName.toLowerCase()])
elements.push(Element.extend(child));
returnelements;
})
},

getInputs:function(form,typeName,name){
form=$(form);
varinputs=form.getElementsByTagName('input');

if(!typeName&&!name)return$A(inputs).map(Element.extend);

for(vari=0,matchingInputs=[],length=inputs.length;i<length;i++){
varinput=inputs[i];
if((typeName&&input.type!=typeName)||(name&&input.name!=name))
continue;
matchingInputs.push(Element.extend(input));
}

returnmatchingInputs;
},

disable:function(form){
form=$(form);
Form.getElements(form).invoke('disable');
returnform;
},

enable:function(form){
form=$(form);
Form.getElements(form).invoke('enable');
returnform;
},

findFirstElement:function(form){
varelements=$(form).getElements().findAll(function(element){
return'hidden'!=element.type&&!element.disabled;
});
varfirstByIndex=elements.findAll(function(element){
returnelement.hasAttribute('tabIndex')&&element.tabIndex>=0;
}).sortBy(function(element){returnelement.tabIndex}).first();

returnfirstByIndex?firstByIndex:elements.find(function(element){
return/^(?:input|select|textarea)$/i.test(element.tagName);
});
},

focusFirstElement:function(form){
form=$(form);
varelement=form.findFirstElement();
if(element)element.activate();
returnform;
},

request:function(form,options){
form=$(form),options=Object.clone(options||{});

varparams=options.parameters,action=form.readAttribute('action')||'';
if(action.blank())action=window.location.href;
options.parameters=form.serialize(true);

if(params){
if(Object.isString(params))params=params.toQueryParams();
Object.extend(options.parameters,params);
}

if(form.hasAttribute('method')&&!options.method)
options.method=form.method;

returnnewAjax.Request(action,options);
}
};

/*--------------------------------------------------------------------------*/


Form.Element={
focus:function(element){
$(element).focus();
returnelement;
},

select:function(element){
$(element).select();
returnelement;
}
};

Form.Element.Methods={

serialize:function(element){
element=$(element);
if(!element.disabled&&element.name){
varvalue=element.getValue();
if(value!=undefined){
varpair={};
pair[element.name]=value;
returnObject.toQueryString(pair);
}
}
return'';
},

getValue:function(element){
element=$(element);
varmethod=element.tagName.toLowerCase();
returnForm.Element.Serializers[method](element);
},

setValue:function(element,value){
element=$(element);
varmethod=element.tagName.toLowerCase();
Form.Element.Serializers[method](element,value);
returnelement;
},

clear:function(element){
$(element).value='';
returnelement;
},

present:function(element){
return$(element).value!='';
},

activate:function(element){
element=$(element);
try{
element.focus();
if(element.select&&(element.tagName.toLowerCase()!='input'||
!(/^(?:button|reset|submit)$/i.test(element.type))))
element.select();
}catch(e){}
returnelement;
},

disable:function(element){
element=$(element);
element.disabled=true;
returnelement;
},

enable:function(element){
element=$(element);
element.disabled=false;
returnelement;
}
};

/*--------------------------------------------------------------------------*/

varField=Form.Element;

var$F=Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers=(function(){
functioninput(element,value){
switch(element.type.toLowerCase()){
case'checkbox':
case'radio':
returninputSelector(element,value);
default:
returnvalueSelector(element,value);
}
}

functioninputSelector(element,value){
if(Object.isUndefined(value))
returnelement.checked?element.value:null;
elseelement.checked=!!value;
}

functionvalueSelector(element,value){
if(Object.isUndefined(value))returnelement.value;
elseelement.value=value;
}

functionselect(element,value){
if(Object.isUndefined(value))
return(element.type==='select-one'?selectOne:selectMany)(element);

varopt,currentValue,single=!Object.isArray(value);
for(vari=0,length=element.length;i<length;i++){
opt=element.options[i];
currentValue=this.optionValue(opt);
if(single){
if(currentValue==value){
opt.selected=true;
return;
}
}
elseopt.selected=value.include(currentValue);
}
}

functionselectOne(element){
varindex=element.selectedIndex;
returnindex>=0?optionValue(element.options[index]):null;
}

functionselectMany(element){
varvalues,length=element.length;
if(!length)returnnull;

for(vari=0,values=[];i<length;i++){
varopt=element.options[i];
if(opt.selected)values.push(optionValue(opt));
}
returnvalues;
}

functionoptionValue(opt){
returnElement.hasAttribute(opt,'value')?opt.value:opt.text;
}

return{
input:input,
inputSelector:inputSelector,
textarea:valueSelector,
select:select,
selectOne:selectOne,
selectMany:selectMany,
optionValue:optionValue,
button:valueSelector
};
})();

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver=Class.create(PeriodicalExecuter,{
initialize:function($super,element,frequency,callback){
$super(callback,frequency);
this.element=$(element);
this.lastValue=this.getValue();
},

execute:function(){
varvalue=this.getValue();
if(Object.isString(this.lastValue)&&Object.isString(value)?
this.lastValue!=value:String(this.lastValue)!=String(value)){
this.callback(this.element,value);
this.lastValue=value;
}
}
});

Form.Element.Observer=Class.create(Abstract.TimedObserver,{
getValue:function(){
returnForm.Element.getValue(this.element);
}
});

Form.Observer=Class.create(Abstract.TimedObserver,{
getValue:function(){
returnForm.serialize(this.element);
}
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver=Class.create({
initialize:function(element,callback){
this.element=$(element);
this.callback=callback;

this.lastValue=this.getValue();
if(this.element.tagName.toLowerCase()=='form')
this.registerFormCallbacks();
else
this.registerCallback(this.element);
},

onElementEvent:function(){
varvalue=this.getValue();
if(this.lastValue!=value){
this.callback(this.element,value);
this.lastValue=value;
}
},

registerFormCallbacks:function(){
Form.getElements(this.element).each(this.registerCallback,this);
},

registerCallback:function(element){
if(element.type){
switch(element.type.toLowerCase()){
case'checkbox':
case'radio':
Event.observe(element,'click',this.onElementEvent.bind(this));
break;
default:
Event.observe(element,'change',this.onElementEvent.bind(this));
break;
}
}
}
});

Form.Element.EventObserver=Class.create(Abstract.EventObserver,{
getValue:function(){
returnForm.Element.getValue(this.element);
}
});

Form.EventObserver=Class.create(Abstract.EventObserver,{
getValue:function(){
returnForm.serialize(this.element);
}
});
(function(){

varEvent={
KEY_BACKSPACE:8,
KEY_TAB:9,
KEY_RETURN:13,
KEY_ESC:27,
KEY_LEFT:37,
KEY_UP:38,
KEY_RIGHT:39,
KEY_DOWN:40,
KEY_DELETE:46,
KEY_HOME:36,
KEY_END:35,
KEY_PAGEUP:33,
KEY_PAGEDOWN:34,
KEY_INSERT:45,

cache:{}
};

vardocEl=document.documentElement;
varMOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED='onmouseenter'indocEl
&&'onmouseleave'indocEl;



varisIELegacyEvent=function(event){returnfalse;};

if(window.attachEvent){
if(window.addEventListener){
isIELegacyEvent=function(event){
return!(eventinstanceofwindow.Event);
};
}else{
isIELegacyEvent=function(event){returntrue;};
}
}

var_isButton;

function_isButtonForDOMEvents(event,code){
returnevent.which?(event.which===code+1):(event.button===code);
}

varlegacyButtonMap={0:1,1:4,2:2};
function_isButtonForLegacyEvents(event,code){
returnevent.button===legacyButtonMap[code];
}

function_isButtonForWebKit(event,code){
switch(code){
case0:returnevent.which==1&&!event.metaKey;
case1:returnevent.which==2||(event.which==1&&event.metaKey);
case2:returnevent.which==3;
default:returnfalse;
}
}

if(window.attachEvent){
if(!window.addEventListener){
_isButton=_isButtonForLegacyEvents;
}else{
_isButton=function(event,code){
returnisIELegacyEvent(event)?_isButtonForLegacyEvents(event,code):
_isButtonForDOMEvents(event,code);
}
}
}elseif(Prototype.Browser.WebKit){
_isButton=_isButtonForWebKit;
}else{
_isButton=_isButtonForDOMEvents;
}

functionisLeftClick(event){return_isButton(event,0)}

functionisMiddleClick(event){return_isButton(event,1)}

functionisRightClick(event){return_isButton(event,2)}

functionelement(event){
event=Event.extend(event);

varnode=event.target,type=event.type,
currentTarget=event.currentTarget;

if(currentTarget&&currentTarget.tagName){
if(type==='load'||type==='error'||
(type==='click'&&currentTarget.tagName.toLowerCase()==='input'
&&currentTarget.type==='radio'))
node=currentTarget;
}

if(node.nodeType==Node.TEXT_NODE)
node=node.parentNode;

returnElement.extend(node);
}

functionfindElement(event,expression){
varelement=Event.element(event);

if(!expression)returnelement;
while(element){
if(Object.isElement(element)&&Prototype.Selector.match(element,expression)){
returnElement.extend(element);
}
element=element.parentNode;
}
}

functionpointer(event){
return{x:pointerX(event),y:pointerY(event)};
}

functionpointerX(event){
vardocElement=document.documentElement,
body=document.body||{scrollLeft:0};

returnevent.pageX||(event.clientX+
(docElement.scrollLeft||body.scrollLeft)-
(docElement.clientLeft||0));
}

functionpointerY(event){
vardocElement=document.documentElement,
body=document.body||{scrollTop:0};

returnevent.pageY||(event.clientY+
(docElement.scrollTop||body.scrollTop)-
(docElement.clientTop||0));
}


functionstop(event){
Event.extend(event);
event.preventDefault();
event.stopPropagation();

event.stopped=true;
}


Event.Methods={
isLeftClick:isLeftClick,
isMiddleClick:isMiddleClick,
isRightClick:isRightClick,

element:element,
findElement:findElement,

pointer:pointer,
pointerX:pointerX,
pointerY:pointerY,

stop:stop
};

varmethods=Object.keys(Event.Methods).inject({},function(m,name){
m[name]=Event.Methods[name].methodize();
returnm;
});

if(window.attachEvent){
function_relatedTarget(event){
varelement;
switch(event.type){
case'mouseover':
case'mouseenter':
element=event.fromElement;
break;
case'mouseout':
case'mouseleave':
element=event.toElement;
break;
default:
returnnull;
}
returnElement.extend(element);
}

varadditionalMethods={
stopPropagation:function(){this.cancelBubble=true},
preventDefault:function(){this.returnValue=false},
inspect:function(){return'[objectEvent]'}
};

Event.extend=function(event,element){
if(!event)returnfalse;

if(!isIELegacyEvent(event))returnevent;

if(event._extendedByPrototype)returnevent;
event._extendedByPrototype=Prototype.emptyFunction;

varpointer=Event.pointer(event);

Object.extend(event,{
target:event.srcElement||element,
relatedTarget:_relatedTarget(event),
pageX:pointer.x,
pageY:pointer.y
});

Object.extend(event,methods);
Object.extend(event,additionalMethods);

returnevent;
};
}else{
Event.extend=Prototype.K;
}

if(window.addEventListener){
Event.prototype=window.Event.prototype||document.createEvent('HTMLEvents').__proto__;
Object.extend(Event.prototype,methods);
}

function_createResponder(element,eventName,handler){
varregistry=Element.retrieve(element,'prototype_event_registry');

if(Object.isUndefined(registry)){
CACHE.push(element);
registry=Element.retrieve(element,'prototype_event_registry',$H());
}

varrespondersForEvent=registry.get(eventName);
if(Object.isUndefined(respondersForEvent)){
respondersForEvent=[];
registry.set(eventName,respondersForEvent);
}

if(respondersForEvent.pluck('handler').include(handler))returnfalse;

varresponder;
if(eventName.include(":")){
responder=function(event){
if(Object.isUndefined(event.eventName))
returnfalse;

if(event.eventName!==eventName)
returnfalse;

Event.extend(event,element);
handler.call(element,event);
};
}else{
if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED&&
(eventName==="mouseenter"||eventName==="mouseleave")){
if(eventName==="mouseenter"||eventName==="mouseleave"){
responder=function(event){
Event.extend(event,element);

varparent=event.relatedTarget;
while(parent&&parent!==element){
try{parent=parent.parentNode;}
catch(e){parent=element;}
}

if(parent===element)return;

handler.call(element,event);
};
}
}else{
responder=function(event){
Event.extend(event,element);
handler.call(element,event);
};
}
}

responder.handler=handler;
respondersForEvent.push(responder);
returnresponder;
}

function_destroyCache(){
for(vari=0,length=CACHE.length;i<length;i++){
Event.stopObserving(CACHE[i]);
CACHE[i]=null;
}
}

varCACHE=[];

if(Prototype.Browser.IE)
window.attachEvent('onunload',_destroyCache);

if(Prototype.Browser.WebKit)
window.addEventListener('unload',Prototype.emptyFunction,false);


var_getDOMEventName=Prototype.K,
translations={mouseenter:"mouseover",mouseleave:"mouseout"};

if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED){
_getDOMEventName=function(eventName){
return(translations[eventName]||eventName);
};
}

functionobserve(element,eventName,handler){
element=$(element);

varresponder=_createResponder(element,eventName,handler);

if(!responder)returnelement;

if(eventName.include(':')){
if(element.addEventListener)
element.addEventListener("dataavailable",responder,false);
else{
element.attachEvent("ondataavailable",responder);
element.attachEvent("onlosecapture",responder);
}
}else{
varactualEventName=_getDOMEventName(eventName);

if(element.addEventListener)
element.addEventListener(actualEventName,responder,false);
else
element.attachEvent("on"+actualEventName,responder);
}

returnelement;
}

functionstopObserving(element,eventName,handler){
element=$(element);

varregistry=Element.retrieve(element,'prototype_event_registry');
if(!registry)returnelement;

if(!eventName){
registry.each(function(pair){
vareventName=pair.key;
stopObserving(element,eventName);
});
returnelement;
}

varresponders=registry.get(eventName);
if(!responders)returnelement;

if(!handler){
responders.each(function(r){
stopObserving(element,eventName,r.handler);
});
returnelement;
}

vari=responders.length,responder;
while(i--){
if(responders[i].handler===handler){
responder=responders[i];
break;
}
}
if(!responder)returnelement;

if(eventName.include(':')){
if(element.removeEventListener)
element.removeEventListener("dataavailable",responder,false);
else{
element.detachEvent("ondataavailable",responder);
element.detachEvent("onlosecapture",responder);
}
}else{
varactualEventName=_getDOMEventName(eventName);
if(element.removeEventListener)
element.removeEventListener(actualEventName,responder,false);
else
element.detachEvent('on'+actualEventName,responder);
}

registry.set(eventName,responders.without(responder));

returnelement;
}

functionfire(element,eventName,memo,bubble){
element=$(element);

if(Object.isUndefined(bubble))
bubble=true;

if(element==document&&document.createEvent&&!element.dispatchEvent)
element=document.documentElement;

varevent;
if(document.createEvent){
event=document.createEvent('HTMLEvents');
event.initEvent('dataavailable',bubble,true);
}else{
event=document.createEventObject();
event.eventType=bubble?'ondataavailable':'onlosecapture';
}

event.eventName=eventName;
event.memo=memo||{};

if(document.createEvent)
element.dispatchEvent(event);
else
element.fireEvent(event.eventType,event);

returnEvent.extend(event);
}

Event.Handler=Class.create({
initialize:function(element,eventName,selector,callback){
this.element=$(element);
this.eventName=eventName;
this.selector=selector;
this.callback=callback;
this.handler=this.handleEvent.bind(this);
},

start:function(){
Event.observe(this.element,this.eventName,this.handler);
returnthis;
},

stop:function(){
Event.stopObserving(this.element,this.eventName,this.handler);
returnthis;
},

handleEvent:function(event){
varelement=Event.findElement(event,this.selector);
if(element)this.callback.call(this.element,event,element);
}
});

functionon(element,eventName,selector,callback){
element=$(element);
if(Object.isFunction(selector)&&Object.isUndefined(callback)){
callback=selector,selector=null;
}

returnnewEvent.Handler(element,eventName,selector,callback).start();
}

Object.extend(Event,Event.Methods);

Object.extend(Event,{
fire:fire,
observe:observe,
stopObserving:stopObserving,
on:on
});

Element.addMethods({
fire:fire,

observe:observe,

stopObserving:stopObserving,

on:on
});

Object.extend(document,{
fire:fire.methodize(),

observe:observe.methodize(),

stopObserving:stopObserving.methodize(),

on:on.methodize(),

loaded:false
});

if(window.Event)Object.extend(window.Event,Event);
elsewindow.Event=Event;
})();

(function(){

vartimer;

functionfireContentLoadedEvent(){
if(document.loaded)return;
if(timer)window.clearTimeout(timer);
document.loaded=true;
document.fire('dom:loaded');
}

functioncheckReadyState(){
if(document.readyState==='complete'){
document.stopObserving('readystatechange',checkReadyState);
fireContentLoadedEvent();
}
}

functionpollDoScroll(){
try{document.documentElement.doScroll('left');}
catch(e){
timer=pollDoScroll.defer();
return;
}
fireContentLoadedEvent();
}

if(document.addEventListener){
document.addEventListener('DOMContentLoaded',fireContentLoadedEvent,false);
}else{
document.observe('readystatechange',checkReadyState);
if(window==top)
timer=pollDoScroll.defer();
}

Event.observe(window,'load',fireContentLoadedEvent);
})();

Element.addMethods();

/*-------------------------------DEPRECATED-------------------------------*/

Hash.toQueryString=Object.toQueryString;

varToggle={display:Element.toggle};

Element.Methods.childOf=Element.Methods.descendantOf;

varInsertion={
Before:function(element,content){
returnElement.insert(element,{before:content});
},

Top:function(element,content){
returnElement.insert(element,{top:content});
},

Bottom:function(element,content){
returnElement.insert(element,{bottom:content});
},

After:function(element,content){
returnElement.insert(element,{after:content});
}
};

var$continue=newError('"throw$continue"isdeprecated,use"return"instead');

varPosition={
includeScrollOffsets:false,

prepare:function(){
this.deltaX=window.pageXOffset
||document.documentElement.scrollLeft
||document.body.scrollLeft
||0;
this.deltaY=window.pageYOffset
||document.documentElement.scrollTop
||document.body.scrollTop
||0;
},

within:function(element,x,y){
if(this.includeScrollOffsets)
returnthis.withinIncludingScrolloffsets(element,x,y);
this.xcomp=x;
this.ycomp=y;
this.offset=Element.cumulativeOffset(element);

return(y>=this.offset[1]&&
y<this.offset[1]+element.offsetHeight&&
x>=this.offset[0]&&
x<this.offset[0]+element.offsetWidth);
},

withinIncludingScrolloffsets:function(element,x,y){
varoffsetcache=Element.cumulativeScrollOffset(element);

this.xcomp=x+offsetcache[0]-this.deltaX;
this.ycomp=y+offsetcache[1]-this.deltaY;
this.offset=Element.cumulativeOffset(element);

return(this.ycomp>=this.offset[1]&&
this.ycomp<this.offset[1]+element.offsetHeight&&
this.xcomp>=this.offset[0]&&
this.xcomp<this.offset[0]+element.offsetWidth);
},

overlap:function(mode,element){
if(!mode)return0;
if(mode=='vertical')
return((this.offset[1]+element.offsetHeight)-this.ycomp)/
element.offsetHeight;
if(mode=='horizontal')
return((this.offset[0]+element.offsetWidth)-this.xcomp)/
element.offsetWidth;
},


cumulativeOffset:Element.Methods.cumulativeOffset,

positionedOffset:Element.Methods.positionedOffset,

absolutize:function(element){
Position.prepare();
returnElement.absolutize(element);
},

relativize:function(element){
Position.prepare();
returnElement.relativize(element);
},

realOffset:Element.Methods.cumulativeScrollOffset,

offsetParent:Element.Methods.getOffsetParent,

page:Element.Methods.viewportOffset,

clone:function(source,target,options){
options=options||{};
returnElement.clonePosition(target,source,options);
}
};

/*--------------------------------------------------------------------------*/

if(!document.getElementsByClassName)document.getElementsByClassName=function(instanceMethods){
functioniter(name){
returnname.blank()?null:"[contains(concat('',@class,''),'"+name+"')]";
}

instanceMethods.getElementsByClassName=Prototype.BrowserFeatures.XPath?
function(element,className){
className=className.toString().strip();
varcond=/\s/.test(className)?$w(className).map(iter).join(''):iter(className);
returncond?document._getElementsByXPath('.//*'+cond,element):[];
}:function(element,className){
className=className.toString().strip();
varelements=[],classNames=(/\s/.test(className)?$w(className):null);
if(!classNames&&!className)returnelements;

varnodes=$(element).getElementsByTagName('*');
className=''+className+'';

for(vari=0,child,cn;child=nodes[i];i++){
if(child.className&&(cn=''+child.className+'')&&(cn.include(className)||
(classNames&&classNames.all(function(name){
return!name.toString().blank()&&cn.include(''+name+'');
}))))
elements.push(Element.extend(child));
}
returnelements;
};

returnfunction(className,parentElement){
return$(parentElement||document.body).getElementsByClassName(className);
};
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames=Class.create();
Element.ClassNames.prototype={
initialize:function(element){
this.element=$(element);
},

_each:function(iterator){
this.element.className.split(/\s+/).select(function(name){
returnname.length>0;
})._each(iterator);
},

set:function(className){
this.element.className=className;
},

add:function(classNameToAdd){
if(this.include(classNameToAdd))return;
this.set($A(this).concat(classNameToAdd).join(''));
},

remove:function(classNameToRemove){
if(!this.include(classNameToRemove))return;
this.set($A(this).without(classNameToRemove).join(''));
},

toString:function(){
return$A(this).join('');
}
};

Object.extend(Element.ClassNames.prototype,Enumerable);

/*--------------------------------------------------------------------------*/

(function(){
window.Selector=Class.create({
initialize:function(expression){
this.expression=expression.strip();
},

findElements:function(rootElement){
returnPrototype.Selector.select(this.expression,rootElement);
},

match:function(element){
returnPrototype.Selector.match(element,this.expression);
},

toString:function(){
returnthis.expression;
},

inspect:function(){
return"#<Selector:"+this.expression+">";
}
});

Object.extend(Selector,{
matchElements:function(elements,expression){
varmatch=Prototype.Selector.match,
results=[];

for(vari=0,length=elements.length;i<length;i++){
varelement=elements[i];
if(match(element,expression)){
results.push(Element.extend(element));
}
}
returnresults;
},

findElement:function(elements,expression,index){
index=index||0;
varmatchIndex=0,element;
for(vari=0,length=elements.length;i<length;i++){
element=elements[i];
if(Prototype.Selector.match(element,expression)&&index===matchIndex++){
returnElement.extend(element);
}
}
},

findChildElements:function(element,expressions){
varselector=expressions.toArray().join(',');
returnPrototype.Selector.select(selector,element||document);
}
});
})();