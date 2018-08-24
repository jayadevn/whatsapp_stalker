var monitored_profiles=[],profiles_history=[];

//Initialize the profiles_history Variable
chrome.runtime.onStartup.addListener(function(){
	chrome.storage.sync.get(['profiles_history'],function(result){
		if(result.profiles_history===undefined){
			chrome.storage.sync.set({profiles_history: []}, function(){});
		}
		else{
			profiles_history=result.profiles_history;
		}
	});
});

//Initialize the profiles_history Variable
//on startup event as well.
chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.get(['profiles_history'],function(result){
		if(result.profiles_history===undefined){
			chrome.storage.sync.set({profiles_history: []}, function(){});
		}
		else{
			profiles_history=result.profiles_history;
		}
	});
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// console.log(request,sender);
	for(var i=0;i<request.length;i++){
		var contact=request[i],
			found_index=contact_present(contact);

		//If the contact is online and doesn't exist in monitored_profiles array,
		//then this means that the contact has just come online
		if(found_index==-1 && contact.status==1){
			monitored_profiles.push({'name':contact.name,'online_from':contact.time});
		}
		//if the contact was already in monitored_profiles and is now online
		//then add the summary of that contact to profiles_history
		//and remove the contact from monitored_profiles
		else if(found_index!=-1 && contact.status==0){
			console.log(found_index,monitored_profiles[found_index]);
			profiles_history.push({'name':contact.name,'online_from':monitored_profiles[found_index].online_from,'online_till':contact.time});
			chrome.storage.sync.set({profiles_history: profiles_history}, function(){
				console.log("updated storage");
			});
			monitored_profiles.splice(found_index,1);
		}
	}
	console.log(profiles_history);
	sendResponse({});
});

function contact_present(contact){
	for(var j=0;j<monitored_profiles.length;j++){
		var cur_contact=monitored_profiles[j];
		if(cur_contact.name==contact.name)
			return j;
	}
	return -1;
}