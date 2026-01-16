import { useState } from "react"
import Nav from "./components/Nav"
import Section from "./components/Section"
import RattleGame from "../rattle-frontend/RattleGame.jsx"
import "./home.css"

export default function Home(props) {
    const name = props.openPage.home ? "home" : "home hidden"
    const [restartGame, setRestartGame] = useState(false)

    return (
            <div className={name}>
                <Nav setOpenPage={props.setOpenPage} gameType={props.gameType} setGameType={props.setGameType} />
                <div className="game-content">
                    <RattleGame type={props.gameType} restartGame={restartGame} setRestartGame={setRestartGame}/>
                    <div className="game-content-info">
                        <Section 
                            title="Welcome to Rattle!" 
                            sub="A board game by Eric Johnson"
                            desc={<p>Rattle is a two player chance/strategy board game about claiming territory. Each player starts with six dice-pieces that can be combined to build chain like structures. These structures, called snakes, can independently replicate, move, and consume other snakes. Players build snakes on their own side of the board and eventually move them to claim the opponent's Castle on the opposite end of the board.</p>}
                            link="read more"
                            setOpenPage={props.setOpenPage}
                        />
                        <Section 
                            title="Game Controls" 
                            sub="Roll, place, and move die"
                            desc={<p>Left Mouse Click: Place or Roll Die<br />Right Mouse Click: Pick Up or Move Die<br />Left Arrow Key: Reverse Last Action</p>}
                            link="read more"
                            setOpenPage={props.setOpenPage}
                        />
                    </div>
                </div>
            </div>
    )

}