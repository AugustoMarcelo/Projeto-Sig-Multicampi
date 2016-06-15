Ext.define('Packt.model.patrimonio.Patrimonio', {
	extend: 'Ext.data.Model',

	idProperty: 'id',

	fields: [
		{name: 'id'},
		{name: 'tombo', type: 'string'}, 			//Indica o número do tombo do patrimônio
		{name: 'codigo_unidade', type: 'integer'},        			//Indica o código da unidade a qual o patrimônio está atrelado
		{name: 'denominacao', type: 'string'},		//O nome do patrimônio
		{name: 'especificacoes', type: 'string'},	//Detalhes do patrimônio
		{name: 'situacao', type: 'string'},			//Indica a situação em que o patrimônio se encontra. Pode ser 'QUEBRADO', 'EM USO' ou 'EM MANUTENÇÃO'
		{name: 'tipoMaterial', type: 'integer'},						//Indica o tipo de material daquele patrimônio.
		{name: 'emprestavel'},						//O patrimônio pode ser emprestado?
		{name: 'emprestado'},						//1 - Emprestado | 0 - Não emprestado
		{name: 'localizacao', type: 'integer'},		//Em que sala, laboratório ou local o patrimônio pode ser encontrado?
		{name: 'preco', type: 'integer'},			//Indica o valor monetário do patrimônio
		{name: 'imagem'}							//Imagem do patrimônio		
	]
});