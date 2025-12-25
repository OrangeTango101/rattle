import rattle_title from "/Users/ericjohnson/rattle-site/src/assets/rattle-title.png"

export default function Nav(props) {
    const setOpenPage = props.setOpenPage

    function updatePage(toOpen) {

        setOpenPage(() => {
            var temp = {"game": false, "rules": false, "contact": false, "page": toOpen}
            temp[toOpen] = true

            return temp
        })
    }

    return (
        <nav>
            <div className="nav-frame">
                <a onClick={() => updatePage("rules")}>Rules</a>
                <a onClick={() => updatePage("contact")}>Contact</a>
                <img className="nav-title" src={rattle_title} />
                <a>Play Online</a>
                <a href="https://github.com/OrangeTango101/Board_Game" target="_blank">GitHub</a>
            </div>
        </nav>  
    )

    
}