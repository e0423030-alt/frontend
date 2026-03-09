const BASE_URL = "https://internal-training-enrollement-system.onrender.com"


async function register(){

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
password: document.getElementById("password").value,
role: document.getElementById("role").value
}

const res = await fetch(BASE_URL + "/user/Register",{
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

const res = await fetch(BASE_URL + "/user/login",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(data)
})

const result = await res.json()

console.log(result)

if(result.token){

localStorage.setItem("token", result.token)

alert("Login successful")

const payload = JSON.parse(atob(result.token.split(".")[1]))

if(payload.role === "TRAINER"){
window.location.href = "trainer.html"
}else{
window.location.href = "employee.html"
}

}else{

document.getElementById("msg").innerText = result.message

}

}



async function createTraining(){

const token = localStorage.getItem("token")

const data = {
trainingName: document.getElementById("trainingName").value,
description: document.getElementById("description").value,
seatLimit: document.getElementById("seatLimit").value
}

const res = await fetch(BASE_URL + "/request/training/create",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + token
},
body:JSON.stringify(data)
})

const result = await res.json()

alert(result.message)

}


async function getTrainings(){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL + "/request/training/all",{
headers:{
"Authorization":"Bearer " + token
}
})

const result = await res.json()

const list = document.getElementById("trainingList")

list.innerHTML = ""

result.trainings.forEach(t => {

const li = document.createElement("li")

li.innerHTML = t.trainingName + " | Seats: " + t.enrolledCount + "/" + t.seatLimit +
` <button onclick="enroll('${t._id}')">Enroll</button>`

list.appendChild(li)

})

}



async function enroll(id){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL + "/request/training/enroll/" + id,{
method:"POST",
headers:{
"Authorization":"Bearer " + token
}
})

const result = await res.json()

alert(result.message)

}



async function myEnrollments(){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL + "/request/training/my-enrollments",{
headers:{
"Authorization":"Bearer " + token
}
})

const result = await res.json()

const list = document.getElementById("myEnrollments")

list.innerHTML = ""

result.enrollments.forEach(e => {

const li = document.createElement("li")

li.innerText = e.training.trainingName

list.appendChild(li)

})

}