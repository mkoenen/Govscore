/* Events -----------------------------------------*/
function init() {
    //remove save buttons
    

    //window.setTimeout(beonline, 6000);
    document.addEventListener("online", onOnline, true);                               //limit how fast the online event can fire
    document.addEventListener("deviceready", setbutton, false);
    //document.addEventListener("deviceready", resultsButton, false);
    //document.addEventListener("deviceready", initPushwoosh, true);
    document.addEventListener("deviceready", hideSaveButton, false);
    document.addEventListener("deviceready", checkResults, false);

}

//check if online according to the above interval
function onOnline() {
   saveServer(); 
   ag1saveServer(); 
   ag2saveServer(); 
   ag3saveServer(); 
   ag4saveServer(); 
   ag5saveServer(); 
}


var saved, ag1saved, ag2saved, ag3saved, ag4saved, ag5saved, orgcode;

 //listen for click events      
function setbutton() {
    document.getElementById('btnStore').addEventListener('click', validate, false);
    document.getElementById('ag1Store').addEventListener('click', ag1savelocal, false);
    document.getElementById('ag2Store').addEventListener('click', ag2savelocal, false);
    document.getElementById('ag3Store').addEventListener('click', ag3savelocal, false);
    document.getElementById('ag4Store').addEventListener('click', ag4savelocal, false);
    document.getElementById('ag5Store').addEventListener('click', ag5savelocal, false);
    //document.getElementById("retrieveData").addEventListener("click", result, false); //temp: checks if data has been saved

}

/* Form Validation -------------------------------------*/

function validate()
{
    if( document.gsForm.name.value == "" ) {

         navigator.notification.alert( "Please enter your full name!" );
         document.gsForm.name.focus() ;
         return false;
    }

    if( document.gsForm.email.value == "" ) {

         navigator.notification.alert( "Please enter your email address!" );
         document.gsForm.email.focus() ;
         return false;

    }else{

        // Put extra check for data format
        var ret = validateEmail();
        if( ret == false ) {

              return false;

         }
   }

   if( document.gsForm.organization.value == "-1" ) {

     navigator.notification.alert( "Please enter your organization!" );
     document.gsForm.organization.focus() ;
     return false;

   }

   savelocal();

}


function validateEmail() {

   var emailID = document.gsForm.email.value;
   atpos = emailID.indexOf("@");
   dotpos = emailID.lastIndexOf(".");
   if (atpos < 1 || ( dotpos - atpos < 2 )) {

       navigator.notification.alert("Please enter a correct email address")
       document.gsForm.email.focus() ;
       return false;

   }

   return( true );

}

/* Notifications ----------------------------------*/


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

/* Results -----------------*/

/*Questions 1, 2, 5, 8, 10 and 13 are based on the practice of cultivating accountability.
Questions 11, 14 and 22 are based on the practice of engaging stakeholders.
Questions 6, 7, 12 and 16 are based on the practice of setting shared strategic direction.
Questions 3, 4, 17, 21, 23 and 25 are based on the practice of stewarding resources.
Questions 9, 15, 18, 19, 20 and 24 are based on the practice of continuous governance enhancement.*/

var accScore, stakeScore, dirScore, resScore, enhanceScore;
orgcode = window.localStorage.getItem("organization");

