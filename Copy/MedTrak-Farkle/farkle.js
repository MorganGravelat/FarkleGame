let diceArr = [];
let turn = 0;
let total = 0;
let flag = false;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
        diceArr[i].locked = 0;
	}
}
 // dice 1 = diceArr[0] = {id: 'die01', value: 1, clicked: 0}

/*Rolling dice values*/
function rollDice(){
    for (let i = 0; i < diceArr.length; i++) {
        let dice = diceArr[i]
        if (dice.clicked) {
            dice.locked = 1;
        }
    }
	for(var i=0; i < 6; i++){
        let dice = diceArr[i]
		if(!diceArr[i].clicked && !dice.locked){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();

}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = `${"images/"}${diceArr[i].value}${".png"}`;
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");
    let dice = diceArr[i];
    if (dice.locked) return;
    let transparent = countDice(dice);

    if (transparent) {
        dice.clicked ? dice.clicked = 0 : dice.clicked = 1;

	    img.classList.toggle("transparent");
    }
    // else if (countDice(dice)) {

    // }
    calculateScore();

}


function countDice(dice) {
    if (dice.value === 5 || dice.value === 1) return true;
    let count = 0;

    for (let i = 0; i < diceArr.length; i++) {
        if (diceArr[i].value === dice.value) {
            count++;
        }
    }

    return count >= 3;

}

function calculateScore() {
    let seen = {}
    let tempScore = 0;
    flag = false;
    for (let i = 0; i < diceArr.length; i++) {
        let die = diceArr[i]
        let dieValue = die.value

        if (die.clicked) {
            if (seen[dieValue]) seen[dieValue]++
            else seen[dieValue] = 1
        }
    }

    for (let dieVal in seen) {
        console.log(dieVal);
        if (seen[dieVal] >= 3) {
            if (dieVal == 1) tempScore += 1000
            else tempScore += dieVal * 100
        }
        else if (dieVal == 1) {
            tempScore += seen[dieVal] * 100
        }
        else if (dieVal == 5) {
            tempScore += seen[dieVal] * 50
        }
        else {
            console.log('why here?')
            flag = true;
        }
    }
    turn = tempScore;
    console.log(seen, flag);
    document.getElementById('scoreCountTurn').innerHTML = turn
    if (flag) {
        document.getElementById('rollDice').setAttribute('disabled', '')
        document.getElementById('bankScore').setAttribute('disabled', '')
    }

}

function bankScore() {
    total += turn;
    turn = 0;
    document.getElementById('scoreCountTurn').innerHTML = turn;
    document.getElementById('scoreCountTotal').innerHTML = total;
    for (let i = 0; i < diceArr.length; i++) {
        let dice = diceArr[i];
        if (dice.clicked) document.getElementById(`die${dice.value}`).classList.toggle("transparent");
        dice.clicked = 0;
        dice.locked = 0;
        console.log(dice);
    }
    rollDice();
}






window.addEventListener('DOMContentLoaded', (event) => {
    initializeDice();
});
