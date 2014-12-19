 window.onload = function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("deviceready", onDeviceReady2, false);
}
                
function onDeviceReady() {
    var pageTwoBtn = document.getElementById('btnPageTwo');
    pageTwoBtn.addEventListener('click', goToPage2, false);
    var pageOneBtn = document.getElementById('btnPageOne');
    pageOneBtn.addEventListener('click', goToPage1, false);
}
                
function goToPage2(event) {
    alert(event.target.id);
    window.location = "second.html";
}

function goToPage1(event) {
    alert(event.target.id);
    window.location = "index.html";
}

//add numbers to slider
function onDeviceReady2() {
    document.getElementById("rating").addEventListener("change", function() {
        document.getElementById("sliderOut").innerHTML= document.getElementById("rating").value;
    }, false);
}

                