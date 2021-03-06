Ext.define('Packt.controller.TranslationManager', {
 	extend: 'Ext.app.Controller',
 	views: [
 		'Translation' 
 	],
 	refs: [
 		{
 			ref: 'translation', 
 			selector: 'translation'
 		}
 	],
 	init: function(application) {
 		this.control({
 			"translation menuitem": { 
 				click: this.onMenuitemClick
 			},
 			"translation": { 
 				beforerender: this.onSplitbuttonBeforeRender
 			}
 		});
 	},

 	onSplitbuttonBeforeRender: function(abstractcomponent, options) {
 		var lang = localStorage ? (localStorage.getItem('user-lang') || 'pt_BR') : 'pt_BR'; 
 		abstractcomponent.iconCls = lang;
 		if (lang == 'en') {
 			abstractcomponent.text = 'English'; 

 		} else if (lang == 'es'){
 			abstractcomponent.text = 'Español';

 		} else {
 			abstractcomponent.text = 'Português';
 		}
	},

	onMenuitemClick: function(item, e, options) {
 		var menu = this.getTranslation(); // #9
 		menu.setIconCls(item.iconCls); // 
 		menu.setText(item.text); // 
 		localStorage.setItem("user-lang", item.iconCls); // 
 		window.location.reload(); // 
	}
});