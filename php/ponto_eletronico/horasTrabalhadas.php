<?php
	require("../db/db.php");
	session_start();
	date_default_timezone_set("America/Araguaina");//SETANDO O FUSO-HORÁRIO

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

	//PEGAR O VALOR NUMÉRICO DO DIA DA SEMANA
	if(date('w') == 1) { //SE FOR IGUAL A 1, O DIA É SEGUNDA
		$dataFormatoNumero = 1;
	} elseif (date('w') == 0) { //SE FOR IGUAL A 0, O DIA É DOMINGO
		$dataFormatoNumero = 0;
	} else {
		$dataFormatoNumero = date('w');
	}
	/* O CÁLCULO É FEITO CONSIDERANDO QUE O DOMINGO É O PRIMEIRO DIA DA SEMANA
	 * A DATA DE HOJE - A DATA DE HOJE EM FORMATO NUMÉRICO
     * EX.: 20/05/2016 - 5(SEXTA-FEIRA EM FORMATO NUMÉRICO) = 15
     * A DATA DE INÍCIO SERÁ 15/05/2016, DOMINGO
     * O SELECT RETORNARÁ A CARGA HORÁRIA TOTAL DE CADA DIA NO INTERVALO DE 15/05/2016 À 20/05/2016
	*/
	$dataInicio = date('d') - $dataFormatoNumero; 
	if($dataInicio < 10) {
		$dataInicio = "0".$dataInicio;
	}
	$mes = date('m');
	$ano = date('Y');
	$dataInicio = $ano.'/'.$mes.'/'.$dataInicio;	
	$dataFinal = date('Y-m-d');
	$idUsuario = $_SESSION['user_id'];		
	$tempoSemanal = '00:00:00';
	$tempoMensal = '00:00:00';

	$queryTempoDia = "SELECT totaldia FROM pontospordia WHERE usuarioId = '$idUsuario' AND dataPonto BETWEEN '$dataInicio' AND '$dataFinal'";
	$queryTempoMes = "SELECT totaldia FROM pontospordia WHERE usuarioId = '$idUsuario' AND MONTH(dataPonto) = '$mes'";

	if($result = $mysqli->query($queryTempoDia)) {
		while($i = $result->fetch_assoc()) {
			if($i['totaldia'] != null) {
				$totalDia = $i['totaldia'];
				$tempoSemanal = somaHoras($tempoSemanal, $totalDia);
			}
		}
		$result->close();
	}

	if($result = $mysqli->query($queryTempoMes)) {
		while($i = $result->fetch_assoc()) {
			if($i['totaldia'] != null) {
				$totalDia = $i['totaldia'];
				$tempoMensal = somaHoras($tempoMensal, $totalDia);
			}
		}
		$result->close();
	}
	
	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error,
		"horaSemanal" => $tempoSemanal,
		"horaMensal" => $tempoMensal		
	));

	$mysqli->close();	
?>