window.onload = ()=>{
    fillInputFields();
    activateSubmitButton();
}

function fillInputFields(){
    var pidInput = document.querySelector("#pid");
    var nameInput = document.querySelector("#name");
    var chineseInput = document.querySelector("#chinese");
    var mathInput = document.querySelector("#math");
    var englishInput = document.querySelector("#english");
    obj = processQueryParameters(location.search);
    
    pidInput.value = obj.pid;
    nameInput.value = obj.name;
    chineseInput.value = obj.chinese;
    mathInput.value = obj.math;
    englishInput.value = obj.english;
}

function activateSubmitButton(){
    
    var submit = document.querySelector("#submit");

    submit.onclick = function(){
        ajaxFetch({ url: "editStudents.php", 
                    method: "post", 
                    data: {
                        pid: document.querySelector("#pid").value, 
                        name: document.querySelector("#name").value,
                        chinese: document.querySelector("#chinese").value,
                        math: document.querySelector("#math").value,
                        english: document.querySelector("#english").value
                    },
                    resolve: function(response){
                        let result = JSON.parse(response);
                        let code = result['code'];
                        let msg = result['msg'];
                        let alertPanel = document.querySelector("#alert-panel");
                        if(code){
                            alertPanel.className = "alert alert-danger";
                            alertPanel.innerHTML = "update failed";
                        }else{
                            alertPanel.className = "alert alert-success";
                            alertPanel.innerHTML = "update succeeded";
                            setTimeout(function(){
                                location.assign("../administer/administer-index.html");
                            }, 1000);
                        }   
                    }})
    }
}


function processQueryParameters(s){
    s = s.substr(1, s.length - 1);
    arr = s.split('&');
    obj = {};

    arr.forEach(element => {
        let pair = element.split("=");
        obj[pair[0]] = pair[1];
    });
    return obj;
}
