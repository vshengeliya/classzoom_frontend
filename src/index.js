import { ZoomMtg } from `@zoomus/websdk`;


document.addEventListener("DOMContentLoaded", e=>{
    
    const studentUrl = "http://localhost:3000/students"
    const meetingsUrl = "http://localhost:3000/meetings"
    const studentUl = document.getElementById("students")
    const navBar = document.querySelector("#nav-tool")
    
    navBar.hidden = true
    
    function welcomeUser(){
            let welcomeForm = document.querySelector("#welcome")
    
         welcomeForm.innerHTML =`
         <div class="container">
         <form class="add-toy-form">
           <h3>Welcome to FlatIron School!</h3>
    
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


// Zoom join_iframe and join_zoom_app handler

(function () {
    let testTool = window.testTool;
    if (testTool.isMobileDevice()) {
      vConsole = new VConsole();
    }
    console.log("checkSystemRequirements");
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
  
    // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
    // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.10/lib', '/av'); // CDN version default
    // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.10/lib', '/av'); // china cdn option
    // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
    ZoomMtg.preLoadWasm();
  
    let API_KEY = ENV["API_KEY"];
  
    /**
     * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
     * The below generateSignature should be done server side as not to expose your api secret in public
     * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */
    let API_SECRET = ENV["API_KEY"];
  
    // some help code, remember mn, pwd, lang to cookie, and autofill.
    document.getElementById("display_name").value =
      "CDN" +
      ZoomMtg.getJSSDKVersion()[0] +
      testTool.detectOS() +
      "#" +
      testTool.getBrowserInfo();
    document.getElementById("meeting_number").value = testTool.getCookie(
      "meeting_number"
    );
    document.getElementById("meeting_pwd").value = testTool.getCookie(
      "meeting_pwd"
    );
    if (testTool.getCookie("meeting_lang"))
      document.getElementById("meeting_lang").value = testTool.getCookie(
        "meeting_lang"
      );
  
    document
      .getElementById("meeting_lang")
      .addEventListener("change", function (e) {
        testTool.setCookie(
          "meeting_lang",
          document.getElementById("meeting_lang").value
        );
        testTool.setCookie(
          "_zm_lang",
          document.getElementById("meeting_lang").value
        );
      });
    // copy zoom invite link to mn, autofill mn and pwd.
    document
      .getElementById("meeting_number")
      .addEventListener("input", function (e) {
        let tmpMn = e.target.value.replace(/([^0-9])+/i, "");
        if (tmpMn.match(/([0-9]{9,11})/)) {
          tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
        }
        let tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
        if (tmpPwd) {
          document.getElementById("meeting_pwd").value = tmpPwd[1];
          testTool.setCookie("meeting_pwd", tmpPwd[1]);
        }
        document.getElementById("meeting_number").value = tmpMn;
        testTool.setCookie(
          "meeting_number",
          document.getElementById("meeting_number").value
        );
      });
  
    document.getElementById("clear_all").addEventListener("click", function (e) {
      testTool.deleteAllCookies();
      document.getElementById("display_name").value = "";
      document.getElementById("meeting_number").value = "";
      document.getElementById("meeting_pwd").value = "";
      document.getElementById("meeting_lang").value = "en-US";
      document.getElementById("meeting_role").value = 0;
      window.location.href = "/index.html";
    });
  
    // click join meeting button
    document
      .getElementById("join_meeting")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let meetingConfig = testTool.getMeetingConfig();
        if (!meetingConfig.mn || !meetingConfig.name) {
          alert("Meeting number or username is empty");
          return false;
        }
  
        
        testTool.setCookie("meeting_number", meetingConfig.mn);
        testTool.setCookie("meeting_pwd", meetingConfig.pwd);
        
        let signature = ZoomMtg.generateSignature({
          meetingNumber: meetingConfig.mn,
          apiKey: API_KEY,
          apiSecret: API_SECRET,
          role: meetingConfig.role,
          success: function (res) {
            console.log(res.result);
            meetingConfig.signature = res.result;
            meetingConfig.apiKey = API_KEY;
            let joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
            console.log(joinUrl);
            window.open(joinUrl, "_blank");
          },
        });
      });
  
    // click copy join link button
    window.copyJoinLink = function (element) {
      let meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        alert("Meeting number or username is empty");
        return false;
      }
      let signature = ZoomMtg.generateSignature({
        meetingNumber: meetingConfig.mn,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        role: meetingConfig.role,
        success: function (res) {
          console.log(res.result);
          meetingConfig.signature = res.result;
          meetingConfig.apiKey = API_KEY;
          let joinUrl =
            testTool.getCurrentDomain() +
            "/meeting.html?" +
            testTool.serialize(meetingConfig);
          $(element).attr("link", joinUrl);
          let $temp = $("<input>");
          $("body").append($temp);
          $temp.val($(element).attr("link")).select();
          document.execCommand("copy");
          $temp.remove();
        },
      });
    };
  
    // click join iframe button
    document
      .getElementById("join_iframe")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let meetingConfig = testTool.getMeetingConfig();
        if (!meetingConfig.mn || !meetingConfig.name) {
          alert("Meeting number or username is empty");
          return false;
        }
        let signature = ZoomMtg.generateSignature({
          meetingNumber: meetingConfig.mn,
          apiKey: API_KEY,
          apiSecret: API_SECRET,
          role: meetingConfig.role,
          success: function (res) {
            console.log(res.result);
            meetingConfig.signature = res.result;
            meetingConfig.apiKey = API_KEY;
            let joinUrl =
              testTool.getCurrentDomain() +
              "/meeting.html?" +
              testTool.serialize(meetingConfig);
            testTool.createZoomNode("websdk-iframe", joinUrl);
          },
        });
      });
  })();
  