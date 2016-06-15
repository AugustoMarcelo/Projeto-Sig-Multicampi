Ext.define('Packt.model.inventory.log.Log', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        {name: 'id'},
        {name: 'information'},
        {name: 'User_id'},
        {name: 'operation'},
        {name: 'detailsBefore'},
        {name: 'detailsAfter'},
        {name: 'dateOperation' , type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});
