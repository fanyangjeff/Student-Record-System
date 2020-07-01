window.onload = ()=>{
    activateLogOutButton();
    
    var pid = getPID(location.search);
    loadStudentData(pid);
}

function activateLogOutButton(){
    var logout = document.querySelector("#logout");
    logout.onclick = function(){
        location.assign("../index.html");
    }
}


function getPID(rawString){
    rawString = rawString.substr(1, rawString.length - 1);
    return rawString.split('=')[1];
}

function loadStudentData(pid){
    
    ajaxFetch({ url: "loadRecord.php",
                method: "post",
                data: {
                    pid: pid
                },
                resolve: function(response){
                    let result = JSON.parse(response);
                    let code = result["code"];
                    let data = result["data"];

                    if(code){
                        alert("There was some error loading your record");
                    }else{
                        insertIntoTable(data);
                    }
                }})
}


function insertIntoTable(data){
    var tableBody = document.querySelector("#table-body");
    let tableRow = document.createElement("tr");
        
    let th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = data.pid;
    tableRow.appendChild(th);

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    

    td1.innerHTML = data.name;
    td2.innerHTML = data.chinese;
    td3.innerHTML = data.math;
    td4.innerHTML = data.english;

    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    tableRow.appendChild(td3);
    tableRow.appendChild(td4);
    tableBody.appendChild(tableRow);
}