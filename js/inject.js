var profiles=[];
jQuery(document).ready(function($){
	loop();

	$("body").on("click",".w_stalk_trigger_btn",function(e){
		var users=prompt("Enter the ,(coma) separated users you would like to monitor(No spaces)");
		if(!users || !users.length){
			alert("Invalid users selected!");
			return;
		}

		window.profiles=users.split(",");
	});
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

function init(){
	//create a button that lets users start the monitoring
	var trigger_btn=document.createElement("div");
	trigger_btn.appendChild(document.createTextNode("Start Stalking!"));
	trigger_btn.classList.add("w_stalk_trigger_btn");
	document.querySelector("._2umId").appendChild(trigger_btn);
	
	//add an event listener
}

// var interval=setInterval(iteration,3000);

function iteration(){
	var contacts=document.getElementsByClassName("_2wP_Y");

	for(var i=0;i<contacts.length;i++){
		var contact=contacts[i];
		var contact_name=contact.querySelector("span[dir='auto']._1wjpf");
		if(contact_name.title == profile && contact_name.innerHTML==profile){
			open_contact(contact);
			setTimeout(() => {
				var cur_time=new Date();
				if(check_online())
					console.log(profile + " was online at "+cur_time);
				// else
					// console.log("")
			}, 100);
		}
	}
}


function open_contact(contact){
	trigger_evt(contact.querySelector("._2EXPL"),'mousedown');
	trigger_evt(contact.querySelector("._3j7s9"),'mousedown');
}

function trigger_evt(el,evt){
	var mouse_evt= document.createEvent ('MouseEvents');
    mouse_evt.initEvent(evt, true, true);
    el.dispatchEvent(mouse_evt);
}

function check_online(){
	var online_span=document.getElementById("main").querySelector("[title='online'].O90ur");
	if(online_span)
		return true;

	return false;
}