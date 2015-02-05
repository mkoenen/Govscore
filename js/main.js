/* Events -----------------------------------------*/
window.onload = function(){
    //window.setTimeout(beonline, 6000);
    //document.addEventListener("online", onOnline, true);                               //limit how fast the online event can fire
    document.addEventListener("deviceready", setbutton, false);
    //document.addEventListener("deviceready", initPushwoosh, true);
    //document.addEventListener("deviceready", hideSaveButton, false);
    //document.addEventListener("deviceready", calcResults, false);
};

//check if online according to the above interval
function onOnline() {

    saveServer();
    ag1saveServer(); 
    ag2saveServer();
    ag3saveServer(); 
    ag4saveServer();
    ag5saveServer(); 
}




 //listen for click events      
function setbutton() {

    document.getElementById('btnStore').addEventListener('click', validate, false);
    document.getElementById('ag1Store').addEventListener('click', ag1savelocal, false);
    document.getElementById('ag2Store').addEventListener('click', ag2savelocal, false);
    document.getElementById('ag3Store').addEventListener('click', ag3savelocal, false);
    document.getElementById('ag4Store').addEventListener('click', ag4savelocal, false);
    document.getElementById('ag5Store').addEventListener('click', ag5savelocal, false);
    
}

/* Form Validation -------------------------------------*/

function validate() {
    if( document.gsForm.username.value === "" ) {

         navigator.notification.alert( "Please enter your full name!" );
         document.gsForm.username.focus() ;
         return false;
    }

    if( document.gsForm.email.value === "" ) {

         navigator.notification.alert( "Please enter your email address!" );
         document.gsForm.email.focus() ;
         return false;

    }else{

        // Put extra check for data format
        var ret = validateEmail();
        if( ret === false ) {

              return false;

         }
   }

   if( document.gsForm.organization.value === "-1" ) {

     navigator.notification.alert( "Please enter your organization!" );
     document.gsForm.organization.focus() ;
     return false;

   }

   savelocal();

}


function validateEmail() {

   var emailID = document.gsForm.email.value;
   var atpos = emailID.indexOf("@");
   var dotpos = emailID.lastIndexOf(".");
   if (atpos < 1 || ( dotpos - atpos < 2 )) {

       navigator.notification.alert("Please enter a correct email address");
       document.gsForm.email.focus() ;
       return false;

   }

   return( true );

}

/* Notifications ----------------------------------*/
var organization;

function messageAfterSaveLocal() {
    navigator.notification.alert(
        'Your answers have been stored on your device. They will be saved to the server when you are connected to the internet.',
        'Info title',
        'Update'
    );
}


function afterSavedServer(form, orgcode) {

    navigator.notification.alert(

        'Your answers to the questionnaire ' + form + ' have been saved. To see the results for your organization go to our website and enter the organization code  ' + orgcode + '.',
        'Info title',
        'Update'
    );
}

function alreadySaved() {
    navigator.notification.alert (
        'Your data has already been saved',
        'Info title',
        'Update'
    );
}


/* Get Date --------------------------------------------------*/

function formatDate(date) {
    date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2); 
    return date;   
}



/*------------check the connection --------------*/

function checkConnection(whichfunction) {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    if( states[networkState] !== 'No network connection'){
        switch(whichfunction) {
            case "cgovscore":
                saveServer();
                break;
            case "cag1":
                ag1saveServer();
                break;
            case "cag2":
                ag2saveServer();
                break;
            case "cag3":
                ag3saveServer();
                break;
            case "cag4":
                ag4saveServer();
                break;
            case "cag5":
                ag5saveServer();
                break;
        }

    }else{

        messageAfterSaveLocal();  
        
    }
}


/* Functions for processing data -----------------------------------------------*/

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

//get answers from form and build json array
function getinputs(answerset,num1,num2,prefix){
        var i, key, value;
        //answerset += { 'gs':[-1]};
        //loop through the entries, grab value and store in array
        for(i=num1; i<=num2; i++) {
            key = "'" + prefix + i +"'";
            value = $('input[name = ' + key + ']:checked').val();
            answerset.gs[i] = value;
        }
        
        return answerset;
    }


//save the json data array to the server via ajax call
function saveToServer(address,dataset){
            $.ajax({
            type       : "GET",
            url        : address,
            crossDomain: true,
            data       : dataset,
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                    alert(responseData + ", " + textStatus + ", " + jqXHR);
                
                         afterSavedServer("Govscore", organization);
                        },
            error      : function(response) {
                        alert(response);                  
                         }  
            });
            window.location.hash = "govscore-results";
        }


/* Initial Govscore -----------------------------------------------*/
var gsdata = localStorage.getObject('gsdata');

