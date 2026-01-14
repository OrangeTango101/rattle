import Game from "./Game"
import User from "./user"

export default class Render {
    static display_width = 750
    static display_height = 550
    static assets = {} 

    static renderGame(s) { 
        s.background(255)
        Render.renderBoard(s)
        Render.renderSpawn(s)
        Render.renderPieces(s)
        Render.renderReserve(s)
        Render.renderActions(s)
        Render.renderText(s)
    }

    static renderBoard(s) {
        for (let indx=0; indx<Game.grid_width*Game.grid_height; indx++) {
            const pos = Game.grid_index_to_pos(indx)
            const pieceData = Game.playerTurn == "0" ? Game.searchPieces(Game.playerTurn, pos) : Game.searchPieces(Game.playerTurn, Game.reflectPiece(pos))
            let cColor = indx%2==0 ? [237, 217, 180] : [213, 193, 156]
            if (pieceData[1]) cColor = [255, 200, 200]
  
            s.fill(cColor)
            s.stroke([92, 84, 65])
            s.strokeWeight(0.5)
            s.rect(pos[0]*Game.cWidth, pos[1]*Game.cWidth, Game.cWidth-0.5, Game.cWidth-0.5)
        }
    }

    static renderSpawn(s) {
        const [p0Spawn, p1Spawn] = [Game.gameState["0"]["spawn_pos"], Game.reflectPiece(Game.gameState["1"]["spawn_pos"])]
        s.noFill()
        s.stroke(255, 255, 255)
        s.strokeWeight(1)
        s.ellipse(p0Spawn[0]*50+25, p0Spawn[1]*50+25, 35, 35)
        s.stroke(100, 100, 100)
        s.ellipse(p1Spawn[0]*50+25, p1Spawn[1]*50+25, 35, 35)
    }

    static renderPieces(s) {
        for (const player of Object.keys(Game.gameState)) {
            for (const piece of Object.keys(Game.gameState[player]["piece_dict"])) {
                const piecePos = player == "0" ? Game.pieceStrToLs(piece) : Game.reflectPiece(Game.pieceStrToLs(piece))
                const val = Game.gameState[player]["piece_dict"][piece][0]
                const imgKey = player === "0" ? `light${val}` : `dark${val}`
                s.image(Render.assets[imgKey], piecePos[0]*Game.cWidth+2.5, piecePos[1]*Game.cWidth+2.5, 45, 45)
            }
        }
    }

    static renderText(s) {
        let textContent = ""

        if (!Game.full) {
            textContent = "Looking for Opponent..."
        } else if (!(Game.winner === null)) {
            let winner = Game.winner == 0 ? "White" : "Dark"
            textContent = `${winner} Wins by ${Game.winType}`
        } else {
            textContent = Game.myTurn() ? `Your Turn (${Game.myColor()})` : `Opponent's Turn`
        }

        s.fill(0)
        s.textSize(15)
        s.text(Game.full ? textContent : "Looking for Opponent...", 560, (Render.display_height+5)/2)
    }

    static renderReserve(s) {
        const [p0_num_pieces, p1_num_pieces] = [Game.gameState["0"]["num_pieces"], Game.gameState["1"]["num_pieces"]]
        for (let i=0; i<p0_num_pieces.length; i++) {
            s.image(Render.assets[`light${p0_num_pieces[i]}`], 560+(Math.floor(i/3)*55), 5+(i%3)*55, 45, 45)
        }
        for (let i=0; i<p1_num_pieces.length; i++) {
            s.image(Render.assets[`dark${p1_num_pieces[i]}`], 560+(Math.floor(i/3)*55), 385+(i%3)*55, 45, 45)
        }
    }

    static renderActions(s) {
        const [posX, posY] = [s.mouseX, s.mouseY]

        if (User.storeInput) {
            const val = User.storeInput[1]
            const imgKey = Game.playerTurn === 0 ? `light${val}` : `dark${val}`
            s.image(Render.assets[imgKey], posX-45/2, posY-45/2, 45, 45)
        }
    }

}











