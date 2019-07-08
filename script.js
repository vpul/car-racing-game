const canvas = document.querySelector('canvas');

canvas.width = 400;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

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

skybox.onload = () => {
    let y = 0;
    const drawRoad = () => {
        ctx.drawImage(skybox, 0, y - canvas.height, canvas.width, canvas.height * 2);
        //ctx.drawImage(skybox, 0, y, canvas.width, canvas.height);
        y += 5;
        //Reset road position
        if (y >= canvas.height) {
            y = 0;
        }
        window.requestAnimationFrame(drawRoad);
    }
    drawRoad();
};

let playerVehiclePosition = (canvas.width - playerVehicle.width) / 2;
const drawplayerVehicle = () => {
    ctx.drawImage(playerVehicle, playerVehiclePosition, canvas.height - playerVehicle.height);
    window.requestAnimationFrame(drawplayerVehicle);
}

playerVehicle.onload = () => {
    drawplayerVehicle();
};

let incommingVehicle = new Image();
incommingVehicle.src = randomVehicle();

let incommingVehiclePosX = [12, 70, 210][Math.floor(Math.random() * 3)];
let incommingVehiclePosY = -incommingVehicle.height;

incommingVehicle.onload = () => {
    const drawIncommingVehicle = () => {
        ctx.drawImage(incommingVehicle, incommingVehiclePosX, incommingVehiclePosY);
        incommingVehiclePosY += 2;
        if (incommingVehiclePosY >= canvas.height) {
            // incommingVehicle.src = randomVehicle();
            incommingVehiclePosX = [0, 70, 210][Math.floor(Math.random() * 3)];
            incommingVehiclePosY = -incommingVehicle.height;

        }
        window.requestAnimationFrame(drawIncommingVehicle);
    }
    drawIncommingVehicle();
};


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' && playerVehiclePosition >= 0) {
        playerVehiclePosition -= 4;
    } else if (e.code === 'ArrowRight' && playerVehiclePosition < canvas.width-playerVehicle.width) {
        playerVehiclePosition += 4;
    }
});

