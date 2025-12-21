import Video from "./Video"

export default function Section(props) {

    const data = props.data
    const lsPoints = data.items.map(item => <li>{item}</li>)


    return (
        <div className="rules-section">
            <div className="rules-section-info">
                <div className="rules-section-title">
                    <h1>{data.title}</h1>
                    {data.sub ? <span>control: {data.sub}</span> : null}
                </div>
                <div className="rules-section-desc">
                    <p>{data.desc}</p>
                    {lsPoints.length > 0 ? <ol>{lsPoints}</ol> : null}
                </div>
            </div>
            {data.src && <Video src={data.src} setActiveVideo={props.setActiveVideo}/>}
        </div>    
    )
}