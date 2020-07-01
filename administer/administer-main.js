window.onload = () =>{
    
    
    activateLoadRecordButton();
    activateLogOutButton();
    loadStudentRecord();

}   

function loadStudentRecord(){
    ajaxFetch({
        method: "post",
        url: "loadAllStudentsRecord.php",
       resolve: function(response){
            let result = JSON.parse(response);
            
            let code = result['code'];
            
            let data = result['data'];
            //failed to load
            if(code){
                alert("failed to connect to database");
            }else{
                insertIntoTable(data);
            }
       }
})
}

function activateLoadRecordButton(){
    var loadRecord = document.querySelector("#load-record");
    loadRecord.onclick = function(){
        loadStudentRecord();
    }
}

function activateLogOutButton(){
    var logout = document.querySelector("#logout");
    logout.onclick = function(){
        location.assign("../index.html");
    }
}


function insertIntoTable(data){
    var tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";
    for(var i = 0; i < data.length; i++){
        let tableRow = document.createElement("tr");
        
        let th = document.createElement("th");
        th.scope = "row";
        th.innerHTML = data[i].pid;
        tableRow.appendChild(th);

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        

        td1.innerHTML = data[i].name;
        td2.innerHTML = data[i].chinese;
        td3.innerHTML = data[i].math;
        td4.innerHTML = data[i].english;
        
        let editTag = document.createElement("a");
        editTag.href = "editStudents.html?" + buildQueryString({pid: data[i].pid,
                                                                name: data[i].name,
                                                                chinese: data[i].chinese,
                                                                math: data[i].math,
                                                                english: data[i].english});
        
        td5.appendChild(editTag); 
        editTag.innerHTML = "edit";
        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);
        tableRow.appendChild(td4);
        tableRow.appendChild(td5);
        tableBody.appendChild(tableRow);
    }
}



function buildQueryString(obj){
    s = "";
    for(const [key, value] of Object.entries(obj)){
        s += key + "=" + value + "&";
    }

    return s.substr(0, s.length - 1);
}
