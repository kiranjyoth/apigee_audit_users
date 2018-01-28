
var https = require('https');
var alasql = require('alasql');
var prompt = require('prompt');


//Start the prompt

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
  var url = "https://api.enterprise.apigee.com/v1/audits/organizations/"+org_name+"?expand=true&startTime="+startTime+"&endTime="+endTime ;
  console.log('requesting data....');
  request.get( {
      url : url,
      headers : {
          "Authorization" : auth
      }
    },

      function(error, response, body) {

      var returnedData = JSON.parse(body);
      //using alasql to parse json data - this is quite fast for in memory operation
      var userList = alasql('SELECT DISTINCT user FROM ?',[returnedData.auditRecord]);
      var userCount = alasql('SELECT  COUNT(DISTINCT user) AS Number_of_Users FROM ?',[returnedData.auditRecord]);
      console.log(userList);
      console.log(userCount);

      if(error) {
        console.log('error: ', error);
      }
    }
  );

});
