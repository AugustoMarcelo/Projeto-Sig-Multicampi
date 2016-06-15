/**
 * @class Ext.data.Store
 * @overrides Ext.data.Store
 */
Ext.define('Overrides.data.Store', {
	override: 'Ext.data.Store',
	allText: 'Todos',
	allTextField: null,
	constructor: function(cfg) {
		var me = this;
		me.callParent(arguments);
		if(me.allTextField) {
			me.on('load', me.addAllOption, me);
		}
	},

	addAllOption: function() {
		var me = this,
		newRecord = {};
		newRecord[me.allTextField] = me.allText;
		me.insert(0, newRecord);
	}
});