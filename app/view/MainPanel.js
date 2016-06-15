Ext.define('Packt.view.MainPanel', {
	extend: 'Ext.tab.Panel',
 	alias: 'widget.mainpanel',
 	activeTab: 0,
 	requires: [
 		//'Packt.view.chaves.Chaves'
 	],
 	items: [
 		{
 			xtype: 'panel',
 			closable: false,
 			iconCls: 'home',
 			title: 'Home'/*,			 			 		
 			dockedItems: [ 				
 				{
 					xtype: 'toolbar',
 					dock: 'top',
 					items: [
 						{
 							xtype: 'button',
 							text: 'Log de chaves',
 							itemId: 'chavesLog'
 						}
 					]
 				}
 			],
 			items: [ 				
 				{
 					xtype: 'chaves'
 				} 				
 			]*/ 			
 		}
 	]
});