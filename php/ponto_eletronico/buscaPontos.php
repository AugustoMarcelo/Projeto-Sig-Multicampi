<?php
    require('../db/db.php');
    session_start();
    $data = $_POST['dataPonto'];
    $idUserSession = $_SESSION['user_id'];    
    $sql = "SELECT * FROM pontospordia WHERE dataPonto = '$data' AND usuarioId = '$idUserSession'";
    $result = $mysqli->query($sql);
    $resultQuery = $result->fetch_assoc();

    echo json_encode(array(
        "success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error,
        "result" => $resultQuery
    ));    

    $mysqli->close();
?>