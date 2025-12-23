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
                <p onClick={() => updatePage("rules")}>Rules</p>
                <p>Contact</p>
                <img className="nav-title" src={rattle_title} />
                <p>Play Online (unavailable)</p>
                <p onClick={() => updatePage("contact")}>GitHub</p>
            </div>
        </nav>
    )

    
}