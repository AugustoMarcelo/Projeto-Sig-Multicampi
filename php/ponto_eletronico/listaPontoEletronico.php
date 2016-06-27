<?php
	//IMPORTANDO O ARQUIVO QUE FAZ A CONEXÃO COM O BANCO DE DADOS
	require('../db/db.php');
	session_start();
	$start = $_REQUEST['start'];	
	$limit = $_REQUEST['limit'];
	$idUserLogado = null;
	if(isset($_SESSION['user_id'])) {
		$idUserLogado = $_SESSION['user_id'];
	}

	if(isset($_GET['filter'])) {
		$filter = json_decode($_GET['filter']);		
		if($filter[0]->property == "limit") {
			$limit = $filter[0]->value;
			$sql = "SELECT * FROM pontospordia WHERE $idUserLogado = usuarioId  GROUP BY id DESC LIMIT $start, $limit";		
			$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia WHERE $idUserLogado = usuarioId LIMIT $start, $limit");
		
		} elseif($filter[0]->property == "dataPonto") {
			$dataPonto = $filter[0]->value;
			$sql = "SELECT * FROM pontospordia WHERE dataPonto = '$dataPonto' GROUP BY id DESC LIMIT $start, $limit";		
			$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia WHERE dataPonto = '$dataPonto'");
			
			if(isset($filter[1]) && $filter[1]->property == "checkDateFormat" && $filter[1]->value == true) {
				$sql = "SELECT * FROM pontospordia WHERE DATE_FORMAT(dataPonto, '%Y-%m') = '$dataPonto' GROUP BY id DESC LIMIT $start, $limit";		
				$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia WHERE DATE_FORMAT(dataPonto, '%Y-%m') = '$dataPonto' LIMIT $start, $limit");
			}		
		}
	} else {
		//$sql = "SELECT 	p.dataPonto, u.name, p.entrada01, p.saida01, p.saida02, p.entrada02 FROM pontospordia INNER JOIN user GROUP BY p.id DESC LIMIT $start, $limit";
		$sql = "SELECT * FROM pontospordia GROUP BY id DESC LIMIT $start, $limit";
		$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia");
	}

	$result = array();
	if($resultdb = $mysqli->query($sql)) {
		while($linha = $resultdb->fetch_assoc()) {
			$result[] = $linha;
		}
		$resultdb->close();
	}
	
	$row = $sqlCount->fetch_assoc();
	$total = $row['num'];

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"total" => $total,
		"data" => $result
	));

	$mysqli->close();
?>