const head = document.querySelector(".head")
head.style.gridColumnStart = 3
head.style.gridRowStart = 3
let s = document.querySelectorAll(".ss")
const main = document.querySelector("main")
const h1 = document.querySelector("h1")
const mess=document.querySelector(".mess")
const c=document.querySelector(".c")
const colorArr=[
            "radial-gradient(rgb(0, 255, 0),green)",
            "radial-gradient(aqua,rgb(0, 168, 168))",
            "radial-gradient(rgb(103, 103, 252),blue)",
            "radial-gradient(plum,purple)",
            "radial-gradient(red ,rgb(163, 0, 0))",
            "radial-gradient(rgb(255, 115, 0),rgb(187, 84, 0))",
            "radial-gradient(rgb(255, 235, 122),rgb(218, 185, 0))"]
const colorArr2=[
    "rgb(101, 202, 0)",
    "aqua",
    "rgb(103, 103, 252)",
    "plum",
    "red" ,
     "rgb(255, 115, 0)",
    "rgb(255, 196, 0)"
   
]
let upDown
let rightLeft
let a
let pointes = 0

//שומר את המיקום של הקודם
let prevCol
let prevRow

s[0].style.gridColumnStart = 2
s[0].style.gridRowStart = 3

s[1].style.gridColumnStart = 1
s[1].style.gridRowStart = 3

document.addEventListener('keydown', function (event) {
    document.getElementById("background").play();
    upDown = head.style.gridRowStart
    rightLeft = head.style.gridColumnStart

    if (event.key === 'ArrowUp') {
        if ((head.style.gridRowStart - 1) !== Number(s[0].style.gridRowStart)/*||head.style.gridRowStart-1!==10*/) {
            head.style.transform = "rotate(-90deg)"
            clearInterval(a)
            a = setInterval(() => {
                upDown--
                if (upDown < 1)
                    upDown = 10
                func()
            }, 200)
        }
    }

    else if (event.key === 'ArrowDown') {
        if ((Number(head.style.gridRowStart) + 1) !== Number(s[0].style.gridRowStart)/*||head.style.gridRowStart+1!==1*/) {
            head.style.transform = "rotate(90deg)"
            clearInterval(a)
            a = setInterval(() => {
                upDown++
                if (upDown >= 11)
                    upDown = 1
                func()
            }, 200)
        }
    }

    else if (event.key === 'ArrowRight') {
        if ((Number(head.style.gridColumnStart) + 1) !== Number(s[0].style.gridColumnStart)) {
            head.style.transform = "rotate(0deg)"
            clearInterval(a)
            a = setInterval(() => {
                rightLeft++
                if (rightLeft >= 11)
                    rightLeft = 1
                func()
            }, 200)
        }
    }
    else if (event.key === 'ArrowLeft') {
        if ((head.style.gridColumnStart - 1) !== Number(s[0].style.gridColumnStart)) {
            head.style.transform = "rotate(180deg)"
            clearInterval(a)
            a = setInterval(() => {
                rightLeft--
                if (rightLeft < 1)
                    rightLeft = 10
                func()
            }, 200)
        }
    }
})

const gameover=()=>{
    document.getElementById("fail").play();
    updateLocal(pointes)
    h1.style.display="none"
    main.style.display="none"
    mess.style.display="flex"
    mess.style.animation="2s ease-in-out 0s forwards normal fail"
}
const func = () => {
    for (let i = 0; i < s.length; i++) {
        if (Number(s[i].style.gridRowStart) == upDown && Number(s[i].style.gridColumnStart) == rightLeft) {
            clearInterval(a)
            gameover()
        }
    }
    prevCol = head.style.gridColumnStart
    prevRow = head.style.gridRowStart
    head.style.gridRowStart = upDown
    head.style.gridColumnStart = rightLeft
    for (let i = 0; i < s.length; i++) {
        let x = s[i].style.gridRowStart
        let y = s[i].style.gridColumnStart
        s[i].style.gridRowStart = prevRow
        s[i].style.gridColumnStart = prevCol
        prevRow = x
        prevCol = y
    }
    if (head.style.gridRowStart === foodDiv.style.gridRowStart && head.style.gridColumnStart === foodDiv.style.gridColumnStart) {
        document.getElementById("eat").play();
        pointes += 10
        h1.textContent =`הנקודות שלך:${pointes}` 
        foodDiv.remove()
        food()
        newS()

    }
}
window.addEventListener("load", (event) => {
    food()

})
let foodDiv
const food = () => {
    let row = Math.floor(Math.random() * 10 + 1)
    let col = Math.floor(Math.random() * 10 + 1)
    foodDiv = document.createElement("div")


    let find = false;
    let i = 0;
    while (i < s.length && find === false) {
        if (Number(s[i].style.gridColumnStart) === col && Number(s[i].style.gridRowStart) === row) {
            find = true
        }
        i++
    }
    if (find) {
        food()
        return
    }
    if (Number(head.style.gridColumnStart) === col && Number(head.style.gridRowStart) === row) {
        food()
        return
    }
    addFoodDiv(row, col)
}
const addFoodDiv = (row, col) => {
    foodDiv.style.gridRowStart = row
    foodDiv.style.gridColumnStart = col
    foodDiv.classList.add("food")
    main.append(foodDiv)
}
let r=0

const newS = () => {
    ss = document.createElement("div")
    ss.style.gridRowStart = prevRow
    ss.style.gridColumnStart = prevCol
    ss.style.backgroundImage=colorArr[r]
    ss.style.boxShadow=`0px 0px 20px ${colorArr2[r]}`
    r++
    if(r===colorArr.length)
        r=0
    ss.classList.add("ss")
    main.append(ss)
    s = document.querySelectorAll(".ss")
}
const updateLocal = ((points) => {
    let user = JSON.parse(localStorage.getItem("localUser"))
    let currentGame = user.gamesHistory.find((itm) => {
        return itm.gameNum === 2
    })
    currentGame.pointes = points
    if (currentGame.highPoinetes < currentGame.pointes) {
        c.style.display="block"
        currentGame.highPoinetes = points
    }
    user.gamesHistory = user.gamesHistory.map((e) => {
        if (e.gameNum === 2)
            e = currentGame
        return e
    })

    let users = JSON.parse(localStorage.getItem("name"))
    users = users.map((e) => {
        if (e.id === user.id)
            e = user
        return e
    })
    
    user = JSON.stringify(user)
    localStorage.setItem("localUser", user)
    users = JSON.stringify(users)
    localStorage.setItem("name", users)

})
