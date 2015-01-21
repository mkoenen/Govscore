/*Questions 1, 2, 5, 8, 10 and 13 are based on the practice of cultivating accountability.
Questions 11, 14 and 22 are based on the practice of engaging stakeholders.
Questions 6, 7, 12 and 16 are based on the practice of setting shared strategic direction.
Questions 3, 4, 17, 21, 23 and 25 are based on the practice of stewarding resources.
Questions 9, 15, 18, 19, 20 and 24 are based on the practice of continuous governance enhancement.*/

var accScore, stakeScore, dirScore, resScore, enhanceScore

//add up the numbers
function calcResults(){
	accScore = g1+g2+g5+g8+g10+g13;
	var accPossible = 24;
	stakeScore = g11+g14+g22;
	var stakePossible = 12;
	dirScore = g6+g7+g12+g16;
	var dirPossible = 16;
	resScore = g3+g4+g17+g21+g23+g25;
	var resPossible = 24;
	enhanceScore = g9+g15+g18+g19+g20+g24;
	var enhPossible = 24;

	var eval = "<p>According to your assessment your Organization scores as follows: </p>";

	eval += "<table><tr><th>Practice Area</th><th>Points</th><Out Of</th>Percent</th></tr>";
	eval += "<tr><td>Cultivating Accountability</td><td>" + accScore + "</td><td>" + accPossible + "</td><td>" + accScore/accPossible*100 + "</td></tr>";
	eval += "<tr><td>Engaging Stakeholders</td><td>" + stakeScore + "</td><td>" + stakePossible + "</td><td>" + stakeScore/stakePossible*100 + "</td></tr>";
	eval += "<tr><td>Shared Strategic Direction</td><td>" + dirScore + "</td><td>" + dirPossile + "</td><td>" + dirScore/dirPossible*100 + "</td></tr>";
	eval += "<tr><td>Stewarding Resources</td><td>" + resScore + "</td><td>" + resPossile + "</td><td>" + resScore/resPossible*100 + "</td></tr>";
	eval += "<tr><td>Continuous Governance Enhancement</td><td>" + enhScore + "</td><td>" + enhPossile + "</td><td>" + enhScore/enhPossible*100 + "</td></tr></table>";

	document.getElementById('gs-results').innerHTML = eval;

}

//display the result