import { useState, useRef, useEffect } from "react"
import GameOverlay from "./GameOverlay"
import p5 from "p5"
import rattleSketch from "./RattleSketch"
import Game from "./Game"
import User from "./user"

export default function RattleGame(props) {
    console.log(`Starting Game! ${props.type}`)

    const containerRef = useRef(null)
    const p5InstanceRef = useRef(null)
    const API = "https://rattle-api-13w1.onrender.com"
    const [stateData, setStateData] = useState({
        connected: true,
        gameOver: false,
        searching: false,
        loaded: false
    })
    const gameData = {
        GAME_ID: null,
        USER_ID: null,
        PLAYERS: null,
        pollServer: null,
        init_state: null,
        FULL: false
    }

    async function createGame(type) {
        try {
            const res = await fetch(`${API}/create_game/${type}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const gameResponse = await res.json()
            if (!res.ok) {
                setStateData((prevStateData) => ({...prevStateData, connected: false}))
            } else {
                setStateData((prevStateData) => ({...prevStateData, connected: true}))
                return gameResponse
            }
        } catch (err) {
            setStateData((prevStateData) => ({...prevStateData, connected: false}))
        }
    }

    async function findGame() {
        try {
            const res = await fetch(`${API}/find_game`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const gameResponse = await res.json()
            if (!res.ok) {
                setStateData((prevStateData) => ({...prevStateData, connected: false}))
            } else {
                setStateData((prevStateData) => ({...prevStateData, connected: true}))
                return gameResponse
            }
        } catch (err) {
            setStateData((prevStateData) => ({...prevStateData, connected: false}))
        }
    }

    async function leaveGame() {
        if (!(gameData.GAME_ID && gameData.USER_ID)) return 
        const res = await fetch(`${API}/leave_game/${gameData.GAME_ID}/${gameData.USER_ID}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        const response = await res.json()
        console.log("Leave Game Response")
        console.log(response)
    }

    async function getState() {
        if (!(gameData.GAME_ID && gameData.USER_ID)) return 
        try {
            const res = await fetch(`${API}/get_state/${gameData.GAME_ID}/${gameData.USER_ID}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            if (!res.ok) {
                setStateData((prevStateData) => ({...prevStateData, connected: false}))
            } else {
                setStateData((prevStateData) => ({...prevStateData, connected: true}))
            }
            const gameState = await res.json()
            return gameState
        } catch (err) {
            setStateData((prevStateData) => ({...prevStateData, connected: false}))
        }
    }

    async function makeMove(move) {
        if (!(gameData.GAME_ID && gameData.USER_ID)) return 
        try {
            console.log(move)
            const res = await fetch(`${API}/make_move`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({
                    "game_id": gameData.GAME_ID,
                    "user_id": gameData.USER_ID,
                    "move": move
                })
            })  
            const gameState = await res.json()
            Game.updateFromServer(gameState)
        } catch (err) {
            console.error("makeMove failed:", err)
        }
    }

    function startPolling() {
        if (!gameData.pollServer) {
            gameData.pollServer = setInterval(async () => {
                const gameState = await getState(gameData.GAME_ID, gameData.USER_ID)
                if (gameState) {
                    Game.updateFromServer(gameState)
                    if (!(gameState["game"]["winner"] === null)) {
                        setStateData((prevStateData) => ({...prevStateData, gameOver: true}))
                    }
                    if (gameState["full"] == true) {
                        setStateData((prevStateData) => ({...prevStateData, searching: false}))
                    }
                }
                
            }, 500)
        }
    }

    async function initGame() {
        const GAME_RESPONSE = props.type === "local" ? await createGame(props.type) : await findGame()  
        gameData.GAME_ID = GAME_RESPONSE.game_id
        gameData.USER_ID = GAME_RESPONSE.user_id
        gameData.PLAYERS = GAME_RESPONSE.players
        gameData.FULL = GAME_RESPONSE.full
        gameData.init_state = await getState(gameData.GAME_ID, gameData.USER_ID) 
        console.log(gameData.PLAYERS)

        if (props.type != "local" && !GAME_RESPONSE.full) setStateData((prevStateData) => ({...prevStateData, searching: true}))
        Game.initGame(API, gameData.GAME_ID, gameData.PLAYERS, gameData.init_state["game"]["game_state"], gameData.FULL)
        setStateData((prevStateData) => ({...prevStateData, loaded: true}))
        User.makeMove = makeMove
        startPolling()
    }

    useEffect(() => {
        if (p5InstanceRef.current) return
        setStateData({connected:true, gameOver: false, searching: false, loaded:false})
        initGame()
        p5InstanceRef.current = new p5((s) => rattleSketch(s, containerRef.current, gameData))

        return () => {
            p5InstanceRef.current.remove()
            p5InstanceRef.current = null
            if (gameData.pollServer) {
                clearInterval(gameData.pollServer)
                gameData.pollServer = null
            }
            Game.loaded = false
            leaveGame()
        }

    }, [props.type, props.restartGame])

    const name = stateData.connected && stateData.loaded && !stateData.gameOver && !stateData.searching ? "rattle-sketch" : "rattle-sketch overlay"

    return (
        <div className={name} ref={containerRef}>
            {!stateData.connected && 
                <GameOverlay
                    title="Lost Connection..."
                    buttonText="Restart"
                    buttonFn={() => props.setRestartGame((prevRestartGame) => !prevRestartGame)}
                />
            }
            {stateData.connected && !stateData.loaded && 
                <GameOverlay
                    title="Connecting to Server..."
                    buttonText=""
                    buttonFn=""
                />
            }
            {stateData.connected && stateData.gameOver && 
                <GameOverlay
                    title={`${Game.winner == 0 ? "Light" : "Dark"} Wins by ${Game.winType}`}
                    buttonText="New Game"
                    buttonFn={() => props.setRestartGame((prevRestartGame) => !prevRestartGame)}
                />
            }
            {stateData.connected && stateData.searching &&
                <GameOverlay
                    title="Looking for Opponent..."
                    buttonText=""
                    buttonFn=""
                />
            }
        </div>
    )
    
}