function checkResults(){
    var saved = window.localStorage.getItem("saved");

    if( saved == "true" ){
        calcResults();
    }else{
        document.getElementById("gs-results").innerHTML = "<p>You need to complete the Govscore assessment in order to see results.</p>";
    }

}
//add up the numbers
function calcResults(){
        var g1 = window.localStorage.getItem("answer1");
        var g2 = window.localStorage.getItem("answer2");
        var g3 = window.localStorage.getItem("answer3");
        var g4 = window.localStorage.getItem("answer4");
        var g5 = window.localStorage.getItem("answer5");
        var g6 = window.localStorage.getItem("answer6");
        var g7 = window.localStorage.getItem("answer7");
        var g8 = window.localStorage.getItem("answer8");
        var g9 = window.localStorage.getItem("answer9");
        var g10 = window.localStorage.getItem("answer10");
        var g11 = window.localStorage.getItem("answer11");
        var g12 = window.localStorage.getItem("answer12");
        var g13 = window.localStorage.getItem("answer13");
        var g14 = window.localStorage.getItem("answer14");
        var g15 = window.localStorage.getItem("answer15");
        var g16 = window.localStorage.getItem("answer16");
        var g17 = window.localStorage.getItem("answer17");
        var g18 = window.localStorage.getItem("answer18");
        var g19 = window.localStorage.getItem("answer19");
        var g20 = window.localStorage.getItem("answer20");
        var g21 = window.localStorage.getItem("answer21");
        var g22 = window.localStorage.getItem("answer22");
        var g23 = window.localStorage.getItem("answer23");
        var g24 = window.localStorage.getItem("answer24");
        var g25 = window.localStorage.getItem("answer25");

    var percentArray = new Array();

    accScore = parseInt(g1)+parseInt(g2)+parseInt(g5)+parseInt(g8)+parseInt(g10)+parseInt(g13);
    var accPossible = 24;
    var accPercent = Math.round(accScore/accPossible*100);
    percentArray.push(accPercent);

    stakeScore = parseInt(g11)+parseInt(g14)+parseInt(g22);
    var stakePossible = 12;
    var stakePercent = Math.round(stakeScore/stakePossible*100);
    percentArray.push(stakePercent);

    dirScore = parseInt(g6)+parseInt(g7)+parseInt(g12)+parseInt(g16);
    var dirPossible = 16;
    var dirPercent = Math.round(dirScore/dirPossible*100);
    percentArray.push(dirPercent);

    resScore = parseInt(g3)+parseInt(g4)+parseInt(g17)+parseInt(g21)+parseInt(g23)+parseInt(g25);
    var resPossible = 24;
    var resPercent = Math.round(resScore/resPossible*100);
    percentArray.push(resPercent);

    enhScore = parseInt(g9)+parseInt(g15)+parseInt(g18)+parseInt(g19)+parseInt(g20)+parseInt(g24);
    var enhPossible = 24;
    var enhPercent = Math.round(enhScore/enhPossible*100);
    percentArray.push(enhPercent);

    var totalScore = accScore+stakeScore+dirScore+resScore+enhScore;
    var mlevel;

    switch(true) {
        case( totalScore < 25 ):
            mlevel = "Clear need of governance development (first level/4)";
            break;
        case( totalScore >= 25 && totalscore < 50 ):
            mlevel = "Basic level of governance (second level/4)";
            break;
        case( totalScore >= 50 && totalscore < 75 ):
            mlevel = "Goal-Driven and dynamic governance (third level/4)";
            break;
        case( totalscore >= 75 ): 
            mlevel = "Transformational governance (highest level/4)";
    }
    
    function compareNumbers(a, b) {
        return a - b;
    }

    var sortedPercent = percentArray.sort(compareNumbers);
    if(sortedPercent[0]==sortedPercent[1] || sortedPercent[1] == sortedPercent[2]){
        var weakest = sortedPercent.slice(0,3);
    }else{
        var weakest = sortedPercent.slice(0,2);
    }

    var eval = "<h2>Govscore Assessment</h2><p>Overall your Organization scores as follows: </p>";
    eval += "<p>" + totalScore +" points out of 100</p><p>This places your organization at:</p><p>\"" + mlevel + "\".</p><h3>Result by Practice Area</h3>";
    eval += "<h4>Cultivating Accountability</h4><p>" + accScore + " out of " + accPossible + " points - " + accPercent + "%.</p>";
    eval += "<h4>Engaging Stakeholders</h4><p>" + stakeScore + " out of " + stakePossible + " points - " + stakePercent + "%.</p>";
    eval += "<h4>Shared Strategic Direction</h4><p>" + dirScore + " out of " + dirPossible + " points - " + dirPercent + "%.</p>";
    eval += "<h4>Stewarding Resources</h4><p>" + resScore + " out of " + resPossible + " points - " + resPercent + "%.</p>";
    eval += "<h4>Continuous Governance Enhancement</h4><p>" + enhScore + " out of " + enhPossible + " points - " + enhPercent + "%.</p>";
    eval += "<h3>Recommendation</h3><p>The areas that your organization should focus on are:</p>"

   for (var i = 0; i < weakest.length; i++){
        switch(weakest[i]){
            case accPercent:
                eval += "<li>" + (i+1) + ". Cultivating Accountability (" + accPercent + "%) </li>";
                break;
            case stakePercent:
                eval += "<li>" + (i+1) + ". Engaging Stakeholders (" + stakePercent + "%)</li>";
                break;
            case dirPercent:
                eval += "<li>" + (i+1) + ". Shared Strategic Direction (" + dirPercent + "%)</li>";
                break;
            case resPercent:
                eval += "<li>" + (i+1) + ". Stewarding Resources (" + resPercent + "%)</li>";
                break;
            case enhPercent:
                eval += "<li>" + (i+1) + ". Continuous Governance Enhancement (" + enhPercent + "%)</li>";
                break;
        }
   }

   eval += "<p>To learn more about these particular practice areas as they relate to your organization, take the Advanced Govscore Assessments for these areas.</p>";
   eval += "<p>To find out how your organization was evaluated by other members of your group, log into the website and use the organization code \"" + orgcode + "\".";

    //alert("eval is " + eval);
    document.getElementById('gs-results').innerHTML = eval;

}

/* Get Date --------------------------------------------------*/

/* Interface changes -----------------------------------------*/ 

function hideSaveButton() {

    
    var answer1 = window.localStorage.getItem("answer1");
    if( answer1 != null){
        var gsSaveButton = document.getElementById('btnStore');
        gsSaveButton.className = gsSaveButton.className + " hide";
        var resultButton1 = document.getElementById('govscore-results1');
        var resultButton2 = document.getElementById('govscore-results2');
        resultButton1.className = resultButton1.className + " see";
        resultButton2.className = resultButton2.className + " see";
    }
    
    var ag1a = window.localStorage.getItem("ag1a");
    if(ag1a != null){
        var ag1SaveButton = document.getElementById('ag1Store');
        ag1SaveButton.className = ag1SaveButton.className + " hide";
    }
   
    var ag7a = window.localStorage.getItem("ag7a");
    if(ag7a != null) {
        var ag2SaveButton = document.getElementById('ag2Store');
        ag2SaveButton.className = ag2SaveButton.className + " hide";
    }
    
    var ag13a = window.localStorage.getItem("ag13a");
    if(ag13a != null){
        var ag3SaveButton = document.getElementById('ag3Store');
        ag3SaveButton.className = ag3SaveButton.className + " hide";
    }
    
    var ag16a = window.localStorage.getItem("ag16a");
    if( ag16a != null) {
        var ag4SaveButton = document.getElementById('ag4Store');
        ag4SaveButton.className = ag4SaveButton.className + " hide";
    }
   
    var ag22a = window.localStorage.getItem("ag22a");
    if( ag22a != null){
        var ag5SaveButton = document.getElementById('ag5Store');
        ag5SaveButton.className = ag5SaveButton.className + " hide";
    }

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
            case "govscore":
                saveServer();
                break;
            case "ag1":
                ag1saveServer();
                break;
            case "ag2":
                ag2saveServer();
                break;
            case "ag3":
                ag3saveServer();
                break;
            case "ag4":
                ag4saveServer();
                break;
            case "ag5":
                ag5saveServer();
                break;
        }

    }else{

        messageAfterSaveLocal()  
        
    }
}

