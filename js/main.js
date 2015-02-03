/* Events -----------------------------------------*/
window.onload = function(){
    //window.setTimeout(beonline, 6000);
    document.addEventListener("online", onOnline, true);                               //limit how fast the online event can fire
    document.addEventListener("deviceready", setbutton, false);
    //document.addEventListener("deviceready", initPushwoosh, true);
    document.addEventListener("deviceready", hideSaveButton, false);
    document.addEventListener("deviceready", calcResults, false);
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
    if( document.gsForm.name.value === "" ) {

         navigator.notification.alert( "Please enter your full name!" );
         document.gsForm.name.focus() ;
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


//loop through the inputs and add to array
function getinputs(num1,num2,prefix,thisarr){
    var i,k;
    for(i=num1; i<=num2; i++) {
        k = prefix + i;
        k = $('input[name = ' + k + ']:checked').val();
        thisarr.push(k);
    }
    return thisarr;
}

//loop through array and put into local storage
function storelocal(thisarr,prefix,num1){
    var j,k,v;
    for(j = 0; j < thisarr.length; j++){
        k = prefix + (j+num1);
        v = thisarr[j];
        window.localStorage.setItem(k,v);
    }  
}

//save the json data array to the server via ajax call
function saveToServer(address,datatype,selSaved){
            $.ajax({
            type       : "GET",
            url        : address,
            crossDomain: true,
            data       : JSON.stringify(datatype),
            contentType: 'application/json; charset=utf-8',
            ////dataType   : 'json',
            success    : function(responseData, textStatus, jqXHR) {
                    //alert(responseData + ", " + textStatus + ", " + jqXHR);
                
                         afterSavedServer("Govscore", organization);
                         window.localStorage.setItem(selSaved, "true");
                        },
            error      : function(response) {
                        alert(response);                  
                         }  
            });
        }


/* Initial Govscore -----------------------------------------------*/
var answers = [], gsdate, name, email, g1,  g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25;

function savelocal() {
 
    gsdate = formatDate(new Date());
    window.localStorage.setItem("date", gsdate);

    name = document.getElementById("name").value;
    window.localStorage.setItem("name", name);

    email = document.getElementById("email").value;
    window.localStorage.setItem("email", email);

    organization =  $( "#organization" ).val();
    window.localStorage.setItem("organization", organization);

    
    getinputs(1,25,"g",answers);

    storelocal(answers,"g",1);

    hideSaveButton();

    calcResults();

    //now that everything is saved, check the connection
    checkConnection( "cgovscore");

}

/*save to server -------------------------------------------------------------*/


function saveServer() {

    var data;

    //first check if data has been saved to server already
    var gsSaved = window.localStorage.getItem("gsSaved");
    if (gsSaved !== "true" && name != null ) {

       
    
        //get the data from local storage
        gsdate = window.localStorage.getItem("date");
        name = window.localStorage.getItem("name");
        email = window.localStorage.getItem("email");
        organization = window.localStorage.getItem("organization");
        g1 = window.localStorage.getItem("g1");
        g2 = window.localStorage.getItem("g2");
        g3 = window.localStorage.getItem("g3");
        g4 = window.localStorage.getItem("g4");
        g5 = window.localStorage.getItem("g5");
        g6 = window.localStorage.getItem("g6");
        g7 = window.localStorage.getItem("g7");
        g8 = window.localStorage.getItem("g8");
        g9 = window.localStorage.getItem("g9");
        g10 = window.localStorage.getItem("g10");
        g11 = window.localStorage.getItem("g11");
        g12 = window.localStorage.getItem("g12");
        g13 = window.localStorage.getItem("g13");
        g14 = window.localStorage.getItem("g14");
        g15 = window.localStorage.getItem("g15");
        g16 = window.localStorage.getItem("g16");
        g17 = window.localStorage.getItem("g17");
        g18 = window.localStorage.getItem("g18");
        g19 = window.localStorage.getItem("g19");
        g20 = window.localStorage.getItem("g20");
        g21 = window.localStorage.getItem("g21");
        g22 = window.localStorage.getItem("g22");
        g23 = window.localStorage.getItem("g23");
        g24 = window.localStorage.getItem("g24");
        g25 = window.localStorage.getItem("g25");

        

        
        data = { "date" : gsdate, "name": name, "email": email, "organization": organization, "g1": g1, "g2": g2, "g3": g3, "g4": g4, "g5": g5, "g6": g6, "g7": g7, "g8": g8, "g9": g9, "g10": g10, "g11": g11, "g12": g12, "g13": g13, "g14": g14, "g15": g15, "g16": g16, "g17": g17, "g18": g18, "g19": g19, "g20": g20, "g21": g21, "g22": g22, "g23": g23, "g24": g24, "g25": g25  };
        
        
        saveToServer("http://sensi.wpengine.com/store.php", data, "gsSaved");

    }
}




/* AG 1 -------------------------------------------------------*/


var ag1answers = [], ag1date, ag1,ag2,ag3,ag4,ag5,ag6,ag7,ag8,ag9,ag10,ag11,ag12,ag13,ag14,ag15,ag16,ag17,ag18,ag19,ag20,ag21,ag22,ag23,ag24;

/* store locally */

function ag1savelocal() {

    ag1date = formatDate(new Date());
    window.localStorage.setItem("ag1date", ag1date);

    getinputs(1,24,"ag",ag1answers);
    
    storelocal(ag1answers,"ag",1);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("cag1");

}



/* Save on Server */

function ag1saveServer() {

    var ag1data, ag1saved;

    //first check if data has been saved to server already
    ag1saved = window.localStorage.getItem("ag1saved");

    if (ag1saved !== "true" && ag1answers[0] != null ) {
    
        //get the data from local storage
        ag1date = window.localStorage.getItem("ag1date");
        email = window.localStorage.getItem("email");
        ag1 = window.localStorage.getItem("ag1");
        ag2 = window.localStorage.getItem("ag2");
        ag3 = window.localStorage.getItem("ag3");
        ag4 = window.localStorage.getItem("ag4");
        ag5 = window.localStorage.getItem("ag5");
        ag6 = window.localStorage.getItem("ag6");
        ag7 = window.localStorage.getItem("ag7");
        ag8 = window.localStorage.getItem("ag8");
        ag9 = window.localStorage.getItem("ag9");
        ag10 = window.localStorage.getItem("ag10");
        ag11 = window.localStorage.getItem("ag11");
        ag12 = window.localStorage.getItem("ag12");
        ag13 = window.localStorage.getItem("ag13");
        ag14 = window.localStorage.getItem("ag14");
        ag15 = window.localStorage.getItem("ag15");
        ag16 = window.localStorage.getItem("ag16");
        ag17 = window.localStorage.getItem("ag17");
        ag18 = window.localStorage.getItem("ag18");
        ag19 = window.localStorage.getItem("ag19");
        ag20 = window.localStorage.getItem("ag20");
        ag21 = window.localStorage.getItem("ag21");
        ag22 = window.localStorage.getItem("ag22");
        ag23 = window.localStorage.getItem("ag23");
        ag24 = window.localStorage.getItem("ag24");


        ag1data = { "ag1date" : ag1date, "email": email, "ag1": ag1, "ag2": ag2, "ag3": ag3, "ag4": ag4, "ag5": ag5, "ag6": ag6, "ag7": ag7, "ag8": ag8, "ag9": ag9, "ag10": ag10, "ag11": ag11, "ag12": ag12, "ag13": ag13, "ag14": ag14, "ag15": ag15, "ag16": ag16, "ag17": ag17, "ag18": ag18, "ag19": ag19, "ag20": ag20, "ag21": ag21, "ag22": ag22, "ag23": ag23, "ag24": ag24 };
       
        saveToServer("http://sensi.wpengine.com/store-ag1.php", ag1data, "ag1saved");
        
    }
}

/* AG 2 -------------------------------------------------------*/


var ag2answers = [], ag2date, ag25, ag26, ag27, ag28, ag29, ag30, ag31, ag32, ag33, ag34, ag35, ag36, ag37, ag38, ag39, ag40,ag41,ag42,ag43, ag44, ag45, ag46, ag47, ag48;

/* store locally */

function ag2savelocal() {

    ag2date = formatDate(new Date());
    window.localStorage.setItem("ag2date", ag2date);

    getinputs(25,48,"ag",ag2answers);
    
    storelocal(ag2answers,"ag",25);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("cag2");

}



/* Save on Server */

function ag2saveServer() {

    var ag2data, ag2saved;

    //first check if data has been saved to server already
    ag2saved = window.localStorage.getItem("ag2saved");

    if (ag2saved !== "true" && ag2answers[0] != null ) {
    
        //get the data from local storage
        ag2date = window.localStorage.getItem("ag2date");
        email = window.localStorage.getItem("email");
        ag25 = window.localStorage.getItem("ag25");
        ag26 = window.localStorage.getItem("ag26");
        ag27 = window.localStorage.getItem("ag27");
        ag28 = window.localStorage.getItem("ag28");
        ag29 = window.localStorage.getItem("ag29");
        ag30 = window.localStorage.getItem("ag30");
        ag31 = window.localStorage.getItem("ag31");
        ag32 = window.localStorage.getItem("ag32");
        ag33 = window.localStorage.getItem("ag33");
        ag34 = window.localStorage.getItem("ag34");
        ag35 = window.localStorage.getItem("ag35");
        ag36 = window.localStorage.getItem("ag36");
        ag37 = window.localStorage.getItem("ag37");
        ag38 = window.localStorage.getItem("ag38");
        ag39 = window.localStorage.getItem("ag39");
        ag40 = window.localStorage.getItem("ag40");
        ag41 = window.localStorage.getItem("ag41");
        ag42 = window.localStorage.getItem("ag42");
        ag43 = window.localStorage.getItem("ag43");
        ag44 = window.localStorage.getItem("ag44");
        ag45 = window.localStorage.getItem("ag45");
        ag46 = window.localStorage.getItem("ag46");
        ag47 = window.localStorage.getItem("ag47");
        ag48 = window.localStorage.getItem("ag48");

        ag2data = { "ag2date" : ag2date, "email": email, "ag25": ag25, "ag26": ag26, "ag27": ag27, "ag28": ag28, "ag29": ag29, "ag30": ag30, "ag31": ag31, "ag32": ag32, "ag33": ag33, "ag34": ag34, "ag35": ag35, "ag36": ag36, "ag37": ag37, "ag38": ag38, "ag39": ag39, "ag40": ag40, "ag41": ag41, "ag42": ag42, "ag43": ag43, "ag44": ag44, "ag45": ag45, "ag46": ag46, "ag47": ag47, "ag48": ag48 };
       
        saveToServer("http://sensi.wpengine.com/store-ag2.php", ag2data, "ag2saved");
        
    }
}

/* AG 3 -------------------------------------------------------*/

var ag3answers = [], ag3date, ag49, ag50, ag51, ag52, ag53, ag54, ag55, ag56, ag57, ag58, ag59, ag60;

/* store locally */



function ag3savelocal() {

    ag3date = formatDate(new Date());
    window.localStorage.setItem("ag3date", ag3date);

    getinputs(49,60,"ag",ag3answers);
    
    storelocal(ag3answers,"ag",49);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("cag3");

}



/* Save on Server */

function ag3saveServer() {

    var ag3data, ag3saved;

    //first check if data has been saved to server already
    ag3saved = window.localStorage.getItem("ag3saved");

    if (ag3saved !== "true" && ag3answers[0] != null ) {
    
         //get the data from local storage
        ag3date = window.localStorage.getItem("ag3date");
        email = window.localStorage.getItem("email");
        ag49 = window.localStorage.getItem("ag49");
        ag50 = window.localStorage.getItem("ag50");
        ag51 = window.localStorage.getItem("ag51");
        ag52 = window.localStorage.getItem("ag52");
        ag53 = window.localStorage.getItem("ag53");
        ag54 = window.localStorage.getItem("ag54");
        ag55 = window.localStorage.getItem("ag55");
        ag56 = window.localStorage.getItem("ag56");
        ag57 = window.localStorage.getItem("ag57");
        ag58 = window.localStorage.getItem("ag58");
        ag59 = window.localStorage.getItem("ag59");
        ag60 = window.localStorage.getItem("ag60");

        ag3data = { "ag3date" : ag3date, "email": email, "ag49": ag49, "ag50": ag50, "ag51": ag51, "ag52": ag52, "ag53": ag53, "ag54": ag54, "ag55": ag55, "ag56": ag56, "ag57": ag57, "ag58": ag58, "ag59": ag59, "ag60": ag60 };
       
        saveToServer("http://sensi.wpengine.com/store-ag3.php", ag3data, "ag3saved");

    }
}

/* AG 4 -------------------------------------------------------*/

var ag4answers = [], ag4date, ag61, ag62, ag63, ag64, ag65, ag66, ag67, ag68, ag69, ag70, ag71, ag72, ag73, ag74, ag75, ag76, ag77, ag78, ag79, ag80, ag81, ag82, ag83, ag84;

/* store locally */

function ag4savelocal() {

    ag4date = formatDate(new Date());
    window.localStorage.setItem("ag4date", ag4date);

    getinputs(61,84,"ag",ag4answers);
    
    storelocal(ag4answers,"ag",61);
    
    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("cag4");

}



/* Save on Server */

function ag4saveServer() {

    var ag4data, ag4saved;

    //first check if data has been saved to server already
    ag4saved = window.localStorage.getItem("ag4saved");

    if (ag4saved !== "true" && ag4answers[0] != null ) {
    
         //get the data from local storage
        ag4date = window.localStorage.getItem("ag4date");
        email = window.localStorage.getItem("email");
        ag61 = window.localStorage.getItem("ag61");
        ag62 = window.localStorage.getItem("ag62");
        ag63 = window.localStorage.getItem("ag63");
        ag64 = window.localStorage.getItem("ag64");
        ag65 = window.localStorage.getItem("ag65");
        ag66 = window.localStorage.getItem("ag66");
        ag67 = window.localStorage.getItem("ag67");
        ag68 = window.localStorage.getItem("ag68");
        ag69 = window.localStorage.getItem("ag69");
        ag70 = window.localStorage.getItem("ag70");
        ag71 = window.localStorage.getItem("ag71");
        ag72 = window.localStorage.getItem("ag72");
        ag73 = window.localStorage.getItem("ag73");
        ag74 = window.localStorage.getItem("ag74");
        ag75 = window.localStorage.getItem("ag75");
        ag76 = window.localStorage.getItem("ag76");
        ag77 = window.localStorage.getItem("ag77");
        ag78 = window.localStorage.getItem("ag78");
        ag79 = window.localStorage.getItem("ag79");
        ag80 = window.localStorage.getItem("ag80");
        ag81 = window.localStorage.getItem("ag81");
        ag82 = window.localStorage.getItem("ag82");
        ag83 = window.localStorage.getItem("ag83");
        ag84 = window.localStorage.getItem("ag84");

        ag4data = { "ag4date" : ag4date, "email": email, "ag61": ag61, "ag62": ag62, "ag63": ag63, "ag64": ag64, "ag65": ag65, "ag66": ag66, "ag67": ag67, "ag68": ag68, "ag69": ag69, "ag70": ag70, "ag71": ag71, "ag72": ag72, "ag73": ag73, "ag74": ag74, "ag75": ag75, "ag76": ag76, "ag77": ag77, "ag78": ag78, "ag79": ag79, "ag80": ag80, "ag81": ag81, "ag82": ag82, "ag83": ag83, "ag84": ag84 };
       
        saveToServer("http://sensi.wpengine.com/store-ag4.php", ag4data, "ag4saved");

    }
}

/* AG 5 -------------------------------------------------------*/
var ag5answers = [], ag5date, ag85, ag86, ag87, ag88, ag89, ag90, ag91, ag92, ag93, ag94, ag95, ag96, ag97, ag98, ag99, ag100;
/* store locally */

function ag5savelocal() {

    ag5date = formatDate(new Date());
    window.localStorage.setItem("ag5ate", ag5date);

    getinputs(85,100,"ag",ag5answers);
    
    storelocal(ag5answers,"ag",85);

    //hide save button
    hideSaveButton();

    //now that everything is saved check the connection
    checkConnection("cag5");

}



/* Save on Server */

function ag5saveServer() {

    var ag5data, ag5saved;

    //first check if data has been saved to server already
    ag5saved = window.localStorage.getItem("ag5saved");

    if (ag5saved !== "true" &&  ag5answers[0] != null ) {
    
         //get the data from local storage
        ag5date = window.localStorage.getItem("ag5date");
        email = window.localStorage.getItem("email");
        ag85 = window.localStorage.getItem("ag85");
        ag86 = window.localStorage.getItem("ag86");
        ag87 = window.localStorage.getItem("ag87");
        ag88 = window.localStorage.getItem("ag88");
        ag89 = window.localStorage.getItem("ag89");
        ag90 = window.localStorage.getItem("ag90");
        ag91 = window.localStorage.getItem("ag91");
        ag92 = window.localStorage.getItem("ag92");
        ag93 = window.localStorage.getItem("ag93");
        ag94 = window.localStorage.getItem("ag94");
        ag95 = window.localStorage.getItem("ag95");
        ag96 = window.localStorage.getItem("ag96");
        ag97 = window.localStorage.getItem("ag97");
        ag98 = window.localStorage.getItem("ag98");
        ag99 = window.localStorage.getItem("ag99");
        ag100 = window.localStorage.getItem("ag100");

        ag5data = { "ag5date" : ag5date, "email": email, "ag85": ag85, "ag86": ag86, "ag87": ag87, "ag88": ag88, "ag89": ag89, "ag90": ag90, "ag91": ag91, "ag92": ag92, "ag93": ag93, "ag94": ag94, "ag95": ag95, "ag96": ag96, "ag97": ag97, "ag98": ag98, "ag99": ag99, "ag100": ag100 };
       
        saveToServer("http://sensi.wpengine.com/store-ag5.php", ag5data, "ag5saved");

    }
} 

/* Interface changes -----------------------------------------*/ 

function hideSaveButton() {
    
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
}

/* Results -----------------*/

/*Questions 1, 2, 5, 8, 10 and 13 are based on the practice of cultivating accountability.
Questions 11, 14 and 22 are based on the practice of engaging stakeholders.
Questions 6, 7, 12 and 16 are based on the practice of setting shared strategic direction.
Questions 3, 4, 17, 21, 23 and 25 are based on the practice of stewarding resources.
Questions 9, 15, 18, 19, 20 and 24 are based on the practice of continuous governance enhancement.*/

//add up the numbers
function calcResults() {

    if(answers[1]){

        var percentArray = [], accScore, stakeScore, dirScore, resScore, enhScore, totalScore, mlevel, res;;
        

        accScore = parseInt(answers[0]) + parseInt(answers[1]) + parseInt(answers[4]) + parseInt(answers[7]) + parseInt(answers[9]) + parseInt(answers[12]);
        var accPossible = 24;
        var accPercent = Math.round(accScore/accPossible*100);
        percentArray.push(accPercent);

        stakeScore = parseInt(answers[10]) +parseInt(answers[13]) +parseInt(answers[21]);
        var stakePossible = 12;
        var stakePercent = Math.round(stakeScore/stakePossible*100);
        percentArray.push(stakePercent);

        dirScore = parseInt(answers[5]) +parseInt(answers[6]) +parseInt(answers[11]) +parseInt(answers[15]);
        var dirPossible = 16;
        var dirPercent = Math.round(dirScore/dirPossible*100);
        percentArray.push(dirPercent);

        resScore = parseInt(answers[2]) +parseInt(answers[3]) +parseInt(answers[16]) +parseInt(answers[20]) +parseInt(answers[22]) +parseInt(answers[24]);
        var resPossible = 24;
        var resPercent = Math.round(resScore/resPossible*100);
        percentArray.push(resPercent);

        enhScore = parseInt(answers[8]) +parseInt(answers[14]) +parseInt(answers[17]) +parseInt(answers[18]) +parseInt(answers[19]) +parseInt(answers[23]);
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

