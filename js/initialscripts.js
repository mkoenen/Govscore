window.onload = function() {
    document.addEventListener("deviceready", initialize, false);
    document.addEventListener("deviceready", setbutton, false);
    document.addEventListener("online", checkConnection, false);
}
function setbutton() {
    document.getElementById('btnStore').addEventListener('click', saveIsClicked, false);
}
 /*save locally ------------------------------------------------------------*/

function saveIsClicked() {
    savelocal();
}
function savelocal() {
    document.getElementById("retrieveData").addEventListener("click", retrieveData, false);

    var cdate = +new Date();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var organization =  $( "#myselect" ).val();
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



    /*window.sessionStorage.setItem("first", first);
    window.sessionStorage.setItem("last", last);
    window.sessionStorage.setItem("email", email);*/
    console.log(cdate);
    console.log(document.getElementById("name").value);
    console.log(document.getElementById("email").value);
    console.log(organization);
    console.log(answer1); 
  
}

function retrieveData(){
    var cdate = window.localStorage.getItem("date");
    var name = window.localStorage.getItem("name");
    var email = window.localStorage.getItem("email");
    var organization = window.localStorage.getItem("organization");
    var answer1 = window.localStorage.getItem("answer1");

    var output = "Date: " + cdate + "<br />Name: " + name + "<br />Email: " + email + "<br />organization: " + organization + "<br />Answer1: " + answer1 + "<br />";
    document.getElementById("retrieveData").innerHTML = output;
}


/*check if online ------------------------------------------------------------*/
//-----> change: check if connection only after the save button has been hit

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);

    if( states[networkState] !== 'No network connection'){
        alert('connection');
        saveServer();
    }else{
        alert('noconnected');
        //
    }

}

/*save to server -------------------------------------------------------------*/
var savedAlready = false;

function saveServer() {
    if (!savedAlready) {
        alert("button has been clicked");

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = serverResponse;

        //get the data from local storage
        var cdate = window.localStorage.getItem("date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");
        var organization = window.localStorage.getItem("organization");
        var answer1 = window.localStorage.getItem("answer1");
        var answer2 = window.localStorage.getItem("answer2");
        var answer3 = window.localStorage.getItem("answer3");
        var answer4 = window.localStorage.getItem("answer4");
        var answer5 = window.localStorage.getItem("answer5");
        var answer6 = window.localStorage.getItem("answer6");
        var answer7 = window.localStorage.getItem("answer7");
        var answer8 = window.localStorage.getItem("answer8");
        var answer9 = window.localStorage.getItem("answer9");
        var answer10 = window.localStorage.getItem("answer10");
        var answer11 = window.localStorage.getItem("answer11");
        var answer12 = window.localStorage.getItem("answer12");
        var answer13 = window.localStorage.getItem("answer13");
        var answer14 = window.localStorage.getItem("answer14");
        var answer15 = window.localStorage.getItem("answer15");
        var answer16 = window.localStorage.getItem("answer16");
        var answer17 = window.localStorage.getItem("answer17");
        var answer18 = window.localStorage.getItem("answer18");
        var answer19 = window.localStorage.getItem("answer19");
        var answer20 = window.localStorage.getItem("answer20");
        var answer21 = window.localStorage.getItem("answer21");
        var answer22 = window.localStorage.getItem("answer22");
        var answer23 = window.localStorage.getItem("answer23");
        var answer24 = window.localStorage.getItem("answer24");
        var answer25 = window.localStorage.getItem("answer25");

                
        var url ="http://margaretekoenen.com/store.php?date=" + cdate;
        url += "&name=" + name;
        url += "&email=" + demail;
        url += "&organization=" + organization;
        url += "&answer1=" + answer1;
        url += "&answer2=" + answer2;

        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        
        savedAlready = true;
        return savedAlready;
    }

}

function serverResponse() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById('result').innerHTML = xmlhttp.responseText;
        if(xmlhttp.responseText) {
        alert("Everything has been saved on server and the flag is set to" + savedAlready);
        }
    }

 }

