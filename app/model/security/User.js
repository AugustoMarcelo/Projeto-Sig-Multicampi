Ext.define('Packt.model.security.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id', type: 'integer'},
        { name: 'name', type: 'string'},
        { name: 'userName' },
        { name: 'registration' },
        { name: 'password'},
        { name: 'picture'},
        { name: 'level', type: 'integer'},
        { name: 'Group_id', type: 'string'},
        { name: 'status'}
    ]
});