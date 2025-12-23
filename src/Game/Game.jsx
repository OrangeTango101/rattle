import Render from "./components/Render"
import Nav from "./components/Nav"
import Section from "./components/Section"
import "./game.css"

export default function Game(props) {
    const name = props.openPage.game ? "game" : "game hidden"

    return (
        <>
            <div className={name}>
                <Nav setOpenPage={props.setOpenPage}/>
                <div className="game-content">
                    <Render />
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
        </>
    )

}