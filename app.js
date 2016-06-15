Ext.Loader.setConfig({
    enabled: true,
    paths: {
        //'Ext.ux': 'ux',
        //'Ext.ux': 'ux'
        'Overrides': 'overrides'
    }
});


Ext.application({
    name: 'Packt',

    requires: [
        'Overrides.data.Store',
        /*'AppOverrides.*',*/    	
        'Ext.window.Window',        
        'Ext.form.Label',
        'Ext.menu.Menu',        
        'Packt.store.security.Permissions',
        'Ext.form.Panel',
        'Packt.view.MyViewport',
        'Ext.layout.container.Border',
        'Ext.layout.container.Accordion',
        'Ext.grid.column.Date',
        'Ext.form.FieldSet',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.File',
        'Ext.draw.Text',
        'Ext.grid.column.RowNumberer',
        'Packt.view.inventory.MaterialForm'
    ],

    views: [
    	
    ],

    controllers: [
        'Login',
        'TranslationManager',
        'Menu',
        'security.Users',
        'inventory.Products',
        'inventory.log.Logs',
        'security.log.Logs',
        'inventory.Entradas_Saidas',
        'security.Groups',
        //'chaves.Chaves',
        'protocolo.Protocolos',
        'patrimonio.Patrimonios',
        'unidade.Unidades',
        'localizacao.Localizacoes',
        'ponto_eletronico.PontoEletronico'
    ],

    splashscreen: {},

    init: function() {
    	splashscreen = Ext.getBody().mask('Carregando Aplicação', 'splashscreen');
    	splashscreen.addCls('splashscreen');
    	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
    		cls: 'x-splash-icon'
    	});
    },

    launch: function() {
        Ext.tip.QuickTipManager.init();

    	var task = new Ext.util.DelayedTask(function() {
    		splashscreen.fadeOut({
    			duration: 1000,
    			remove: true
    		});

    		splashscreen.next().fadeOut({
    			duration: 1000,
    			remove: true,
    			listeners: {
    				afteranimate: function(el, startTime, e0pts) {                                            
    					Ext.widget('login');                        
    				}
    			}
    		});	
    	});

    	task.delay(2000);    	
    }
});
