<?php
	require('../../db/db.php');

	$info = $_POST['data'];
	$data = json_decode($info);
	
	$information = $data->information;
	$user_id = $data->User_id;
	$operation = $data->operation;
	$detalhesAntes = $data->detailsBefore;
	$detalhesDepois = $data->detailsAfter;
	$dataOperacao = $data->dateOperation;	
	
	$insertQuery = "INSERT INTO UserLog (information, User_id, operation, detailsBefore, detailsAfter, dateOperation)";
	$insertQuery .= "VALUES ('$information', '$user_id', '$operation', '$detalhesAntes', '$detalhesDepois', '$dataOperacao')";
	if($resultdb = $mysqli->query($insertQuery)) {
		$id = $mysqli->insert_id;
	}


	echo json_encode(array(
		"success" => $mysqli->error == '',
		"msg" => $mysqli->error,
		"data" => array(
			"id" => mysql_insert_id(),
			"information" => $information,
			"id_usuario" => $user_id,
			"operation" => $operation,
			"detalhesAntes" => $detalhesAntes,
			"detalhesDepois" => $detalhesDepois,
			"dataOperacao" => $dataOperacao,
		)
	));
?>