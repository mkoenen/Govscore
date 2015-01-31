

/* Events -----------------------------------------*/

window.onload = function(){
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
  
}




 //listen for click events      
function setbutton() {
    
    

}

/* Form Validation -------------------------------------*/

function validate() {
    
}


function validateEmail() {

  
}

/* Notifications ----------------------------------*/


function messageAfterSaveLocal() {
   
}


function afterSavedServer(form, orgcode) {

    
}

function alreadySaved() {
    
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

/* Interface changes -----------------------------------------*/ 

function hideSaveButton() {

    
   
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








/*Save locally*/





function savelocal() {
 
   

}

/*save to server */


function saveServer() {
    
    
}




/* AG 1 -------------------------------------------------------*/



/* store locally */

function ag1savelocal() {

   

}



/* Save on Server */

function ag1saveServer() {
   


}

/* AG 2 -------------------------------------------------------*/



/* store locally */

function ag2savelocal() {

 

}



/* Save on Server */

function ag2saveServer() {
   

}

/* AG 3 -------------------------------------------------------*/

/* store locally */

function ag3savelocal() {

    

}



/* Save on Server */

function ag3saveServer() {

   

}

/* AG 4 -------------------------------------------------------*/

/* store locally */

function ag4savelocal() {

  
}



/* Save on Server */

function ag4saveServer() {

  

}

/* AG 5 -------------------------------------------------------*/

/* store locally */

function ag5savelocal() {

    

}



/* Save on Server */

function ag5saveServer() {
    
} 

function checkResults(){
   
}


//add up the numbers
function calcResults() {

  

}

