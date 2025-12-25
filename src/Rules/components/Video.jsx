
import { useRef, useState} from 'react'

export default function Video(props) {
    const videoRef = useRef(null); 
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    function handleMouseEnter() {
        if (videoRef.current) {
            videoRef.current.play()
            setIsPlaying(true)
            setIsHovered(true)
        }
    }

    function handleMouseLeave() {
        if (videoRef.current) {
            videoRef.current.pause()
            setIsPlaying(false)
            setIsHovered(false)
        }
    }

    function handleClick() {
        if (videoRef.current) {
            videoRef.current.pause()
            setIsPlaying(false)
            setIsHovered(false)

            props.setActiveVideo({src: props.src, time: videoRef.current.currentTime})
        }
    }

    const name = isPlaying ? "video-played" : "video-paused" 

    return (
    <div className="rules-section-vid">
        <div 
            className="rules-section-vid-frame"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleClick}
        >
            <video 
                className={name} 
                src={(import.meta.env.BASE_URL + props.src).replace(/\/+/g, '/')}
                type="video/mp4"
                ref={videoRef} 
                controls={false} 
                loop 
                muted 
            />
        </div>
       
            {!isPlaying && (
                 <div className="rules-section-vid-play">
                    <button >{"▶"}</button>
                </div>
            )}
        
    </div>

    )


}