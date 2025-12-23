import { useState } from "react"
import Game from "./Game/Game"
import Rules from "./Rules/Rules"


export default function App() {
  const [openPage, setOpenPage] = useState({"page": "game", "game": true, "rules": false, "contact": false})

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
      <Game openPage={openPage} setOpenPage={setOpenPage}/>
      <Rules openPage={openPage} setOpenPage={setOpenPage}/>
    </>
  )
}

