Ext.define('Packt.controller.inventory.log.Logs', {
	extend: 'Ext.app.Controller',

	requires: [
        'Packt.util.Util',
        'Packt.util.Alert'
    ],

	views: [
        'inventory.log.Logs',
        'inventory.log.LogsInfo' 
	],

	stores: [
        'inventory.Products',
        'security.Users',
        'Packt.store.inventory.log.ProductsLog'
    ],

    refs: [
        {
            ref: 'productsLogList',
            selector: 'productsloglist' 
        },
        {
            ref: 'logsInfo',
            selector: 'logsinfo',
            autoCreate: true,
            xtype: 'logsinfo'
        }
    ],

    init: function(application) {
        this.control({
            "productsloglist": {
                render: this.onRender,
                itemdblclick: this.onInfoClick,
                beforerender: this.onButtonSetVisible
            },
            "logs button#deleteLogs": {
                click: this.onButtonClickDelete
            }
        });
        

        if (!Ext.getStore('users')) {
            Ext.create('Packt.store.security.Users');
        }
    },

    onRender: function(component, options) {
        component.getStore().load();        
    },

    onInfoClick: function(grid, record, item, index, e, eOpts){
        var infoLog = this.getLogsInfo(),
        componente = Ext.ComponentQuery.query('#propertyLogBefore')[0];
        componente.update(record.data.detailsBefore);
        componente2 = Ext.ComponentQuery.query('#propertyLogAfter')[0];
        componente2.update(record.data.detailsAfter);
    },

    onButtonClickDelete: function(button, e, options) {
        var grid = this.getProductsLogList();
        var store = grid.getStore();        

        Ext.Msg.show({
            title: 'Deletar',
            msg: 'Deseja mesmo apagar todos os registros?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    store.removeAll();
                    store.sync();                                  
                    Packt.util.Alert.msg('Sucesso!', 'Histórico de Logs deletado com sucesso.');                    
                }
            }
        });
    },
    
    /* ANTES DO COMPONENTE SER RENDERIZADO, VERIFICAR SE O USUÁRIO TEM LEVEL IGUAL A 1
     * SE SIM, TORNAR O COMPONENTE VISÍVEL.
     */
    onButtonSetVisible: function(thisComponent, e0pts) {
        Ext.Ajax.request({
           method: 'POST',
           url: 'php/security/importUserSession.php',
           success: function(conn, response, options, e0pts) {
               var result = Packt.util.Util.decodeJSON(conn.responseText);
               if(result.level == 1) {
                    thisComponent.up('panel').getDockedItems('toolbar[dock="top"]')[0].getComponent('deleteLogs').setVisible(true);        
               }
           } 
        });          
    }
});