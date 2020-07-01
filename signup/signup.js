window.onload = ()=>{
    setupLoginBox();
    enableSignUpButton();
    enableButtonGroup();

}

function setupLoginBox(){

    var mainContainer = document.querySelector("#mainContainer");
    centerElement(mainContainer, document.body);
    
    var login = document.querySelector("#login-body");
    centerElement(login, login.parentElement);

    var btnGroup = document.querySelector(".btn-group");
    btnGroup.style.left = (btnGroup.parentElement.offsetWidth - btnGroup.offsetWidth) / 2 + "px";
    btnGroup.style.top = 10 + "px";


    var signupButton = document.querySelector("#signup-button");
    signupButton.style.left = signupButton.parentElement.offsetWidth - signupButton.offsetWidth - 10 +"px";
}


function centerElement(ele1, ele2){
    ele1.style.left = (ele2.offsetWidth - ele1.offsetWidth) / 2 + "px";
    ele1.style.top = (ele2.offsetHeight - ele1.offsetHeight) / 2 + "px";
}

function enableButtonGroup(){
    var btns = document.querySelectorAll(".user-type");
    btns[0].classList.add("disabled");
    btns.forEach(btn => {
        btn.onclick = function(){
            let disabledButton = document.querySelector(".disabled");
            disabledButton.classList.remove("disabled");
            disabledButton.disabled = false;
            btn.classList.add("disabled");
            btn.disabled = true;

            //if the user signs up as a teacher, then we should allow them to select the subject that they teach
            if(btn.innerHTML == "Teachers"){
                let subject = document.querySelector("#subject");
                subject.classList.remove("display-none");
                subject.classList.add("display-block");
            }
            //otherwise, remove teacher div from signup box view
            else{
                let subject = document.querySelector("#subject");
                if(subject.classList.contains("display-block")){
                    subject.classList.remove("display-block");
                    subject.classList.add("display-none");
                }
            }
        }
    })
}


function enableSignUpButton(){
    var signupButton = document.querySelector("#signup-button");
    signupButton.onclick = function(){
        let pid = document.querySelector("#pid");
        let name = document.querySelector("#name");
        let password = document.querySelector("#password");

        if(pid.value == ""){
            alert("studentId cannot be empty");
        }

        if(name.value == ""){
            alert("student name cannot be empty");
        }

        if(password.value == ""){
            password.value = "123456";
        }

        var role = document.querySelector(".disabled");


        ajaxFetch({method: "post",
                   url: "signup.php",
                   data:{
                       pid: pid.value,
                       name: name.value,
                       pw: password.value,
                       role: role.innerHTML
                   },
                   resolve: function(response){
                       var result = JSON.parse(response);
                       var code = result["code"];
                       var msg = result["msg"];

                       let alertBox = document.querySelector("#alert-box");
                       alertBox.classList.remove("display-none");
                       alertBox.classList.add("display-block");
                       
                       //if registered successfully, then the code returned is 0.
                       
                       //registration failed
                       if(code){
                            //alert the user that registration failed
                            alertBox.classList.add("alert-danger");
                            alertBox.innerHTML = msg;
                       }

                       //regiatration succeeded
                       else{
                            alertBox.classList.add("alert-success");
                            alertBox.innerHTML = msg;
                            setTimeout(function(){
                                location.assign("../administer/administer-index.html");
                            },500);

                       }
                       
                       pid.value = "";
                       name.value = "";
                       password.value = "";

                   }

        })
    }
}

