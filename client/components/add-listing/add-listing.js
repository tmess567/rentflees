Meteor.subscribe('listings');
var imageName = null;
Uploader.finished = function(index, fileInfo, templateContext) {
	console.log(fileInfo.uploadedName);
	//console.log(Meteor.user().services.facebook.id);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = 'http://localhost:3000/upload/' + fileInfo.uploadedName;
	imageName = fileInfo.uploadedName;
}
AutoForm.hooks({
  addListingForm: {
  	onSubmit: function (insertDoc, updateDoc, currentDoc) {
  		this.event.preventDefault()
  		if(imageName != null){
  			insertDoc.image = imageName;
  			Listings.insert(insertDoc);
  			console.log("Done");
  		} else {
  			this.done(new Error("Submission failed"));
  		}
  		return false;
  	}
  }
 });