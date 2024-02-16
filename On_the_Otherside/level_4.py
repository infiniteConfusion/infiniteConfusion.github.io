import pygame
import sys
from player import Player
from platform_1 import Platform
from next import BlueBox
from utility import get_screen_size
from level_5 import main as level_5_main

pygame.init()

screen_width, screen_height = get_screen_size()
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("On the Otherside")

black = (0, 0, 0)
grey = (169, 169, 169) 
blue = (0, 0, 255) 

def main():
    player = Player()

    floor_width = 2650
    floor_height = 30
    floor_color = grey
    floor_rect = pygame.Rect(0, screen_height - floor_height, floor_width, floor_height)

    barrier_width = 25
    barrier_color = grey
    barrier_left = Platform(0, -1900, barrier_width, 2500)
    barrier_right = Platform(floor_width - barrier_width, -1900, (barrier_width + 5), 2500)

    barriers = pygame.sprite.Group()
    barriers.add(barrier_left, barrier_right)

    camera_speed = 5
    camera_x = 0
    camera_y = 0

    platform1 = Platform(1200, 400, 250, 10)
    platform2 = Platform(1000, 200, 50, 10)
    platform3 = Platform(1600, 200, 50, 10)
    platform4 = Platform(750, 0, 100, 10)
    platform5 = Platform(1850, 0, 100, 10)
    platform6 = Platform(2250, -5, 100, 10)
    platform7 = Platform(350, -5, 100, 10)
    platform8 = Platform(25, -300, 50, 10)
    platform9 = Platform(2575, -300, 50, 10)
    platform10 = Platform(225, -600, 50, 10)
    platform11 = Platform(2375, -600, 50, 10)   
    platform12 = Platform(525, -950, 50, 10)
    platform13 = Platform(2075, -950, 50, 10)   
    platform14 = Platform(625, -1300, 50, 10)
    platform15 = Platform(1975, -1300, 50, 10)
    platform16 = Platform(1025, -1300, 20, 10)
    platform17 = Platform(1575, -1300, 20, 10)
    platform18 = Platform(1300, -1300, 20, 10)
    platform19 = Platform(1300, -1600, 20, 10)
    platform20 = Platform(1300, -1900, 20, 10)
    platform21 = Platform(1300, -2200, 20, 10)

    all_sprites = pygame.sprite.Group()
    all_sprites.add(player, platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9, platform10, platform11, platform12, platform13, platform14, platform15, platform16, platform17, platform18, platform19, platform20, platform21, barrier_left, barrier_right)

    platforms = pygame.sprite.Group()
    platforms.add(platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9, platform10, platform11, platform12, platform13, platform14, platform15, platform16, platform17, platform18, platform19, platform20, platform21)

    player_start_x = platform1.rect.x + platform1.rect.width // 2 - player.rect.width // 2
    player_start_y = platform1.rect.y - player.rect.height

    player.rect.x = player_start_x
    player.rect.y = player_start_y

    blue_box = BlueBox(platform21.rect.x, platform21.rect.y - 50, 20, 50)
    all_sprites.add(blue_box)

    clock = pygame.time.Clock()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        player.update()

        if pygame.sprite.collide_rect(player, blue_box):
            level_5_main()  
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