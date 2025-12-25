import { useEffect, useRef } from "react"

export default function VideoOver(props) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current

        function seek() {
            video.currentTime = props.time;
            video.play();
        }

        video.addEventListener("loadedmetadata", seek)

        return () => {
            video.removeEventListener("loadedmetadata", seek)
        }
    }, [props.time])
    

    return (
        <div className="video-overlay" onClick={props.onClose}>
            <div className="video-overlay-frame"> 
                <video 
                    ref={videoRef}
                    src={(import.meta.env.BASE_URL + props.src).replace(/\/+/g, '/')}
                    controls={false} 
                    loop 
                    muted 
                />
            </div>
        </div>
    )
}