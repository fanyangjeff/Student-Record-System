<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "msg" => "update done");

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
    $name = $_POST["name"];
    $chinese = $_POST["chinese"];
    $math = $_POST["math"];
    $english = $_POST["english"];

    if(!validateIdentity($conn, $pid))
        exit;
    
    if(updateStudentRecord($conn, array("pid" => $pid, "chinese" => $chinese, "math" => $math, "english" => $english))){
        //update successfully
    }else{
        $responseData['code'] = 1;
        $responseData['msg'] = 'update error';
    }

    echo json_encode($responseData);

    $conn->close();
?>

<?php   
    function validateIdentity($conn, $pid){
        $sql = "select * from studentsRecord where pid={$pid}";
        $result = $conn->query($sql);

        if($result->fetch_row()){
            return true;
        }
        return false;
    }

    function updateStudentRecord($conn, $dataArr){
        $sql = "update studentsRecord set chinese={$dataArr['chinese']}, math={$dataArr['math']}, english={$dataArr['english']} where pid={$dataArr['pid']}";
        if($conn->query($sql)){
            return true;
        }
        return false;
    }

?>