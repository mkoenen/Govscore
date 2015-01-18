/* Events -----------------------------------------*/
function init() {
    window.setTimeout(beonline, 3000);                              //limit how fast the online event can fire
    document.addEventListener("deviceready", setbutton, false);
    document.addEventListener("deviceready", resultsButton, false);
    //document.addEventListener("deviceready", initPushwoosh, true);
    //document.addEventListener("resume", checkEvent, false);

}

//check if online according to the above interval
function beonline() {
   document.addEventListener("online", saveServer, true); 
}


var saved, ag1saved, ag2saved

 //listen for click events      
function setbutton() {
    document.getElementById('btnStore').addEventListener('click', savelocal, false);
    document.getElementById('ag1Store').addEventListener('click', ag1savelocal, false);
    document.getElementById('ag2Store').addEventListener('click', ag2savelocal, false);
    ////document.getElementById('ag3Store').addEventListener('click', ag3savelocal, false);
    //document.getElementById('ag4Store').addEventListener('click', ag4savelocal, false);
    //document.getElementById('ag5Store').addEventListener('click', ag5savelocal, false);
    document.getElementById("retrieveData").addEventListener("click", result, false); //temp: checks if data has been saved

}

/* Notifications ----------------------------------*/


function messageAfterSaveLocal() {
    navigator.notification.alert(
        'Your data has been stored on your device and will be moved to the server as soon as possible.',
        'Info title',
        'Update'
    );
}


function afterSavedServer() {
    navigator.notification.alert(
        'Your data has been saved. Thank you for your submission.',
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



/*Save locally-----------------------------------------------*/

function savelocal() {
    
    var cdate = new Date();
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


    //send saved locally alert
    messageAfterSaveLocal();
    resultsButton();

    //now that everything is saved check the connection
    checkConnection( "govscore");

    

}


function result(){
    var cdate = window.localStorage.getItem("date");
    var name = window.localStorage.getItem("name");
    var email = window.localStorage.getItem("email");
    var organization = window.localStorage.getItem("organization");
    var answer1 = window.localStorage.getItem("answer1");
    var savedFromLocal = window.localStorage.getItem("saved");
    var output = "Date: " + cdate + "<br />Name: " + name + "<br />Email: " + email + "<br />organization: " + organization + "<br />Answer1: " + answer1 + "<br />Saved: " + savedFromLocal +"<br />";
    document.getElementById("retrieveData").innerHTML = output;
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
            default:
                alert("not sure which file to use");
        }
    }else{
        alert("we are not getting this saved despite connecton"); //temp
        messageAfterSaveLocal()  //temp
        
    }
}

/*save to server -------------------------------------------------------------*/


function saveServer() {
    //first check if data has been saved to server already

    var getSaved = window.localStorage.getItem("saved");
    var savedName = window.localStorage.getItem("name");
    //alert( "saved is " + getSaved + "and name is " + savedName); //temp
//getSaved !== "true" && 
    if (savedName !== null ) {

       
    
         //get the data from local storage
        var cdate = window.localStorage.getItem("date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
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

        saved = window.localStorage.setItem("saved", "true");


alert("got here");

        var data = { "date" : cdate, "name": name, "email": email, "organization": organization, "g1": g1, "g2": g2, "g3": g3, "g4": g4, "g5": g5, "g6": g6, "g7": g7, "g8": g8, "g9": g9, "g10": g10, "g11": g11, "g12": g12, "g13": g13, "g14": g14, "g15": g15, "g16": g16, "g17": g17, "g18": g18, "g19": g19, "g20": g20, "g21": g21, "g22": g22, "g23": g23, "g24": g24, "g25": g25  };
        
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/store.php",
            crossDomain: true,
            data       : JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                alert(responseData + ", " + textStatus + ", " + jqXHR);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

        //afterSavedServer();

    }else{
        alreadySaved();
    }
}


function serverResponse() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if(xmlhttp.responseText) {
            afterSavedServer();
        }
        //add the button to the results page by adding the class "see" which will display the button  
    }
}

/* Interface changes -----------------------------------------*/

