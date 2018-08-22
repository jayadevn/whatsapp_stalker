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
		iteration();
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
	$("._2umId").append(trigger_btn);
	//add an event listener
}

// var interval=setInterval(iteration,3000);

function iteration(){
	$.each(profiles,function(key,val){
		setTimeout(function(){
			var contact_span=$("span[dir='auto']._1wjpf[title='"+val+"']");
			if(contact_span.length){
				var contact=contact_span.parents("._2EXPL");
				open_contact(contact[0]);
				setTimeout(() => {
					var cur_time=new Date();
					if(is_online(contact))
						console.log(val + " was online at "+cur_time);
					// else
					// 	console.log("")
				}, 100);
			}
		},key*2000);
	});

	setTimeout(iteration,(profiles.length+1)*2000);
}


//jquery events won't work
//need to use to Native JS events
function open_contact(contact){
	var mouse_evt= document.createEvent('MouseEvents');
    mouse_evt.initEvent('mousedown', true, true);
    contact.dispatchEvent(mouse_evt);
}

function is_online(){
	var online_span=document.getElementById("main").querySelector("[title='online'].O90ur");
	if(online_span)
		return true;

	return false;
}