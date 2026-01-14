import { useState } from "react"
import Home from "./Home/Home"
import Rules from "./Rules/Rules"
import Contact from "./Contact/Contact"


export default function App() {
  const [openPage, setOpenPage] = useState({"page": "home", "home": true, "rules": false, "contact": false})
  const [gameType, setGameType] = useState("local")

  function getNavLinks() {

    if (openPage.game) {
      return {
        left: {"title": "Rules", "link": "rules"},
        right: {"title": "Contact", "link": "contact"},
        src: "src/assets/rattle-title.png"
      }
    } else {
      return {
        left: {"title": "Back", "link": "game"},
        src: "src/assets/rattle-rules.png"
      }
    }
  } 

  return (
    <>
      <Home openPage={openPage} setOpenPage={setOpenPage} gameType={gameType} setGameType={setGameType}/>
      <Rules openPage={openPage} setOpenPage={setOpenPage}/>
      <Contact openPage={openPage} setOpenPage={setOpenPage}/>
    </>
  )
}

