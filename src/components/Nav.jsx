import { Link } from 'react-router-dom';
import rattle_title from "/Users/ericjohnson/rattle-site/src/assets/rattle-title.png"

export default function Nav(props) {

    const [leftTitle, leftLink] = props.links.left ? [props.links.left.title, props.links.left.link] : [null, null]
    const [rightTitle, rightLink] = props.links.right ? [props.links.right.title, props.links.right.link] : [null, null]
    const setOpenPage = props.setOpenPage
    const title = props.links.src 

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
                { props.links.left ? <p className="nav-left" onClick={() => updatePage(leftLink)}> {leftTitle}</p> : null }
                <img className="nav-title" src={title} />
                { props.links.right ? <p className="nav-right" onClick={() => updatePage(rightLink)}>{rightTitle}</p> : null }
            </div>
        </nav>
    )

    
}