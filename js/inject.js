var whatsappData=[];
jQuery(document).ready(function($){
	loop();
});

//keep looping until the loading screen is over
function loop(){
	if($("#side").length){
		console.log("init");
		init();
	}
	else{
		setTimeout(loop,1000);
		console.log("looping");
	}
}

function pageInit(){
	var data;
	webpackJsonp([], {"bcihgfbdeb": (x, y, z) => data = z('"bcihgfbdeb"')}, "bcihgfbdeb");
	webpackJsonp([], {"jfefjijii": (x, y, z) => data.Conn = z('"jfefjijii"')}, "jfefjijii");
	window.whatsappData=data;
	pageTick();
}

function pageTick(){
	let data=window.whatsappData,id;

	//map Id with names directly in an array for easy access
	for(let key in data.Contact._index){
		let contact=data.Contact._index[key];
		wContacts[key]=contact.__x_formattedName;
	}

	//find all people that are online
	for(let key in data.Presence._index){
		let contact=data.Presence._index[key];
		if(contact.isGroup)
			continue;
		// console.log(wContacts[key],contact.isOnline);
		if(contact.isOnline){
			console.log(wContacts[key] + " is online at "+(new Date()));
		}
	}
	setTimeout(function(){pageTick()},2000);
}

function init(){
	var script=document.createElement("script");
	script.type = 'text/javascript';
	script.appendChild(document.createTextNode("var wContacts=[];"));
	script.appendChild(document.createTextNode(pageTick));
	script.appendChild(document.createTextNode('('+ pageInit +')();'));
	document.head.appendChild(script);
}