import pygame
from pygame.locals import *

# Initialize the game
pygame.init()

# Set up the game window
width, height = 640, 480
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Ping Pong")

# Set up the colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Set up the game clock
clock = pygame.time.Clock()

# Set up the paddles
paddle_width, paddle_height = 10, 60
paddle_speed = 5
paddle1_x = 10
paddle1_y = height // 2 - paddle_height // 2
paddle2_x = width - paddle_width - 10
paddle2_y = height // 2 - paddle_height // 2

# Set up the ball
ball_radius = 10
ball_speed_x = 3
ball_speed_y = 3
ball_x = width // 2
ball_y = height // 2

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == QUIT:
            running = False

    # Move the paddles
    keys = pygame.key.get_pressed()
    if keys[K_w] and paddle1_y > 0:
        paddle1_y -= paddle_speed
    if keys[K_s] and paddle1_y < height - paddle_height:
        paddle1_y += paddle_speed
    if keys[K_UP] and paddle2_y > 0:
        paddle2_y -= paddle_speed
    if keys[K_DOWN] and paddle2_y < height - paddle_height:
        paddle2_y += paddle_speed

    # Move the ball
    ball_x += ball_speed_x
    ball_y += ball_speed_y

    # Check for collision with paddles
    if ball_x <= paddle1_x + paddle_width and paddle1_y <= ball_y <= paddle1_y + paddle_height:
        ball_speed_x *= -1
    if ball_x >= paddle2_x - ball_radius and paddle2_y <= ball_y <= paddle2_y + paddle_height:
        ball_speed_x *= -1

    # Check for collision with walls
    if ball_y <= 0 or ball_y >= height - ball_radius:
        ball_speed_y *= -1

    # Clear the screen
    screen.fill(BLACK)

    # Draw the paddles and the ball
    pygame.draw.rect(screen, WHITE, (paddle1_x, paddle1_y, paddle_width, paddle_height))
    pygame.draw.rect(screen, WHITE, (paddle2_x, paddle2_y, paddle_width, paddle_height))
    pygame.draw.circle(screen, WHITE, (ball_x, ball_y), ball_radius)

    # Update the game display
    pygame.display.flip()

    # Limit the frame rate
    clock.tick(60)

# Quit the game
pygame.quit()
