import Main from "./components/Main"
import "./rules.css"


export default function Rules(props) {
    const name = props.openPage.rules ? "rules" : "rules hidden"

    return (
        <div className={name}>
            <Main setOpenPage={props.setOpenPage}/>
        </div>
    )
}

