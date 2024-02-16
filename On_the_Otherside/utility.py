import math
from config import screen_width, screen_height

def some_shared_function(point1, point2):
    """
    Calculate the Euclidean distance between two points.
    """
    x1, y1 = point1
    x2, y2 = point2
    distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    return distance

def get_screen_size():
    """
    Get the screen size from the configuration.
    """
    return screen_width, screen_height
