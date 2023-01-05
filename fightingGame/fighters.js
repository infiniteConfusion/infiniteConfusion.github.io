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
        c.drawImage(
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
        }
      }
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

        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // this is to show attackbox
       // c.fillRect(
         //  this.attackBox.position.x,
           // this.attackBox.position.y,
            //this.attackBox.width,
            //this.attackBox.height  
       // )

        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y

        //gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 55) {
            this.velocity.y = 0
            this.position.y = 371
        } else this.velocity.y += gravity

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

    switchSprite(sprite) {
        //override other animation with Death
        if (this.image === this.sprites.Death.image ) {
            if (this.framesCurrent === this.sprites.Death.framesMax - 1)
            this.dead = true
            return}

        //overrides other animations with attack
        if (this.image === this.sprites.Attack1.image && 
            this.framesCurrent < this.sprites.Attack1.framesMax - 1 
            ) 
            return

        //override when fighter is hit
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