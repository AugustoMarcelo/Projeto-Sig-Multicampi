<?php
    require('../db/db.php');
    session_start();
    $data = $_POST['dataPonto'];
    $idUserSession = $_SESSION['user_id'];    
    $sql = "SELECT * FROM pontospordia WHERE dataPonto = '$data' AND usuarioId = '$idUserSession'";
    $result = $mysqli->query($sql);
    $resultQuery = $result->fetch_assoc();
    
    if ($resultQuery) {
        $sql = "SELECT j.id FROM justificativa j, pontospordia p WHERE j.idPonto = p.id";
        $result = $mysqli->query($sql);
        $resultQueryJustificativas = $result->fetch_assoc();
    }

    echo json_encode(array(
        "success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error,
        "ponto" => $resultQuery,
        "justificativa" => $resultQueryJustificativas
    ));    

    $mysqli->close();
?>