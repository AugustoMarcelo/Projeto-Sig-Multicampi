Ext.define('Packt.controller.chaves.Chaves', {
	extend: 'Ext.app.Controller',

	requires: [
		'Packt.view.chaves.ChaveInfo',
		'Packt.util.Util'
	],

	views: [
		'chaves.Chaves',
		'chaves.ChaveForm'
	],

	stores: [

	],

	refs: [
		{
			ref: 'chaves',
			selector: 'chaves'
		},
		{
			ref: 'chaveForm',
			selector: 'chaveform'
		}
	],

	init: function(application) {
		this.control({
			"chaves button#chaveinfo202": {
				click: this.onButtonClickInfo
			},
			"chaves button#retirar202": {
				click: this.onButtonClickRetirar
			},
			"chaves button#devolver202": {
				click: this.onButtonClickDevolver
			},
			"chaveform button#cancelar": {
				click: this.onButtonClickCancelar
			},
			"mainpanel button#chavesLog": {
				click: this.onButtonClickLogs
			}
		});
	},

	onButtonClickLogs: function(button, e, options) {
		console.log('abre de sésamo!');
	},

	onButtonClickCancelar: function(button, e, options) {
		button.up('window').close();
	},

	onButtonClickInfo: function(button, e, options) {
		var win = Ext.create('Packt.view.chaves.ChaveInfo');
		win.show();		
	},

	onButtonClickRetirar: function(button, e, options) {	
		/* Criando o form para retirada de chaves
		   Pegando a referência do fieldset da chave para setar o nº da chave, que está no seu itemId, no form	
		   Pegando a referência do fieldset com os campos de devolução e desabilitando-o */
		var janela = Ext.create('Packt.view.chaves.ChaveForm');		
		var fs_chave = button.up('fieldset');
		var fs_retirada = Ext.ComponentQuery.query('#fieldset_retirada')[0];
		fs_retirada.items.items[0].setValue(fs_chave.getItemId());
		var fs_devolucao = Ext.ComponentQuery.query('#fieldset_devolucao')[0];		
		fs_devolucao.disable();
		
		/*button.setVisible(false);		
		var fieldset = button.up('fieldset');
		fieldset.removeCls('devolvido');
		fieldset.addCls('retirado');*/

		/*Ext.Ajax.request({
			url: 'php/chaves/disponibilidade.php',
			params: {
				chaveId: fieldset.getItemId(); 
			},

			success: function(conn, response, options, e0pts) {
				var result = Packt.util.Util.decodeJSON(conn.responseText);
				if(result.success) {

				}
			},

			failure: function(conn, repsonse, options, e0pts) {

			}
		});*/
	},

	onButtonClickDevolver: function(button, e, options) {
		/* Criando o form para devolução de chaves
		   Pegando a referência do fieldset com os campos de retirada e desabilitando-o */
		/* Pegando a referência do botão dentro do panel pelo seu itemId */
		var janela = Ext.create('Packt.view.chaves.ChaveForm');
		var form = Ext.ComponentQuery.query('#formChave')[0];
		console.log(form.getValues());
		var fieldset_retirada = Ext.ComponentQuery.query('#fieldset_retirada')[0];
		console.log(fieldset_retirada);
		fieldset_retirada.disable();
		/*var btnRetirar = button.up('panel').down('button#retirar202');
		btnRetirar.setVisible(true);
		var fieldset = button.up('fieldset');
		fieldset.removeCls('retirado');
		fieldset.addCls('devolvido');*/	
	}
});