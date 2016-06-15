<?php
	require ('../db/db.php');
	session_start();
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];	

	$mysqli->query('SET CHARACTER SET utf8');
	$sql = "SELECT * FROM patrimonios LIMIT $start, $limit";

	//Esse IF será verdadeiro quando for passado o parâmetro no filters no combo do protocolo 
	/*if(isset($_REQUEST['filter'])) {		
		print_r($_REQUEST['filters']['value']);
		$podeEmprestrar = $_REQUEST['filters']['value'];
		//Retornará somente os patrimônios que possam ser emprestados
		$sql = "SELECT * FROM patrimonios WHERE emprestavel = " .  $podeEmprestrar . " LIMIT $start, $limit";
	}*/
	
	

	$result = array();
	if($resultdb = $mysqli->query($sql)) {
		while($profile = $resultdb->fetch_assoc()) {
			$result[] = $profile;
		}
		$resultdb->close();
	}

	$sqlTotal = $mysqli->query("SELECT COUNT(*) AS num FROM patrimonios");
	$linha = $sqlTotal->fetch_assoc();
	$total = $linha['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));
	//Fecha a conexão
	$mysqli->close();
?>