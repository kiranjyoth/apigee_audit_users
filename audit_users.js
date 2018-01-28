
var https = require('https');
var prompt = require('prompt');

//
// Start the prompt
//
prompt.start();

//
// Get 5 properties from the user: orgnization, username, password, starttime and endtime
//
prompt.get([
  {
    name: 'organization',
    required: true
  },
  {
    name: 'username',
    required: true
  },
  {
    name: 'password',
    hidden: true,
    conform: function (value) {
      return true;
    }
  },
  {
    name:'starttime',
    required: false
  },
  {
    name:'endtime',
    required: false
  },
],

  function (err, inputdata) {
  //
  // Take input and call Audits API
  //

  var username = inputdata.username;
  var password = inputdata.password;
  var org_name = inputdata.organization;
  var startTime = inputdata.starttime;
  var endTime = inputdata.endtime;

  var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
  var request = require('request');
  var url = "https://api.enterprise.apigee.com/v1/audits/organizations/"+org_name+"/users/?expand=true&startTime="+startTime+"&endTime="+endTime ;

  request.get( {
      url : url,
      headers : {
          "Authorization" : auth
      }
    }, function(error, response, body) {
          console.log('body : ', body);
        if(error) {
          console.log('error: ', error);
        }

    } );

});
