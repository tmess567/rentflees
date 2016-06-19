import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  UploadServer.init({
    tmpDir: process.env.PWD + '/public/tmp',
    uploadDir: process.env.PWD + '/public/',
    checkCreateDirectories: true //create the directories for you
  });
});
