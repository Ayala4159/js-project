const h1=document.querySelector("h1")
const user=JSON.parse(localStorage.getItem("localUser"))
console.log(h1.textContent)
h1.textContent=`-שלום ${user.firstName} ${user.lastName}😊-`

const g11=document.querySelector(".g11")
const g22=document.querySelector(".g22")


g11.textContent="השיא שלך:"+user.gamesHistory[0].highPoinetes+"\n"+"ניקוד במשחק האחרון:"+user.gamesHistory[0].pointes
g22.textContent="השיא שלך:"+user.gamesHistory[1].highPoinetes+"\n"+"ניקוד במשחק האחרון:"+user.gamesHistory[1].pointes
console.log(g11.textContent)
console.log(g22.textContent)