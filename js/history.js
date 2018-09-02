var profiles_history=[];
jQuery(document).ready(function($){
	$("body").on("click",".view_times_btn",function(e){
		var online_times="",
			user_name=$(this).attr("data-user");

		$.each(profiles_history,function(index,user){
			if(user.name==user_name){
				online_times+="<table class='table'>";
				online_times+="<tr><td>From</td><td>To</td></tr>";
				$.each(user.online_times,function(key,times){
					online_times+="<tr><td>"+get_time_str(times.from)+"</td><td>"+get_time_str(times.to)+"</td></tr>";
				});
			}
		});
			
		swal({
			title:user_name+" Online Times",
			type:'info',
			html:online_times
		});
	});
});


chrome.storage.local.get(['profiles_history'],function(result){
	console.log(result);
	if(result.profiles_history===undefined || !result.profiles_history.length){
		$("#users_data").html("No records found");
	}
	else{
		profiles_history=result.profiles_history;
		var html="";
		$.each(profiles_history,function(index,user){
			html+="<div class='user col-12'>"
				html+="<span class='name'>"+user.name+" </span>";
				html+="<span class='view_times_btn' data-user='"+user.name+"' >View Times</span>";
			html+="</div>";
		});
		$("#users_data").html(html);
	}
});

function get_time_str(timestamp){
	var dt=new Date(timestamp);
	return dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
}