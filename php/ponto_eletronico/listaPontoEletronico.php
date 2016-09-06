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
		if($filter[0]->property == "limit") { //SE HOUVER LIMITE, SOMENTE OS 5 ÚLTIMOS PONTOS SERÃO MOSTRADOS NO GRID DE FUNCIONÁRIO
			$limit = $filter[0]->value;
			$sql = "SELECT * FROM pontospordia WHERE $idUserLogado = usuarioId ORDER BY dataPonto DESC LIMIT $start, $limit";		
			$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia WHERE $idUserLogado = usuarioId LIMIT $start, $limit");
		
		} elseif($filter[0]->property == "dataPonto") { //FILTRO PARA MOSTRAR OS PONTOS EM UMA DATA dd/mm/aaaa
			$dataPonto = $filter[0]->value;
			$sql = "SELECT p.*, u.name AS nomeUsuario FROM pontospordia p, user u WHERE p.dataPonto = '$dataPonto' AND p.usuarioId = u.id GROUP BY id DESC LIMIT $start, $limit";		
			$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia WHERE dataPonto = '$dataPonto'");
			
			if(isset($filter[1]) && $filter[1]->property == "checkDateFormat" && $filter[1]->value == true) { //SE O CHECKBOX DO GRID ESTIVER MARCADO, A PESQUISA LEVARÁ EM CONSIDERAÇÃO SOMENTE MÊS E ANO
				$sql = "SELECT p.*, u.name AS nomeUsuario FROM pontospordia p, user u WHERE DATE_FORMAT(p.dataPonto, '%Y-%m') = '$dataPonto' AND p.usuarioId = u.id GROUP BY id DESC LIMIT $start, $limit";		
				$sqlCount = $mysqli->query("SELECT COUNT(*) AS num FROM pontosPorDia WHERE DATE_FORMAT(dataPonto, '%Y-%m') = '$dataPonto' LIMIT $start, $limit");
			}		
		}
	} else { //SE NÃO HOUVER FILTROS, TODOS OS PONTOS SERÃO MOSTRADOS (visão para admin)
		$sql = "SELECT p.*, u.name AS nomeUsuario FROM pontospordia p, user u WHERE p.usuarioId = u.id ORDER BY dataPonto DESC LIMIT $start, $limit";
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