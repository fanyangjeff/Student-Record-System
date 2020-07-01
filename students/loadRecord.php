<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "data" => array());

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

    $pid = $_POST["pid"];

    $sql = "select pid, name, chinese, math, english from studentsRecord where pid={$pid}";

    $result = $conn->query($sql);

    if($row = $result->fetch_assoc()){
        foreach($row as $key => $value){
            $responseData["data"][$key] = $value;
        }
    }
    else{
        $responseData["code"] = 1;
    }

    echo json_encode($responseData);



?>