<?php
    require('../db/db.php');
    
    //RECUPERANDO OS VALORES ENVIADOS PELO FORMULÁRIO
    $id = $_POST['id'];
    $numSala = $_POST['sala'];
    $localizacao = $_POST['localizacao'];
    $responsavel = $_POST['responsavel'];    

    //SE O ID VIER EM BRANCO, UM NOVO CADASTRO ESTÁ SENDO FEITO
    if($id == "") {
        $insertQuery = "INSERT INTO localizacoes (id, numSala, nomeDoLocal, responsavel) VALUES (DEFAULT, '$numSala', '$localizacao', '$responsavel');";
        $mysqli->query($insertQuery);
        
    } else {
        $updateQuery = "UPDATE localizacoes SET numSala = $numSala, nomeDoLocal = $localizacao, responsavel = $responsavel WHERE id = $id";
        $mysqli->query($updateQuery);
    }
    
    echo json_encode(array(
        "success" => $mysqli->connect_errno == 0,
        "msg" => $mysqli->error
    ));
?>