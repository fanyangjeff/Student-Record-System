function ajaxFetch({method = "get", url, data, resolve, reject}){
    var xhr = new XMLHttpRequest();
    if(method == "get"){
        if(data){
            url = url + "?" + querifyObject(data);
        }
        xhr.open("get", url, true);
        xhr.send();
    }
    
    else{
        xhr.open("post", url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        if(data){
            xhr.send(querifyObject(data));
        }
        else{
            xhr.send();
        }
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(resolve)
                    resolve(xhr.responseText);
            }
            else{
                if(reject)
                    reject("Error: " + xhr.status);
            }
        }
    }
}


function querifyObject(data){
    var str = "";
    for(let [key, value] of Object.entries(data)){
        str += key + "=" + value + "&";
    }
    
    return str.substr(0, str.length - 1);
}