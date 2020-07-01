<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "msg" => "Login Succeeded");

    $route = "localhost";
    $username = "root";
    $password = "root";

    $conn = new mysqli($route, $username, $password);

    if($conn->connect_error){
        die("Connect failed, :" . $conn->connect_error);
    }

    if(!$conn->query("use schoolsheet_db")){
        echo "failed to connect to database";
        exit;
    }

    $type = $_POST["type"];
    $pid = $_POST["pid"];
    $pw = $_POST["pw"];
    $tableName = "studentsRecord";


    if($type == "administers"){
        $tableName = "administers";
    }
    elseif($type == "teachers"){
        $tableName = "teachers";
    }

    $result = validateIdentity($conn, $tableName, $pid, $pw);
    //error code 1
    if($result == 1){
        $responseData["code"] = 1;
        $responseData["msg"] = "PID you entered doesn't exist";
    }
    elseif($result == 2){
        $responseData["code"] = 2;
        $responseData["msg"] = "Password incorrect";   
    }

    echo json_encode($responseData);
  
?>

<?php

function validateIdentity($conn, $tableName, $pid, $pw){
    $sql = "select * from {$tableName} where pid={$pid}";
    
    $result = $conn->query($sql);  

    if($row = $result->fetch_assoc()){ 
        $userPassword = $row["password"];
        if($userPassword != $pw){
            return 2; 
        }
    }else{
        return 1;
    }
    return 0;


}

?>