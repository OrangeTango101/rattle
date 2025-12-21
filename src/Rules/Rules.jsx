import Main from "./components/Main"


export default function Rules(props) {
    const name = props.openPage.rules ? "rules" : "rules hidden"

    return (
        <div className={name}>
            <Main />
        </div>
    )
}

