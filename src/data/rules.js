export default [
    {
        id: 1,
        title: "The Game in Brief",
        sub: "",
        desc: "Rattle is a chance/strategy board game about claiming territory. Each player starts with six dice-pieces that can be combined to build chain like structures. These structures, called snakes, can independently replicate, move, and consume other snakes. Players build snakes on their own side of the board and eventually move them to claim the opponent's Castle on the opposite end of the board.",
        items: [],
        src: "src/assets/rattleGamePlay.mp4"
    },
    {
        id: 2,
        title: "Objective",
        sub: "",
        desc: "To occupy the opponent's Castle with one of your own snakes or render the opponent immobile.",
        items: [],
        src: ""
    },
    {
        id: 3,
        title: "Playing the Game",
        sub: "",
        desc: "During a turn, you can move, roll, and place more dice-pieces. Once you take an action with each of your snakes, the turn ends. If you have no snakes on the board, you must place at least one and take an action with it. Turns go back and forth until one player wins.",
        items: [],
        src: ""
    },
    {
        id: 4,
        title: "Placing",
        sub: "left click empty square",
        desc: "You can place up to three dice a turn. To begin building a snake, you must make a placement on your Castle. All additional placements must form a connected chain from the Castle. Placements take from your Reserve on the right of the board. The Reserve can hold nine extra dice at a time. You can make placements at any point during your turn.",
        items: [],
        src: "src/assets/Placing_Pieces.mp4"
    },
    {
        id: 5,
        title: "Snake Actions",
        sub: "",
        desc: "Each snake can take one action per turn. These include:",
        items: ["Rolling two dice on a snake.", "Rolling one die and then moving the snake."],
        src: ""
    },
    {
        id: 6,
        title: "Rolling",
        sub: "left click die",
        desc: "You can roll at most two die on each snake during a turn. Rolling a die will randomly assign its value between 1-6. You cannot roll a die more than once.",
        items: [],
        src: ""
    },
    {
        id: 7,
        title: "Matching Die",
        sub: "",
        desc: "If every die in a snake has the same value (and that value is greater than 1):",
        items: ["The matching die is added to Reserve.", "Every die in the snake recieves a value of 1.", "No further actions can be taken by the snake that turn."],
        src: "src/assets/Matching_Pieces.mp4"
    },
    {
        id: 7,
        title: "Moving",
        sub: "right click die, right click empty square",
        desc: "You can move each snake at most once during a turn. You can only move a die that has exactly one other adjacent die in its four-square-perimeter. This is called a tail. A tail can be moved to any valid position on the perimeter of its respective snake.",
        items: [],
        src: ""
    },
    {
        id: 8,
        title: "Interactions",
        sub: "",
        desc: "If you connect two snakes through movement or placement they will become a single snake. This does not apply to snakes on different teams. To attack an opposing snake, move your own die-piece on top of it. This attack will only be successful when the value of your die is greater than or equal to the opponent's.",
        items: [],
        src: "src/assets/Moving_Pieces.mp4"
    }
]
