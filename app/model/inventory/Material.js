Ext.define('Packt.model.inventory.Material', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id', type: 'integer'},
        { name: 'name', type: 'string'}
    ]
});