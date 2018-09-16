var whatsappData=[];
jQuery(document).ready(function($){
	loop();
});

//keep looping until the loading screen is over
function loop(){
	if($("#side").length){
		init();
		console.log("init");
	}
	else{
		setTimeout(loop,1000);
		console.log("looping");
	}
}

function pageTick(){
	// setInterval(function(){
		var data;
		webpackJsonp([], {"bcihgfbdeb": (x, y, z) => data = z('"bcihgfbdeb"')}, "bcihgfbdeb");
		webpackJsonp([], {"jfefjijii": (x, y, z) => data.Conn = z('"jfefjijii"')}, "jfefjijii");
		document.querySelector("body").setAttribute("data-whatsappdata",JSON.stringify(data));
		// console.log(data,JSON.stringify(data));
	// },2000);
}

function init(){
	var script=document.createElement("script");
	script.type = 'text/javascript';
	script.appendChild(document.createTextNode('('+ pageTick +')();'));
	document.head.appendChild(script);
	setTimeout(function(){
		tick();
	},0);
}




function tick(){
	getData();
	// setTimeout(function(){
	// 	tick();
	// },2000);
	// console.log(window.whatsappData);
	console.log(whatsappData);
}

function getData(){
	whatsappData=JSON.parse($("body").attr("data-whatsappdata"));
}