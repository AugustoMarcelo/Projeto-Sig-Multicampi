<?php
	require("../db/db.php");
	session_start();
	date_default_timezone_set("Brazil/East");//SETANDO O FUSO-HORÁRIO

	function array_search_multi($busca, $arrays) {
		foreach ($arrays as $array) {
			if($i = array_search($busca, $array) !== false) {				
				return $i;
			}
		}

		return false;
	}

	function subtraiHoras($entrada, $saida) {		
		$hora1 = explode(":",$entrada);
		$hora2 = explode(":",$saida);
		$acumulador1 = ($hora1[0] * 3600) + ($hora1[1] * 60) + $hora1[2];
		$acumulador2 = ($hora2[0] * 3600) + ($hora2[1] * 60) + $hora2[2];
		$resultado = $acumulador2 - $acumulador1;
		$hora_ponto = floor($resultado / 3600);
		$resultado = $resultado - ($hora_ponto * 3600);
		$min_ponto = floor($resultado / 60) > 9 ? floor($resultado / 60) : "0".floor($resultado / 60);
		$resultado = $resultado - ($min_ponto * 60);
		$secs_ponto = $resultado > 9 ? $resultado : "0".$resultado;
		//Grava na variável resultado final
		$tempo = $hora_ponto.":".$min_ponto.":".$secs_ponto;
		return $tempo;
	}

	function somaHoras($horaAtual, $horaAdd) {
		$hora1 = explode(":",$horaAtual);
		$hora2 = explode(":",$horaAdd);
		$acumulador1 = ($hora1[0] * 3600) + ($hora1[1] * 60) + $hora1[2];
		$acumulador2 = ($hora2[0] * 3600) + ($hora2[1] * 60) + $hora2[2];
		$resultado = $acumulador2 + $acumulador1;
		$hora_ponto = floor($resultado / 3600);
		$resultado = $resultado - ($hora_ponto * 3600);
		$min_ponto = floor($resultado / 60) > 9 ? floor($resultado / 60) : "0".floor($resultado / 60);
		$resultado = $resultado - ($min_ponto * 60);
		$secs_ponto = $resultado > 9 ? $resultado : "0".$resultado;
		//Grava na variável resultado final
		$tempo = $hora_ponto.":".$min_ponto.":".$secs_ponto;
		return $tempo;
	}

	//RECUPERANDO OS VALORES ENVIADOS AO CLICAR NO BOTÃO DE BATER PONTO
	$data = date('Y-m-d');
	$idUsuario = $_SESSION['user_id'];
	$maquinaIp = $_SERVER['REMOTE_ADDR'];
	$turno = $_POST['turno'];
	$horario = date('H:i:s');	

	//RCUPERANDO OS PONTOS BATIDOS PARA VERIFICAR A EXISTÊNCIA DO USUÁRIO
	$queryId = "SELECT usuarioId FROM pontospordia WHERE dataPonto = '$data'";
	$resultQueryId = array();
	if($result = $mysqli->query($queryId)) {
		while($linha = $result->fetch_assoc()) {			
			$resultQueryId[] = $linha;			
		}
		$result->close();
	}

	//CHECANDO SE O ID DO USUÁRIO LOGADO ESTÁ NO ARRAY DOS PONTOS DIÁRIOS
	if($i = array_search_multi($idUsuario, $resultQueryId) !== false) {		
		if($turno == "saida01") {
			$campo = "saida01 = '$horario'";
			$queryEntrada01 = "SELECT entrada01 FROM pontospordia WHERE dataPonto = '$data' AND usuarioId = '$idUsuario'";			
			if($result = $mysqli->query($queryEntrada01)) {
				$resultQuery = $result->fetch_assoc();
				$entrada = $resultQuery['entrada01'];											
				$result->close();
				//$tempo = subtraiHoras($entrada, $horario);
				$tempo = gmdate('H:i:s', strtotime($horario) - strtotime($entrada));
				$mysqli->query("UPDATE pontospordia SET totaldia = '$tempo' WHERE dataPonto = '$data' AND usuarioId = '$idUsuario'");
			}			
		} else if($turno == "entrada02") {
			$campo = "entrada02 = '$horario'";
		} else if($turno == "saida02") {
			$campo = "saida02 = '$horario'";
			$queryEntrada02 = "SELECT entrada02, totaldia FROM pontospordia WHERE dataPonto = '$data' AND usuarioId = '$idUsuario'";			
			if($result = $mysqli->query($queryEntrada02)) {
				$resultQuery = $result->fetch_assoc();
				$entrada = $resultQuery['entrada02'];
				$totalAcumulado = $resultQuery['totaldia'];											
				$result->close();
				//$tempo = subtraiHoras($entrada, $horario);
				$tempo = gmdate('H:i:s', strtotime($horario) - strtotime($entrada));
				$total = somaHoras($totalAcumulado, $tempo);
				$mysqli->query("UPDATE pontospordia SET totaldia = '$total' WHERE dataPonto = '$data' AND usuarioId = '$idUsuario'");
			}
		}
		$queryUpdate = "UPDATE pontospordia SET " . $campo . " WHERE usuarioId = '$idUsuario' AND dataPonto = '$data'";
		$mysqli->query($queryUpdate);
	} 
	else {//CASO NÃO ESTEJA, SIGNIFICA QUE UM USUÁRIO QUE AINDA NÃO BATEU O PONTO ESTÁ FAZENDO-O
		$queryInsert = "INSERT INTO pontospordia VALUES (DEFAULT, '$maquinaIp', '$data', '$idUsuario', '$horario', null, null, null, null)";
		$mysqli->query($queryInsert);		
	}

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error		
	));
	$mysqli->close();	
?>