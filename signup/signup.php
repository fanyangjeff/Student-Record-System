<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "msg" => "registered successfully");

    $route = "localhost";
    $username = "root";
    $password = "root";
   

    $conn = new mysqli($route, $username, $password);

    if($conn->connect_error){
        die("Connect failed, :" . $conn->connect_error);
    }

    $pid = $_POST["pid"];
    $name = $_POST["name"];
    $pw = $_POST["pw"];
    $role = strtolower($_POST["role"]);


    $databaseName = "schoolsheet_db";
    selectDatabase($conn, $databaseName);

    $tableName = "administers";

    if($role == "teachers"){
        $tableName = "teachers";
    }

    elseif($role == "students"){
        $tableName = "studentsRecord";
    }

    if(checkDuplicate($conn, $tableName, $pid)){
        $responseData["code"] = 1;
        $responseData["msg"] = "pid has been used";
        echo json_encode($responseData);
        exit;
    }

    if($tableName == "administers"){
        insertData($conn, "administers", array("pid" => $pid, "name" => $name, "password" => $pw));
    }

    echo json_encode($responseData);
    
    
?>

<?php
    function selectDatabase($conn, $databaseName){
        $sql = "use {$databaseName}";
        if(!$conn->query($sql)){
            echo $conn->error."</br>";
        }
    }

    function checkDuplicate($conn, $tableName, $condition){
        $sql = "select * from {$tableName} where pid = '{$condition}'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();


        if($row){
            return true;
        }
        return false;
    }

    function insertData($conn, $tableName, $data){

        $sql = null;

       
        if($tableName == "administers"){
            $sql = "insert into {$tableName} (pid, name, password) values('{$data['pid']}', '{$data['name']}', '{$data['password']}')";
        }

        //echo $sql;
        $result = $conn->query($sql);
        if($result){
            return true;
        }

        return false;
    }


?>