Ext.define('Packt.view.security.UsersList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.userslist',
	//frame: true,
	//store: 'Packt.store.security.Users', 
	allowDeselect: true,
	store: 'users',	
	columnLines: true,

	initComponent: function() {
		var me = this;

		if(Ext.isString(me.store)) {
			me.store = Ext.create('Packt.store.security.Users');
		}

		Ext.apply(me, {
			columns: [
				{
					width: '20%',
					dataIndex: 'userName',
					text: translations.usernameColGrid
				},
				{
					width: '30%',
					dataIndex: 'name',
					flex: 1,
					text: translations.nameColGrid
				},
				{
					width: '15%',
					dataIndex: 'registration',
					text: translations.registrationColGrid
				},
				{
					width: '15%',
					dataIndex: 'Group_id',
					text: translations.groupColGrid,
					renderer: function(value, metaData, record ){ 
						var groupsStore = Ext.getStore('groups');
						var group = groupsStore.findRecord('id', value);
						return group != null ? group.get('name') : value;
					}
				},
				{
					width: '5%',
					dataIndex: 'level',
					text: 'Level',
					align: 'center'
				},
				{
					width: '10%',
					dataIndex: 'status',
					text: 'Status',
					align: 'center'
				}
			],
			forceFit: true,
			viewConfig: {
				stripeRows: true,				
				getRowClass: function(record, index, rowParams, store) {
					if(record.get('status') == 'INATIVO') {
						return "inativo";

					} else {
						return "preto";
					}
				}
			},
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true,
					emptyMsg: 'Não há pontos registrados',
					displayMsg: 'Exibindo {0} - {1} de {2} registro(s)'
				}
			]
		});
		me.callParent(arguments);
		me.store.load();
	}
});