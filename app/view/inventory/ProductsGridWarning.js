Ext.define('Packt.view.inventory.ProductsGridWarning', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.productsgridwarning',
	frame: true,

	store: 'Packt.store.inventory.ProductsWarning',

	columnLines: true,

	columns: [
		{
			width: '10%',
			dataIndex: 'codigo',
			text: 'Código'
		},
		{
			width: '20%',
			dataIndex: 'nome',
			text: 'Nome'
		},
		{
			width: '30%',
			dataIndex: 'descricao',
			text: 'Descrição'
		},
		{
			width: '6%',
			dataIndex: 'quantidade',
			text: 'Quantidade'
		},
		{
			width: '9%',
			dataIndex: 'quantidadeMin',
			text: 'Quantidade Mínima'
		},
		{
			xtype: 'datecolumn',
			format: 'd/m/Y',
			width: '9%',
			dataIndex: 'dataCadastro',
			text: 'Data de Cadastro'
		},
		{
			width: '9%',
			dataIndex: 'Sigla_id',
			text: 'Unidade de Medida',
			renderer: function(value, metaData, record ){ 
				var siglasStore = Ext.getStore('unidadesmedida');
				var sigla = siglasStore.findRecord('id', value);				
				return sigla != null ? sigla.get('name') : value;
			}
		},
		{
			width: '7%',
			dataIndex: 'tipoMaterial',
			text: 'Material',
			renderer: function(value, metaData, record) {
				var materiaisStore = Ext.getStore('materiais');
				var material = materiaisStore.findRecord('id', value);				
				return material != null ? material.get('name') : value;
			}
		}
	],
	forceFit: true,
	dockedItems: [
		{
			xtype: 'pagingtoolbar',
			store: 'Packt.store.inventory.ProductsWarning',			
			dock: 'top',
			displayInfo: true
		}
	]
});