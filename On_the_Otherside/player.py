import pygame
from utility import get_screen_size

white = (255, 255, 255)
glow_color = (255, 255, 0)

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(white)
        self.rect = self.image.get_rect()
        self.rect.center = (get_screen_size()[0] // 2, get_screen_size()[1] // 2)
        self.speed = 0.75
        self.max_speed = 10
        self.x_speed = 0
        self.y_speed = 0
        self.gravity = 1
        self.is_jumping = False
        self.jump_height = 25
        self.friction = 0.1

    def update(self):
        keys = pygame.key.get_pressed()

        if not keys[pygame.K_LEFT] and not keys[pygame.K_RIGHT]:
            self.x_speed *= 1 - self.friction
            if abs(self.x_speed) < 0.1:
                self.x_speed = 0

        if keys[pygame.K_LEFT]:
            self.x_speed -= self.speed
        if keys[pygame.K_RIGHT]:
            self.x_speed += self.speed

        self.x_speed = max(-self.max_speed, min(self.x_speed, self.max_speed))

        self.y_speed += self.gravity
        self.rect.x += self.x_speed
        self.rect.y += self.y_speed

        floor_height = int(get_screen_size()[1] * 0.95)
        if self.rect.bottom >= floor_height:
            self.rect.bottom = floor_height
            self.y_speed = 0
            self.is_jumping = False

        if keys[pygame.K_UP] and not self.is_jumping:
            self.is_jumping = True
            self.y_speed = -self.jump_height

        if self.y_speed != 0:
            self.is_jumping = True