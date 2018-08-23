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
		window.cur_profile=profiles[0];
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

//tick function
function iteration(){
	// console.log("iteration:"+cur_profile);
	var contact_span=$("span[dir='auto']._1wjpf[title='"+window.cur_profile+"']");
	if(contact_span.length){
		var contact=contact_span.parents("._2EXPL");
		open_contact(contact[0],function(){
			setTimeout(() => {
				var cur_time=new Date();
				if(check_online(function(online_status){
					if(online_status)
						console.log(cur_profile + " was online at "+cur_time);

					//change the cur_profile to the next one in the list
					var i=profiles.indexOf(cur_profile),
						timeout=(i===profiles.length-1)?2000:200;
					cur_profile=(i===profiles.length-1)?profiles[0]:profiles[i+1];
					setTimeout(iteration,timeout);
				}));
			}, 100);
		});
	}
}


//jquery events won't work
//need to use to Native JS events
function open_contact(contact,callback){
	var mouse_evt= document.createEvent('MouseEvents');
    mouse_evt.initEvent('mousedown', true, true);
	contact.dispatchEvent(mouse_evt);
	setTimeout(function(){
		callback();
	},200);
}

function check_online(callback){

	//if the status has not been loaded yet, please wait for it by calling this function again in 500 ms
	if($("#main").find(".O90ur[title='click here for contact info']").length){
		setTimeout(function(){
			check_online(callback);
		},200);
	}
	else{
		var online_span=$("#main").find(".O90ur[title='online']").length;
		callback(online_span);
	}
}