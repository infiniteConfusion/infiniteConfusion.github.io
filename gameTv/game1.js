document.addEventListener('DOMContentLoaded', function () {

    const gameCanvas = document.createElement('canvas');
    gameCanvas.id = 'gameCanvas'; 
    
    const screen2Div = document.getElementById('screen2');
    screen2Div.appendChild(gameCanvas);
    
    function updateCanvasSize() {
        gameCanvas.width = screen2Div.clientWidth;
        gameCanvas.height = screen2Div.clientHeight;
    }
    
    const ctx = gameCanvas.getContext('2d');
    
    function updateTimer() {
        if (time > 0) {
            time--;
            document.querySelector('#time').innerHTML = time;
        } else {
            clearInterval(timerInterval);
            console.log('Game Over!');
        }
    }
    
    function startGame() {
        console.log('Game Started!');
        decreaseTimer()
    }
    
    document.getElementById('startGM').addEventListener('click', function () {
        showGame('game2Div');
        updateCanvasSize(); 
        startGame();    
    });
    
    const gravity = 0.7
    
    class Sprite {
        constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
            this.position = position
            this.width = 50
            this.height = 150
            this.image = new Image()
            this.image.src = imageSrc
            this.scale = scale 
            this.framesMax = framesMax
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 5
            this.offset = offset
        }
    
        draw() {
            ctx.drawImage(
                this.image, 
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.offset.x, 
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
                )
        }
    
        animateFrames() {
            this.framesElapsed++
            if (this.framesElapsed % this.framesHold === 0 ){
    
            if (this.framesCurrent < this.framesMax - 1){ 
            this.framesCurrent++
            } else{
                this.framesCurrent = 0
            }}
        }
    
        update() {
            this.draw()
            this.animateFrames()
        }
    }
    
    class Fighter extends Sprite {
        constructor({
            position, 
            velocity, 
            color = 'red',  
            imageSrc, 
            scale = 1, 
            framesMax = 1,
            offset = { x: 0, y: 0},
            sprites,
            attackBox = { offset: {}, width: undefined, height: undefined }
        }) {
            super({
                position,  
                imageSrc,
                scale,
                framesMax, 
                offset 
            })    
    
            this.velocity = velocity
            this.width = 50
            this.height = 150
            this.lastKey
            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y 
                } ,
                offset: attackBox.offset,
                width: attackBox.width,
                height: attackBox.height 
            }
            this.color = color
            this.isAttacking
            this.health = 100
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 5
            this.sprites = sprites
            this.dead = false
    
            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }
        }    
        
        update() {
            this.draw()   
            if (!this.dead) this.animateFrames()  
    
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y
            this.position.x += this.velocity.x 
            this.position.y += this.velocity.y
    
            const groundHeight = canvas.height - 55;
            if (this.position.y + this.height + this.velocity.y >= groundHeight) {
            this.velocity.y = 0;
            this.position.y = groundHeight - this.height; 
            } else this.velocity.y += gravity;
        }
    
        attack() {
            this.switchSprite('Attack1') 
            this.isAttacking = true 
            }
    
        takeHit() {
            this.health -= 2.5
    
            if (this.health <= 0) {
                this.switchSprite('Death')
            } else this.switchSprite('takeHit') 
        }
    
        takeHits() {
            this.health -= 5
    
            if (this.health <= 0) {
                this.switchSprite('Death')
            } else this.switchSprite('takeHit') 
        }
    
        switchSprite(sprite) {
            if (this.image === this.sprites.Death.image ) {
                if (this.framesCurrent === this.sprites.Death.framesMax - 1)
                this.dead = true
                return}
    
            if (this.image === this.sprites.Attack1.image && 
                this.framesCurrent < this.sprites.Attack1.framesMax - 1 
                ) 
                return
    
            if (this.image === this.sprites.takeHit.image &&
                this.framesCurrent < this.sprites.takeHit.framesMax - 1
                )
                return
    
            switch (sprite) {
            case 'Idle':
                if (this.image !== this.sprites.Idle.image){
                this.image = this.sprites.Idle.image
                this.framesMax = this.sprites.Idle.framesMax
                this.framesCurrent = 0
                }
                break
            case 'Run':
                if (this.image !== this.sprites.Run.image){
                this.image = this.sprites.Run.image
                this.framesMax = this.sprites.Run.framesMax
                this.framesCurrent = 0
                }
                break
            case 'Jump':
                if (this.image !== this.sprites.Jump.image) {
                this.image = this.sprites.Jump.image
                this.framesMax = this.sprites.Jump.framesMax
                this.framesCurrent = 0
                }
                break
            case 'Fall':
                if (this.image !== this.sprites.Fall.image) {
                this.image = this.sprites.Fall.image
                this.framesMax = this.sprites.Fall.framesMax
                this.framesCurrent = 0
                }
                break
            case 'Attack1':
                if (this.image !== this.sprites.Attack1.image) {
                this.image = this.sprites.Attack1.image
                this.framesMax = this.sprites.Attack1.framesMax
                this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.framesCurrent = 0
                }
                break
            case 'Death':
                if (this.image !== this.sprites.Death.image) {
                this.image = this.sprites.Death.image
                this.framesMax = this.sprites.Death.framesMax
                this.framesCurrent = 0
                }                
                break    
            }
        }
    }
    
    const background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './backgroundOne.png'
    })
    
    const player = new Fighter({
        position: {
            x: 100,
            y: 360
        },
        velocity: {
            x: 0,
            y: 10
        },
        offset: {
            x: 0,
            y: 0
        },
        imageSrc: './Sprites/Idle.png',
        framesMax: 8,
        scale: 2.5,
        offset: {
            x: 215,
            y: 165
        },
        sprites: {
            Idle: {
                imageSrc: './Sprites/Idle.png',
                framesMax: 8
            },
            Run: {
                imageSrc: './Sprites/Run.png',
                framesMax: 8
            },
            Jump: {
                imageSrc: './Sprites/Jump.png',
                framesMax: 2
            },
            Fall: {
                imageSrc: './Sprites/Fall.png',
                framesMax: 2
            },
            Attack1: {
                imageSrc: './Sprites/Attack1.png',
                framesMax: 6
            },
            takeHit: {
                imageSrc: './Sprites/Take Hit.png',
                framesMax: 4
            },
            Death: {
                imageSrc: './Sprites/Death.png',
                framesMax: 6
            }
        },
        attackBox: {
            offset: {
                x: 75,
                y: 25 
            },
            width: 175,
            height: 125
        }
    })
    

    
    const keys = {
        a: {
        pressed: false
        },
        d: {
        pressed: false
        },
        w: {
        pressed: false
        },
        ArrowRight: {
        pressed: false
        },
        ArrowLeft: {
        pressed: false
        }
    }  
    
    window.addEventListener('keydown', (event) => {
        if (!player.dead) {
            switch (event.key) {
                case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break 
                case 'a':
                    keys.a.pressed = true
                    player.lastKey = 'a'
                break
                case 'w':
                    keys.w.pressed = true
                    player.velocity.y = -20
                break 
                case ' ':
                    player.attack()
                break 
            }
        }
    
        if (!enemy.dead) {
            switch (event.key) {
                case 'ArrowRight':
                    keys.ArrowRight.pressed = true
                    enemy.lastKey = 'ArrowRight'
                break 
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = true
                    enemy.lastKey = 'ArrowLeft'
                break
                case 'ArrowUp':
                    enemy.velocity.y = -20
                break 
                case 'l':
                    enemy.attack()
                break           
            }
        }
    })
    
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'd':
            keys.d.pressed = false
            break
            case 'a':
                keys.a.pressed = false
            break   
        }
        switch (event.key) {
            case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
            break    
        }    
    })
    
    function rectangularCollision({rectangle1, rectangle2}) {
        return(
            rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
            rectangle2.position.x && rectangle1.attackBox.position.x <= 
            rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
            rectangle2.position.y && rectangle1.attackBox.position.y <=
            rectangle2.position.y + rectangle2.height
            )
    }
    
    
    
    
    function animateGame() {
        window.requestAnimationFrame(animateGame) 
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
        background.update()
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
        player.update()
        //enemy.update()
    
        player.velocity.x = 0
        //enemy.velocity.x = 0
    
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -5    
            player.switchSprite('Run')
        } else if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 5
            player.switchSprite('Run')
        } else {
            player.switchSprite('Idle')
        }
    
        if (player.velocity.y < 0) {
            player.switchSprite('Jump');
        } else if (player.velocity.y > 0 && player.position.y + player.height < gameCanvas.height - 55) {
            player.switchSprite('Fall');
        } else if (player.velocity.y === 0 && player.position.y + player.height === gameCanvas.height - 55) {
            player.switchSprite('Idle');
        }
    
        //if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        //    enemy.velocity.x = -5
        //    enemy.switchSprite('Run')
        //} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        //    enemy.velocity.x = 5
        //    enemy.switchSprite('Run')
        //} else {
        //    enemy.switchSprite('Idle')
       // }
    
        //if (enemy.velocity.y < 0) {
        //    enemy.switchSprite('Jump');
        //} else if (enemy.velocity.y > 0 && enemy.position.y + enemy.height < gameCanvas.height - 55) {
        //    enemy.switchSprite('Fall');
        //} else if (enemy.velocity.y === 0 && enemy.position.y + enemy.height === gameCanvas.height - 55) {
        //    enemy.switchSprite('Idle');
        //}
    
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: enemy }) &&
            player.isAttacking && player.framesCurrent === 4
        ) {
            enemy.takeHits()
            player.isAttacking = false            
            document.querySelector('#p2HB').style.width = enemy.health + '%' 
        } 
    
        if (player.isAttacking && player.framesCurrent === 4) {
            player.isAttacking = false
        }
    
        if (rectangularCollision({
            rectangle1: enemy,
            rectangle2: player }) &&
            enemy.isAttacking && enemy.framesCurrent === 2
        ) {
            player.takeHit()
            enemy.isAttacking = false            
            document.querySelector('#p1HB').style.width = player.health + '%'
        } 
    
        if (enemy.isAttacking && enemy.framesCurrent === 2) {
            enemy.isAttacking = false
        }
    
        if (enemy.health <= 0 || player.health <= 0) {
            determinewinner({player, enemy, timerInterval})
        }
    }
    
    animateGame()
    
    });