function resultsButton() {
    var getSaved = window.localStorage.getItem("saved");
    var savedName = window.localStorage.getItem("name");

    if (getSaved == "true" && savedName !== null ) {

        var mybutton1 = document.getElementById('govscore-results1');
        var mybutton2 = document.getElementById('govscore-results2');
        mybutton1.className = mybutton1.className + " see";
        mybutton2.className = mybutton2.className + " see";

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
    
    alert(window.localStorage.getItem("ag1a") + ", " + window.localStorage.getItem("ag6d"));


    //send saved locally alert
    messageAfterSaveLocal();

    //now that everything is saved check the connection
    checkConnection("ag1");

    

}



/* Save on Server */

function ag1saveServer() {
    //first check if data has been saved to server already

    var getag1Saved = window.localStorage.getItem("ag1saved");
    var savedag1b = window.localStorage.getItem("ag1b");
    //alert( "saved is " + getSaved + "and name is " + savedName); //temp
//getag1Saved !== "true" && 
    if (savedag1b !== null ) {
    
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


alert("got here");

        var ag1data = { "ag1date" : ag1date, "name": name, "email": email, "organization": organization, "ag1a": ag1a, "ag1b": ag1b, "ag1c": ag1c, "ag1d": ag1d, "ag2a": ag2a, "ag2b": ag2b, "ag2c": ag2c, "ag2d": ag2d, "ag3a": ag3a, "ag3b": ag3b, "ag3c": ag3c, "ag3d": ag3d, "ag4a": ag4a, "ag4b": ag4b, "ag4c": ag4c, "ag4d": ag4d, "ag5a": ag5a, "ag5b": ag5b, "ag5c": ag5c, "ag5d": ag5d, "ag6a": ag6a, "ag6b": ag6b, "ag6c": ag6c, "ag6d": ag6d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/ag1store.php",
            crossDomain: true,
            data       : JSON.stringify(ag1data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                alert(responseData + ", " + textStatus + ", " + jqXHR);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

        alreadySaved();

    }

}

/* AG 2 -------------------------------------------------------*/

/* store locally */

function ag2savelocal() {
    alert("Got to ag2savelocal");
    
    var ag2date = new Date();
    var ag7a = $('input[name="a1a"]:checked').val();
    var ag7b = $('input[name="a1b"]:checked').val();
    var ag7c = $('input[name="a1c"]:checked').val();
    var ag7d = $('input[name="a1d"]:checked').val();
    var ag8a = $('input[name="a2a"]:checked').val();
    var ag8b = $('input[name="a2b"]:checked').val();
    var ag8c = $('input[name="a2c"]:checked').val();
    var ag8d = $('input[name="a2d"]:checked').val();
    var ag9a = $('input[name="a3a"]:checked').val();
    var ag9b = $('input[name="a3b"]:checked').val();
    var ag9c = $('input[name="a3c"]:checked').val();
    var ag9d = $('input[name="a3d"]:checked').val();
    var ag10a = $('input[name="a4a"]:checked').val();
    var ag10b = $('input[name="a4b"]:checked').val();
    var ag10c = $('input[name="a4c"]:checked').val();
    var ag10d = $('input[name="a4d"]:checked').val();
    var ag11a = $('input[name="a5a"]:checked').val();
    var ag11b = $('input[name="a5b"]:checked').val();
    var ag11c = $('input[name="a5c"]:checked').val();
    var ag11d = $('input[name="a5d"]:checked').val();
    var ag12a = $('input[name="a6a"]:checked').val();
    var ag12b = $('input[name="a6b"]:checked').val();
    var ag12c = $('input[name="a6c"]:checked').val();
    var ag12d = $('input[name="a6d"]:checked').val();
    
    


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
    
    alert(window.localStorage.getItem("ag7a") + ", " + window.localStorage.getItem("ag12d"));


    //send saved locally alert
    messageAfterSaveLocal();

    //now that everything is saved check the connection
    checkConnection("ag2");

    

}



/* Save on Server */

function ag2saveServer() {
    //first check if data has been saved to server already

    var getag2Saved = window.localStorage.getItem("ag2saved");
    var savedag7b = window.localStorage.getItem("ag7b");
    //alert( "saved is " + getSaved + "and name is " + savedName); //temp
//getag1Saved !== "true" && 
    if (savedag7b !== null ) {
    
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


alert("got here");

        var ag2data = { "ag2date" : ag2date, "name": name, "email": email, "organization": organization, "ag7a": ag7a, "ag7b": ag7b, "ag7c": ag7c, "ag7d": ag7d, "ag8a": ag8a, "ag8b": ag8b, "ag8c": ag8c, "ag8d": ag8d, "ag9a": ag9a, "ag9b": ag9b, "ag9c": ag9c, "ag9d": ag9d, "ag10a": ag10a, "ag10b": ag10b, "ag10c": ag10c, "ag10d": ag10d, "ag11a": ag11a, "ag11b": ag11b, "ag11c": ag11c, "ag11d": ag11d, "ag12a": ag12a, "ag12b": ag12b, "ag12c": ag12c, "ag12d": ag12d };
       
        $.ajax({
            type       : "GET",
            url        : "http://sensi.wpengine.com/ag2store.php",
            crossDomain: true,
            data       : JSON.stringify(ag2data),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                alert(responseData + ", " + textStatus + ", " + jqXHR);
            },
            error      : function(response) {
                alert(response);                  
            }
        });

       
        //afterSavedServer();



    }else{

        alreadySaved();

    }

}

/*-----------------*/