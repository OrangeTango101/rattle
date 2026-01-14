import Render from "./Render"
import Game from "./Game"

export default class User {
    static storeInput = null
    static makeMove = null

    static registerEvents(s) {
        s.mousePressed = () => {
            const [posX, posY] = [s.mouseX, s.mouseY]
            if ((posX >= 0 && posX <= Render.display_width && posY >= 0 && posY <= Render.display_height)) {
                if (Game.myTurn && User.makeMove) {
                    if (s.mouseButton["left"]) User.leftClickAction([posX, posY])
                    if (s.mouseButton["right"]) User.rightClickAction([posX, posY])
                }
            }
        }
    }

    static leftClickAction(mouse) {
        const selectedCell = Game.playerTurn == "0" ? Game.coords_to_grid_pos(mouse) : Game.reflectPiece(Game.coords_to_grid_pos(mouse))

        if (!Game.searchPieces(Game.playerTurn, selectedCell)) {
            User.makeMove(User.placement_code(selectedCell))
        } else {
            User.makeMove(User.roll_code(selectedCell))
        }
    }

    static rightClickAction(mouse) {
        const selectedCell = Game.playerTurn == "0" ? Game.coords_to_grid_pos(mouse) : Game.reflectPiece(Game.coords_to_grid_pos(mouse))

        if (User.storeInput) {
            User.makeMove(User.movement_code(User.storeInput[0], selectedCell))
            User.storeInput = null
        } else {
            const data = Game.searchPieces(Game.playerTurn, selectedCell)
            if (data) User.storeInput = [selectedCell, data[0]]
            
        }


    }

    static placement_code(pos) {
        return "p"+"-"+pos[0].toString()+"-"+pos[1].toString()
    }
    static roll_code(pos) {
        return "r"+"-"+pos[0].toString()+"-"+pos[1].toString()
    }
    static movement_code(pos1, pos2) {
        return "m"+"-"+pos1[0].toString()+"-"+pos1[1].toString()+"-"+pos2[0].toString()+"-"+pos2[1].toString()
    }

}
