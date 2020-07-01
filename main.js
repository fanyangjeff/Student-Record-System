window.onload = ()=>{
    setupLoginBox();
    enableButtonGroup();
    enableLoginButton();
}

function setupLoginBox(){
    var mainContainer = document.querySelector("#mainContainer");
    centerElement(mainContainer, document.body);
    
    var login = document.querySelector("#login-body");
    centerElement(login, login.parentElement);

    
    var btnGroup = document.querySelector(".btn-group");
    btnGroup.style.left = (btnGroup.parentElement.offsetWidth - btnGroup.offsetWidth) / 2 + "px";
    btnGroup.style.top = 10 + "px";
    
    var loginButton = document.querySelector("#login-button");
    loginButton.style.left = loginButton.parentElement.offsetWidth - loginButton.offsetWidth - 10 +"px";
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
        }
    })
}


function enableLoginButton(){
    var loginButton = document.querySelector("#login-button");
    loginButton.onclick = function(){

        let pid = document.querySelector("#pid");
        let password = document.querySelector("#password");

        if(pid.value == ""){
            alert("pid cannot be empty");
            return;
        }
        if(password.value == ""){
            password = "123456";
        }

        var type = document.querySelector(".disabled").innerHTML.toLowerCase();

        
        ajaxFetch({ url: "login.php", 
                    method: "post",
                    data: {
                        pid: pid.value,
                        pw: password.value,
                        type: type
                    }, 
                    resolve: function(response){
                        let result = JSON.parse(response);
                        let code = result["code"];
                        let msg = result["msg"];
                        let alertBox = document.querySelector("#alert-box");

                        if(code){
                            alertBox.className = "alert alert-danger";
                            alertBox.innerHTML = msg;
                        }
                        else{
                            alertBox.className = "alert alert-success";
                            alertBox.innerHTML = msg;
                            setTimeout(function(){
                                proceedToPersonalPage(type, pid.value);
                                
                            }, 500);
                        }
                    }})
       
    }
}

function proceedToPersonalPage(type, pidValue){
    if(type == "administers"){
        location.assign("administer/administer-index.html");
    }

    else if(type == "students"){
        location.assign("students/students-index.html?" + "pid=" + pidValue);
    }
}