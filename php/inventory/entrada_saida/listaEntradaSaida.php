<?php	

	require("../../db/db.php");
	session_start();

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$sql = "SELECT * FROM estoque ORDER BY dataOperacao DESC LIMIT $start, $limit";
	$sqlTotal = "SELECT COUNT(*) AS num FROM estoque";

	if(isset($_REQUEST['action']) AND $_REQUEST['action'] == 'filtrar_log') {
		$operacao = $_REQUEST['operacao'];

		if($operacao !== 'Todos') {			
			$sql = "SELECT * FROM estoque WHERE operacao = '$operacao' ORDER BY dataOperacao DESC LIMIT $start, $limit";
			$sqlTotal = "SELECT count(*) AS num FROM estoque WHERE operacao = '$operacao'";
		}
	}

	$result = array();
	if ($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}	
		$resultdb->close();
	}

	$sqlTotal = $mysqli->query($sqlTotal);
	$row = $sqlTotal->fetch_assoc();
	$total = $row['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));	
	//FECHANDO A CONEXÃO
	$mysqli->close();

?>