Ext.define('Packt.view.protocolo.Protocolos', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.protocolos',

	frame: true,

	requires: [
		'Packt.view.protocolo.ProtocolosList'
	],

	layout: {
		type: 'fit'
	},

	items: [
		{
			xtype: 'protocoloslist'
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			//flex: 1,
			items: [
				{
                    xtype: 'button',
                    text: 'Empréstimo',
                    iconCls: 'emprestimo',
                    itemId: 'emprestimo'                    
                },
                {
                	xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    text: 'Devolução',
                    iconCls: 'devolucao',
                    itemId: 'devolucao'                    
                }
			]
		}
	]
});