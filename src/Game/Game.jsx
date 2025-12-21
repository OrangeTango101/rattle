import Render from "./components/Render"

export default function Game(props) {
    const name = props.openPage.game ? "game" : "game hidden"

    return (
        <div className={name}>
            <Render />
        </div>
    )

}