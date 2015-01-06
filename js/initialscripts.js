window.onload = function() {
    document.addEventListener("deviceready", initialize, false);
    document.addEventListener("deviceready", setbutton, false);
    document.addEventListener("online", backOnline, false);
}
function setbutton() {
    document.getElementById('btnStore').addEventListener('click', saveIsClicked, false);
}
 /*check if online ------------------------------------------------------------*/
//-----> change: check if connection only after the save button has been hit

function saveIsClicked() {
    checkConnection();
}

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
        savelocal();
    }

}

/*save to server -------------------------------------------------------------*/
var savedAlready = false;

function saveServer() {
    if (!savedAlready) {
        alert("button has been clicked");
    
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = serverResponse;
    
        var cdate = new Date();

        
        var answer1 = $('input[name="question1"]:checked').val();
        var answer2 = $('input[name="question2"]:checked').val();
        

        /*var question1 = document.getElementsByName('question1');
        for (var i = 0, length = question1.length; i < length; i++) {
            if (question1[i].checked) {
                 console.log("answer to :" + question1);
                var answer1 = question1[i].value;
                alert(answer1);
                break;
            }
        }
        console.log(answer1);*/

                
        var url ="http://margaretekoenen.com/store.php?date=" + cdate;
        url += "&name=" + document.getElementById("name").value;
        url += "&email=" + document.getElementById("email").value;
        url += "&answer1=" + answer1;
        url += "&answer2=" + answer2;
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        console.log(cdate);
        console.log(document.getElementById("name").value);
        console.log(document.getElementById("email").value);
        console.log(answer1);
        console.log(answer2);
        savedAlready = true;
    }

}

function serverResponse()
        {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                document.getElementById('result').innerHTML = xmlhttp.responseText;
                if(xmlhttp.responseText) {
                alert("On server" + savedAlready);
                }
            }
    
         }

/*save locally-----------------------------------------------*/
function savelocal() {
    document.getElementById("retrieveData").addEventListener("click", retrieveData, false);

    var cdate = new Date();
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

/*save when back online----------------------------------*/

function backOnline(){
    /*calling serverResponse function defined above*/
    if (!savedAlready) {
        
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = serverResponse;
        
        var cdate = window.localStorage.getItem("date");
        var name = window.localStorage.getItem("name");
        var email = window.localStorage.getItem("email");

        var cdate = new Date();
        var url ="http://margaretekoenen.com/store.php?date=cdate";
        url += "&name=" + document.getElementById("name").value;
        url += "&email=" + document.getElementById("email").value;
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        console.log(cdate);
        console.log(document.getElementById("name").value);
        console.log(document.getElementById("email").value);

        savedAlready = true;
         
    }
}

var xmlhttp;

/*function init()
{   document.getElementById("btnGetNumbers").addEventListener("click", getData,false);
    
   */ /*initialize*//*
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processResponse;
}
function getData(){
    var url = "http://margaretekoenen.com/lottery.php";
    url += "?num=" + document.getElementById("num").value;
    url += "&max=" + document.getElementById("maxValue").value;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}
function processResponse()
{
    console.log(xmlhttp.readyState + " " + xmlhttp.status);
    if(xmlhttp.readyState ==4 && xmlhttp.status == 200)
    {
        //We've got a response from the server
        document.getElementById('result').innerHTML = xmlhttp.responseText;
    } else
    {
        // Indicate a waiting condition to the user
        document.getElementById('result').innerHTML = "<strong>Waiting</strong>";
    }
}*/

function initialize() {   /*document.getElementById("btnGetData").addEventListener("click", getData, false);*/
    
    /*initialize*/
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = dataReturn;
    xmlhttp.open("GET", "http://margaretekoenen.com/wp-json/posts/1092", true);
    xmlhttp.send();
}
/*function getData(){*/
    /*xmlhttp.open("GET", "http://margaretekoenen.com/json.php", true);*/
    /*xmlhttp.open("GET", "http://margaretekoenen.com/wp-json/posts/1092", true);
    xmlhttp.send();
}*/
function dataReturn()  {
    if(xmlhttp.readyState ==4 && xmlhttp.status == 200) {
        //We've got a response from the server
       var jsonResponse = xmlhttp.responseText;
       jsonResponse = eval("(" + jsonResponse + ")");
       var output = "";
       output += "<h2>" + jsonResponse.title + "</h2><br />";
       output += jsonResponse.content + "<br />";
       output += "author: " + jsonResponse.author.name + "<br ?>";
       output += "<img style=\"width:75px;\" src=\"" + jsonResponse.author.avatar + "\" /><br ?>";

       /*document.getElementById("result").innerHTML = output;*/
       document.getElementById("result").innerHTML = output;
    } else {
        // Indicate a waiting condition to the user
        document.getElementById('result').innerHTML = "<strong>Waiting</strong>";
    }
}