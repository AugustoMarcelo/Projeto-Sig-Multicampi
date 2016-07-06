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
                render: this.onRender,
                cellclick: this.onCellClick,
                itemmouseleave: this.onItemMouseLeave
            }
        });
    },

    onRender: function (component, options) {
        //component.getStore().load();                        
    },

    onItemMouseLeave: function (view, record, item, index, e, eOpts) {
        if (view.tip) {
            view.tip.destroy();
        }  
    },

    onCellClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var store = Ext.getStore('pontoeletronico');        
        if (view.tip) {
            view.tip.destroy();                        
            view.tip = null;            
        }        
        if(cellIndex > 0 && cellIndex < 5) {            
            view.tip = Ext.create('Ext.tip.ToolTip', {
                itemId: 'tooltip-horario',
                autoShow: false,
                showDelay: 0,                                    
                stateful: false,
                target: view.el,
                width: 100,
                title: 'Horário original',
                delegate: view.cellSelector,
                trackMouse: false,
                autoHide: true,
                // listeners: {
                //     beforeshow: function (tooltip, eOpts) {
                //         var ponto = store.findRecord('id', record.get('idPonto'));
                //         var horario;
                //         if (cellIndex == 1) {
                //             horario = ponto.get('entrada01');                        
                //         } else if (cellIndex = 2) {
                //             horario = ponto.get('saida01');                        
                //         } else if (cellIndex == 3) {
                //             horario = ponto.get('entrada02');                        
                //         } else if (cellIndex == 4) {
                //             horario = ponto.get('saida02');                        
                //         }
                //         horario = horario != null ? Ext.Date.format(horario, 'H:i:s') : "--:--:--";                    
                //         tooltip.update(horario);                         
                //         console.log(tooltip.html);                   
                //         // tooltip.on('show', function () {
                //         //     Ext.defer(tooltip.show, 10, tooltip);
                //         // }, tooltip, { single: true });
                //     }                
                // }
            });
            var ponto = store.findRecord('id', record.get('idPonto'));
            var horario;
            if (cellIndex == 1) {
                horario = ponto.get('entrada01');                        
            } else if (cellIndex = 2) {
                horario = ponto.get('saida01');                        
            } else if (cellIndex == 3) {
                horario = ponto.get('entrada02');                        
            } else if (cellIndex == 4) {
                horario = ponto.get('saida02');                        
            }
            horario = horario != null ? Ext.Date.format(horario, 'H:i:s') : "--:--:--";                    
            view.tip.update(horario);                                     
        }                              
    }
});