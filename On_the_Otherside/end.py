import pygame
import sys
from utility import get_screen_size

pygame.init()

screen_width, screen_height = get_screen_size()
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("On the Otherside")

black = (0, 0, 0)
white = (255, 255, 255)

font = pygame.font.Font(pygame.font.get_default_font(), 36)

def draw_text(text, font, color, x, y):
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.center = (x, y)
    screen.blit(text_surface, text_rect)

def end_menu():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
        screen.fill(black)
        draw_text("On the Otherside", font, white, screen_width // 2, screen_height // 4)
        draw_text("Thank you for playing the demo", font, white, screen_width // 2, screen_height // 1.5)
        pygame.display.flip()

if __name__ == "__main__":
    end_menu()