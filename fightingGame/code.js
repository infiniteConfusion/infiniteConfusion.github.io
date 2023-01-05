const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './backgroundOne.png'
 }
)

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
 }
)

const enemy = new Fighter({
    position:{
    x: 875,
    y: 360
},
velocity: {
    x: 0,
    y: 10
},
color: 'blue',
offset: {
    x: -50,
    y: 0
},
imageSrc: './Sprites1/Idle.png',
framesMax: 4,
scale: 2.5,
offset: {
   x: 215,
   y: 175
},
sprites: {
   Idle: {
      imageSrc: './Sprites1/Idle.png',
      framesMax: 4
    },
    Run: {
       imageSrc: './Sprites1/Run.png',
       framesMax: 8
    },
    Jump: {
       imageSrc: './Sprites1/Jump.png',
       framesMax: 2
    },
    Fall: {
       imageSrc: './Sprites1/Fall.png',
       framesMax: 2
    },
    Attack1: {
       imageSrc: './Sprites1/Attack1.png',
       framesMax: 4
    },
    takeHit: {
        imageSrc: './Sprites1/Take hit.png',
        framesMax: 3
    },
    Death: {
        imageSrc: './Sprites1/Death.png',
        framesMax: 7
    }
   },
attackBox: {
    offset: {
        x: -170,
        y: 25
    },
    width: 175,
    height: 125
  }
 }
)

enemy.draw()

console.log(player)

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



decreaseTimer()

function animate() {
   window.requestAnimationFrame(animate) 
   c.fillStyle = 'black'
   c.fillRect(0, 0, canvas.width, canvas.height)
   background.update()
   c.fillStyle = 'rgba(255, 255, 255, 0.12)'
   c.fillRect(0, 0, canvas.width, canvas.height)
   player.update()
   enemy.update()

   player.velocity.x = 0
   enemy.velocity.x = 0

   //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
     player.velocity.x = -5    
     player.switchSprite('Run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
     player.velocity.x = 5
     player.switchSprite('Run')
    } else {
     player.switchSprite('Idle')
    }

   //jumping 
    if (player.velocity.y < 0) {
     player.switchSprite('Jump')
    } else if (player.velocity.y > 0) {
     player.switchSprite('Fall')
    }

   //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
     enemy.velocity.x = -5
     enemy.switchSprite('Run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
     enemy.velocity.x = 5
     enemy.switchSprite('Run')
    } else {
     enemy.switchSprite('Idle')
    }
       
   //jumping 
    if (enemy.velocity.y < 0) {
     enemy.switchSprite('Jump')
    } else if (enemy.velocity.y > 0) {
     enemy.switchSprite('Fall')
    }


   // detect for collision & enemy gets hit
    if (rectangularCollision({
     rectangle1: player,
     rectangle2: enemy }) &&
     player.isAttacking && player.framesCurrent === 4
     ) {
     enemy.takeHit()
     player.isAttacking = false            
     document.querySelector('#enemyHealth').style.width = enemy.health + '%'
     console.log('hit')
        
     } 

   // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
     player.isAttacking = false
     }

   // detect for collision & if player gets hit
    if (rectangularCollision({
     rectangle1: enemy,
     rectangle2: player }) &&
     enemy.isAttacking && enemy.framesCurrent === 2
     ) {
     player.takeHit()
     enemy.isAttacking = false            
     document.querySelector('#playerHealth').style.width = player.health + '%'
     console.log('hit2')
        
     } 

     // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
       enemy.isAttacking = false
    }
     
     //end game based on health
     if (enemy.health <= 0 || player.health <= 0) {
       determinewinner({player, enemy, timerId})
     }
}

animate()

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
            player.velocity.y = -20
            break 
        case ' ':
            player.attack()
            break 
    }
}

    //enemy movement
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
//enemy keys
    switch (event.key) {
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break    
    }    
})