Ext.define('Packt.view.inventory.log.ProductsLogList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.productsloglist',
	//frame: true,
	
	store: 'Packt.store.inventory.log.ProductsLog',

	columnLines: true,

	columns: [
		{			
			width: '25%',
			dataIndex: 'operation',
			text: 'Operação'			
		},
		{			
			width: '24%',
			dataIndex: 'User_id',
			text: 'Usuário que realizou a operação| Mátricula'

		},
		{			
			width: '40%',			
			dataIndex: 'information',
			text: 'Informações sobre propriedades alteradas ou produtos adicionados e excluídos'			
		},
		{			
			xtype: 'datecolumn',
			format: 'd-m-Y H:i:s',
			width: '11%',
			dataIndex: 'dateOperation',
			text: 'Data da Operação'
		}
	],
	forceFit: true,
	dockedItems: [
		{
			xtype: 'pagingtoolbar',
			store: 'Packt.store.inventory.log.ProductsLog',
			dock: 'top',
			displayInfo: true,
			items: [				
				{
					xtype: 'text',
					text: 'Duplo clique sobre um registro para ver mais detalhes*',
					cls: 'infoText'
				}				
			]
		}
	]
});