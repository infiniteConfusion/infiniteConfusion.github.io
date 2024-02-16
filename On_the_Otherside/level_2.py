import pygame
import sys
from player import Player
from platform_1 import Platform
from next import BlueBox
from utility import get_screen_size
from level_3 import main as level_3_main


pygame.init()

screen_width, screen_height = get_screen_size()
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("On the Otherside")

black = (0, 0, 0)
grey = (169, 169, 169)  
blue = (0, 0, 255)



def main():
    player = Player()

    floor_width = 1450
    floor_height = 30
    floor_color = grey
    floor_rect = pygame.Rect(0, screen_height - floor_height, floor_width, floor_height)

    barrier_width = 25
    barrier_color = grey  
    barrier_left = Platform(0, -600, barrier_width, 1200)
    barrier_right = Platform(floor_width - barrier_width, -600, (barrier_width + 5), 1200)
    
    barriers = pygame.sprite.Group()
    barriers.add(barrier_left, barrier_right)
    
    camera_speed = 5
    camera_x = 0
    camera_y = 0

    platform1 = Platform(200, 400, 250, 10)
    platform2 = Platform(400, 200, 150, 10)
    platform3 = Platform(250, 0, 250, 10)
    platform4 = Platform(400, -200, 150, 10)
    platform5 = Platform(1200, 200, 250, 10)
    platform6 = Platform(1250, 0, 150, 10)

    all_sprites = pygame.sprite.Group()
    all_sprites.add(player, platform1, platform2, platform3, platform4, platform5, platform6, barrier_left, barrier_right)

    platforms = pygame.sprite.Group()
    platforms.add(platform1, platform2, platform3, platform4, platform5, platform6)

    player_start_x = platform1.rect.x + platform1.rect.width // 2 - player.rect.width // 2
    player_start_y = platform1.rect.y - player.rect.height

    player.rect.x = player_start_x
    player.rect.y = player_start_y

    blue_box = BlueBox(platform6.rect.x, platform6.rect.y - 50, 150, 50)
    all_sprites.add(blue_box)

    clock = pygame.time.Clock()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        player.update()

        if pygame.sprite.collide_rect(player, blue_box):
            level_3_main()  
            return  

        target_camera_x = player.rect.x - screen_width // 2
        camera_x += (target_camera_x - camera_x) * 0.1
        
        target_camera_y = player.rect.y - screen_height // 2
        camera_y += (target_camera_y - camera_y) * 0.1

        screen.fill(black)
        pygame.draw.rect(screen, floor_color, floor_rect.move(-camera_x, -camera_y))

        collisions = pygame.sprite.spritecollide(player, platforms, False)
        for platform in collisions:
            if player.y_speed > 0:  
                player.rect.bottom = min(player.rect.bottom, platform.rect.top)
                player.y_speed = 0  
                player.is_jumping = False

        barrier_collisions = pygame.sprite.spritecollide(player, barriers, False)
        for barrier in barrier_collisions:
            if player.rect.left < barrier.rect.left:
                player.rect.right = min(player.rect.right, barrier.rect.left)
            else:
                player.rect.left = max(player.rect.left, barrier.rect.right)

        for platform in all_sprites:
            screen.blit(platform.image, (platform.rect.x - camera_x, platform.rect.y - camera_y))


        pygame.display.flip()
        clock.tick(60)

if __name__ == "__main__":
    main()
    pygame.quit()
    sys.exit()