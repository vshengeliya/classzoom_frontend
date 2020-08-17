let studentUrl = "http://localhost:3000/students"

async function fetchStudents (){
   let response = await fetch(studentUrl)
   let data = await response.json()
   data.forEach(student =>{
       let li = document.createElement('li')
       li.innerText = `Name: ${student.name}, Zoom: ${student.zoom_url}`
       let ul = document.getElementById("students")
       ul.appendChild(li)
   })
}
fetchStudents()