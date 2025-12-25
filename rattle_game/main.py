import asyncio
import pygame  
from collections import defaultdict

from game import Game
from game import Player
from user import *  


async def main(): 
    '''
    When the run file is run it will start the game. It will continue running until a player wins. 
    A user can customize the color and name arguments of each player, but should not change the id value. 
    '''
    
    pygame.init()
    pygame.font.init()  
    
    player0 = Player(
        id = 0, 
        color = (255, 255, 255),
        name = "Light"
    )
    player1 = Player(
        id = 1, 
        color = (100, 100, 100),
        name = "Dark"
    )
    players = [player0, player1]
    Game.initialize_game(players)
    

    # Main game loop
    while True:
        
        User.register_events()
        
        if User.close_game or Game.winner: 
            break
        
            
        Game.game_loop()
        
        await asyncio.sleep(0)
        
    pygame.quit()

asyncio.run(main())