function savelocal() {

    var userdata, email, gsdata, gsdate, username, organization;

    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    organization = document.getElementById("organization").value;
    gsdate  = formatDate(new Date());

    //construct the json array for user data and add to local storage
    gsdata = {'username': username, 'email': email, 'organization': organization, 'gsdate': gsdate, 'gs':[-1]};
    gsdata = getinputs(gsdata,1,25,"g");
    localStorage.setObject('gsdata', gsdata);
 
    //calcResults();

    //now that everything is saved, check the connection
    checkConnection( "cgovscore");
}

/*save to server -------------------------------------------------------------*/

function saveServer() {

    var gsdata;

    //get the data from local storage
    //gsdata = localStorage.getObject('gsdata');

    saveToServer("http://sensi.wpengine.com/store.php", gsdata);

}

/* AG 1 -------------------------------------------------------*/

/* store locally */

function ag1savelocal() {

    var ag1data, ag1date;

    //gsdata = localStorage.getObject('gsdata');

    ag1date = formatDate(new Date());

    ag1data = { 'ag1date':ag1date, 'email': gsdata.email, 'ag1': [-1]};
    ag1data = getinputs(ag1data,1,24,"ag");

    localStorage.setObject('ag1data', ag1data);

    //now that everything is saved check the connection
    checkConnection("cag1");

}

/* Save on Server */

function ag1saveServer() {

    var ag1data;
          
    ag1data = localStorage.getObject('ag1data');
    saveToServer("http://sensi.wpengine.com/store-ag1.php", ag1data);
        
}

/* AG 2 -------------------------------------------------------*/

/* store locally */

function ag2savelocal() {

    var ag2data, ag2date;

    //gsdata = localStorage.getObject('gsdata');

    ag2date = formatDate(new Date());

    ag2data = { 'ag2date':ag2date, 'email': gsdata.email, 'ag2': [-1]};
    ag2data = getinputs(ag2data,25,48,"ag");

    localStorage.setObject('ag2data', ag2data);

    //now that everything is saved check the connection
    checkConnection("cag2");

}

/* Save on Server */

function ag2saveServer() {

    var ag2data;
 
    ag2data = localStorage.getObject('ag2data');
    saveToServer("http://sensi.wpengine.com/store-ag2.php", ag2data);
        
}

/* AG 3 -------------------------------------------------------*/

/* store locally */

function ag3savelocal() {

    var ag3data, ag3date;

    ag3date = formatDate(new Date());

    ag3data = { 'ag3date':ag3date, 'email': gsdata.email, 'ag3': [-1]};
    ag3data = getinputs(ag3data,49,60,"ag");

    localStorage.setObject('ag3data', ag3data);

    //now that everything is saved check the connection
    checkConnection("cag3");

}

/* Save on Server */

function ag3saveServer() {

    var ag3data;

    ag3data = localStorage.getObject('ag3data');
    saveToServer("http://sensi.wpengine.com/store-ag3.php", ag3data);

}

/* AG 4 -------------------------------------------------------*/

/* store locally */

function ag4savelocal() {

    var ag4data, ag4date;

    ag4date = formatDate(new Date());

    ag4data = { 'ag4date':ag4date, 'email': gsdata.email, 'ag4': [-1]};
    ag4data = getinputs(ag4data,61,84,"ag");

    localStorage.setObject('ag4data', ag4data);

    //now that everything is saved check the connection
    checkConnection("cag4");

}

/* Save on Server */

function ag4saveServer() {

    var ag4data;
    
    ag4data = localStorage.getObject('ag4data');
    saveToServer("http://sensi.wpengine.com/store-ag4.php", ag4data);

}

/* AG 5 -------------------------------------------------------*/

/* store locally */

function ag5savelocal() {

    var ag5data, ag5date;

    ag5date = formatDate(new Date());

    ag5data = { 'ag5date':ag5date, 'email': gsdata.email, 'ag5': [-1]};
    ag5data = getinputs(ag5data,85,100,"ag");
    
    localStorage.setObject('ag5data', ag5data);

    //now that everything is saved check the connection
    checkConnection("cag5");

}

/* Save on Server */

function ag5saveServer() {

    var ag5data;

    ag5data = localStorage.getObject('ag5data');
    saveToServer("http://sensi.wpengine.com/store-ag5.php", ag5data);

    
} 

/* Interface changes -----------------------------------------*/ 

