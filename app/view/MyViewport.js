Ext.define('Packt.view.MyViewport', {
 	extend: 'Ext.container.Viewport', 
 	alias: 'widget.mainviewport', 
 	requires: [
 		'Packt.view.Header',
 		'Packt.view.menu.Accordion',
 		'Packt.view.MainPanel'
 	],
 	layout: {
 		type: 'border' 
 	},
 	items: [
 		{
 			xtype: 'mainmenu', 
 			width: 185,
 			collapsible: true,
			region: 'west'
		},
		{
			xtype: 'appheader', 
			region: 'north'
		},
		{
			xtype: 'mainpanel', 
			region: 'center'
		},
		{
			xtype: 'container', 
			region: 'south',
			height: 30,
			style: 'border-top: 1px solid #4c72a4;',
			html: '<div class="rodape">2015 - 2016 &copy Departamento de Tecnologia da Informação - EMCM/RN</div>' +
				  '<div class="rodape">Versão 5.1.1</div>'	
		}
	]
});