const score = document.querySelector('.Score');
const startscreen = document.querySelector('.StartScreen');
const gamearea = document.querySelector('.GameArea');
let player = { speed: 5, score: 0, health: 100, fuel: 100 };
let highest = 0;
var collisionSound = new Audio('menuMusic.mp3');
        startscreen.addEventListener('click', start);

        let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        function keyDown(ev) {
            ev.preventDefault();
            keys[ev.key] = true;
        }

        function keyUp(ev) {
            ev.preventDefault();
            keys[ev.key] = false;
        }

        function isCollide(a, b) {
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();
            return !(
                aRect.bottom < bRect.top ||
                aRect.top > bRect.bottom ||
                aRect.right < bRect.left ||
                aRect.left > bRect.right
            );

        }

        function moveLines() {
            let lines = document.querySelectorAll('.lines');
            lines.forEach(function (item) {
                if (item.y >= 700) {
                    item.y -= 750;
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            });
        }
        function moveLines2() {
            let lines2 = document.querySelectorAll('.lines2');
            lines2.forEach(function (item) {
                if (item.y >= 700) {
                    item.y -= 750;
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            });
        }
        function moveLinesRight() {
            let rightlines = document.querySelectorAll('.rightline');
            rightlines.forEach(function (item) {
                if (item.y >= 700) {
                    item.y -= 750;
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            });
        }
        function moveLinesLeft() {
            let leftlines = document.querySelectorAll('.leftline');
            leftlines.forEach(function (item) {
                if (item.y >= 700) {
                    item.y -= 750;
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            });
        }
        function endGame() {
            player.start = false;
            startscreen.classList.remove('hide');
            startscreen.innerHTML = "Game Over<br>Click to Restart";
        
        
            setTimeout(function() {
                collisionSound.play();
            }, 3000);
        
            var gameSound = document.getElementById('gameSound');
            gameSound.pause();
        }
        
    
        

function moveCar(car) {
    let other = document.querySelectorAll('.other');
    other.forEach(function (item) {
        if (isCollide(car, item)) {
            player.health -= 4; // Reduce health by 5 instead of 10

            if (player.health <= 0) {
                console.log('Game Over');
                var collisionSound = new Audio('gameover.mp3');
            collisionSound.play();
                endGame();
            }
            updateHealthBar();
        }
                if (item.y >= 750) {
                    item.y = -300;
                    item.style.left = Math.floor(Math.random() * 800) + 'px';
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            });
        }

        function moveFuel(fuel) {
    if (isCollide(player.car, fuel)) {
        player.fuel += 5;
        if (player.fuel > 100) {
            player.fuel = 100;
        }
        fuel.y = -300;
        fuel.style.left = Math.floor(Math.random() * 800) + 'px';
        updateFuelPercentage();
    }
    if (fuel.y >= 750) {
        fuel.y = -300;
        fuel.style.left = Math.floor(Math.random() * 800) + 'px';
        player.fuel -= 10; // Reduce fuel percentage if the car misses the fuel element
        if (player.fuel <= 0) {
            player.fuel = 0;
            endGame(); // Stop the game if fuel reaches 0%
        }
        updateFuelPercentage();
    }
    fuel.y += player.speed;
    fuel.style.top = fuel.y + 'px';
}
function updateFuelPercentage() {
  const fuelPercentage = document.querySelector('.fuel-percentage');
  if (fuelPercentage) {
    fuelPercentage.textContent = 'Fuel: ' + player.fuel + '%';
  }
}
        function moveRepairKit(repairKit) {
            if (isCollide(player.car, repairKit)) {
                player.health = 100;
                repairKit.y = -300;
                repairKit.style.left = Math.floor(Math.random() * 800) + 'px';
                updateHealthBar();
            }
            if (repairKit.y >= 750) {
                repairKit.y = -300;
                repairKit.style.left = Math.floor(Math.random() * 800) + 'px';
            }
            repairKit.y += player.speed;
            repairKit.style.top = repairKit.y + 'px';
        }

        function updateHealthBar() {
            const healthBar = document.querySelector('.health-bar');
            healthBar.style.width = player.health + '%';
            if (player.health <= 25) {
                healthBar.style.backgroundColor = 'red';
            } else if (player.health <= 50) {
                healthBar.style.backgroundColor = 'orange';
            } else {
                healthBar.style.backgroundColor = 'green';
            }
        }

        function gamePlay() {
            let car = document.querySelector('.car');
            let road = gamearea.getBoundingClientRect();

            if (player.start) {
                moveLines();
                moveLines2();
                moveLinesRight();
                moveLinesLeft();
                moveCar(car);
                if (keys.ArrowUp && player.y > road.top + 20) {
                    player.y -= player.speed;
                }
                if (keys.ArrowDown && player.y < road.bottom - 100) {
                    player.y += player.speed;
                }
                if (keys.ArrowLeft && player.x > 0) {
                    player.x -= player.speed;
                }
                if (keys.ArrowRight && player.x < road.width - 60) {
                    player.x += player.speed;
                }

                car.style.top = player.y + 'px';
                car.style.left = player.x + 'px';

                let fuel = document.querySelector('.fuel');
                moveFuel(fuel);

                let repairKit = document.querySelector('.repair-kit');
                moveRepairKit(repairKit);

                window.requestAnimationFrame(gamePlay);
                player.score++;
                if (player.score >= highest) {
                    highest = player.score;
                }
                score.innerHTML = 'Your Score: ' + player.score + '<br><br>' + 'Highest Score: ' + highest;
            }
        }

        function Reset() {
            highest = 0;
        }

        function start() {
            startscreen.classList.add('hide');
            gamearea.innerHTML = '';
            player.start = true;
    player.score = 0;
    player.health = 100;
    player.fuel = 100;

            window.requestAnimationFrame(gamePlay);
            collisionSound.pause();
            var gameSound = document.getElementById('gameSound');
            gameSound.play();

            for (x = 0; x < 5; x++) {
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'lines');
                roadline.y = x * 150;
                roadline.style.top = roadline.y + 'px';
                gamearea.appendChild(roadline);
            }
            for (x = 0; x < 5; x++) {
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'lines2');
                roadline.y = x * 150;

                roadline.style.top = roadline.y + 'px';
                gamearea.appendChild(roadline);
            }
            for (x = 0; x < 1; x++) {
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'leftline');
                roadline.style.top = roadline.y + 'px';
                gamearea.appendChild(roadline);
            }      
              for (x = 0; x < 1; x++) {
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'rightline');
                roadline.style.top = roadline.y + 'px';
                gamearea.appendChild(roadline);
            }
            let car = document.createElement('div');
            car.setAttribute('class', 'car');
            gamearea.appendChild(car);
            player.car = car;

            player.x = car.offsetLeft;
            player.y = car.offsetTop;

            for (x = 0; x < 10; x++) {
                let othercar = document.createElement('div');
                othercar.setAttribute('class', 'other');
                othercar.y = (x + 1) * 350 * -1;
                othercar.style.top = othercar.y + 'px';
                othercar.style.left = Math.floor(Math.random() * 350) + 'px';
                gamearea.appendChild(othercar);
            }

            let fuel = document.createElement('div');
            fuel.setAttribute('class', 'fuel');
            gamearea.appendChild(fuel);

            let repairKit = document.createElement('div');
            repairKit.setAttribute('class', 'repair-kit');
            gamearea.appendChild(repairKit);

            let healthBar = document.createElement('div');
            healthBar.setAttribute('class', 'health-bar');
            gamearea.appendChild(healthBar);
            updateFuelPercentage();
            
        }