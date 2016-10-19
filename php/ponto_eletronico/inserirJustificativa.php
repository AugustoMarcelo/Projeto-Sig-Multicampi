<?php
    //IMPORTANDO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
    require('../db/db.php');
    session_start();
    date_default_timezone_set("America/Araguaina");

    //RECUPERANDO OS VALORES DO FORMULÁRIO
    $id = $_POST['id'];
    $data = date('Y-m-d');
    $idPonto = isset($_POST['idPonto']) ? $_POST['idPonto'] : "";                                                                                 //ID DO PONTO REFERENCIADO
    $entrada01 = isset($_POST['entrada01']) ? $_POST['entrada01'] : false;                                                                           //HORÁRIO DE ENTRADA 1º EXPEDIENTE
    $saida01 = isset($_POST['saida01']) ? $_POST['saida01'] : false;                                                                               //HORÁRIO DE SAÍDA 1º EXPEDIENTE
    $entrada02 = isset($_POST['entrada02']) ? $_POST['entrada02'] : false;                                     //HORÁRIO DE ENTRADA 2º EXPEDIENTE
    $saida02 = isset($_POST['saida02']) ? $_POST['saida02'] : false;                                           //HORÁRIO DE SAÍDA 2º EXPEDIENTE
    $justificativa = $_POST['justificativa'];                                                            //JUSTIFICATIVA    
    $checkDayFault = isset($_POST['checkDayFault']) ? true : false;
    $novo = true;

    if ($id == "") {
        if ($idPonto == "") {            
            $maquinaIp = $_SERVER['REMOTE_ADDR'];
            $idUsuario = $_SESSION['user_id'];
            //$dataPonto = date('Y-m-d', strtotime($_POST['dataPonto']));
            $dataPonto = $_POST['dataPonto'];            
            $queryInsert = "INSERT INTO pontospordia VALUES (DEFAULT, '$maquinaIp', '$dataPonto', '$idUsuario', null, null, null, null, null);";
		    $mysqli->query($queryInsert);
            $idPonto = $mysqli->insert_id;
        }
        if($checkDayFault == true) {
            $sql = "INSERT INTO Justificativa VALUES (DEFAULT, '$idPonto', '$justificativa', null, null, null, null, '$data', 1);";
        } else {
            $sql = "INSERT INTO Justificativa VALUES (DEFAULT, '$idPonto', '$justificativa', IF('$entrada01' = '', null, '$entrada01'), IF('$saida01' = '', null, '$saida01'), IF('$entrada02' = '', null, '$entrada02'), IF('$saida02' = '', null, '$saida02'), '$data', 0);";
        }
        $mysqli->query($sql);
    } else {
        $sql = "UPDATE Justificativa SET entrada01 = IF('$entrada01' = '', null, '$entrada01'), saida01 = IF('$saida01' = '', null, '$saida01'), entrada02 = IF('$entrada02' = '', null, '$entrada02'), saida02 = IF('$saida02' = '', null, '$saida02'), justificativa = '$justificativa' WHERE id = '$id';";
        $mysqli->query($sql);
        $novo = false;
    }

    echo json_encode(
        array (
            "success" => $mysqli->connect_errno == 0,
            "msg" => $mysqli->error,
            "novo" => $novo
        )
    );

    $mysqli->close();
?>