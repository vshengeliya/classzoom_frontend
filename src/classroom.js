document.addEventListener("DOMContentLoaded", e => {
    document.styleSheets[53].disabled = true;
    let signedUser;
    
    const studentUrl = "http://localhost:3000/students"
    const meetingsUrl = "http://localhost:3000/meetings"
    const studentUl = document.getElementById("students")
    const navBar = document.querySelector("#nav-tool")
    const bodyHTML = document.getElementsByTagName('body')[0]
    
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

            fetchStudents(name)
        
            welcomeForm.remove()
            navBar.hidden = false

            let userDropdown = document.createElement('div')

            userDropdown.innerHTML=`
               <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      User Info
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a id="update_name" class="dropdown-item" href="#">Update_Name</a>
                      <a id="update_email" class="dropdown-item" href="#">Update_email</a>
                      <a id="delete_user" class="dropdown-item" href="#">Delete_User</a>
                      </div>
                      </div>
                      `
                    bodyHTML.appendChild(userDropdown)
                    
                      //   userInfo.addEventListener("click", e=>{
                          
                          //       if (userInfo.children[0].innerText === "Update_Name"){
                              //           console.log("update")
                              //           let userName = document.createElement('input')
                              //           userName.innerText=""
                              //           userInfo.appendChild(userInfo)
                              //       }
                              //    
            let userInfo = document.querySelector(".dropdown-menu")
            
            userInfo.addEventListener("click", e=>{
                if (e.target.matches("#update_name")){
                    
                    let updateForm = document.createElement('form')
                    updateForm.innerHTML =`
                    <label for="name" ></label>
                    <input type="text" id="name" name="name" placeholder="Enter new name"><br><br>
                    <input type="submit" value="Submit">
                    `
                    bodyHTML.appendChild(updateForm)

                    updateForm.addEventListener("submit", e=>{

                        e.preventDefault()

                        let newName = e.target.name.value

                        const options = {
                            method: 'PATCH',
                            headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                            body: JSON.stringify({name: newName})
                        }  

                        fetch(`${studentUrl}/${signedUser.id}`, options)
                        .then(resp => resp.json())
                        .then (data => {
                            signedUser.name = data.name
                            document.querySelector(`[data-id="${signedUser.id}"]`).textContent = data.name
                            updateForm.remove()
                        })
                    })

                } else if (e.target.matches("#update_email")){
                
                    let updateForm = document.createElement('form')
                    updateForm.innerHTML =`
                    <label for="email" ></label>
                    <input type="text" id="email" name="email" placeholder="Enter new email"><br><br>
                    <input type="submit" value="Submit">
                    `
                    bodyHTML.appendChild(updateForm)

                    updateForm.addEventListener("submit", e=>{
                        e.preventDefault()

                        let newEmail = e.target.email.value

                        const options = {
                            method: 'PATCH',
                            headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                            body: JSON.stringify({email: newEmail})
                            }  

                        fetch(`${studentUrl}/${signedUser.id}`, options)
                        .then(resp => resp.json())
                        .then (data => {
                            signedUser.name = data.email
                            updateForm.remove()
                        })
                    })

                } else if (e.target.matches("#delete_user")) {
                    e.preventDefault()

                    const options = {method: 'DELETE'}
                    fetch(`${studentUrl}/${signedUser.id}`, options)
                    .then(data =>{
                    let activeUser = document.querySelector(`[data-id="${signedUser.id}"]`)
                    activeUser.remove()// troubleshoot with real data
                    })
                    updateForm.remove()
                }
            })// userInfo eventL          
        }) // welcomeForm eventL
    } // welcomeUser fn
                
        // welcomeUser()
            
    //TODO- testing on Thursday with smaller seed-sample to be mindful of API call limits
    async function createMeetings() {
        const options = {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            body: JSON.stringify({student: {id: signedUser.id}})
            }  
        fetch(meetingsUrl, options)
    }
            
    async function fetchStudents (name){
        
        let response = await fetch(studentUrl)
        let data = await response.json()
        
        data.forEach(student =>{
            if(student.name === name){

                currentUser(student)
            } else {
                let div = document.createElement('div')
                div.dataset.id = `${student.id}`
                div.id = "rectangle"
                div.innerText = `${student.name}` 
                studentUl.appendChild(div)
            }
        }) 
    }

    function currentUser(studentObj){
        signedUser = studentObj
        let div = document.createElement('div')
         div.id = "rectangle"
         div.dataset.id = studentObj.id
         div.innerText= studentObj.name
         studentUl.appendChild(div)
         div.style.color = 'green'
     
    }
     
    studentUl.addEventListener("click", e=>{
        const meetingForm = document.getElementById("meeting_form")
        
        let id = parseInt(e.target.dataset.id)
        
        async function fetchOneStudent (){
        let response = await fetch(studentUrl)
        let data = await response.json()
        let host_student =  data.filter(student =>( student.id === id))
        console.log(host_student[0])

        let hostZoomName = host_student[0].name
        let hostMeetingId = host_student[0].zoom_meeting_id
        let hostMeetingPassword = host_student[0].zoom_meeting_password
        
               meetingForm.display_name.value = hostZoomName
        meetingForm.meeting_number.value = hostMeetingId
        meetingForm.meeting_pwd.value = hostMeetingPassword
              
            meetingForm.addEventListener("submit", e=>{
                
                e.preventDefault()
                // NO WINDOW POP UP!!!

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
    })//eventListener


})//Content Loaded