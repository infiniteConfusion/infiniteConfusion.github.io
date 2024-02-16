import pygame

blue = (0, 0, 255)

class BlueBox(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height):
        super().__init__()
        self.image = pygame.Surface((width, height))
        self.image.fill(blue)
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y