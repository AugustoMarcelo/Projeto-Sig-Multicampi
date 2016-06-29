<?php
    //IMPORTANDO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
    require('../db/db.php');
    session_start();
    date_default_timezone_set("Brazil/East");

    //RECUPERANDO OS VALORES DO FORMULÁRIO
    $data = date('Y-m-d');
    $idPonto = $_POST['idPonto'];                                                                                 //ID DO PONTO REFERENCIADO
    $entrada01 = $_POST['entradaExp1'];                                                                           //HORÁRIO DE ENTRADA 1º EXPEDIENTE
    $saida01 = $_POST['saidaExp1'];                                                                               //HORÁRIO DE SAÍDA 1º EXPEDIENTE
    $entrada02 = isset($_POST['entradaExp2']) ? $_POST['entradaExp2'] : false;                                     //HORÁRIO DE ENTRADA 2º EXPEDIENTE
    $saida02 = isset($_POST['saidaExp2']) ? $_POST['saidaExp2'] : false;                                           //HORÁRIO DE SAÍDA 2º EXPEDIENTE
    $justificativa = $_POST['textarea_justificativa'];                                                            //JUSTIFICATIVA

    $sql = "INSERT INTO Justificativa VALUES (DEFAULT, '$idPonto', '$justificativa', '$entrada01', '$saida01', IF('$entrada02' = '', null, '$entrada02'), IF('$saida02' = '', null, '$saida02'), '$data');";
    $mysqli->query($sql);

    echo json_encode(
        array (
            "success" => $mysqli->connect_errno == 0,
            "msg" => $mysqli->error
        )
    );

    $mysqli->close();
?>