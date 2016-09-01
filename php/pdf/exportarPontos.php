<?php
	require_once('../tcpdf/config/lang/bra.php');
	require_once('../tcpdf/tcpdf.php');
	require_once('../db/db.php');		

	//Extendendo TCPDF com funções customizadas
	class MYPDF extends TCPDF {

		//Carregando a tabela de dados do arquivo
		public function LoadData($file) {
			//Ler linhas do arquivo
			$lines = file($file);
			$data = array();
			foreach ($lines as $line) {
				$data[] = explode(';', chop($line));
			}			
			return $data;
		}
				
		//Tabela colorida
		public function ColoredTable($header, $data) {
			// VARIÁVEL QUE DEFINE SE A CÉLULA SERÁ PINTADA OU TRANSPARENTE			
			$fill = 0;			
			// ID DO USUÁRIO			
			$id = 0;
			foreach($data as $row) {
				/* 
					CONFIGURAÇÕES INICIAIS VÁLIDAS PARA O PRIMEIRO USUÁRIO
					E PARA MOSTRAR OS DADOS DE OUTRO USUÁRIO		
				*/
				if($id == 0 || $id != $row['id']) {
					// A PRIMEIRA LINHA SEMPRE TERÁ O PREENCHIMENTO TRANSPARENTE
					$fill = 0;
					/* SE O ID FOR DIFERENTE DE 0, CRIA-SE UMA NOVA PÁGINA */
					if($id != 0) {
						$this->Cell(array_sum($w), 0, '', 'T');
						$this->AddPage();
					}

					/* DEFININDO AS PROPRIEDADES DE COR, FONTE E BORDAS PARA O CABEÇALHO */
					// DEFININDO A COR DE PREENCHIMENTO DA CÉLULA			
					$this->SetFillColor(71, 71, 71);

					// DEFININDO A COR DA FONTE
					$this->SetTextColor(255);

					// DEFININDO A COR DAS BORDAS, RETÂNGULOS E DESENHOS
					$this->SetDrawColor(210, 210, 210);

					// DEFININDO A LARGURA DAS LINHAS
					$this->SetLineWidth(0.3);

					// DEFININDO A FONTE
					$this->SetFont('', 'B');

					// DEFININDO OS TAMANHOS DAS CÉLULAS DOS HORÁRIOS
					//$w = array(44, 45, 45, 45, 45, 43);
					$w = array(40, 40, 40, 40, 40, 40, 27);

					// CONTABILIZANDO O NÚMERO DE CÉLULAS
					$num_headers = count($header);

					// DESENHANDO A CÉLULA LABEL 'Servidor'
					$this->Cell(40, 7, 'Servidor', 1, 0, 'C', 1);

					/* ALTERANDO AS PROPRIEDADES DE COR E FONTE PARA DESTACAR O NOME DO USUÁRIO */
					// ALTERANDO A COR DE PREENCHIMENTO DA CÉLULA
					$this->SetFillColor(240, 240, 240);

					// ALTERANDO A COR DO TEXTO
					$this->SetTextColor(0);

					// ALTERANDO A FONTE
					$this->SetFont('');

					// DESENHANDO A CÉLULA COM O NOME DO USUÁRIO
					$this->Cell(80, 7, $row['usuarioId'], 1, 0, 'C', 1);

					// QUEBRA DE LINHA
					$this->Ln();

					/* ALTERANDO AS PROPRIEDADES DE COR E FONTE PARA MOSTRAR O CABEÇALHO DOS HORÁRIOS */
					// ALTERANDO A COR DE PREENCHIMENTO DA CÉLULA
					$this->SetFillColor(71, 71, 71);

					// ALTERANDO A COR DA FONTE
					$this->SetTextColor(255);
					
					// ALTERANDO A FONTE
					$this->SetFont('', 'B');	

					// CABEÇALHOS DA TABELA DE INFORMAÇÕES
					for($i = 0; $i < $num_headers; $i++) {
						/*
							@Params
							$w[$i] 			=> Largura da célula
							7 				=> Altura da Célula
							$header[$i] 	=> Texto da célula
							1 				=> 
							0 				=>
							'C' 			=> Alinhamento da célula
						*/
						$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
					}
					// QUEBRA DE LINHA
					$this->Ln();							
				}				
				
				/* RESTAURAR COR E FONTE PARA DESENHAR AS CÉLULAS COM OS DADOS */
				// ALTERAR A COR DE PREENCHIMENTO DA CÉLULA
				$this->SetFillColor(240, 240, 240);
				
				// ALTERAR A COR DA FONTE
				$this->SetTextColor(0);

				// ALTERAR A FONTE
				$this->SetFont('');

				// CRIAR AS CÉLULAS E INSERIR OS DADOS
				$this->Cell($w[0], 6, $row['dataPonto'], 'LR', 0, 'C', $fill);				
				$this->Cell($w[1], 6, $row['entrada01'], 'LR', 0, 'C', $fill);
				$this->Cell($w[2], 6, $row['saida01'], 'LR', 0, 'C', $fill);				
				$this->Cell($w[3], 6, $row['entrada02'], 'LR', 0, 'C', $fill);
				$this->Cell($w[4], 6, $row['saida02'], 'LR', 0, 'C', $fill);				
				$this->Cell($w[5], 6, $row['totaldia'], 'LR', 0, 'C', $fill);
				$this->Cell($w[6], 6, $row['justificado'], 'LR', 0, 'C', $fill);
				$this->Ln();
				$fill=!$fill;
				$id = $row['id'];				
			}
			$this->Cell(array_sum($w), 0, '', 'T');						
		} 
		/* 
			@Override
			Sobrescrevendo o método do rodapé para adicionar uma imagem
		*/
		public function Footer() {
			$cur_y = $this->y;
			$image_file = "../../resources/images/logo_dti.png";
			$this->Image($image_file, 15, 192, 10, "", "PNG", "", "B", false, 300, "", false, false, 0, false, false, false);
			$this->SetTextColorArray($this->footer_text_color);
			//set style for cell border
			$line_width = (0.85 / $this->k);
			$this->SetLineStyle(array('width' => $line_width, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => $this->footer_line_color));
			//print document barcode
			$barcode = $this->getBarcode();
			if (!empty($barcode)) {
				$this->Ln($line_width);
				$barcode_width = round(($this->w - $this->original_lMargin - $this->original_rMargin) / 3);
				$style = array(
					'position' => $this->rtl?'R':'L',
					'align' => $this->rtl?'R':'L',
					'stretch' => false,
					'fitwidth' => true,
					'cellfitalign' => '',
					'border' => false,
					'padding' => 0,
					'fgcolor' => array(0,0,0),
					'bgcolor' => false,
					'text' => false
				);
				$this->write1DBarcode($barcode, 'C128', '', $cur_y + $line_width, '', (($this->footer_margin / 3) - $line_width), 0.3, $style, '');
			}
			$w_page = isset($this->l['w_page']) ? $this->l['w_page'].' ' : '';
			if (empty($this->pagegroups)) {
				$pagenumtxt = $w_page.$this->getAliasNumPage().' / '.$this->getAliasNbPages();
			} else {
				$pagenumtxt = $w_page.$this->getPageNumGroupAlias().' / '.$this->getPageGroupAlias();
			}
			$this->SetY($cur_y);
			$this->Text(25, 191, "Departamento de Tecnologia da Informação");			
			//Print page number
			if ($this->getRTL()) {
				$this->SetX($this->original_rMargin);
				$this->Cell(0, 0, $pagenumtxt, 'T', 0, 'L');
			} else {
				$this->SetX($this->original_lMargin);
				$this->Cell(0, 0, $this->getAliasRightShift().$pagenumtxt, 'T', 0, 'R');
			}
		}
	}	

	$sqlParte1 = "SELECT 
					DATE_FORMAT(p.dataPonto, '%d/%m/%Y') AS dataPonto, 
					IF(p.entrada01 IS NULL, '--:--:--', p.entrada01) AS entrada01, 
					IF(p.saida01 IS NULL, '--:--:--', p.saida01) AS saida01, 
					IF(p.entrada02 IS NULL, '--:--:--', p.entrada02) AS entrada02, 
					IF(p.saida02 IS NULL, '--:--:--', p.saida02) AS saida02, 
					IF(p.totaldia IS NULL, '--:--:--', p.totaldia) AS totaldia, 
					u.name AS usuarioId, 
					p.usuarioId AS id, 
					IF(p.id IN(SELECT idPonto FROM Justificativa), 'SIM', '—') AS justificado";
	$sqlCompleta = $sqlParte1 . " FROM pontospordia p, user u WHERE p.usuarioId = u.id GROUP BY usuarioId, p.id DESC";
	$sqlHorasTrabalhadas = "SELECT u.name AS usuario, (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(totaldia))), '%H:%i:%s')) AS totalhoras FROM pontospordia p, User u WHERE p.usuarioId = u.id GROUP BY usuario ASC, usuarioId;";
	$textoHorasTrabalhadas = "Servidores e horas totais de trabalho desde o início";
	$sqlJustificativas = "SELECT 
							DATE_FORMAT(p.dataPonto, '%d/%m/%Y') AS dataPonto,
							u.name AS servidor,
							j.justificativa AS justificativa,
							j.entrada01 AS je01, j.saida01 AS js01, j.entrada02 AS je02, j.saida02 AS js02, p.entrada01 AS pe01, p.saida01 AS ps01, p.entrada02 AS pe02, p.saida02 AS ps02
						  FROM 
						  	Pontospordia p,
							User u,
							Justificativa j
						  WHERE 
						  	p.usuarioId = u.id AND p.id = j.idPonto
						  ORDER BY p.dataPonto DESC";
	if(isset($_GET["valorDoFiltro"]) && $_GET["valorDoFiltro"] != null && $_GET["valorDoFiltro"] != "") {
		$filtro = $_GET["valorDoFiltro"];
		
		if(isset($_GET['check']) && $_GET['check'] == 'true' ) {	
								
			$sqlCompleta = $sqlParte1 . " FROM pontospordia p, user u WHERE p.usuarioId = u.id AND DATE_FORMAT(p.dataPonto, '%Y-%m') = '$filtro' GROUP BY usuarioId, p.id DESC";
			$sqlHorasTrabalhadas = "SELECT u.name AS usuario, (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(totaldia))), '%H:%i:%s')) AS totalhoras FROM pontospordia p, User u WHERE p.usuarioId = u.id AND DATE_FORMAT(p.dataPonto, '%Y-%m') = '$filtro' GROUP BY usuario ASC, usuarioId;";
			$textoHorasTrabalhadas = "Servidores e horas totais de ".  date('m', strtotime($filtro))."/".date('Y', strtotime($filtro));
			$sqlJustificativas = "SELECT DATE_FORMAT(p.dataPonto, '%d/%m/%Y') AS dataPonto, u.name AS servidor, j.justificativa AS justificativa, j.entrada01 AS je01, j.saida01 AS js01, j.entrada02 AS je02, j.saida02 AS js02, p.entrada01 AS pe01, p.saida01 AS ps01, p.entrada02 AS pe02, p.saida02 AS ps02 FROM Pontospordia p, User u, Justificativa j WHERE p.usuarioId = u.id AND p.id = j.idPonto AND DATE_FORMAT(p.dataPonto, '%Y-%m') = '$filtro' ORDER BY p.dataPonto DESC";
		} else {	
			$sqlCompleta = $sqlParte1 . " FROM pontospordia p, user u WHERE p.usuarioId = u.id AND p.dataPonto = '$filtro' GROUP BY usuarioId, p.id DESC";
			$sqlHorasTrabalhadas = "SELECT u.name AS usuario, (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(totaldia))), '%H:%i:%s')) AS totalhoras 
FROM pontospordia p, User u WHERE p.usuarioId = u.id AND p.dataPonto = '$filtro' GROUP BY usuario ASC, usuarioId;";
			$textoHorasTrabalhadas = "Servidores e horas totais de ".date('d/m/Y', strtotime($filtro));
			$sqlJustificativas = "SELECT DATE_FORMAT(p.dataPonto, '%d/%m/%Y') AS dataPonto, u.name AS servidor, j.justificativa AS justificativa FROM Pontospordia p, User u, Justificativa j WHERE p.usuarioId = u.id AND p.id = j.idPonto AND p.dataPonto = '$filtro' ORDER BY p.dataPonto DESC";
		}
	}	

	$result = array();	
	if($resultdb = $mysqli->query($sqlCompleta)) {
		while($record = $resultdb->fetch_assoc()) {
			array_push($result, $record); //Adicionando elementos no final do array			
		}
		$resultdb->close();
	}
	
	
	$resultTotalHoras = array();	
	if($resultdb = $mysqli->query($sqlHorasTrabalhadas)) {
		while($record = $resultdb->fetch_assoc()) {
			array_push($resultTotalHoras, $record); //Adicionando elementos no final do array			
		}
		$resultdb->close();
	}

	$resultJustificativas = array();
	if($resultdb = $mysqli->query($sqlJustificativas)) {
		while($record = $resultdb->fetch_assoc()) {
			array_push($resultJustificativas, $record); //Adicionando elementos no final do array			
		}
		$resultdb->close();
	}
	

	//Criar novo documento PDF
	$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor('Usuário logado');
	$pdf->SetTitle('Pontos registrados');
	$pdf->SetSubject('SIG - Sistema Integrado de Gestão');
	$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);
	
	$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

	//Setar margens
	$pdf->SetMargins(PDF_MARGIN_LEFT, 45, PDF_MARGIN_RIGHT);
	$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	$pdf->SetFooterMargin(20);

	$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

	$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

	$pdf->setLanguageArray($l);

	$pdf->SetFont('helvetica', '', 10);
	
	// NOVA PÁGINA
	$pdf->AddPage();

	//CABEÇALHO DAS COLUNAS COM OS HORÁRIOS
	$header = array("Data", "Entrada/1º Exp.", "Saída/1º Exp.", "Entrada/2º Exp.", "Saída/2º Exp.", "Total/Dia", "Justificado");	
	$pdf->ColoredTable($header, $result);
	
	// NOVA PÁGINA
	$pdf->AddPage();
	// TÍTULO DA PÁGINA COM AS HORAS TRABALHADAS
	$pdf->Cell(250, 0, $textoHorasTrabalhadas, 0, 1, 'C');
	// QUEBRA DE LINHA
	$pdf->Ln();
	// PROPRIEDADES DE FORMATAÇÃO DE TEXTO, FONTE E BORDAS
	$pdf->SetFillColor(71, 71, 71);
	$pdf->SetTextColor(255);
	$pdf->SetDrawColor(210, 210, 210);
	// CÁLULAS CABEÇALHO
	$pdf->Cell(60, 7, 'Servidores', 1, 0, 'C', 1);
	$pdf->Cell(40, 7, 'Total de horas mensal', 1, 0, 'C', 1);
	// QUEBRA DE LINHA
	$pdf->Ln();
	// PROPRIEDADES DE FORMATAÇÃO DE TEXTO, FONTE E BORDAS
	$pdf->SetFillColor(240, 240, 240);
	$pdf->SetTextColor(0);
	$fill = 0;
	// PERCORRENDO OS DADOS ADVINDOS DO BANCO E MOSTRANDO NAS CELULAS
	foreach ($resultTotalHoras as $row) {
		$pdf->Cell(60, 0, $row['usuario'], 'LRTB', 0, 'L', $fill);
		$pdf->Cell(40, 0, $row['totalhoras'], 'LRTB', 0, 'C', $fill);
		$fill = !$fill;
		$pdf->Ln();
	}

	// NOVA PÁGINA
	$pdf->AddPage();
	// TÍTULO DA PÁGINA
	$pdf->Cell(250, 0, "Justificativas dos servidores", 0, 1, 'C');
	$pdf->Ln();	
	
	foreach($resultJustificativas as $row) {
		$pdf->SetFont('', 'B');
		$pdf->SetFillColor(71, 71, 71);
		$pdf->SetTextColor(255);
		$pdf->SetDrawColor(210, 210, 210);						
		$pdf->Cell(30, 7, "Servidor", 'LRTB', 0, 'L', 1);

		$pdf->SetFont('');
		$pdf->SetFillColor(240, 240, 240);
		$pdf->SetTextColor(0);
		$pdf->Cell(60, 7, $row['servidor'], 'LRTB', 0, 'L');
		$pdf->Ln();

		$pdf->SetFont('', 'B');
		$pdf->SetFillColor(71, 71, 71);
		$pdf->SetTextColor(255);		
		$pdf->Cell(30, 7, "Data do ponto", 'LRTB', 0, 'L', 1);

		$pdf->SetFont('');
		$pdf->SetFillColor(240, 240, 240);
		$pdf->SetTextColor(0);
		$pdf->Cell(60, 7, $row['dataPonto'], 'LRTB', 0, 'L');
		$pdf->Ln();
		
		$pdf->SetFont('', 'B');
		$pdf->SetFillColor(71, 71, 71);
		$pdf->SetTextColor(255);		
		$pdf->Cell(267, 7, "Horários justificados", 'LRTB', 0, 'C', 1);		

		$pdf->SetFont('');
		$pdf->SetFillColor(240, 240, 240);
		$pdf->SetTextColor(0);
		$pdf->Ln();		
		$horariosTxt = "";
		if(($row['pe01'] != $row['je01']) && ($row['je01'] != null)) {
			$horariosTxt = "Entrada no 1º Expediente registrada às ".$row['pe01']." e justificada para às ".$row['je01'];
		}
		if(($row['ps01'] != $row['js01']) && ($row['js01'] != null)) {
			if($row['ps01'] == null) {
				$horariosTxt .= "Saída no 1º Expediente não registrada e justificada para às ".$row['js01'];	
			}
			$horariosTxt .= "Saída no 1º Expediente registrada às ".$row['ps01']." e justificada para às ".$row['js01'];
		}
		$pdf->MultiCell(0, 20, $horariosTxt, 'LRTB', 0, 'L', 0, $valign='T', $fitcell=true);
		$pdf->Ln();
		
		$pdf->SetFont('', 'B');
		$pdf->SetFillColor(71, 71, 71);
		$pdf->SetTextColor(255);		
		$pdf->Cell(267, 7, "Justificativa", 'LRTB', 0, 'C', 1);

		$pdf->SetFont('');
		$pdf->SetFillColor(240, 240, 240);
		$pdf->SetTextColor(0);
		$pdf->Ln();
		$pdf->Cell(267, 40, $row['justificativa'], 'LRTB', 0, 'L', 0, $link=0, $stretch=0, $ignore=false, $calign='T', $valign='T');
		$pdf->Ln();
		$pdf->Ln(7);
		$horariosTxt = "";
	}
	$pdf->Output('PontosRegistrados.pdf', 'I');
?>