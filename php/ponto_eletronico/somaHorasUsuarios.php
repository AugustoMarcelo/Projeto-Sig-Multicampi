<?php
	require("../db/db.php");
	session_start();
	date_default_timezone_set("Ameria/Araguaina");//SETANDO O FUSO-HORÁRIO

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

	$query = "SELECT id, entrada01, saida01, entrada02, saida02 FROM pontospordia";			
	if($result = $mysqli->query($query)) {
		while($i = $result->fetch_assoc()) {
			if($i['saida01'] != null) {			
				$horaEntrada01 = $i['entrada01'];
				$horaSaida01 = $i['saida01'];
				$totalDia = gmdate('H:i:s', strtotime($horaSaida01) - strtotime($horaEntrada01));
				$idTupla = $i['id'];				
				if($i['saida02'] != null) {
					$horaEntrada02 = $i['entrada02'];
					$horaSaida02 = $i['saida02'];
					$tempoExpediente = 	gmdate('H:i:s', strtotime($horaSaida02) - strtotime($horaEntrada02));
					$totalDia = somaHoras($totalDia, $tempoExpediente);
				}
				$mysqli->query("UPDATE pontospordia SET totaldia = '$totalDia' WHERE id = '$idTupla'");
			}			
		}
		$result->close();			
	}

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error
	));

	$mysqli->close();
?>