/*Save locally-----------------------------------------------*/

function savelocal() {

    
    
    cdate = new Date();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var organization =  $( "#organization" ).val();
    var answer1 = $('input[name="question1"]:checked').val();
    var answer2 = $('input[name="question2"]:checked').val();
    var answer3 = $('input[name="question3"]:checked').val();
    var answer4 = $('input[name="question4"]:checked').val();
    var answer5 = $('input[name="question5"]:checked').val();
    var answer6 = $('input[name="question6"]:checked').val();
    var answer7 = $('input[name="question7"]:checked').val();
    var answer8 = $('input[name="question8"]:checked').val();
    var answer9 = $('input[name="question9"]:checked').val();
    var answer10 = $('input[name="question10"]:checked').val();
    var answer11 = $('input[name="question11"]:checked').val();
    var answer12 = $('input[name="question12"]:checked').val();
    var answer13 = $('input[name="question13"]:checked').val();
    var answer14 = $('input[name="question14"]:checked').val();
    var answer15 = $('input[name="question15"]:checked').val();
    var answer16 = $('input[name="question16"]:checked').val();
    var answer17 = $('input[name="question17"]:checked').val();
    var answer18 = $('input[name="question18"]:checked').val();
    var answer19 = $('input[name="question19"]:checked').val();
    var answer20 = $('input[name="question20"]:checked').val();
    var answer21 = $('input[name="question21"]:checked').val();
    var answer22 = $('input[name="question22"]:checked').val();
    var answer23 = $('input[name="question23"]:checked').val();
    var answer24 = $('input[name="question24"]:checked').val();
    var answer25 = $('input[name="question25"]:checked').val();
    


    window.localStorage.setItem("date", cdate);
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("organization", organization);
    window.localStorage.setItem("answer1", answer1);
    window.localStorage.setItem("answer2", answer2);
    window.localStorage.setItem("answer3", answer3);
    window.localStorage.setItem("answer4", answer4);
    window.localStorage.setItem("answer5", answer5);
    window.localStorage.setItem("answer6", answer6);
    window.localStorage.setItem("answer7", answer7);
    window.localStorage.setItem("answer8", answer8);
    window.localStorage.setItem("answer9", answer9);
    window.localStorage.setItem("answer10", answer10);
    window.localStorage.setItem("answer11", answer11);
    window.localStorage.setItem("answer12", answer12);
    window.localStorage.setItem("answer13", answer13);
    window.localStorage.setItem("answer14", answer14);
    window.localStorage.setItem("answer15", answer15);
    window.localStorage.setItem("answer16", answer16);
    window.localStorage.setItem("answer17", answer17);
    window.localStorage.setItem("answer18", answer18);
    window.localStorage.setItem("answer19", answer19);
    window.localStorage.setItem("answer20", answer20);
    window.localStorage.setItem("answer21", answer21);
    window.localStorage.setItem("answer22", answer22);
    window.localStorage.setItem("answer23", answer23);
    window.localStorage.setItem("answer24", answer24);
    window.localStorage.setItem("answer25", answer25);

    hideSaveButton();

    calcResults();

    //now that everything is saved check the connection
    checkConnection( "govscore");

}


/*function result(){
    var cdate = window.localStorage.getItem("date");
    var name = window.localStorage.getItem("name");
    var email = window.localStorage.getItem("email");
    var organization = window.localStorage.getItem("organization");
    var answer1 = window.localStorage.getItem("answer1");
    var savedFromLocal = window.localStorage.getItem("saved");
    var output = "Date: " + cdate + "<br />Name: " + name + "<br />Email: " + email + "<br />organization: " + organization + "<br />Answer1: " + answer1 + "<br />Saved: " + savedFromLocal +"<br />";
    document.getElementById("retrieveData").innerHTML = output;
}*/



/*save to server -------------------------------------------------------------*/


