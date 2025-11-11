const form = document.querySelector("form")
const f_n = document.getElementById("f_n")
const l_n = document.getElementById("l_n")
const pas = document.getElementById("pas")

const msg = document.querySelector(".mesg")
const text = document.querySelector(".text")
const tryAgain = document.querySelector(".tryAgain")
let help=0
let a

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const arry = (JSON.parse(localStorage.getItem("name")))

    if (exist(arry, f_n, l_n, pas)) {
        const localUser = JSON.stringify(a)
        localStorage.setItem("localUser", localUser)
        window.location.replace("./Menu.html")
    }
    else{
        form.style.display = "none"
        msg.style.display = "flex"
        text.textContent = "השם אינו קיים במערכת נא להרשם"
        tryAgain.addEventListener("click", () => {
        window.location.replace("./Register.html")
        })
    }
    if(help>0){
        form.style.display = "none"
        msg.style.display = "flex"
        text.textContent = "הסיסמא אינה תקינה"
        tryAgain.textContent="נסה שנית"
        tryAgain.addEventListener("click", () => {
            window.location.replace("./Enter.html")
        })
    }
})

const exist = (arry, f_n, l_n, pas) => {
    if (arry === null) {
        return false
    }
    else {
        a = arry.find((item) => {
            return ((item.firstName + " " + item.lastName === f_n.value + " " + l_n.value))
        })
        if (a !== undefined) {//אם השם קיים
            if (a.password === pas.value)//אם הסיסמא תואמת
                return true
            else{
                help++
            }
            
        }
       else{
        
        return false //אם השם לא קיים
       }
        
    }

}
// Aa123456
