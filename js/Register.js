const form = document.querySelector("form")
const f_n = document.getElementById("f_n")
const l_n = document.getElementById("l_n")
const pas = document.getElementById("pas")
const pas2 = document.getElementById("pas2")

const msg=document.querySelector(".mesg")
const text=document.querySelector(".text")
const tryAgain=document.querySelector(".tryAgain")

let num = 0


form.addEventListener("submit", (event) => {//כששולחים את הטופס
    event.preventDefault()
    let arry = []

    


    if (localStorage.getItem("name") !== null) {
        arry = (JSON.parse(localStorage.getItem("name")))//עידכון המערך
    }

    else {
        arry = []
    }
    const userDetailes = {//אוביקט חדש
            id:arry.length,
            firstName: f_n.value,
            lastName: l_n.value,
            password: pas.value,
            gamesHistory:[{
                gameNum:1,
                pointes:0,
                highPoinetes:0
            },{
                gameNum:2,
                pointes:0,
                highPoinetes:0
            }
        ],
        }
    if (exist(arry,userDetailes.firstName,userDetailes.lastName)) {
        //אם המשתמש אינו קיים
        arry.push(userDetailes)
        const user = JSON.stringify(arry)

        if (password(pas, pas2)) {//בדיקת תקינות סיסמא
            localStorage.setItem("name", user)
            window.location.replace("./Enter.html")

    
        }
    }
})

// פונקציות לאימות הפרטים שהכניס המשתמש

const exist = (arr,f_n,l_n) => {//האם המשתמש קיים

    const a = arr.find((item) => {
        return (item.firstName+" "+item.lastName===f_n+" "+l_n)
    })
    if (a !== undefined) {
        form.style.display="none"
        msg.style.display="flex"
        text.textContent="השם קיים במערכת"
        return false
    }
    return true
}
const password = (pas, pas2) => {//שליחה לבדיקת הסיסמא והדפסת הודעה מתאימה
    if (!checkPas(pas)) {
        form.style.display="none"
        msg.style.display="flex"
        text.textContent="הסיסמא אינה תקינה. סיסמא אמורה ליהיות באורך של 8-10 תווים ולכלול בתוכה לפחות אות אחת גדולה באנגלית ואות אחת קטנה באנגלית"
        return false
    }
    if (!same(pas, pas2)) {
        form.style.display="none"
        msg.style.display="flex"
        text.textContent="אימות הסיסמא אינו תואם"
        return false
    }
    return true
}
const checkPas = (pas) => {
    const arr = []
    if (pas.value.length < 8 || pas.value.length > 10)
        return false
    for (let i = 0; i < pas.value.length; i++) {
        if (pas.value.charAt(i) >= 'a' && pas.value.charAt(i) <= 'z')
            arr[0]++
        else if (pas.value.charAt(i) >= 'A' && pas.value.charAt(i) <= 'Z')
            arr[1]++
        else if (pas.value.charAt(i) >= 0 && pas.value.charAt(i) <= 9)
            arr[2]++
        else
            return false
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0)
            return false
    }
    return true
}
const same = (pas, pas2) => {
    if (pas.value === pas2.value)
        return true
    return false
}

tryAgain.addEventListener("click",()=>{
    window.location.replace("./Register.html")
})
//Aa123456
// localStorage.clear()