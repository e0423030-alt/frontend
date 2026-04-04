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

if(result.message === "success"){

// automatically login after register
const loginRes = await fetch(BASE_URL + "/user/login",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
email:data.email,
password:data.password
})
})

const loginResult = await loginRes.json()

localStorage.setItem("token", loginResult.token)

const payload = JSON.parse(atob(loginResult.token.split(".")[1]))

if(payload.role === "TRAINER"){
window.location.href = "trainer.html"
}else{
window.location.href = "employee.html"
}

}else{

document.getElementById("msg").innerText = result.message

}

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

console.log("ROLE:", payload.role)

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
await myTrainings()

}
async function myTrainings(){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL + "/request/training/my-trainings",{
headers:{
"Authorization":"Bearer " + token
}
})

const result = await res.json()

const list = document.getElementById("trainerTrainings")
list.innerHTML = ""

const trainings = result.trainings || result.data || []

trainings.forEach(t => {

const div = document.createElement("div")
div.className = "card-box"

div.innerHTML = `
<h3>${t.trainingName}</h3>
<p>${t.description}</p>
<p>Seats: ${t.enrolledCount}/${t.seatLimit}</p>
`

list.appendChild(div)

})

}

async function getTrainings(){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL + "/request/training/all",{
headers:{
"Authorization":"Bearer " + token
}
})

const result = await res.json()
console.log("GET TRAININGS CLICKED")
console.log("TRAININGS DATA:", result)

const list = document.getElementById("trainingList")
list.innerHTML = ""

const trainings = result.trainings || result.data || []

trainings.forEach(t => {

const div = document.createElement("div")
div.className = "card-box"

div.innerHTML = `
<h3>${t.trainingName}</h3>
<p>${t.description}</p>
<p>Seats: ${t.enrolledCount}/${t.seatLimit}</p>
<button class="action-btn" onclick="enroll('${t._id}')">Enroll</button>
`

list.appendChild(div)

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

await getTrainings()
await myEnrollments()

}



async function myEnrollments(){

const token = localStorage.getItem("token")

const res = await fetch(BASE_URL + "/request/training/my-enrollments",{
headers:{
"Authorization":"Bearer " + token
}
})

const result = await res.json()
console.log("MY ENROLLMENTS CLICKED")
console.log("ENROLLMENTS DATA:", result)

const list = document.getElementById("myEnrollments")
list.innerHTML = ""
const enrollments = result.enrollments || result.data || []

enrollments.forEach(e => {

const div = document.createElement("div")
div.className = "card-box"

div.innerHTML = `
<h3>${e.training ? e.training.trainingName : "No Training Found"}</h3>
`

list.appendChild(div)

})
}
function logout(){
  localStorage.removeItem("token")
  window.location.href = "index.html"
}

