Template.mapview.events({
	"click .dropdown-menu > li > a": function(evt){
		$('#city-sel-btn').text(evt.target.innerText);
	}
});
Template.mapview.helpers({
	cityOptions: function(){
		return [{ val : 'Bangalore'},{ val : 'Delhi'},{ val : 'Mumbai'},{ val : 'Chennai'}];
	},
	pplOptions: function(){
		return [{ val : 'Family'},{ val : 'Single Girl'},{ val : 'Single Boy'}];
	}
});