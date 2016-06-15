<?php
	date_default_timezone_set("Brazil/East");//SETANDO O FUSO-HORÁRIO
	$data = date('d/m/Y');
	$hora = date('H:i:s');
	echo json_encode(array(
		"dataHoje" => $data,
		"horaAgora" => $hora
	));
?>