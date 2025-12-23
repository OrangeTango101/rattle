export default function Section(props) {

    function handleClick() {
        props.setOpenPage({"game": false, "rules": true, "contact": false, "page": "rules"})

    }

    return (
        <div className="game-content-info-section">
            <div className="game-content-info-section-title">
                <h1>{props.title}</h1>
                <span>{props.sub}</span>
            </div>
            <div className="game-content-info-section-desc">
                {props.desc}
            </div>

            <span onClick={handleClick}>{props.link}</span>
        </div>
    )
}