// import axios from 'axios';

document.addEventListener("DOMContentLoaded", e => {

    document.styleSheets[53].disabled = true;

    let signedInUser = JSON.parse(localStorage.getItem('loggedIn'))
    
    const studentUrl = "http://localhost:3000/students"
    const meetingsUrl = "http://localhost:3000/meetings"
    const classroomUrl = "http://localhost:3000/classrooms/13"
    const teacherUrl = "http://localhost:3000/teachers"
    
    const studentWrapper = document.querySelector(".wrapper-classroom");
    const navBar = document.querySelector("#nav-tool")
    const bodyHTML = document.getElementsByTagName('body')[0]
    
    navBar.style.display = 'none'

 

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      function accountControl() {
        document.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                  var openDropdown = dropdowns[i];
                  if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                  }
                }
            }
        }
    }//f accountContol

    
    function welcomeUser(){
         
        const welcomePage = document.querySelector(".wrapper-welcome")
        const welcomeImage = document.createElement('img')
        welcomeImage.src ="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fumbrellatech.co%2Fwp-content%2Fuploads%2F2019%2F06%2FClassroom-Door-Lockdown-Device.png"
        welcomeImage.className="image-welcome-bg"
        welcomePage.appendChild(welcomeImage)
        
        // let welcomePage = document.createElement('div')
        // welcomePage.className = "welcome-page"

        const loginForm = document.createElement("form")
        loginForm.classList.add("welcome-signin-form")
        loginForm.innerHTML =`    
         <input
             type="text"
             name="email"
             value=""
             placeholder="Enter your email"
             class="input-text"/>
             <br/>
             <input
             type="text"
             name="password"
             value=""
             placeholder="Enter your password"
             class="input-text"/>
             <br/><br/>
             <input
             type="submit"
             name="submit"
             value="Enter the Classroom"
             class="submit"/>
             </form>
             `
             welcomePage.appendChild(loginForm);

             welcomePage.addEventListener("submit", e=>{
                 e.preventDefault()
            // TODO - change to email and password for auth flow
            let email = e.target.email.value
            let password = e.target.password.value
           
            // TODO - incorporate post request to sessions controller for user Auth and localStorage of cookies
            instance = axios.create({
                baseURL: 'http://localhost:3000',
               });
               instance
                .post("/sessions", { email: email, password: password })
                .then(response => {
                    localStorage.setItem("loggedIn", JSON.stringify(response.data));
                })
            //* to extract localStorage stuff -> let signedInUser = JSON.parse(localStorage.getItem('loggedIn'))
            
            // fetchStudents(name)
            // fetchTeacher()
            welcomePage.innerHTML=''
            // navBar.hidden = false

            function renderAccountControl(){
                const userWrapper  = document.querySelector(".wrapper-classroom-currentuser")
                let userDropdown = document.createElement('div')
            userDropdown.classList.add("user-profile-menu")
            userDropdown.innerHTML= `
                <div class="dropdown">
                    <button onclick="${myFunction}" class="dropbtn">Account Control Panel</button>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#">Update Name</a>
                        <a href="#">Update Email</a>
                        <a href="#">Delete My Account</a>
                    </div>
                </div>`

                userWrapper.appendChild(userDropdown)
            }//f accountControl

            /* userDropdown.innerHTML=`
               <div class="dropdown">
                    <button class="btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      User Info
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a id="update_name" class="dropdown-item" href="#">Update_Name</a>
                      <a id="update_email" class="dropdown-item" href="#">Update_email</a>
                      <a id="delete_user" class="dropdown-item" href="#">Delete_User</a>
                    </div>
                </div>
                      `*/
            // bodyHTML.appendChild(userDropdown)
                    
                      //   userInfo.addEventListener("click", e=>{
                          
                          //       if (userInfo.children[0].innerText === "Update_Name"){
                              //           console.log("update")
                              //           let userName = document.createElement('input')
                              //           userName.innerText=""
                              //           userInfo.appendChild(userInfo)
                              //       }
                              //    
            
            function clickHandler() {
                const updateForm = document.createElement('form')

                document.addEventListener("click", e => {
                    
                    if (e.target.textContent === "Update Name"){
                        
                        updateForm.innerHTML =`
                            <label for="name" ></label>
                            <input type="text" id="name" name="name" placeholder="Enter new name"><br><br>
                            <input type="submit" class="btn btn-secondary" value="Submit">
                            `
                        bodyHTML.appendChild(updateForm)    
                        
                        updateForm.addEventListener("submit", e => {
                            
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

                            fetch(`${studentUrl}/${signedInUser.user.id}`, options)
                            .then(resp => resp.json())
                            .then (data => {
                                signedInUser.user.name = data.name
                                document.querySelector(`[data-id="${signedInUser.user.id}"]`).innerHTML = `
                                    <div class="row" data-id="${signedInUser.user.id}"><span class="student-name"> <img class="desk" src="https://i.dlpng.com/static/png/6363196_thumb.png">${data.name}</span></div>
                                    `
                                updateForm.remove()
                            })
                        })

                    } else if (e.target.textContent === "Update Email"){
                    
                        // let updateForm = document.createElement('form')
                        updateForm.innerHTML =`
                        <label for="email" ></label>
                        <input type="text" id="email" name="email" placeholder="Enter new email"><br><br>
                        <input type="submit" class="btn btn-secondary" value="Submit">
                        `
                        bodyHTML.appendChild(updateForm)

                        updateForm.addEventListener("submit", e => {
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

                            fetch(`${studentUrl}/${signedInUser.user.id}`, options)
                            .then(resp => resp.json())
                            .then (data => {
                                localStorage.setItem('loggedIn', JSON.stringify(data))
                                updateForm.remove()
                            })
                        })
                    
                    } else if ((e.target.textContent === "Delete My Account")) {
                        e.preventDefault()

                        const options = {method: 'DELETE'}
                        fetch(`${studentUrl}/${signedInUser.user.id}`, options)
                        .then(data =>{
                            let activeUser = document.querySelector(`[data-id="${signedInUser.user.id}"]`)
                            activeUser.remove()// troubleshoot with real data
                        })
                        updateForm.remove()
                    }
                })// userInfo eventL
            }
            debugger
            if (signedInUser.logged_in){

                //* uncomment to enable zoom meeting creation for user upon login via ZoomAPI
                // createMeetings()
                fetchStudents()
                fetchTeacher()
                fetchEvents()
                clickHandler()
                renderAccountControl()
            
            } else{
                welcomeUser()
            }
        }) // welcomePage eventL
// debugger
    } // welcomeUser fn          
   
    welcomeUser()
     
    

    //TODO- testing on Thursday with smaller seed-sample to be mindful of API call limits
    async function createMeetings() {
        const options = {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            body: JSON.stringify({student: {id: signedInUser.user.id}})
            }  
        fetch(meetingsUrl, options)
    }
            
    async function fetchStudents (){
        
        let response = await fetch(studentUrl)
        let data = await response.json()
         
        let count = 0;
        let studentNode;

        data.forEach(student =>{
    
            if (count % 5 === 0) {

                studentNode = document.createElement('div');
                studentNode.classList.add("column-desk");
                let divRow = document.createElement('div');
                divRow.classList.add('row');
                divRow.dataset.id = `${student.id}`
                divRow.innerHTML = `<span class="student-name"> <img class="desk" src="https://i.dlpng.com/static/png/6363196_thumb.png">${student.name}</span>`
                studentNode.appendChild(divRow)
                studentWrapper.appendChild(studentNode)
                currentUser(signedInUser, divRow)
            } else {
                let column = document.querySelectorAll(".column-desk")[document.querySelectorAll(".column-desk").length - 1]
                studentNode = document.createElement('div');
                studentNode.classList.add("row");
                studentNode.dataset.id = `${student.id}`
                studentNode.innerHTML = `<span class="student-name"> <img class="desk" src="https://i.dlpng.com/static/png/6363196_thumb.png">${student.name}</span>`
                column.appendChild(studentNode)
                currentUser(signedInUser, studentNode)
            }
            count++

            
            
            // this code changed logged-in user's textContent color to green to represent logged-in status
            // if(student.name === name){
            //     currentUser(student)
          
       
        })        
    }

    // this code changed logged-in user's textContent color to green to represent logged-in status
    function currentUser(signedInUser, div){
        // signedUser = studentObj
        // let div = document.createElement('div')
        // div.classList.add("student-desk")
        // div.dataset.id = studentObj.id
        // div.innerText= studentObj.name
        // studentUl.appendChild(div)
        if (signedInUser.user.id == div.dataset.id){


// debugger
            div.style.color = 'green'
        }
    }
     
    studentWrapper.addEventListener("click", e=>{
        const meetingForm = document.getElementById("meeting_form")
        
        let id = parseInt(e.target.closest(".row").dataset.id)
        
        async function fetchOneStudent (){
            let response = await fetch(studentUrl + "/" + id)
            let host_student = await response.json()
            
            let hostZoomName = host_student.name
            let hostMeetingId = host_student.zoom_meeting_id
            let hostMeetingPassword = host_student.zoom_meeting_password
            
            meetingForm.display_name.value = hostZoomName
            meetingForm.meeting_number.value = hostMeetingId
            meetingForm.meeting_pwd.value = hostMeetingPassword
            navBar.style.display = 'block'
        }//fetchOne Student
        fetchOneStudent()
    })//eventListener

   function fetchEvents(){
        fetch(classroomUrl)
        .then(resp =>resp.json())

        .then(data => data.events.forEach(event=>{

            let eventDiv = document.querySelector(".wrapper-classroom-events")
            let divColumnEvent = document.createElement('div')
            divColumnEvent.className='column-event'
            divColumnEvent.innerHTML=`
            <div class="row"> 
                <span class="event"> 
                        <h3 style="color:Salmon;">${event.name}</h3>
                        <h4>${event.date}<h4/>
                        <h5>${event.time}<h5/>
                        <h5>${event.description}</h5>
                        <p style="color:CornflowerBlue;">${event.zoom_url}</p>
                </span>  
            </div>`

            eventDiv.appendChild(divColumnEvent)
        })) 
    }//Fetch Events
    
    function fetchTeacher(){    
    fetch(teacherUrl)
    .then(resp =>resp.json())
    .then(data => data.forEach(teacher =>{
            let teacherUl = document.createElement('ul')
            let teacherDiv = document.createElement('div')
            teacherUl.appendChild(teacherDiv)
            studentWrapper.insertAdjacentElement('beforebegin', teacherUl)
            teacherDiv.innerText = `Class teacher: ${teacher.name}`
            teacherDiv.style.color = 'BlueViolet'
        })
    )}
}) // Content Loaded