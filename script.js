const canvas = document.querySelector('canvas');
const scoreElement = document.querySelector('#score span');

canvas.width = 400;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let pause = false;
let score = 0;
let keyspeed = 12;

const skybox = new Image();
skybox.src = 'assets/road.png';

const vehicles = [
    'assets/Ambulance.png',
    'assets/Audi.png',
    'assets/Black_viper.png',
    'assets/Car.png',
    'assets/Mini_truck.png',
    'assets/Mini_van.png',
    'assets/Police.png',
    'assets/truck.png',
    'assets/taxi.png'
];

const randomVehicle = () => vehicles[Math.floor(Math.random() * vehicles.length)];

const gameOver = () => {
    pause = true;
    swal("Game Over!", `Your score is ${score}!`, "error")
        .then(() => {
            window.location.reload();
        });
}

const playerVehicle = new Image();
playerVehicle.src = randomVehicle();

let skyboxPosY = 0;
skybox.onload = () => {
    const drawRoad = () => {
        ctx.drawImage(skybox, 0, skyboxPosY - canvas.height, canvas.width, canvas.height * 2);
        //ctx.drawImage(skybox, 0, skyboxPosY, canvas.width, canvas.height);
        skyboxPosY += 10;
        //Reset road position
        if (skyboxPosY >= canvas.height) {
            skyboxPosY = 0;
        }
        if (pause) return;
        window.requestAnimationFrame(drawRoad);
    }
    drawRoad();
};

let incommingVehicle = new Image();
incommingVehicle.src = randomVehicle();

let incommingVehiclePosX = [12, 145, 285][Math.floor(Math.random() * 3)];
let incommingVehiclePosY = -incommingVehicle.height;

incommingVehicle.onload = () => {
    const drawIncommingVehicle = () => {
        ctx.drawImage(incommingVehicle, incommingVehiclePosX, incommingVehiclePosY);
        if (pause) return;
        incommingVehiclePosY += 2;
        if (incommingVehiclePosY >= canvas.height) {
            scoreElement.innerHTML = ++score;
            keyspeed+= 15;
            incommingVehicle.src = randomVehicle();
            incommingVehiclePosX = [12, 145, 285][Math.floor(Math.random() * 3)];
            incommingVehiclePosY = -incommingVehicle.height;
        } else if (incommingVehiclePosY + incommingVehicle.height > playerVehiclePositionY) {
            if (playerVehiclePositionX > incommingVehiclePosX && playerVehiclePositionX < incommingVehiclePosX + incommingVehicle.width || playerVehiclePositionX + playerVehicle.width > incommingVehiclePosX && playerVehiclePositionX + playerVehicle.width < incommingVehiclePosX + incommingVehicle.width) {
                gameOver();
            } else if (incommingVehiclePosX > playerVehiclePositionX && incommingVehiclePosX < playerVehiclePositionX + playerVehicle.width || incommingVehiclePosX + incommingVehicle.width > playerVehiclePositionX && incommingVehiclePosX + incommingVehicle.width < playerVehiclePositionX + playerVehicle.width) {
                gameOver();
            }
        }
        window.requestAnimationFrame(drawIncommingVehicle);
    }
    drawIncommingVehicle();
};

let playerVehiclePositionX, playerVehiclePositionY;

playerVehicle.onload = () => {
    playerVehiclePositionX = (canvas.width - playerVehicle.width) / 2;
    playerVehiclePositionY = canvas.height - playerVehicle.height;
    const drawplayerVehicle = () => {
        ctx.drawImage(playerVehicle, playerVehiclePositionX, playerVehiclePositionY);
        if (pause) return;
        window.requestAnimationFrame(drawplayerVehicle);
    }
    drawplayerVehicle();
};


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' && playerVehiclePositionX >= 0) {
        if (playerVehiclePositionX-keyspeed < 0) {
            playerVehiclePositionX = 0;
        } else {
            playerVehiclePositionX -= keyspeed;
        }
    } else if (e.code === 'ArrowRight' && playerVehiclePositionX < canvas.width-playerVehicle.width) {
        if (playerVehiclePositionX + keyspeed > canvas.width - playerVehicle.width) {
            playerVehiclePositionX = canvas.width - playerVehicle.width;
        } else {
            playerVehiclePositionX += keyspeed;
        }
    } else if (e.code === 'Space') {
        skyboxPosY+=15;
        incommingVehiclePosY += 10;
    }
});

