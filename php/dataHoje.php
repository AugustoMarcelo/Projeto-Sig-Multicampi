<?php
	date_default_timezone_set("America/Araguaina");//SETANDO O FUSO-HORÁRIO SEM HORÁRIO DE VERÃO
	$data = date('d/m/Y');
	$hora = date('H:i:s');
	echo json_encode(array(
		"dataHoje" => $data,
		"horaAgora" => $hora
	));
?>