Ext.define('Packt.model.security.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'userName' },
        { name: 'registration' },
        { name: 'password'},
        { name: 'picture'},
        { name: 'level' },
        { name: 'Group_id' },
        { name: 'status'}
    ]
});