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
        url += "&first=" + document.getElementById("first").value;
        url += "&last=" + document.getElementById("last").value;
        url += "&email=" + document.getElementById("email").value;
        url += "&answer1=" + answer1;
        url += "&answer2=" + answer2;
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        console.log(cdate);
        console.log(document.getElementById("first").value);
        console.log(document.getElementById("last").value);
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
    var first = document.getElementById("first").value;
    var last = document.getElementById("last").value;
    var email = document.getElementById("email").value;
    

    window.localStorage.setItem("date", cdate);
    window.localStorage.setItem("first", first);
    window.localStorage.setItem("last", last);
    window.localStorage.setItem("email", email);

    /*window.sessionStorage.setItem("first", first);
    window.sessionStorage.setItem("last", last);
    window.sessionStorage.setItem("email", email);*/
    console.log(cdate);
    console.log(document.getElementById("first").value);
    console.log(document.getElementById("last").value);
    console.log(document.getElementById("email").value);
  
}

function retrieveData(){
    var cdate = window.localStorage.getItem("date");
    var first = window.localStorage.getItem("first");
    var last = window.localStorage.getItem("last");
    var email = window.localStorage.getItem("email");

    /*var first = window.sessionStorage.getItem("first");
    var last = window.sessionStorage.getItem("last");
    var email = window.sessionStorage.getItem("email");*/

    var output = "Date: " + cdate + "<br />First: " + first + "<br />Last: " + last + "<br />Email: " + email + "<br />";
    document.getElementById("retrieveData").innerHTML = output;
}

/*save when back online----------------------------------*/

function backOnline(){
    /*calling serverResponse function defined above*/
    if (!savedAlready) {
        
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = serverResponse;
        
        var cdate = window.localStorage.getItem("date");
        var first = window.localStorage.getItem("first");
        var last = window.localStorage.getItem("last");
        var email = window.localStorage.getItem("email");

        var cdate = new Date();
        var url ="http://margaretekoenen.com/store.php?date=cdate";
        url += "&first=" + document.getElementById("first").value;
        url += "&last=" + document.getElementById("last").value;
        url += "&email=" + document.getElementById("email").value;
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        console.log(cdate);
        console.log(document.getElementById("first").value);
        console.log(document.getElementById("last").value);
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