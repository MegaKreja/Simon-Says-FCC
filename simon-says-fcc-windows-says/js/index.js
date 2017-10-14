window.onload = function() {
  document.getElementById("boot").play();
}
let sound1 = document.getElementById("sound1");
let sound2 = document.getElementById("sound2");
let sound3 = document.getElementById("sound3");
let sound4 = document.getElementById("sound4");
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let yellow = document.getElementById("yellow");
let start = document.getElementById("start");
let strict = document.getElementById("strict");
let tiles = document.querySelectorAll(".tiles");
let isItStrict = false;
let moves = 1;
let playerArr = [];
let computerArr = [];
let newArr = [0, 1, 2, 3];
let randomArr = [];
let indexComputer = 0;
let indexPlayer = 0;

function getRandomArr() {
  for(let i = 0; i < 20; i++) {
    randomArr.push(newArr[Math.floor(Math.random()*newArr.length)]);
  }
  return randomArr;
}

strict.addEventListener("click", function(){
  isItStrict = !isItStrict;
  if(!isItStrict) {
    strict.innerHTML = "STRICT IS OFF";
  } else {
    strict.innerHTML = "STRICT IS ON";
  }
});

red.addEventListener("click", function(){
  sound1.play();
});
green.addEventListener("click", function(){
  sound2.play();
});
blue.addEventListener("click", function(){
  sound3.play();
});
yellow.addEventListener("click", function(){
  sound4.play();
});

function reset() {
  playerArr = [];
  computerArr = [];
  randomArr = [];
  indexComputer = 0;
  indexPlayer = 0;
  moves = 1;
}

start.addEventListener("click", function(){
  reset();
  getRandomArr();
  computerMove();
});

// when moves increases number of index turn increases too
function computerMove() {
  // console.log(moves);
  display.innerHTML = moves;
  if(moves === 21) {
    alert("You win!!!");
    reset();
    getRandomArr();
    computerMove();
  }
  let computerFlash = setInterval(function(){
    if(tiles[0] === tiles[randomArr[indexComputer]]) {
      tiles[0].classList.add("light");
      sound1.play();
      setTimeout(function(){
        tiles[0].classList.remove("light");
      }, 500);
    }
    if(tiles[1] === tiles[randomArr[indexComputer]]) {
      tiles[1].classList.add("light");
      sound2.play();
      setTimeout(function(){
        tiles[1].classList.remove("light");
      }, 500);
    }
    if(tiles[2] === tiles[randomArr[indexComputer]]) {
      tiles[2].classList.add("light");
      sound3.play();
      setTimeout(function(){
        tiles[2].classList.remove("light");
      }, 500);
    }
    if(tiles[3] === tiles[randomArr[indexComputer]]) {
      tiles[3].classList.add("light");
      sound4.play();
      setTimeout(function(){
        tiles[3].classList.remove("light");
      }, 500);
    }
    indexComputer++;
    // console.log(indexComputer);
    if(indexComputer >= moves) {
      clearInterval(computerFlash);
      indexComputer = 0;
      playerMove();
    }
  }, 1000);
}

function playerMove() {
  computerArr = [];
  indexPlayer = 0;
  computerArr = randomArr.slice(0, moves);
  console.log(computerArr);
  for(let i = 0; i < tiles.length; i++) {
    tiles[i].onclick = function(){
      playerArr = [];
      playerArr.push(i);
      console.log(playerArr);
      if(computerArr[indexPlayer] !== playerArr[0] && strict.innerHTML === "STRICT IS OFF") {
        alert("Error 404!");
        computerMove();
      } else if(computerArr[indexPlayer] !== playerArr[0] && strict.innerHTML === "STRICT IS ON") {
        alert("Error 404!");
        reset();
        getRandomArr();
        computerMove();
      }
      if(computerArr[indexPlayer] === playerArr[0]) {
        indexPlayer++;
        console.log(indexPlayer);
      }
      if(indexPlayer === computerArr.length) {
        moves++;
        computerMove();
      }  
    };
  }
}