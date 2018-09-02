var profiles=[],profiles_status=[],current_stalk_list=[],tick_timeout;
jQuery(document).ready(function($){
	loop();

	$("body").on("click",".w_stalk_trigger_btn",function(e){
		//If the stalking was already started
		if($(this).attr("data-started")=="1"){
			$(this).attr("data-started","0");
			$(this).text("Start Stalking!");
			clearTimeout(tick_timeout);
			return;
		}

		var users=prompt("Enter the ,(coma) separated users you would like to monitor(No spaces)",current_stalk_list.join(","));
		if(!users || !users.length){
			alert("Invalid users selected!");
			return;
		}
		//stalking is about to start
		$(this).attr("data-started","1");
		$(this).text("Stop Stalking!");

		current_stalk_list=[];
		window.profiles=users.split(",");
		window.cur_profile=profiles[0];
		tick();
	});

	$("body").on("mouseenter","._2wP_Y",function(){
		var el=$("<div class='w_stalk_contact'>Stalk me!</div>");
		if(!$(this).find(".w_stalk_contact").length){
			$(this).append(el);
		}
	});

	$("body").on("click",".w_stalk_contact",function(e){
		e.stopPropagation();
		var contact_name=$(this).parents("._2wP_Y").find("._1wjpf").attr("title");
		if(current_stalk_list.indexOf(contact_name)==-1)
			current_stalk_list.push(contact_name);
	});

	$("body").on("click","._1Wk6A",function(){
		$(".jN-F5").focus();
		whatsAppText("ab");
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
	trigger_btn.setAttribute('data-started',0);
	$("._2umId").append(trigger_btn);
	//add an event listener
}

//tick function
function tick(){
	open_contact(window.cur_profile,function(){
		setTimeout(() => {
			var cur_time=new Date();
			if(check_online(function(online_status){
				if(online_status)
					console.log(cur_profile + " was online at "+cur_time);

				profiles_status.push({'name':cur_profile,'time':cur_time.getTime(),'status':online_status});

				//change the cur_profile to the next one in the list
				var i=profiles.indexOf(cur_profile),
					timeout=(i===profiles.length-1)?2000:200;
				cur_profile=(i===profiles.length-1)?profiles[0]:profiles[i+1];

				//if we have completed a cycle, send this info to our background script to do what it wants with it.
				if(i===profiles.length-1){
					chrome.runtime.sendMessage(profiles_status, function(response) {
						profiles_status=[];
					});
				}
				
				//if the user has clicked the 'stop stalking' button, let's stop!
				if($(".w_stalk_trigger_btn").attr("data-started")=="1")
					tick_timeout=setTimeout(tick,timeout);
			}));
		}, 100);
	});
}


//jquery events won't work
//need to use to Native JS events
function open_contact(contact_name,callback){
	$('.jN-F5').focus();
	window.InputEvent = window.Event || window.InputEvent;
	var event = new InputEvent('input', {bubbles: true});
	var textbox = $('.jN-F5')[0];
	textbox.value = contact_name;
	textbox.dispatchEvent(event);
	find_contact_and_click_it(contact_name,callback);
}

function find_contact_and_click_it(contact_name,callback){
	var contact_span=$("._2wP_Y span[dir='auto']._1wjpf[title='"+contact_name+"']");
	if(contact_span.length){
		var mouse_evt= document.createEvent('MouseEvents');
		mouse_evt.initEvent('mousedown', true, true);
		// console.log(contact_span,contact_span.parents("._2EXPL"),contact_span.parents("._2EXPL")[0]);
		contact_span.parents("._2EXPL")[0].dispatchEvent(mouse_evt);
		setTimeout(function(){
			callback();
		},200);
	}
	else{
		setTimeout(function(){
			find_contact_and_click_it(contact_name,callback);
		},500);
	}
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