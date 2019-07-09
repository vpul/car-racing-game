const canvas = document.querySelector('canvas');

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

let playerVehiclePosition = (canvas.width - playerVehicle.width) / 2;
const playerVehiclePositionY = canvas.height - playerVehicle.height

playerVehicle.onload = () => {
    const drawplayerVehicle = () => {
        ctx.drawImage(playerVehicle, playerVehiclePosition, playerVehiclePositionY);
        if (pause) return;
        window.requestAnimationFrame(drawplayerVehicle);
    }
    drawplayerVehicle();
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
            score++;
            keyspeed+= 15;
            incommingVehicle.src = randomVehicle();
            incommingVehiclePosX = [12, 145, 285][Math.floor(Math.random() * 3)];
            incommingVehiclePosY = -incommingVehicle.height;
        } else if (incommingVehiclePosY + incommingVehicle.height > playerVehiclePositionY) {
            if (playerVehiclePosition > incommingVehiclePosX && playerVehiclePosition < incommingVehiclePosX + incommingVehicle.width || playerVehiclePosition + playerVehicle.width > incommingVehiclePosX && playerVehiclePosition + playerVehicle.width < incommingVehiclePosX + incommingVehicle.width) {
                pause = true;
                swal("Game Over!", `Your score is ${score}!`, "error")
                .then(() => {
                    window.location.reload();
                });
            }
        }
        
        window.requestAnimationFrame(drawIncommingVehicle);
    }
    drawIncommingVehicle();
};


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' && playerVehiclePosition >= 0) {
        playerVehiclePosition -= keyspeed;
    } else if (e.code === 'ArrowRight' && playerVehiclePosition < canvas.width-playerVehicle.width) {
        playerVehiclePosition += keyspeed;
    } else if (e.code === 'Space') {
        skyboxPosY+=15;
        incommingVehiclePosY += 10;
    }
});

