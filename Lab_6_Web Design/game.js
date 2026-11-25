/*
Funtion in this file :
startGame()             : read the name, welcome the player, start the game
getComputerChoice()     : pick a random choice from the array
playRound(playerChoice) : play one round and update everything
showSummary()           : count wins with a for loop and show the percentage
resetGame()             : clear scores, result array, history and message
 */

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let gameStarted = false;
let playerName = "";
let roundNumber = 0;
const validChoice = ["rock", "paper", "scissors"]
const results = [];

/* startGame(): baca name; kalau kosong alert + return. Kalau tidak,
   tampilkan "Welcome, <name>!" via innerHTML, tunjukkan tanggal/waktu via
   Date() di startTime, lalu set gameStarted = true. */
function startGame(){
    playerName = document.getElementById("playerName").value;

    if (playerName == ""){
        alert("Please enter your name.");
        return
    }

    document.getElementById("result").innerHTML="Welcome " + playerName + " !";

    document.getElementById("startTime").innerHTML = "Game started on : " + new Date().toLocaleDateString();

    gameStarted = true;
}

/* getComputerChoice(): pakai array validChoice dan
   Math.floor(Math.random() * 3) untuk ambil acak satu pilihan. */
function getComputerChoice(){
    const choice = validChoice[Math.floor(Math.random()*3)];
    return choice;
}

/* playRound(playerChoice): kalau belum start, alert. Selebihnya: dapat
   computerChoice, tentukan Draw/Win/Lose via if...else, ganti src gambar
   player & computer, tampilkan result + warna, update scoreboard, push ke
   results array, tambah baris ke history via innerHTML += */
function playRound(playerChoice){
    if (!gameStarted){
        alert("Click Start Game First.")
        return;
    }

    const computerChoice = getComputerChoice();

    let result;

    if(playerChoice == computerChoice){
        result = "Draw";
    }else if(
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ){
        result = "Win";
    }else{
        result = "Lose"
    }

    document.getElementById("playerImage").src = playerChoice + ".png";
    document.getElementById("computerImage").src = computerChoice + ".png";

    const resultEl = document.getElementById("result");
    resultEl.innerHTML = result;
    if(result == "Win"){
        resultEl.style.color = "green";
    } else if (result == "Lose"){
        resultEl.style.color = "red";
    } else {
        resultEl.style.color = "grey"
    }

      if (result === "Win") {
        playerScore += 1;
    document.getElementById("wins").textContent = playerScore;
    } else if (result === "Lose") {
        computerScore += 1;
        document.getElementById("losses").textContent = computerScore;
    } else {
        drawScore += 1;
        document.getElementById("draw").textContent = drawScore;
    }

    results.push(result);

    roundNumber += 1;
    document.getElementById("historyBody").innerHTML +=
    "<tr><td>" + roundNumber + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + result + "</td></tr>";
}

/* showSummary(): for loop over results array hitung wins, lalu tampilkan
   jumlah round dan persen yang dibulatkan Math.round(). */
function showSummary(){
    let wins = 0;
    for(let i = 0; i < results.length; i++){
        if (results[i] === "Win"){
            wins += 1;
        }
    }

    const round = results.length;

    let winPercent = 0;
    if (round > 0){
        winPercent = Math.round ((wins / round) * 100);
    }

    document.getElementById("result").innerHTML = "You played " + round + " rounds and won " + winPercent + "%.";
}

/* resetGame(): set scores balik ke 0, kosongkan results array, clear
   history rows dan result message. */
function resetGame(){
        playerScore = 0;
        computerScore = 0;
        drawScore = 0;
        roundNumber = 0;
        document.getElementById("wins").textContent = 0;
        document.getElementById ("losses").textContent = 0;
        document.getElementById("draw").textContent = 0;
        

        results.length = 0;

        document.getElementById("historyBody").innerHTML = "";

        document.getElementById("result").innerHTML = "";
}