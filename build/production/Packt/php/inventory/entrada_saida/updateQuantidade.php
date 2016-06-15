<?php
	require('../../db/db.php');
	session_start();
	$quantidade = $_POST['quantidade'];
	$produtoId = $_POST['id_produto'];
	$operacao = $_POST['operacao'];
	$queryOk = true;
	

	

	if(strcasecmp($operacao, 'saida') == 0) {
		$sql = "SELECT quantidade FROM Product WHERE id = '$produtoId'";
		$result = $mysqli->query($sql);
		$resultSearch = $result->fetch_assoc();
		$result = $resultSearch['quantidade'];
		if($quantidade <= $result) {
			$sql = "UPDATE product SET quantidade = quantidade - '$quantidade' WHERE id = '$produtoId'";
			$result = $mysqli->query($sql);
		} else {
			$queryOk = false;
		}

	} else {
		$sql = "UPDATE product SET quantidade = quantidade + '$quantidade' WHERE id = '$produtoId'";		
		$result = $mysqli->query($sql);
	}

	echo json_encode(array(
		"success" => $mysqli->error == '',
		"msg" => $mysqli->error,
		"atualizacao" => $queryOk,
		"operacao" => $result
	));

?>
