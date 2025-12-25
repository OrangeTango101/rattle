import profilePhoto from "/Users/ericjohnson/my-portfolio/src/assets/profile_photo.JPG" 
import locationIcon from "/Users/ericjohnson/my-portfolio/src/assets/location-icon.png"
import linkedInIcon from "/Users/ericjohnson/my-portfolio/src/assets/linkedIn_logo.png"
import gitHubIcon from "/Users/ericjohnson/my-portfolio/src/assets/github-logo.png"
import gmailIcon from "/Users/ericjohnson/my-portfolio/src/assets/gmail-logo.png"
import "./contact.css"

export default function Contact(props) {
    const name = props.openPage.contact ? "info-page" : "info-page hidden"

    function handleClick() {
        props.setOpenPage({"game": true, "rules": false, "contact": false, "page": "game"})
    }

    return (
        <div className={name}>
            <button className="info-page-exit" onClick={handleClick}>X</button>
            
            <div className="contact">
                <div className="profile-photo">
                    <div className="intro-img-frame">
                        <img src={profilePhoto} />
                    </div>
                    <div className="profile-photo-loc"> 
                        <img src={locationIcon} />
                        <p>Berkeley, California</p>
                    </div>
                    <div className="profile-photo-links">
                        <a href="https://github.com/OrangeTango101" target="_blank">
                            <img className="invert" src={gitHubIcon} />
                        </a>
                        <a href="https://linkedin.com/in/eric-johnson-224b19216" target="_blank">
                            <img src={linkedInIcon} />
                        </a>
                        <a href="mailto:ericjohnson02@berkeley.edu" target="_blank">
                            <img src={gmailIcon} />
                        </a>
                    </div>
                </div>
                <div className="about">
                    <h1>Hi, I'm Eric!</h1>
                    <p className="about-desc">
                        I started Rattle as a personal project after graduating college and I'm so excited to share it here today. If you're interested in bringing your own project to life shoot me a message on LinkedIn or Email — I'm always looking to collaborate with others. You can also find more featured projects on my <a href="https://google.com" target="_blank">Portfolio</a>.
                    </p>
                </div>
            </div>
        </div>

    )
}