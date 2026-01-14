import { useState, useRef, useEffect } from "react"
import p5 from "p5"
import rattleSketch from "./RattleSketch"
import Game from "./Game"
import User from "./user"

export default function RattleGame(props) {
    console.log(`Starting Game! ${props.type}`)

    const containerRef = useRef(null)
    const p5InstanceRef = useRef(null)
    const API = "https://rattle-api-13w1.onrender.com"
    const gameData = {
        GAME_ID: null,
        USER_ID: null,
        PLAYERS: null,
        pollServer: null,
        init_state: null,
        FULL: false,
        loaded: false
    }

    async function createGame(type) {
        const res = await fetch(`${API}/create_game/${type}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        const gameResponse = await res.json()
        return gameResponse
    }

    async function findGame() {
        const res = await fetch(`${API}/find_game`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        const gameResponse = await res.json()
        return gameResponse
    }

    async function endGame() {
        if (!gameData.GAME_ID) return 
        const res = await fetch(`${API}/end_game${gameData.GAME_ID}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        const response = await res.json()
        console.log(response)
    }

    async function getState() {
        if (!(gameData.GAME_ID && gameData.USER_ID)) return 
        const res = await fetch(`${API}/get_state/${gameData.GAME_ID}/${gameData.USER_ID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        const gameState = await res.json()
        return gameState
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
                console.log(`polling, winner: ${Game.winner}`)
                const gameState = await getState(gameData.GAME_ID, gameData.USER_ID)
                Game.updateFromServer(gameState)
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
        Game.initGame(API, gameData.GAME_ID, gameData.PLAYERS, gameData.init_state["game"]["game_state"], gameData.FULL)
        User.makeMove = makeMove
        startPolling()
        gameData.loaded = true
    }

    useEffect(() => {
        if (p5InstanceRef.current) return;
        initGame()
        p5InstanceRef.current = new p5((s) => rattleSketch(s, containerRef.current, gameData))

        return () => {
            p5InstanceRef.current.remove()
            p5InstanceRef.current = null
            if (gameData.pollServer) {
                clearInterval(gameData.pollServer)
                gameData.pollServer = null
            }
            endGame(gameData.GAME_ID)
        }

    }, [props.type])

    return (
        <div className="rattle-sketch" ref={containerRef}>

        </div>
    )
    
}