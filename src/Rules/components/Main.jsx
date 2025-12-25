import { useState } from "react"
import Section from "./Section"
import VideoOver from "./VideoOver"
import rules from "/Users/ericjohnson/rattle-site/src/data/rules.js"

export default function Main(props) {
    const [activeVideo, setActiveVideo] = useState(null)
    const allRules = rules.map(data => {
        return <Section data={data} setActiveVideo={setActiveVideo}/>
    })

    function handleClick() {
        props.setOpenPage({"game": true, "rules": false, "contact": false, "page": "game"})
    }

    return (
        <>
            <div className="rules-content">
                <button className="info-page-exit" onClick={handleClick}>X</button>
                {allRules}
            </div>
            {activeVideo && 
                <VideoOver 
                    src={activeVideo.src} 
                    time={activeVideo.time}
                    onClose={() => setActiveVideo(null)}
                />
            }
        </>
    )
}