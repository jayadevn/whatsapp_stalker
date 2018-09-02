var monitored_profiles=[],profiles_history=[];

//Initialize the profiles_history Variable
chrome.runtime.onStartup.addListener(function(){
	console.log("entered onstartup");
	get_saved_history();
});

//Initialize the profiles_history Variable
//on startup event as well.
chrome.runtime.onInstalled.addListener(function(){
	console.log("entered oninstalled");
	get_saved_history();
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({'url': chrome.extension.getURL('history.html')},function(tab){});
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var history_updated=false;
	console.log("onmessage: current history:",profiles_history);
	for(var i=0;i<request.length;i++){
		var contact=request[i],
			found_index=contact_present(contact);

		//If the contact is online and doesn't exist in monitored_profiles array,
		//then this means that the contact has just come online
		if(found_index==-1 && contact.status==1){
			monitored_profiles.push({'name':contact.name,'online_from':contact.time});
		}
		//if the contact was already in monitored_profiles and is now offline
		//then add the summary of that contact to profiles_history
		//and remove the contact from monitored_profiles
		else if(found_index!=-1 && contact.status==0){
			console.log(found_index,monitored_profiles[found_index]);
			var found=false,
				online_times={from:monitored_profiles[found_index].online_from,'to':contact.time};
			
			profiles_history.forEach(function(row){
				//If there is already an entry for this user, just update the online times
				if(row.name==contact.name){
					found=true;
					row.online_times.push(online_times);
				}
			});

			//if this user doesn't exist in the profiles_history localstorage
			//add it
			if(!found)
				profiles_history.push({'name':contact.name,'online_times':[online_times]});

			//since this user has gone online, just remove it from the monitored_profiles array
			monitored_profiles.splice(found_index,1);
			history_updated=true;
		}
	}
	if(history_updated)
		//update the storage with new values if there was any change
		chrome.storage.local.set({profiles_history: profiles_history}, function(){
			console.log("updated storage");
			console.log(profiles_history);
		});
	sendResponse({});
});

function get_saved_history(callback){
	chrome.storage.local.get(['profiles_history'],function(result){
		console.log("entered local.get");
		if(result.profiles_history!==undefined){
			console.log("history not undefined",result.profiles_history);
			profiles_history=result.profiles_history;
		}
		if(callback)
			callback();
	});
}

function contact_present(contact){
	for(var j=0;j<monitored_profiles.length;j++){
		var cur_contact=monitored_profiles[j];
		if(cur_contact.name==contact.name)
			return j;
	}
	return -1;
}