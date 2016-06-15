Ext.define('Packt.view.chaves.Chaves', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.chaves',

	items: [
		{
			xtype: 'text',
			text: 'Controle de Chaves',
			cls: 'chavesTitulo',
			border: 1,
			style: {
				borderColor: 'black',
				borderStyle: 'solid',
				borderRadius: '10px',				
			},			
			padding: '5 5 5 5',
			margin: '10 0 10 500',
		},
		{
			xtype: 'fieldset',
			title: 'Chave 202',
			width: 120,
			height: 120,
			margin: '10 auto 1 10',	
			itemId: '202',	
			cls: 'devolvido',
			items: [
				{
					xtype: 'button',
					itemId: 'chaveinfo202',
					text: 'Informações',
					width: '90px',
					margin: '6 1 0 4',
					iconCls: 'informacao'					
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					itemId: 'retirar202',
					text: 'Retirar',
					width: '70px',
					margin: '10 1 0 14',
					iconCls: 'setaVerde',					
				},
				{
					xtype: 'tbseparator'
				},
				{
					xtype: 'button',
					itemId: 'devolver202',
					text: 'Devolver',
					width: '70px',
					margin: '10 1 0 14',
					iconCls: 'setaVermelha'
				}
			] 					
		}
	]
});