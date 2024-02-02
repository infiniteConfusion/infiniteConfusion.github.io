const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const div = document.getElementById('div1')
const firstTrans = document.getElementById('trans');
const sorry = document.getElementById('message')
const lgt = document.getElementById('logo')

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();

    }
    #initialize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 10;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){ 
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        c.fillStyle = 'rgba(0, 0, 0, 0.07)';
        c.textAlign = 'center';
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = 'gray';  
        c.font = effect.fontSize/2 + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(c));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

function startAnimation(){
    trans.style.opacity = 0; 
    trans.disabled = true;
    sorry.style.display = 'block';
    sorry.style.opacity = 0;
    const fadeInterval = setInterval(() => {
        if (sorry.style.opacity < 1) {
            sorry.style.opacity = parseFloat(sorry.style.opacity) + 0.01;
        } else {
            clearInterval(fadeInterval);
        }
    }, 10);

    lgt.style.display = 'block';
    lgt.style.opacity = 0;
    const fadeInter = setInterval(() => {
        if (lgt.style.opacity < 1) {
            lgt.style.opacity = parseFloat(lgt.style.opacity) + 0.01;
        } else {
            clearInterval(fadeInter);
        }
    }, 10);
    requestAnimationFrame(animate);
}
trans.addEventListener('click', () => {
    startAnimation();
});