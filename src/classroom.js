document.addEventListener("DOMContentLoaded", e=>{
    document.styleSheets[53].disabled = true;
    
    const studentUrl = "http://localhost:3000/students"
    const meetingsUrl = "http://localhost:3000/meetings"
    const studentUl = document.getElementById("students")
    const navBar = document.querySelector("#nav-tool")
    const bodyHTML = document.getElementsByTagName('body')[0]
    
    navBar.hidden = true
    
    function welcomeUser(){
        // debugger
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

                              let updateName = document.getElementById("update_name")
                              updateName.addEventListener("click", e=>{
                                  console.log("update")
                                  let userName = document.createElement('li')
                                  userName.innerHTML=`
                                  <form>
                                    <label for="name">Name:</label>
                                    <input type="text" id="name" name="name"><br><br>
                                    <input type="submit" value="Submit">
                                </form>
                                  `
                                  updateName.appendChild(userName)

                                  //FINISH PATCH when updateName
                
                                })
                                let updateEmail = document.getElementById("update_email")
                                updateEmail.addEventListener("click", e=>{
                                    console.log("email")
                                    let userEmail = document.createElement('li')
                                  userEmail.innerHTML=`
                                  <form>
                                    <label for="email">Email:</label>
                                    <input type="text" id="email" name="email"><br><br>
                                    <input type="submit" value="Submit">
                                </form>
                                  `
                                  updateEmail.appendChild(userEmail)

                                  //FINISH PATCH when updateEmail
                                })
                                let deleteUser = document.getElementById("delete_user")
                                deleteUser.addEventListener("click", e=>{
                                    console.log("delete")
                                    let student_id //need to locate the user id
                                    const options = {method: 'DELETE'}
                                    fetch(studentUrl/`${student_id}`, options)
                                    .then(data =>{
                                let currentUser = document.querySelectorAll(`[data-set="${student_id}"]`)
                                currentUser.remove()// troubleshoot with real data
                            })
                    })
    
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
                     fetch(studentUrl, options)//changed back to studentURL from meetingUrl

                    //need to have a create controler in a back end to update the DB + ?create new meeting info?   
            
                    })//welcomeForm eventL
                }//f welcomeUser
                
                welcomeUser()
                
                fetchStudents()
                    async function fetchStudents (){
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
        
        // debugger
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
    })//evenListener




})//Content Loaded