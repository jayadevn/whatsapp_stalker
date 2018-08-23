var monitored_profiles=[],stored_data=[];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request,sender);
	for(var i=0;i<request.length;i++){
		var contact=request[i],
			found_index=contact_present(contact);

		//If the contact is online and doesn't exist in monitored_profiles array,
		//then this means that the contact has just come online
		if(found_index==-1 && contact.status==1){
			monitored_profiles.push({'name':contact.name,'online_from':contact.time});
		}
		//if the contact was already in monitored_profiles and is now online
		//then add the summary of that contact to stored_data
		//and remove the contact from monitored_profiles
		else if(found_index!=-1 && contact.status==0){
			console.log(found_index,monitored_profiles[found_index]);
			stored_data.push({'name':contact.name,'online_from':monitored_profiles[found_index].online_from,'online_till':contact.time});
			monitored_profiles.splice(found_index,1);
		}
	}
	console.log(stored_data);
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