<?php
    //IMPORTANDO O ARQUIVO QUE FAZ A CONEXÃO COM O BANCO DE DADOS
    require('../db/db.php');
    session_start();
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];
    $idUserLogado = null;
    if (isset($_SESSION['user_id'])) {
        $idUserLogado = $_SESSION['user_id'];
    }

    if (isset($_SESSION['level'])) {
        if ($_SESSION['level'] < 3) {
            $sql = "SELECT j.id, p.dataPonto, j.idPonto, j.justificativa, j.entrada01, j.saida01, j.entrada02, j.saida02, j.dataJustificativa FROM Justificativa j, Pontospordia p GROUP BY j.id DESC LIMIT $start, $limit";    

            $sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM Justificativa LIMIT $start, $limit");
        } else {
            $sql = "SELECT j.id, p.dataPonto, j.idPonto, j.justificativa, j.entrada01, j.saida01, j.entrada02, j.saida02, j.dataJustificativa FROM Justificativa j, Pontospordia p, User u WHERE $idUserLogado = u.id AND p.UsuarioId = u.id AND p.usuarioId = $idUserLogado AND p.id = j.idPonto GROUP BY j.dataJustificativa DESC LIMIT $start, $limit";

            $sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM Justificativa j, Pontospordia p, User u WHERE $idUserLogado = u.id AND p.UsuarioId = u.id AND j.idPonto = p.id AND p.UsuarioId = $idUserLogado LIMIT $start, $limit");
        }
    }    

    $result = array();
    if ($resultdb = $mysqli->query($sql)) {
        while ($linha = $resultdb->fetch_assoc()) {
            $result[] = $linha;
        }
        $resultdb->close();
    }

    $row = $sqlCount->fetch_assoc();
    $total = $row['num'];

    echo json_encode(array(
        "success" => $mysqli->connect_errno == 0,
        "data" => $result,
        "total" => $total        
    ));

    $mysqli->close();
?>