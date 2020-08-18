document.addEventListener("DOMContentLoaded", e=>{
    document.styleSheets[53].disabled = true;

    const studentUrl = "http://localhost:3000/students"
    const meetingsUrl = "http://localhost:3000/meetings"
    const studentUl = document.getElementById("students")
    const navBar = document.querySelector("#nav-tool")
    
    navBar.hidden = true
    
    function welcomeUser(){
            let welcomeForm = document.querySelector("#welcome")
    
         welcomeForm.innerHTML =`
         <div class="container">
         <form class="student-signin-form">
           <h3>Welcome to Flatiron School!</h3>
    
           <input
             type="text"
             name="name"
             value=""
             placeholder="Enter your name"
             class="input-text"/>
           <br/>
           <input
             type="text"
             name="email"
             value=""
             placeholder="Enter your email"
             class="input-text"/>
           <br/><br/>
           <input
             type="submit"
             name="submit"
             value="Enter the Classroom"
             class="submit"/>
         </form>
        </div>
         `
         welcomeForm.addEventListener("submit", e=>{
        
                 e.preventDefault()
                 let name = e.target.name.value
                 let email = e.target.email.value
        
             welcomeForm.remove()
             navBar.hidden = false
    
             let body = {
                name: name,
                email: email,
                // zoom_meeting_id: null,
                // zoom_meeting_password:null,
                // zoom_meeting_time: null,
                // zoom_meeting_length: null      
             }  
             const options = {
                     method: 'POST',
                     headers: {
                             'Content-Type': 'application/json',
                             'Accept': 'application/json',
                         },
                     body: JSON.stringify(body)
                     }  
                     fetch(meetingsUrl, options)
            
                 })//welcomeForm eventL
            }//f welcomeUser
            
        welcomeUser()
            
    // navBar.hidden = false
    
    async function fetchStudents (){
        // debugger
        let response = await fetch(studentUrl)
        let data = await response.json()
        
        console.log(data)
        
        data.forEach(student =>{
            let div = document.createElement('div')
            div.dataset.id = `${student.id}`
            div.id = "rectangle"
            div.innerText = `${student.name}` 
            studentUl.appendChild(div)
        }) 
    }
    
    fetchStudents()
    
    studentUl.addEventListener("click", e=>{
        const meetingForm = document.getElementById("meeting_form")
        
        let id = parseInt(e.target.dataset.id)
        
        async function fetchOneStudent (){
        let response = await fetch(studentUrl)
        let data = await response.json()
        let host_student =  data.filter(student =>( student.id === id))
        console.log(host_student[0])

        let hostZoomURL = host_student[0].zoom_meeting_url
        let hostMeetingId = host_student[0].zoom_meeting_id
        let hostMeetingPassword = host_student[0].zoom_meeting_password
        
        // debugger
        meetingForm.display_name.value = hostZoomURL
        meetingForm.meeting_number.value = hostMeetingId
        meetingForm.meeting_pwd.value = hostMeetingPassword
              
            meetingForm.addEventListener("submit", e=>{
                
                e.preventDefault()
                // debugger
                // <div id=zmmtg-root>
                // <span class="footer__leave-btn-text">Leave Meeting</span>
                //on click hide div id=zmm, change the boolean 

            // on click join iFrame - window pops up,
            //student.status = flase
            //PATCH request to student
            
            //on click on "red button(cancel call in iFrame)"
            //student.status = active
            //no patch request - action happens in back end
            //GET reqest to RAILS
            
            console.log("click form")          
            
            })//form  
        
        }//fetchOne Student
        fetchOneStudent()
    })//evenListener
})//Content Loaded