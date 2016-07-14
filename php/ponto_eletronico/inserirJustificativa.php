<?php
    //IMPORTANDO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
    require('../db/db.php');
    session_start();
    date_default_timezone_set("Brazil/East");

    //RECUPERANDO OS VALORES DO FORMULÁRIO
    $id = $_POST['id'];
    $data = date('Y-m-d');
    $idPonto = $_POST['idPonto'];                                                                                 //ID DO PONTO REFERENCIADO
    $entrada01 = isset($_POST['entrada01']) ? $_POST['entrada01'] : false;                                                                           //HORÁRIO DE ENTRADA 1º EXPEDIENTE
    $saida01 = isset($_POST['saida01']) ? $_POST['saida01'] : false;                                                                               //HORÁRIO DE SAÍDA 1º EXPEDIENTE
    $entrada02 = isset($_POST['entrada02']) ? $_POST['entrada02'] : false;                                     //HORÁRIO DE ENTRADA 2º EXPEDIENTE
    $saida02 = isset($_POST['saida02']) ? $_POST['saida02'] : false;                                           //HORÁRIO DE SAÍDA 2º EXPEDIENTE
    $justificativa = $_POST['justificativa'];                                                            //JUSTIFICATIVA    
    $novo = true;

    if ($id == "") {
        $sql = "INSERT INTO Justificativa VALUES (DEFAULT, '$idPonto', '$justificativa', IF('$entrada01' = '', null, '$entrada01'), IF('$saida01' = '', null, '$saida01'), IF('$entrada02' = '', null, '$entrada02'), IF('$saida02' = '', null, '$saida02'), '$data');";
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