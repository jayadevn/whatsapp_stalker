chrome.storage.sync.get(['profiles_history'],function(result){
	console.log(result);
	if(result.profiles_history===undefined || !result.profiles_history.length){
		$("#users_data").html("No records found");
	}
	else{
		profiles_history=result.profiles_history;
		var html="";
		$.each(profiles_history,function(index,user){
			html+="<div class='user'>"
				html+="<div class='name'>"+user.name+" <span class='view_times_btn'>View Times</span></div>";
				html+="<div class='online_times'>";
					$.each(user.online_times,function(key,times){
						html+="<div>";
							html+="From: "+get_time_str(times.from)+" To: "+get_time_str(times.to);
						html+="</div>";
					});
				html+="</div>";
			html+="</div>";
		});
		$("#users_data").html(html);
	}
});

function get_time_str(timestamp){
	var dt=new Date(timestamp);
	return dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
}