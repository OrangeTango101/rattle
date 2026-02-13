

export default class Game {
    static grid_width = 11
    static grid_height = 11
    static cWidth = 50

    static API = null 
    static gameId = null
    static full = false
    static loaded = false

    static gameState = null  
    static players = []
    static playerTurn = 0
    static winner = null
    static rounds = 0

    static initGame(API_, gameId_, players_, gameState_, full_) {
        Game.API = API_
        Game.gameId = gameId_
        Game.full = full_
        Game.players = players_
        Game.gameState = gameState_
        Game.loaded = true
    }

    static updateFromServer(res) {
        Game.gameState = res["game"]["game_state"]
        Game.winner = res["game"]["winner"]
        Game.winType = res["game"]["win_type"]
        Game.rounds = res["game"]["rounds"]
        Game.playerTurn = res["game"]["player_turn"]
        Game.full = res["full"]
    }
    
    static enemyPieceDict(player) {
        let reflectedPieceDict = {}
        for (const piece in Game.gameState[player]["piece_dict"]) {
            console.log(piece)
            const newPiece = Game.reflectPiece(piece)
            reflectedPieceDict[newPiece] = Game.gameState[player]["piece_dict"][piece]
        }

        return reflectedPieceDict       
    }

    static reflectPiece(piece) {
        const x_line = Math.floor(Game.grid_height / 2)
        const y_line = Math.floor(Game.grid_width / 2)
        return [2*x_line-piece[0], 2*y_line-piece[1]] 
    }

    static searchPieces(player, pos) {
        for (const piece of Object.keys(Game.gameState[player]["piece_dict"])) {
            const lsPiece = Game.pieceStrToLs(piece)
            if (pos[0] == lsPiece[0] && pos[1] == lsPiece[1]) return Game.gameState[player]["piece_dict"][piece]
        }
        return false 
    }

    static pieceStrToLs(piece) {
        const split = piece.indexOf(",")
        return [Number(piece.slice(0, split)), Number(piece.slice(split+1, piece.length))]
    }

    static valid_search_pos(pos) { 
        return pos[0] >= 0 && pos[0] <= Game.grid_width-1 && pos[1] >= 0 && pos[1] <= Game.grid_height-1
    }

    static grid_search(pos, grid) {
        return grid[Game.pos_to_grid_index(pos)]
    } 
        
    static grid_index_to_pos(indx) {
        return [Math.floor(indx/Game.grid_width), indx%Game.grid_height]
    }

    static coords_to_grid_pos(coords){
        return [Math.floor(coords[0]/Game.cWidth), Math.floor(coords[1]/Game.cWidth)]
    }
        
    static myTurn() {
        if (Game.players.length > 1) {
            return true
        }
        return Game.playerTurn == Game.players[0]
    }

    static myColor() {
        if (Game.players.length > 1) {
            return Game.playerTurn == 0 ? "Light" : "Dark"
        }
        return Game.players[0] == 0 ? "Light" : "Dark"
    }

    static myOpponentColor() {
        if (Game.players.length > 1) {
            return Game.playerTurn == 0 ? "Dark" : "Light"
        }
        return Game.players[0] == 0 ? "Dark" : "Light"
    }

}

