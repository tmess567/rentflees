import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  var uploadedName = '';
  UploadServer.init({
    tmpDir: process.env.PWD + '/.upload/tmp',
    uploadDir: process.env.PWD + '/.upload/',
    checkCreateDirectories: true,
    getFileName: function(fileInfo, formData){
    	uploadedName = fileInfo.name.substring(0, fileInfo.name.lastIndexOf('.')-1) + new Date().getTime() + '.' + fileInfo.type.split('/')[1];
    	//name of file uploaded + timestamp + . type of file (jpg/png)
    	return uploadedName;
    },
    finished: function(fileInfo, formFields) {
      fileInfo.uploadedName = uploadedName;
   	}
  });
});
