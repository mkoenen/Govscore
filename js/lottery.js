var xmlhttp;
            
            window.onload = function()
            {
                document.addEventListener("deviceready", init, false);
            }
            
            function init()
            {
                var url = "http://margaretekoenen.com/lottery.php";
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = processResponse;
                xmlhttp.open("GET", url, true);
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
            }