function saveServer() {
    //first check if data has been saved to server already

    var getSaved = window.localStorage.getItem("saved");
    var savedName = window.localStorage.getItem("name");
    //alert( "saved is " + getSaved + "and name is " + savedName); //temp
    if (getSaved !== "true" && savedName !== null ) {

       
    
         //get the data from local storage
        var cdate = window.localStorage.getItem("date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        g1 = window.localStorage.getItem("answer1");
        var g2 = window.localStorage.getItem("answer2");
        var g3 = window.localStorage.getItem("answer3");
        var g4 = window.localStorage.getItem("answer4");
        var g5 = window.localStorage.getItem("answer5");
        var g6 = window.localStorage.getItem("answer6");
        var g7 = window.localStorage.getItem("answer7");
        var g8 = window.localStorage.getItem("answer8");
        var g9 = window.localStorage.getItem("answer9");
        var g10 = window.localStorage.getItem("answer10");
        var g11 = window.localStorage.getItem("answer11");
        var g12 = window.localStorage.getItem("answer12");
        var g13 = window.localStorage.getItem("answer13");
        var g14 = window.localStorage.getItem("answer14");
        var g15 = window.localStorage.getItem("answer15");
        var g16 = window.localStorage.getItem("answer16");
        var g17 = window.localStorage.getItem("answer17");
        var g18 = window.localStorage.getItem("answer18");
        var g19 = window.localStorage.getItem("answer19");
        var g20 = window.localStorage.getItem("answer20");
        var g21 = window.localStorage.getItem("answer21");
        var g22 = window.localStorage.getItem("answer22");
        var g23 = window.localStorage.getItem("answer23");
        var g24 = window.localStorage.getItem("answer24");
        var g25 = window.localStorage.getItem("answer25");

        saved = window.localStorage.setItem("saved", "true");


        alert(g1);

        var data = { "date" : cdate, "name": name, "email": email, "organization": organization, "g1": g1, "g2": g2, "g3": g3, "g4": g4, "g5": g5, "g6": g6, "g7": g7, "g8": g8, "g9": g9, "g10": g10, "g11": g11, "g12": g12, "g13": g13, "g14": g14, "g15": g15, "g16": g16, "g17": g17, "g18": g18, "g19": g19, "g20": g20, "g21": g21, "g22": g22, "g23": g23, "g24": g24, "g25": g25  };
        
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store.php",
            crossDomain: true,
            data       : JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                //alert(responseData + ", " + textStatus + ", " + jqXHR);
                
                afterSavedServer("Govscore", orgcode);
                loadPage("#govscore");
                            },
            error      : function(response) {
                alert(response);                  
            }
        });

         

    }else{
       // alreadySaved();
    }
}




/* AG 1 -------------------------------------------------------*/

/* store locally */

function ag1savelocal() {

    
    
    var ag1date = new Date();
    var ag1a = $('input[name="a1a"]:checked').val();
    var ag1b = $('input[name="a1b"]:checked').val();
    var ag1c = $('input[name="a1c"]:checked').val();
    var ag1d = $('input[name="a1d"]:checked').val();
    var ag2a = $('input[name="a2a"]:checked').val();
    var ag2b = $('input[name="a2b"]:checked').val();
    var ag2c = $('input[name="a2c"]:checked').val();
    var ag2d = $('input[name="a2d"]:checked').val();
    var ag3a = $('input[name="a3a"]:checked').val();
    var ag3b = $('input[name="a3b"]:checked').val();
    var ag3c = $('input[name="a3c"]:checked').val();
    var ag3d = $('input[name="a3d"]:checked').val();
    var ag4a = $('input[name="a4a"]:checked').val();
    var ag4b = $('input[name="a4b"]:checked').val();
    var ag4c = $('input[name="a4c"]:checked').val();
    var ag4d = $('input[name="a4d"]:checked').val();
    var ag5a = $('input[name="a5a"]:checked').val();
    var ag5b = $('input[name="a5b"]:checked').val();
    var ag5c = $('input[name="a5c"]:checked').val();
    var ag5d = $('input[name="a5d"]:checked').val();
    var ag6a = $('input[name="a6a"]:checked').val();
    var ag6b = $('input[name="a6b"]:checked').val();
    var ag6c = $('input[name="a6c"]:checked').val();
    var ag6d = $('input[name="a6d"]:checked').val();
    
    


    window.localStorage.setItem("ag1date", ag1date);
    window.localStorage.setItem("ag1a", ag1a);
    window.localStorage.setItem("ag1b", ag1b);
    window.localStorage.setItem("ag1c", ag1c);
    window.localStorage.setItem("ag1d", ag1d);
    window.localStorage.setItem("ag2a", ag2a);
    window.localStorage.setItem("ag2b", ag2b);
    window.localStorage.setItem("ag2c", ag2c);
    window.localStorage.setItem("ag2d", ag2d);
    window.localStorage.setItem("ag3a", ag3a);
    window.localStorage.setItem("ag3b", ag3b);
    window.localStorage.setItem("ag3c", ag3c);
    window.localStorage.setItem("ag3d", ag3d);
    window.localStorage.setItem("ag4a", ag4a);
    window.localStorage.setItem("ag4b", ag4b);
    window.localStorage.setItem("ag4c", ag4c);
    window.localStorage.setItem("ag4d", ag4d);
    window.localStorage.setItem("ag5a", ag5a);
    window.localStorage.setItem("ag5b", ag5b);
    window.localStorage.setItem("ag5c", ag5c);
    window.localStorage.setItem("ag5d", ag5d);
    window.localStorage.setItem("ag6a", ag6a);
    window.localStorage.setItem("ag6b", ag6b);
    window.localStorage.setItem("ag6c", ag6c);
    window.localStorage.setItem("ag6d", ag6d);
    
    //alert(window.localStorage.getItem("ag1a") + ", " + window.localStorage.getItem("ag6d"));

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("ag1");

    

}



/* Save on Server */

