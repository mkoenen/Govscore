/* Results -----------------*/

/*Questions 1, 2, 5, 8, 10 and 13 are based on the practice of cultivating accountability.
Questions 11, 14 and 22 are based on the practice of engaging stakeholders.
Questions 6, 7, 12 and 16 are based on the practice of setting shared strategic direction.
Questions 3, 4, 17, 21, 23 and 25 are based on the practice of stewarding resources.
Questions 9, 15, 18, 19, 20 and 24 are based on the practice of continuous governance enhancement.*/

var accScore, stakeScore, dirScore, resScore, enhanceScore

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
    
    function compareNumbers(a, b) {
        return a - b;
    }

    percentArray.sort(compareNumbers);
    alert("sorted Array : " + percentArray);
    if(percentArray[0]==percentArray[1] || percentArray[1] == percentArray[2]){
        var weakest = percentArray.slice(0,2);
    }else{
        var weakest = percentArray.slice(0,1);
    }
    alert(weakest);

    var eval = "<p>According to your assessment your Organization scores as follows: </p>";

    eval += "<h2>Cultivating Accountability</h2><p>Your organization scored " + accScore + " out of a possible " + accPossible + " points. This means that the organization achieved " + accPercent + "%.</p>";
    eval += "<h2>Engaging Stakeholders</h2><p>Your organization scored " + stakeScore + " out of a possible " + stakePossible + " points. This means that the organization achieved " + stakePercent + "%.</p>";
    eval += "<h2>Shared Strategic Direction</h2><p>Your organization scored " + dirScore + " out of a possible " + dirPossible + " points. This means that the organization achieved " + dirPercent + "%.</p>";
    eval += "<h2>Stewarding Resources</h2><p>Your organization scored " + resScore + " out of a possible " + resPossible + " points. This means that the organization achieved " + resPossible + "%.</p>";
    eval += "<h2>Continuous Governance Enhancement</h2><p>Your organization scored " + enhScore + " out of a possible " + enhPossible + " points. This means that the organization achieved " + enhPossible + "%.</p>";
    eval += "<h2>Recommendation</h2><p>The areas that your organization should focus on are, in order,</p>"

   for (i = 0; i < weakest.length; i++){
    eval += "<h3>" + weakest[i] + "</h3>;
   }

    //alert("eval is " + eval);
    document.getElementById('gs-results').innerHTML = eval;

}
