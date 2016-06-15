Ext.define('Packt.view.inventory.log.LogsInfo',{
	extend: 'Ext.window.Window',
	alias: 'widget.logsinfo',

	height: 400,
	width: 400,
	//layout: 'fit',
	//iconCls: 'icon-user',
	title: 'Informações sobre o registro',
	autoShow: true,
	modal: true,

    layout: {
        type: 'vbox',       
        align: 'stretch',    
        padding: 5
    },
    items: [
    	{   
    		title: 'Antes da edição',           
    		xtype: 'panel',
    		items: [
    			{
    				itemId: 'propertyLogBefore',
    				html: 'Propriedades aqui',
    				frame: true,
    				cls: 'cls-usuario',
    				border: false,
    				margin: '10 10 3 10',
    			}
    		],
        	flex: 2                                      
    	}, 
    	{
        	xtype: 'splitter'  
    	}, 
    	{                    
        	title: 'Depois da edição',
        	xtype: 'panel',
        	items: [
        		{
        			itemId: 'propertyLogAfter',
        			html: '',
        			frame: true,
    				cls: 'cls-usuario',
    				border: false,
    				margin: '10 10 3 10'
        		}
        	],          
        	flex: 2            
    	}
    ]
});