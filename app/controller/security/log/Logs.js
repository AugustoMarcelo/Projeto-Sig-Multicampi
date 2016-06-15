Ext.define('Packt.controller.security.log.Logs', {
	extend: 'Ext.app.Controller',

	requires: [
        'Packt.util.Util',
        'Packt.util.Alert'
    ],

	views: [
        'security.log.Logs',
        'inventory.log.LogsInfo' 
	],

	stores: [        
        'security.Users',
        'Packt.store.security.log.UsersLog'
    ],

    refs: [
        {
            ref: 'usersLogList',
            selector: 'usersloglist' 
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
            "usersloglist": {
                render: this.onRender,
                itemdblclick: this.onInfoClick
            },
            "userlogs button#deleteLogs": {
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
        var grid = this.getUsersLogList();
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
    }

});