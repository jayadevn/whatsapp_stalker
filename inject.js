var profile="Profile Name";

var interval=setInterval(iteration,3000);

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