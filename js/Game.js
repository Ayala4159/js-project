const way = document.querySelector(".way")
const mario = document.querySelector(".mario")
const l1 = document.querySelector(".l1")
const l2 = document.querySelector(".l2")
const l3 = document.querySelector(".l3")
const pointsElement = document.querySelector(".pointes")
const mess = document.querySelector(".mess")
const p = document.querySelectorAll("P")
const life = [l1, l2, l3]
const time = document.querySelector(".time")
const c=document.querySelector(".c")
const start=document.querySelector(".start")
let newDiv
let side
let points = 0
let a
let count = 0


//טיימר
let timer = 125
let timerMinut = 2
let timerSecond = 0
const interval = setInterval(() => {
    timerSecond--
    timer--
    if (timer >= 5) {//עדיין במשחק
        if (timerSecond === -1) {
            timerMinut--
            timerSecond = 59
        }
        if (timerSecond < 10)
            time.textContent = `זמן נותר: 0${timerMinut}:0${timerSecond}`
        else {
            time.textContent = `זמן נותר: 0${timerMinut}:${timerSecond}`
        }
        if (timer <= 15) {
            
            if (timer <= 10) {
                document.getElementById("timeup").play()
                time.style.animation = "1s ease-in 0.5s normal infinite onOff"
            }
            else {
                time.style.color = "orange"
            }
        }
    }
    if(timer===5){
        clearInterval(a)
        updateLocal(points)
    }
    if (timer === 0) {//נגמר הזמן
        clearInterval(interval)
        document.getElementById("win").play()
        mess.style.display = "flex"
        mess.style.backgroundImage="url(./images/winMario.png)"
        mess.style.animation = "2s ease-in-out 0s forwards normal fail"
    }
}, 1000);

document.addEventListener('keydown', function (event) {
    
    if(event.key === 'ArrowLeft'||event.key === 'ArrowRight'){
        document.getElementById("mario").play()
        start.style.display="none"
    }
    
    if (event.key === 'ArrowLeft') {
        side = "left"
        mario.style.transform = "rotateY(180deg)"
        mario.style.left = "400px"
    }
    if (event.key === 'ArrowRight') {
        side = "right"
        mario.style.transform = "rotateY(0deg)"
        mario.style.left = "900px"
    }
})
let type
let b
const inter = () => {
        a = setInterval(() => {
        type = Math.floor(Math.random() * 4 + 1)
        newDiv = document.createElement("div")
        if (type === 1) {
            newDiv.classList.add("bor1")
            newDiv.classList.add("bor")
        }
        else if (type === 2) {
            document.getElementById("mario").play();
            newDiv.classList.add("money1")
            newDiv.classList.add("money")

        }
        else if (type === 3) {
            newDiv.classList.add("bor2")
            newDiv.classList.add("bor")

        }
        else {
            newDiv.classList.add("money2")
            newDiv.classList.add("money")
        }
        let c = 0
        b = setInterval(() => {
            if (c === 115)
                clearInterval(b)
            newDiv.style.top = `${c++}%`
            if (c === 65)
                func(type, side)
        }, 25)
        way.append(newDiv)
    }, 4000)
}
inter()
const func = (type, side) => {
    //בור
    if ((type === 1 && side === "left")) {
        
        life[count++].remove()
        clearInterval(b)
        clearInterval(a)
        if (count < 3) {
            document.getElementById("wrong").play();
            const contin = setTimeout(() => {
                newDiv.remove()
                mario.style.animation = "0.35s ease-in 0s infinite change"
                inter()
            }, 2000)
        }
        mario.style.animation = "2s ease-in 0s fall"
        if (count === 3) {
            document.getElementById("over").play();
            updateLocal(points)
            clearInterval(interval)
            mess.style.display = "flex"
            mess.style.animation = "2s ease-in-out 0s forwards normal fail"
        }
    }
    else if (type === 3 && side === "right") {

        life[count++].remove()
        clearInterval(b)
        clearInterval(a)
        if (count < 3) {
            document.getElementById("wrong").play();
            const contin = setTimeout(() => {
                newDiv.remove()
                inter()
                mario.style.animation = "0.35s ease-in 0s infinite change"
            }, 2000)
        }
        mario.style.animation = "2s ease-in 0s fall2"
        if (count === 3) {
            document.getElementById("over").play();
            updateLocal(points)
            clearInterval(interval)
            mess.style.display = "flex"
            mess.style.animation = "2s ease-in-out 0s forwards normal fail"
        }
    }
    else if (type === 2 && side === "right") {
        document.getElementById("wow").play();
        newDiv.remove()
        points += 20
        pointsElement.textContent = `הניקוד שלך:${points}`
    }

    else if (type === 4 && side === "left") {
        document.getElementById("wow").play();
        newDiv.remove()
        points += 20
        pointsElement.textContent = `הניקוד שלך:${points}`
    }
}

const updateLocal = ((points) => {
    let user = JSON.parse(localStorage.getItem("localUser"))
    let currentGame = user.gamesHistory.find((itm) => {
        return itm.gameNum === 1
    })
    currentGame.pointes = points
    if (currentGame.highPoinetes < currentGame.pointes) {
        c.style.animation = "0.5s ease-in-out 1.5s normal forwards c"
        currentGame.highPoinetes = points
    }
    user.gamesHistory = user.gamesHistory.map((e) => {
        if (e.gameNum === 1)
            e = currentGame
        return e
    })

    let users = JSON.parse(localStorage.getItem("name"))
    const a = users.find((e) => {
        return e.id === user.id
    })
    users = users.map((e) => {
        if (e.id === a.id)
            e = user
        return e
    })
    user = JSON.stringify(user)
    localStorage.setItem("localUser", user)
    users = JSON.stringify(users)
    localStorage.setItem("name", users)
})