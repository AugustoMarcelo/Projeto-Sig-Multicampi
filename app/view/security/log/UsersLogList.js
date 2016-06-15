Ext.define('Packt.view.security.log.UsersLogList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.usersloglist',
	//frame: true,
	store: 'Packt.store.security.log.UsersLog',

	columnLines: true,

	columns: [
		{			
			width: '25%',
			dataIndex: 'operation',
			text: 'Operação'			
		},
		{			
			width: '25%',
			dataIndex: 'User_id',
			text: 'Usuário que realizou a operação| Mátricula'

		},
		{			
			width: '40%',			
			dataIndex: 'information',
			text: 'Informações sobre propriedades alteradas ou usuários adicionados e excluídos'			
		},
		{			
			xtype: 'datecolumn',
			format: 'd-m-Y H:i:s',
			width: '10%',
			dataIndex: 'dateOperation',
			text: 'Data da Operação'
		}
	],
	dockedItems: [
		{
			xtype: 'pagingtoolbar',
			store: 'Packt.store.security.log.UsersLog',
			dock: 'top',
			displayInfo: true			
		}
	]
});