let canvas = document.querySelector('canvas');

// innerWidth sets object to entire screen width, vice versa with Height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//x, y, width, height
// fillRect = Creates a rectangle
// fillStyle - Colors the rect, all rect after fill fil take on the color

/* c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0, 255, 0, 1.0)';
c.fillRect(400, 100, 100, 100);
c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(300, 300, 100, 100);

console.log('canvas'); */

// Line

/*c.beginPath(); // All path will link to eachother, so always put a new c.beginPath() before a new path
c.moveTo(200, 150);
c.lineTo(450, 150);
c.lineTo(450, 350);
c.lineTo(400, 350);
c.strokeStyle = "teal";
c.stroke();

// Arc / Circle


/* c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'violet';
c.stroke(); */

/* for (let i = 0; i < 50; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "rgba(" + 
        Math.random() * 255 + "," + // Randomly generated brightness for color red 
        Math.random() * 255 + "," + // Randomly generated brightness for color green 
        Math.random() * 255 + "," + // Randomly generated brightness for color blue
        Math.random() + ")";        // Randomly generated transparency for alpha
    c.stroke();
}  */

let mouse = {
    x: undefined,
    y: undefined
};

let maxRadius = 40;
let minRadius = 2;

let colorArray = [
    '#042940',
    '#005C53',
    '#9FC131',
    '#DBF227',
    '#D6D58E'
];

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    })

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 

    init
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        };
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        };
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

};

let circleArray = [];

function init() {

    circleArray = [];


    for (let i = 0; i < 1000; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
};
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); // clear canvas each time you drawn ontop of it.

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    };

};

animate();
init();