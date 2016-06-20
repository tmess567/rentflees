Meteor.subscribe('listings');
Uploader.finished = function(index, fileInfo, templateContext) {
	console.log(fileInfo.uploadedName);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = 'http://localhost:3000/upload/' + fileInfo.uploadedName;
}