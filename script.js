const BASE_URL = "https://internal-training-enrollement-system.onrender.com"


async function register(){

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
password: document.getElementById("password").value,
role: document.getElementById("role").value
}

const res = await fetch(BASE_URL+"/user/register",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(data)
})

const result = await res.json()
document.getElementById("msg").innerText = result.message
}


async function login(){

const data = {
email: document.getElementById("email").value,
password: document.getElementById("password").value
}

const res = await fetch(BASE_URL+"/user/login",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(data)
})

const result = await res.json()

localStorage.setItem("token", result.token)

if(result.token){
alert("Login successful")

const payload = JSON.parse(atob(result.token.split(".")[1]))

if(payload.role==="TRAINER"){
window.location="trainer.html"
}else{
window.location="employee.html"
}

}else{
document.getElementById("msg").innerText=result.message
}

}
async function createTraining(){

const token = localStorage.getItem("token")

const data = {
trainingName: document.getElementById("trainingName").value,
description: document.getElementById("description").value,
seatLimit: document.getElementById("seatLimit").value
}

const res = await fetch(BASE_URL+"/training/create",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token
},
body:JSON.stringify(data)
})

const result = await res.json()

alert(result.message)
}
async function getTrainings(){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL+"/training/all",{
headers:{
"Authorization":"Bearer "+token
}
})

const result = await res.json()

const list = document.getElementById("trainingList")
list.innerHTML=""

result.trainings.forEach(t=>{
const li = document.createElement("li")
li.innerHTML = t.trainingName + " - Seats: " + t.seatLimit +
` <button onclick="enroll('${t._id}')">Enroll</button>`
list.appendChild(li)
})
}

async function enroll(id){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL+"/training/enroll/"+id,{
method:"POST",
headers:{
"Authorization":"Bearer "+token
}
})

const result = await res.json()

alert(result.message)

}