function ag1saveServer() {
    //first check if data has been saved to server already

    var getag1Saved = window.localStorage.getItem("ag1saved");
    var savedag1b = window.localStorage.getItem("ag1b");
    //alert( "saved is " + getag1Saved + "and data is " + savedag1b); //temp

    if (getag1Saved !== "true" && savedag1b !== null ) {
    
         //get the data from local storage
        var ag1date = window.localStorage.getItem("ag1date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        var ag1a = window.localStorage.getItem("ag1a");
        var ag1b = window.localStorage.getItem("ag1b");
        var ag1c = window.localStorage.getItem("ag1c");
        var ag1d = window.localStorage.getItem("ag1d");
        var ag2a = window.localStorage.getItem("ag2a");
        var ag2b = window.localStorage.getItem("ag2b");
        var ag2c = window.localStorage.getItem("ag2c");
        var ag2d = window.localStorage.getItem("ag2d");
        var ag3a = window.localStorage.getItem("ag3a");
        var ag3b = window.localStorage.getItem("ag3d");
        var ag3c = window.localStorage.getItem("ag3c");
        var ag3d = window.localStorage.getItem("ag3d");
        var ag4a = window.localStorage.getItem("ag4a");
        var ag4b = window.localStorage.getItem("ag4b");
        var ag4c = window.localStorage.getItem("ag4c");
        var ag4d = window.localStorage.getItem("ag4d");
        var ag5a = window.localStorage.getItem("ag5a");
        var ag5b = window.localStorage.getItem("ag5b");
        var ag5c = window.localStorage.getItem("ag5c");
        var ag5d = window.localStorage.getItem("ag5d");
        var ag6a = window.localStorage.getItem("ag6a");
        var ag6b = window.localStorage.getItem("ag6b");
        var ag6c = window.localStorage.getItem("ag6c");
        var ag6d = window.localStorage.getItem("ag6d");

        ag1saved = window.localStorage.setItem("ag1saved", "true");


        var ag1data = { "ag1date" : ag1date, "name": name, "email": email, "organization": organization, "ag1a": ag1a, "ag1b": ag1b, "ag1c": ag1c, "ag1d": ag1d, "ag2a": ag2a, "ag2b": ag2b, "ag2c": ag2c, "ag2d": ag2d, "ag3a": ag3a, "ag3b": ag3b, "ag3c": ag3c, "ag3d": ag3d, "ag4a": ag4a, "ag4b": ag4b, "ag4c": ag4c, "ag4d": ag4d, "ag5a": ag5a, "ag5b": ag5b, "ag5c": ag5c, "ag5d": ag5d, "ag6a": ag6a, "ag6b": ag6b, "ag6c": ag6c, "ag6d": ag6d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store-ag1.php",
            crossDomain: true,
            data       : JSON.stringify(ag1data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                //alert(responseData + ", " + textStatus + ", " + jqXHR);
                afterSavedServer("Cultivating Accountability", orgcode);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

        //alreadySaved();

    }

}

/* AG 2 -------------------------------------------------------*/

/* store locally */

function ag2savelocal() {

   
    
    var ag2date = new Date();
    var ag7a = $('input[name="a7a"]:checked').val();
    var ag7b = $('input[name="a7b"]:checked').val();
    var ag7c = $('input[name="a7c"]:checked').val();
    var ag7d = $('input[name="a7d"]:checked').val();
    var ag8a = $('input[name="a8a"]:checked').val();
    var ag8b = $('input[name="a8b"]:checked').val();
    var ag8c = $('input[name="a8c"]:checked').val();
    var ag8d = $('input[name="a8d"]:checked').val();
    var ag9a = $('input[name="a9a"]:checked').val();
    var ag9b = $('input[name="a9b"]:checked').val();
    var ag9c = $('input[name="a9c"]:checked').val();
    var ag9d = $('input[name="a9d"]:checked').val();
    var ag10a = $('input[name="a10a"]:checked').val();
    var ag10b = $('input[name="a10b"]:checked').val();
    var ag10c = $('input[name="a10c"]:checked').val();
    var ag10d = $('input[name="a10d"]:checked').val();
    var ag11a = $('input[name="a11a"]:checked').val();
    var ag11b = $('input[name="a11b"]:checked').val();
    var ag11c = $('input[name="a11c"]:checked').val();
    var ag11d = $('input[name="a11d"]:checked').val();
    var ag12a = $('input[name="a12a"]:checked').val();
    var ag12b = $('input[name="a12b"]:checked').val();
    var ag12c = $('input[name="a12c"]:checked').val();
    var ag12d = $('input[name="a12d"]:checked').val();
    
    


    window.localStorage.setItem("ag2date", ag2date);
    window.localStorage.setItem("ag7a", ag7a);
    window.localStorage.setItem("ag7b", ag7b);
    window.localStorage.setItem("ag7c", ag7c);
    window.localStorage.setItem("ag7d", ag7d);
    window.localStorage.setItem("ag8a", ag8a);
    window.localStorage.setItem("ag8b", ag8b);
    window.localStorage.setItem("ag8c", ag8c);
    window.localStorage.setItem("ag8d", ag8d);
    window.localStorage.setItem("ag9a", ag9a);
    window.localStorage.setItem("ag9b", ag9b);
    window.localStorage.setItem("ag9c", ag9c);
    window.localStorage.setItem("ag9d", ag9d);
    window.localStorage.setItem("ag10a", ag10a);
    window.localStorage.setItem("ag10b", ag10b);
    window.localStorage.setItem("ag10c", ag10c);
    window.localStorage.setItem("ag10d", ag10d);
    window.localStorage.setItem("ag11a", ag11a);
    window.localStorage.setItem("ag11b", ag11b);
    window.localStorage.setItem("ag11c", ag11c);
    window.localStorage.setItem("ag11d", ag11d);
    window.localStorage.setItem("ag12a", ag12a);
    window.localStorage.setItem("ag12b", ag12b);
    window.localStorage.setItem("ag12c", ag12c);
    window.localStorage.setItem("ag12d", ag12d);


    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("ag2");

}



/* Save on Server */

function ag2saveServer() {
    //first check if data has been saved to server already

    var getag2Saved = window.localStorage.getItem("ag2saved");
    var savedag7b = window.localStorage.getItem("ag7b");
    //alert( "saved is " + getag2Saved + "and data is " + savedag7b); //temp

    if (getag2Saved !== "true" && savedag7b !== null ) {
    
         //get the data from local storage
        var ag2date = window.localStorage.getItem("ag2date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        var ag7a = window.localStorage.getItem("ag7a");
        var ag7b = window.localStorage.getItem("ag7b");
        var ag7c = window.localStorage.getItem("ag7c");
        var ag7d = window.localStorage.getItem("ag7d");
        var ag8a = window.localStorage.getItem("ag8a");
        var ag8b = window.localStorage.getItem("ag8b");
        var ag8c = window.localStorage.getItem("ag8c");
        var ag8d = window.localStorage.getItem("ag8d");
        var ag9a = window.localStorage.getItem("ag9a");
        var ag9b = window.localStorage.getItem("ag9d");
        var ag9c = window.localStorage.getItem("ag9c");
        var ag9d = window.localStorage.getItem("ag9d");
        var ag10a = window.localStorage.getItem("ag10a");
        var ag10b = window.localStorage.getItem("ag10b");
        var ag10c = window.localStorage.getItem("ag10c");
        var ag10d = window.localStorage.getItem("ag10d");
        var ag11a = window.localStorage.getItem("ag11a");
        var ag11b = window.localStorage.getItem("ag11b");
        var ag11c = window.localStorage.getItem("ag11c");
        var ag11d = window.localStorage.getItem("ag11d");
        var ag12a = window.localStorage.getItem("ag12a");
        var ag12b = window.localStorage.getItem("ag12b");
        var ag12c = window.localStorage.getItem("ag12c");
        var ag12d = window.localStorage.getItem("ag12d");

        ag2saved = window.localStorage.setItem("ag2saved", "true");

        var ag2data = { "ag2date" : ag2date, "name": name, "email": email, "organization": organization, "ag7a": ag7a, "ag7b": ag7b, "ag7c": ag7c, "ag7d": ag7d, "ag8a": ag8a, "ag8b": ag8b, "ag8c": ag8c, "ag8d": ag8d, "ag9a": ag9a, "ag9b": ag9b, "ag9c": ag9c, "ag9d": ag9d, "ag10a": ag10a, "ag10b": ag10b, "ag10c": ag10c, "ag10d": ag10d, "ag11a": ag11a, "ag11b": ag11b, "ag11c": ag11c, "ag11d": ag11d, "ag12a": ag12a, "ag12b": ag12b, "ag12c": ag12c, "ag12d": ag12d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store-ag2.php",
            crossDomain: true,
            data       : JSON.stringify(ag2data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                //alert(responseData + ", " + textStatus + ", " + jqXHR);
                afterSavedServer("Engaging Stakeholders", orgcode);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

      //  alreadySaved();

    }

}

/* AG 3 -------------------------------------------------------*/

/* store locally */

function ag3savelocal() {

    
    
    var ag3date = new Date();
    var ag13a = $('input[name="a13a"]:checked').val();
    var ag13b = $('input[name="a13b"]:checked').val();
    var ag13c = $('input[name="a13c"]:checked').val();
    var ag13d = $('input[name="a13d"]:checked').val();
    var ag14a = $('input[name="a14a"]:checked').val();
    var ag14b = $('input[name="a14b"]:checked').val();
    var ag14c = $('input[name="a14c"]:checked').val();
    var ag14d = $('input[name="a14d"]:checked').val();
    var ag15a = $('input[name="a15a"]:checked').val();
    var ag15b = $('input[name="a15b"]:checked').val();
    var ag15c = $('input[name="a15c"]:checked').val();
    var ag15d = $('input[name="a15d"]:checked').val();
    
    
    


    window.localStorage.setItem("ag3date", ag3date);
    window.localStorage.setItem("ag13a", ag13a);
    window.localStorage.setItem("ag13b", ag13b);
    window.localStorage.setItem("ag13c", ag13c);
    window.localStorage.setItem("ag13d", ag13d);
    window.localStorage.setItem("ag14a", ag14a);
    window.localStorage.setItem("ag14b", ag14b);
    window.localStorage.setItem("ag14c", ag14c);
    window.localStorage.setItem("ag14d", ag14d);
    window.localStorage.setItem("ag15a", ag15a);
    window.localStorage.setItem("ag15b", ag15b);
    window.localStorage.setItem("ag15c", ag15c);
    window.localStorage.setItem("ag15d", ag15d);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("ag3");

}



/* Save on Server */

function ag3saveServer() {

    //first check if data has been saved to server already
    var getag3Saved = window.localStorage.getItem("ag3saved");
    var savedag13b = window.localStorage.getItem("ag13b");
    //alert( "saved is " + getag3Saved + "and data is " + savedag13b); //temp

    if (getag3Saved !== "true" && savedag13b !== null ) {
    
         //get the data from local storage
        var ag3date = window.localStorage.getItem("ag3date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        var ag13a = window.localStorage.getItem("ag13a");
        var ag13b = window.localStorage.getItem("ag13b");
        var ag13c = window.localStorage.getItem("ag13c");
        var ag13d = window.localStorage.getItem("ag13d");
        var ag14a = window.localStorage.getItem("ag14a");
        var ag14b = window.localStorage.getItem("ag14b");
        var ag14c = window.localStorage.getItem("ag14c");
        var ag14d = window.localStorage.getItem("ag14d");
        var ag15a = window.localStorage.getItem("ag15a");
        var ag15b = window.localStorage.getItem("ag15d");
        var ag15c = window.localStorage.getItem("ag15c");
        var ag15d = window.localStorage.getItem("ag15d");
        

        ag3saved = window.localStorage.setItem("ag3saved", "true");

        var ag3data = { "ag3date" : ag3date, "name": name, "email": email, "organization": organization, "ag13a": ag13a, "ag13b": ag13b, "ag13c": ag13c, "ag13d": ag13d, "ag14a": ag14a, "ag14b": ag14b, "ag14c": ag14c, "ag14d": ag14d, "ag15a": ag15a, "ag15b": ag15b, "ag15c": ag15c, "ag15d": ag15d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store-ag3.php",
            crossDomain: true,
            data       : JSON.stringify(ag3data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                //alert(responseData + ", " + textStatus + ", " + jqXHR);
                afterSavedServer("Setting Shared Strategic Directions", orgcode);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

       // alreadySaved();

    }

}

/* AG 4 -------------------------------------------------------*/

/* store locally */

function ag4savelocal() {

    
    
    var ag4date = new Date();
    var ag16a = $('input[name="a16a"]:checked').val();
    var ag16b = $('input[name="a16b"]:checked').val();
    var ag16c = $('input[name="a16c"]:checked').val();
    var ag16d = $('input[name="a16d"]:checked').val();
    var ag17a = $('input[name="a17a"]:checked').val();
    var ag17b = $('input[name="a17b"]:checked').val();
    var ag17c = $('input[name="a17c"]:checked').val();
    var ag17d = $('input[name="a17d"]:checked').val();
    var ag18a = $('input[name="a18a"]:checked').val();
    var ag18b = $('input[name="a18b"]:checked').val();
    var ag18c = $('input[name="a18c"]:checked').val();
    var ag18d = $('input[name="a18d"]:checked').val();
    var ag19a = $('input[name="a19a"]:checked').val();
    var ag19b = $('input[name="a19b"]:checked').val();
    var ag19c = $('input[name="a19c"]:checked').val();
    var ag19d = $('input[name="a19d"]:checked').val();
    var ag20a = $('input[name="a20a"]:checked').val();
    var ag20b = $('input[name="a20b"]:checked').val();
    var ag20c = $('input[name="a20c"]:checked').val();
    var ag20d = $('input[name="a20d"]:checked').val();
    var ag21a = $('input[name="a21a"]:checked').val();
    var ag21b = $('input[name="a21b"]:checked').val();
    var ag21c = $('input[name="a21c"]:checked').val();
    var ag21d = $('input[name="a21d"]:checked').val();
 

    window.localStorage.setItem("ag4date", ag4date);
    window.localStorage.setItem("ag16a", ag16a);
    window.localStorage.setItem("ag16b", ag16b);
    window.localStorage.setItem("ag16c", ag16c);
    window.localStorage.setItem("ag16d", ag16d);
    window.localStorage.setItem("ag17a", ag17a);
    window.localStorage.setItem("ag17b", ag17b);
    window.localStorage.setItem("ag17c", ag17c);
    window.localStorage.setItem("ag17d", ag17d);
    window.localStorage.setItem("ag18a", ag18a);
    window.localStorage.setItem("ag18b", ag18b);
    window.localStorage.setItem("ag18c", ag18c);
    window.localStorage.setItem("ag18d", ag18d);
    window.localStorage.setItem("ag19a", ag19a);
    window.localStorage.setItem("ag19b", ag19b);
    window.localStorage.setItem("ag19c", ag19c);
    window.localStorage.setItem("ag19d", ag19d);
    window.localStorage.setItem("ag20a", ag20a);
    window.localStorage.setItem("ag20b", ag20b);
    window.localStorage.setItem("ag20c", ag20c);
    window.localStorage.setItem("ag20d", ag20d);
    window.localStorage.setItem("ag21a", ag21a);
    window.localStorage.setItem("ag21b", ag21b);
    window.localStorage.setItem("ag21c", ag21c);
    window.localStorage.setItem("ag21d", ag21d);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("ag4");

}



/* Save on Server */

function ag4saveServer() {

    //first check if data has been saved to server already
    var getag4Saved = window.localStorage.getItem("ag4saved");
    var savedag16b = window.localStorage.getItem("ag16b");
    //alert( "saved is " + getag4Saved + "and data is " + savedag16b); //temp

    if (getag4Saved !== "true" && savedag16b !== null ) {
    
         //get the data from local storage
        var ag4date = window.localStorage.getItem("ag4date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        var ag16a = window.localStorage.getItem("ag16a");
        var ag16b = window.localStorage.getItem("ag16b");
        var ag16c = window.localStorage.getItem("ag16c");
        var ag16d = window.localStorage.getItem("ag16d");
        var ag17a = window.localStorage.getItem("ag17a");
        var ag17b = window.localStorage.getItem("ag17b");
        var ag17c = window.localStorage.getItem("ag17c");
        var ag17d = window.localStorage.getItem("ag17d");
        var ag18a = window.localStorage.getItem("ag18a");
        var ag18b = window.localStorage.getItem("ag18d");
        var ag18c = window.localStorage.getItem("ag18c");
        var ag18d = window.localStorage.getItem("ag18d");
        var ag19a = window.localStorage.getItem("ag19a");
        var ag19b = window.localStorage.getItem("ag19b");
        var ag19c = window.localStorage.getItem("ag19c");
        var ag19d = window.localStorage.getItem("ag19d");
        var ag20a = window.localStorage.getItem("ag20a");
        var ag20b = window.localStorage.getItem("ag20b");
        var ag20c = window.localStorage.getItem("ag20c");
        var ag20d = window.localStorage.getItem("ag20d");
        var ag21a = window.localStorage.getItem("ag21a");
        var ag21b = window.localStorage.getItem("ag21d");
        var ag21c = window.localStorage.getItem("ag21c");
        var ag21d = window.localStorage.getItem("ag21d");
        

        ag3saved = window.localStorage.setItem("ag4saved", "true");

        var ag4data = { "ag4date" : ag4date, "name": name, "email": email, "organization": organization, "ag16a": ag16a, "ag16b": ag16b, "ag16c": ag16c, "ag16d": ag16d, "ag17a": ag17a, "ag17b": ag17b, "ag17c": ag17c, "ag17d": ag17d, "ag18a": ag18a, "ag18b": ag18b, "ag18c": ag18c, "ag18d": ag18d, "ag19a": ag19a, "ag19b": ag19b, "ag19c": ag19c, "ag19d": ag19d, "ag20a": ag20a, "ag20b": ag20b, "ag20c": ag20c, "ag20d": ag20d, "ag21a": ag21a, "ag21b": ag21b, "ag21c": ag21c, "ag21d": ag21d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store-ag4.php",
            crossDomain: true,
            data       : JSON.stringify(ag4data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                //alert(responseData + ", " + textStatus + ", " + jqXHR);
                afterSavedServer("Stewarding Resources", orgcode);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

        //alreadySaved();

    }

}

/* AG 5 -------------------------------------------------------*/

/* store locally */

function ag5savelocal() {

    
    
    var ag5date = new Date();
    var ag22a = $('input[name="a22a"]:checked').val();
    var ag22b = $('input[name="a22b"]:checked').val();
    var ag22c = $('input[name="a22c"]:checked').val();
    var ag22d = $('input[name="a22d"]:checked').val();
    var ag23a = $('input[name="a23a"]:checked').val();
    var ag23b = $('input[name="a23b"]:checked').val();
    var ag23c = $('input[name="a23c"]:checked').val();
    var ag23d = $('input[name="a23d"]:checked').val();
    var ag24a = $('input[name="a24a"]:checked').val();
    var ag24b = $('input[name="a24b"]:checked').val();
    var ag24c = $('input[name="a24c"]:checked').val();
    var ag24d = $('input[name="a24d"]:checked').val();
    var ag25a = $('input[name="a25a"]:checked').val();
    var ag25b = $('input[name="a25b"]:checked').val();
    var ag25c = $('input[name="a25c"]:checked').val();
    var ag25d = $('input[name="a25d"]:checked').val();


    window.localStorage.setItem("ag5date", ag5date);
    window.localStorage.setItem("ag22a", ag22a);
    window.localStorage.setItem("ag22b", ag22b);
    window.localStorage.setItem("ag22c", ag22c);
    window.localStorage.setItem("ag22d", ag22d);
    window.localStorage.setItem("ag23a", ag23a);
    window.localStorage.setItem("ag23b", ag23b);
    window.localStorage.setItem("ag23c", ag23c);
    window.localStorage.setItem("ag23d", ag23d);
    window.localStorage.setItem("ag24a", ag24a);
    window.localStorage.setItem("ag24b", ag24b);
    window.localStorage.setItem("ag24c", ag24c);
    window.localStorage.setItem("ag24d", ag24d);
    window.localStorage.setItem("ag25a", ag25a);
    window.localStorage.setItem("ag25b", ag25b);
    window.localStorage.setItem("ag25c", ag25c);
    window.localStorage.setItem("ag25d", ag25d);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("ag5");

}



/* Save on Server */

function ag5saveServer() {
    //first check if data has been saved to server already

    var getag5Saved = window.localStorage.getItem("ag5saved");
    var savedag22b = window.localStorage.getItem("ag22b");
    //alert( "saved is " + getag5Saved + "and name is " + savedag22b); //temp

    if (getag5Saved !== "true" &&  savedag22b !== null ) {
    
         //get the data from local storage
        var ag5date = window.localStorage.getItem("ag5date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        var ag22a = window.localStorage.getItem("ag22a");
        var ag22b = window.localStorage.getItem("ag22b");
        var ag22c = window.localStorage.getItem("ag22c");
        var ag22d = window.localStorage.getItem("ag22d");
        var ag23a = window.localStorage.getItem("ag23a");
        var ag23b = window.localStorage.getItem("ag23b");
        var ag23c = window.localStorage.getItem("ag23c");
        var ag23d = window.localStorage.getItem("ag23d");
        var ag24a = window.localStorage.getItem("ag24a");
        var ag24b = window.localStorage.getItem("ag24d");
        var ag24c = window.localStorage.getItem("ag24c");
        var ag24d = window.localStorage.getItem("ag24d");
        var ag25a = window.localStorage.getItem("ag25a");
        var ag25b = window.localStorage.getItem("ag25b");
        var ag25c = window.localStorage.getItem("ag25c");
        var ag25d = window.localStorage.getItem("ag25d");
        
        ag5saved = window.localStorage.setItem("ag5saved", "true");

        var ag5data = { "ag5date" : ag5date, "name": name, "email": email, "organization": organization, "ag22a": ag22a, "ag22b": ag22b, "ag22c": ag22c, "ag22d": ag22d, "ag23a": ag23a, "ag23b": ag23b, "ag23c": ag23c, "ag23d": ag23d, "ag24a": ag24a, "ag24b": ag24b, "ag24c": ag24c, "ag24d": ag24d, "ag25a": ag25a, "ag25b": ag25b, "ag25c": ag25c, "ag25d": ag25d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store-ag5.php",
            crossDomain: true,
            data       : JSON.stringify(ag5data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                //alert(responseData + ", " + textStatus + ", " + jqXHR);
                afterSavedServer("Continuous Governance Enhancement", orgcode);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

      //  alreadySaved();

    }

} 

