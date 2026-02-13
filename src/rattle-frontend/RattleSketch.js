import Render from "./Render"
import Game from "./Game"
import User from "./user"

export default function RattleSketch(s, parentContainer, gameData) {

    s.setup = async () => {
        const c = s.createCanvas(Render.display_width, Render.display_height)
        c.parent(parentContainer)
        s.canvas.oncontextmenu = (e) => e.preventDefault()

        const pieceTypes = ["light", "dark"]
        for (const type of pieceTypes) {
            for (let i=1; i<7; i++) {
                const img = await s.loadImage(`/rattle/assets/dice/${type}${i}.png`)
                Render.assets[type+i.toString()] = img
            }
        }
    }
    
    s.draw = () => {
        if (Game.loaded) {
            User.registerEvents(s)
            Render.renderGame(s)
        }
    }
}