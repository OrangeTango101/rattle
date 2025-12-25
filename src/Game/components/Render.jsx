import { useEffect, useState } from "react"


export default function Render() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let stableTimer = null
        function handleMessage(event) {
            if (event.data === "GAME_READY") {
                stableTimer = setTimeout(() => {
                    setReady(true);
                }, 200)
            }
        }

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage)
            clearTimeout(stableTimer);
        }

    }, []);

    const name = !ready ? "isLoading" : ""

    return (
        <div className="game-render">
            {!ready && 
                <h2>Loading...</h2>
            }

            <iframe className={name} onLoad={() => handleLoad()}
                    src="/rattle_game/index.html"
                    title="Pygame Game"
            />

        </div>
    )
}