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

const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];

const drivingVehicle = new Image();
drivingVehicle.src = randomVehicle;

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

let positionX = (canvas.width - drivingVehicle.width) / 2;
const drawDrivingVehicle = () => {
    console.log(positionX);
    ctx.drawImage(drivingVehicle, positionX, canvas.height - drivingVehicle.height);
    window.requestAnimationFrame(drawDrivingVehicle);
}

drivingVehicle.onload = () => {
    drawDrivingVehicle();
};


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' && positionX >= -66) {
        positionX -= 6;
    } else if (e.code === 'ArrowRight' && positionX < 222) {
        positionX += 6;
    }
});

