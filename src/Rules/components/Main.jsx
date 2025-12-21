import { useState } from "react"
import Section from "./Section"
import VideoOver from "./VideoOver"
import rules from "/Users/ericjohnson/rattle-site/src/data/rules.js"

export default function Main() {
    const [activeVideo, setActiveVideo] = useState(null)
    const allRules = rules.map(data => {
        return <Section data={data} setActiveVideo={setActiveVideo}/>
    })

    return (
        <>
            <div className="rules-content">
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