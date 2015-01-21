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

    //alert(g1);
    //alert("parseInt: " + parseInt(g1));
    accScore = parseInt(g1)+parseInt(g2)+parseInt(g5)+parseInt(g8)+parseInt(g10)+parseInt(g13);
    var accPossible = 24;
    stakeScore = parseInt(g11)+parseInt(g14)+parseInt(g22);
    var stakePossible = 12;
    dirScore = parseInt(g6)+parseInt(g7)+parseInt(g12)+parseInt(g16);
    var dirPossible = 16;
    resScore = parseInt(g3)+parseInt(g4)+parseInt(g17)+parseInt(g21)+parseInt(g23)+parseInt(g25);
    var resPossible = 24;
    enhScore = parseInt(g9)+parseInt(g15)+parseInt(g18)+parseInt(g19)+parseInt(g20)+parseInt(g24);
    var enhPossible = 24;
    //alert(accScore);

    var eval = "<p>According to your assessment your Organization scores as follows: </p>";

    eval += "<table><tr><th>Practice Area</th><th>Points</th><Out Of</th>Percent</th></tr>";
    eval += "<tr><td>Cultivating Accountability</td><td>" + accScore + "</td><td>" + accPossible + "</td><td>" + Math.round(accScore/accPossible*100) + "%</td></tr>";
    eval += "<tr><td>Engaging Stakeholders</td><td>" + stakeScore + "</td><td>" + stakePossible + "</td><td>" + Math.round(stakeScore/stakePossible*100) + "%</td></tr>";
    eval += "<tr><td>Shared Strategic Direction</td><td>" + dirScore + "</td><td>" + dirPossible + "</td><td>" + Math.round(dirScore/dirPossible*100) + "%</td></tr>";
    eval += "<tr><td>Stewarding Resources</td><td>" + resScore + "</td><td>" + resPossible + "</td><td>" + Math.round(resScore/resPossible*100) + "%</td></tr>";
    eval += "<tr><td>Continuous Governance Enhancement</td><td>" + enhScore + "</td><td>" + enhPossible + "</td><td>" + Math.round(enhScore/enhPossible*100) + "%</td></tr></table>";

    //alert("eval is " + eval);
    document.getElementById('gs-results').innerHTML = eval;

}