/*function hideSaveButton() {
    
    if( answers[1] != null){
        var gsSaveButton = document.getElementById('btnStore');
        gsSaveButton.className = gsSaveButton.className + " hide";
        var resultButton2 = document.getElementById('govscore-results2');
        resultButton2.className = resultButton2.className + " see";
    }
    
    if(ag1answers[1] != null){
       var ag1SaveButton = document.getElementById('ag1Store');
       ag1SaveButton.className = ag1SaveButton.className + " hide";
    }
   
    if(ag2answers[1] != null) {
        var ag2SaveButton = document.getElementById('ag2Store');
        ag2SaveButton.className = ag2SaveButton.className + " hide";
    }
    
    if(ag3answers[1] != null){
        var ag3SaveButton = document.getElementById('ag3Store');
        ag3SaveButton.className = ag3SaveButton.className + " hide";
    }
     
    if( ag4answers[1] != null) {
        var ag4SaveButton = document.getElementById('ag4Store');
        ag4SaveButton.className = ag4SaveButton.className + " hide";
    }
   
    if( ag5answers[1] != null){
        var ag5SaveButton = document.getElementById('ag5Store');
        ag5SaveButton.className = ag5SaveButton.className + " hide";
    }
}*/

/* Results -----------------*/

/*Questions 1, 2, 5, 8, 10 and 13 are based on the practice of cultivating accountability.
Questions 11, 14 and 22 are based on the practice of engaging stakeholders.
Questions 6, 7, 12 and 16 are based on the practice of setting shared strategic direction.
Questions 3, 4, 17, 21, 23 and 25 are based on the practice of stewarding resources.
Questions 9, 15, 18, 19, 20 and 24 are based on the practice of continuous governance enhancement.*/

//add up the numbers
function calcResults() {

    var gsdata = JSON.parse(localStorage["gsdata"]);

    if(gsdata[0]){

        var percentArray = [], accScore, stakeScore, dirScore, resScore, enhScore, totalScore, mlevel, res;;
        

        accScore = parseInt(gsdata[0]) + parseInt(gsdata[1]) + parseInt(gsdata[4]) + parseInt(gsdata[7]) + parseInt(gsdata[9]) + parseInt(gsdata[12]);
        var accPossible = 24;
        var accPercent = Math.round(accScore/accPossible*100);
        percentArray.push(accPercent);

        stakeScore = parseInt(gsdata[10]) +parseInt(gsdata[13]) +parseInt(gsdata[21]);
        var stakePossible = 12;
        var stakePercent = Math.round(stakeScore/stakePossible*100);
        percentArray.push(stakePercent);

        dirScore = parseInt(gsdata[5]) +parseInt(gsdata[6]) +parseInt(gsdata[11]) +parseInt(gsdata[15]);
        var dirPossible = 16;
        var dirPercent = Math.round(dirScore/dirPossible*100);
        percentArray.push(dirPercent);

        resScore = parseInt(gsdata[2]) +parseInt(gsdata[3]) +parseInt(gsdata[16]) +parseInt(gsdata[20]) +parseInt(gsdata[22]) +parseInt(gsdata[24]);
        var resPossible = 24;
        var resPercent = Math.round(resScore/resPossible*100);
        percentArray.push(resPercent);

        enhScore = parseInt(gsdata[8]) +parseInt(gsdata[14]) +parseInt(gsdata[17]) +parseInt(gsdata[18]) +parseInt(gsdata[19]) +parseInt(gsdata[23]);
        var enhPossible = 24;
        var enhPercent = Math.round(enhScore/enhPossible*100);
        percentArray.push(enhPercent);

        totalScore = accScore+stakeScore+dirScore+resScore+enhScore;
        

        switch(true) {
            case( totalScore < 25 ):
                mlevel = "Clear need of governance development (first level/4)";
                break;
            case( totalScore >= 25 && totalScore < 50 ):
                mlevel = "Basic level of governance (second level/4)";
                break;
            case( totalScore >= 50 && totalScore < 75 ):
                mlevel = "Goal-Driven and dynamic governance (third level/4)";
                break;
            case( totalScore >= 75 ): 
                mlevel = "Transformational governance (highest level/4)";
        }

        //list each area with the score
        res = "<h2>Govscore Assessment</h2><p>Overall your Organization scores as follows: </p>";
        res += "<p>" + totalScore +" points out of 100</p><p>This places your organization at:</p><p>\"" + mlevel + "\".</p><h3>Result by Practice Area</h3>";
        res += "<h3>Cultivating Accountability</h3><p>" + accScore + " out of " + accPossible + " points - " + accPercent + "%.</p>";
        res += "<h3>Engaging Stakeholders</h3><p>" + stakeScore + " out of " + stakePossible + " points - " + stakePercent + "%.</p>";
        res += "<h3>Shared Strategic Direction</h3><p>" + dirScore + " out of " + dirPossible + " points - " + dirPercent + "%.</p>";
        res += "<h3>Stewarding Resources</h3><p>" + resScore + " out of " + resPossible + " points - " + resPercent + "%.</p>";
        res += "<h3>Continuous Governance Enhancement</h3><p>" + enhScore + " out of " + enhPossible + " points - " + enhPercent + "%.</p>";

        document.getElementById('gs-results').innerHTML = res;
    }
}

