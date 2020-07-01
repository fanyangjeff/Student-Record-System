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

    //select students database
    
    $conn->query("use schoolsheet_db");
    
    $result = $conn->query("select * from studentsRecord");

    
    while($row = $result->fetch_assoc()){
        array_push($responseData['data'], $row);
    }

    
    echo json_encode($responseData);

    $conn->close();

?>

<?php

    function loadData(){

    }

?>