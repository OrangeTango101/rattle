export default function GameOverlay(props) {
    return (
        <div className="game-overlay">
            <h2>{props.title}</h2>
            {props.buttonText !== "" &&
                <button onClick={() => props.buttonFn()}>{props.buttonText}</button>
            }
        </div>
    )
}