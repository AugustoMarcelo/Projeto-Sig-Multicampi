Ext.define('Packt.controller.ponto_eletronico.Justificativas', {
    extend: 'Ext.app.Controller',

    views: [
        'ponto_eletronico.Justificativas'
    ],

    stores: [
        'ponto_eletronico.Justificativas'
    ],

    init: function (application) {
        this.control({
            "justificativaslist": {
                render: this.onRender
            }
        });
    },

    onRender: function (component, options) {
        console.log("carregando...");
        component.getStore().load();
    }
});