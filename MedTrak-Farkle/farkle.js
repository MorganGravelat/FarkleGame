let diceArr = [];
let scoringDice = [];
let turn = 0;
let roll = 0;
let total = 0;
let flag = false;
let banked = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
        diceArr[i].locked = 0;
	}
    rollDice();
    // console.log(diceArr, 'This is the Dice Array of Objects after Initialization');
}
 // dice 1 = diceArr[0] = {id: 'die01', value: 1, clicked: 0}

/*Rolling dice values*/
function rollDice(){
    for (let i = 0; i < diceArr.length; i++) {
        let dice = diceArr[i]
        if (dice.clicked) {
            dice.locked = 1; //applying a lock to the dice if clicked
        }
        // console.log(dice, 'dice ele in roll dice first for loop')
    }
	for(var i=0; i < diceArr.length; i++){
        let dice = diceArr[i]
		if(!diceArr[i].clicked && !dice.locked){
            diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
        // console.log(dice, 'dice ele in roll dice second for loop')
	}

	updateDiceImg();

    if (banked) {
        let ImageArr = document.getElementsByClassName("transparent");
        let ImageArr2 = [...ImageArr]
        for (let i = 0; i < ImageArr2.length; i++) {
            ImageArr2[i].classList.toggle("transparent");
            console.log("if banked toggle", ImageArr2)
            ImageArr2[i].removeAttribute('class');
        }
        banked = 0;
        // console.log(banked, 'banked text number');
    }

    turn += roll;
    roll = 0;




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
        // console.log('Transparent Change');
	    img.classList.toggle("transparent");
        console.log("if transparent toggle")
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

        if (die.clicked && !die.locked) {
            if (seen[dieValue]) seen[dieValue]++;
            else seen[dieValue] = 1;
        }
    }

    for (let dieVal in seen) {
        let count = seen[dieVal]
        if (count >= 3) {
            if (dieVal == 1) tempScore += 1000 * (count - 2)
            else tempScore += dieVal * 100 * (count - 2)
        }
        else if (dieVal == 1) {
            tempScore += count * 100
        }
        else if (dieVal == 5) {
            tempScore += count * 50
        }
        else {
            flag = true;
        }
    }
    roll = tempScore;
    document.getElementById('scoreCountTurn').innerHTML = (turn + roll)
    if (flag) {
        document.getElementById('rollDice').setAttribute('disabled', '')
        document.getElementById('bankScore').setAttribute('disabled', '')
        console.log("if flag disabled true")
    }
    else {
        document.getElementById('rollDice').removeAttribute('disabled');
        document.getElementById('bankScore').removeAttribute('disabled');
        console.log("else flag disabled false")
    }

}

function isFarkle() {
    let seen = {}
    let tempScore = 0;
    for (let i = 0; i < diceArr.length; i++) {
        let die = diceArr[i]
        let dieValue = die.value

        if (!die.locked) {
            if (seen[dieValue]) seen[dieValue]++
            else seen[dieValue] = 1
        }
    }

    for (let dieVal in seen) {
        let count = seen[dieVal]
        if (count >= 3) {
            if (dieVal == 1) {
                tempScore += 1000 * (count - 2);
                scoringDice.push(dieVal);
            }
            else {
                tempScore += dieVal * 100 * (count - 2);
                scoringDice.push(dieVal);
            }
        }
        else if (dieVal == 1) {
            tempScore += count * 100;
            scoringDice.push(dieVal);
        }
        else if (dieVal == 5) {
            tempScore += count * 50;
            scoringDice.push(dieVal);
        }
        else {
            flag = true;
        }
    }
    return tempScore
}

function bankScore() {
    total += turn + roll;
    turn = 0;
    roll = 0;
    document.getElementById('scoreCountTurn').innerHTML = turn;
    document.getElementById('scoreCountTotal').innerHTML = total;
    for (let i = 0; i < diceArr.length; i++) {
        let dice = diceArr[i];
        if (dice.clicked) document.getElementById(`die${dice.value}`).classList.toggle("transparent");
        diceArr[i].clicked = 0;
        diceArr[i].locked = 0;
    }
    // console.log(diceArr, 'This is bank score dice arr after the fact');
    banked = 1;
    calculateScore();
    rollDice();
    //rollDice();
    // let ImageArr = document.getElementsByClassName("transparent");
    // for (let i = 0; i < ImageArr.length; i++) {
    //     ImageArr[i].classList.toggle("transparent");
    //     console.log("for loop toggle")
    //     ImageArr[i].removeAttribute('class');
    // }
}
