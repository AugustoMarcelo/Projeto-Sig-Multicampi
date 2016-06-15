 /*CONTAINER PRINCIPAL
 * ESTE CONTAINER COMPORTA NO CENTRO OUTROS CONTAINER QUE MOSTRAM INFORMAÇÕES DE DATA E HORA 
 * E OS BOTÕES PARA REGISTRAR O PONTO 
 *
 * NA PARTE SUL ESTÁ O GRID QUE MOSTRA OS ÚLTIMOS 5 PONTOS DO USUÁRIO 
*/
Ext.define('Packt.view.ponto_eletronico.PontoEletronicoUsuario', {
    extend: 'Ext.container.Container',
    alias: 'widget.pontoeletronicousuario',
    itemId: 'container_pontoUsuario',
    
    autoShow: true,
    
    layout: {
        type: 'border',
        padding: 5
    },
    
    items: [
        {
            /* ESTE CONTAINER COMPORTA NO CENTRO UM OUTRO CONTAINER COM AS INFORMAÇÕES DE DATA E HORA */
            xtype: 'container',                                   
            itemId: 'container_1.1',
            region: 'center',
            layout: {
                type: 'border'             
            },
            
            items: [
                {
                    xtype: 'container',
                    itemId: 'container_1.1.1',                    
                    region: 'center',
                    layout: {
                        type: 'border'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'containerDataHora',
                            border: 1,
                            style: {
                                borderColor:'#000000', 
                                borderStyle:'solid', 
                                borderWidth:'1px',
                                borderRight: 'none',
                                marginBottom: '5px',
                                backgroundColor: '#FFFFFF'
                            },
                            region: 'center',
                            layout: {
                                type: 'vbox',
                                align: 'center',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'text',
                                    itemId: 'textData',
                                    cls: 'infoPonto',
                                    text: 'Data: '+Ext.Date.format(new Date(), 'd/m/Y')                            
                                },
                                {
                                    xtype: 'label',
                                    html: '<iframe scrolling="no" frameborder="no" clocktype="html5" style="overflow:hidden;border:0;margin:0;padding:0;width:151px;height:50px;"src="http://www.clocklink.com/html5embed.php?clock=008&timezone=GMT-0300&color=black&size=151&Title=&Message=&Target=&From=2016,1,1,0,0,0&Color=black"></iframe>'
                                }                      
                            ]        
                        },
                        {
                            xtype: 'container',
                            itemId: 'containerHorasTrabalhadas',
                            region: 'east',
                            border: 1,
                            style: {
                                borderColor:'#000000', 
                                borderStyle:'solid', 
                                borderWidth:'1px',
                                marginBottom: '5px',
                                backgroundColor: '#FFFFFF'
                            },
                            width: '50%',
                            layout: {
                                type: 'vbox',
                                align: 'center',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    itemId: 'htmlTableHoraSemanal',                                    
                                    text: '',
                                    listeners: {
                                        afterrender: function(thisComponent, e0pts) {
                                            Ext.Ajax.request({
                                                method: 'POST',
                                                url: 'php/ponto_eletronico/horasTrabalhadas.php',
                                                success: function(conn, response, options, e0pts) {
                                                    var result = Packt.util.Util.decodeJSON(conn.responseText);
                                                    thisComponent.setText(
                                                        '<table id="cargaHorariaCumprida">'+
                                                            '<thead>'+
                                                                '<th colspan="2">Informações sobre horas trabalhadas</th>'+
                                                            '</thead>'+
                                                            '<tr>'+
                                                                '<th>Período</th>'+
                                                                '<th>Carga horária já cumprida</th>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td>Esta semana </td>'+
                                                                '<td>'+result.horaSemanal+'</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td>Este mês </td>'+
                                                                '<td>'+result.horaMensal+'</td>'+
                                                            '</tr>'+
                                                        '</table>', false
                                                    );
                                                }
                                            });                                            
                                        }
                                    }                                                                    
                                }
                            ]
                        }
                    ]
                },

                {
                    xtype: 'container',
                    itemId: 'containerBotoes',
                    //itemId: 'panel_pontoUsuario_filho_centro_botoes',
                    region: 'south',
                    height: '50%',                    
                    layout: {
                        type: 'border'                       
                    },
                    items: [
                        {
                            xtype: 'container',
                            //itemId: 'panel_pontoUsuario_filho_centro_botoes_manha',
                            itemId: 'container_1.1.2.1',
                            region: 'center',                                                        
                            border: 1,
                            style: {
                                borderColor:'#000000', 
                                borderStyle:'solid', 
                                borderWidth:'1px',
                                backgroundColor: '#FFFFFF'
                                //borderTop: 'none'
                            },
                            layout: {
                                type: 'border'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'container_1.1.2.1.1',
                                    region: 'center',
                                    height: '30%',                                    
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },                                            
                                    items: [
                                        {
                                            xtype: 'text',
                                            text: '1º Expediente',
                                            style: {
                                                fontSize: '20px'
                                            }                                                           
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    region: 'south',
                                    //itemId: 'panel_pontoUsuario_filho_centro_sul_botoes_manha',
                                    itemId: 'container_1.1.2.1.2',                                    
                                    height: '50%',
                                    layout: {
                                        type: 'hbox',                                        
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'entrada01',
                                            scale: 'large',                                            
                                            iconCls: 'digitalEntrada',
                                            tooltip: 'Registrar entrada',
                                            text: 'Entrada',
                                            disabled: true                                            
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 50
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'saida01',                                            
                                            iconCls: 'digitalSaida',
                                            scale: 'large',
                                            text: 'Saída',                                                                                        
                                            tooltip: 'Registrar Saída',
                                            disabled: true                                            
                                        }
                                    ]      
                                }                                               
                            ]
                        },
                        {
                            xtype: 'container',
                            //itemId: 'panel_pontoUsuario_filho_centro_botoes_tarde',
                            itemId: 'container_1.1.2.2',
                            region: 'east',    
                            width: '50%',                    
                            border: 1,
                            style: {
                                borderColor:'#000000', 
                                borderStyle:'solid', 
                                borderWidth:'1px',
                                marginLeft: '5px',
                                backgroundColor: '#FFFFFF'
                                //borderTop: 'none',
                                //borderLeft: 'none'
                            },                            
                            layout: {
                                type: 'border'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'container_1.1.2.2.1',
                                    border: false,
                                    region: 'center',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },                                    
                                    items: [
                                        {
                                            xtype: 'text',
                                            text: '2º Expediente',
                                            style: {
                                                fontSize: '20px'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container', 
                                    itemId: 'container_1.1.2.2.2',                                   
                                    border: false,
                                    region: 'south',
                                    height: '50%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'entrada02',                                            
                                            iconCls: 'digitalEntrada',
                                            tooltip: 'Registrar Entrada',
                                            scale: 'large',
                                            text: 'Entrada',
                                            disabled: true                                                                                
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            width: 50
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'saida02', 
                                            scale: 'large',                                           
                                            iconCls: 'digitalSaida',
                                            tooltip: 'Registrar Saída',                                            
                                            text: 'Saída',
                                            disabled: true                                            
                                        }
                                    ]      
                                }               
                            ]                                
                        }                                            
                    ]
                }
            ]            
        },                
        {
            xtype: 'grid',
            title: 'Últimos 5 pontos',
            itemId: 'grid_pontos',
            padding: '5 0 0 0',
            //store: 'ponto_eletronico.PontoEletronico',                          
            store: {
                type: 'pontoeletronico',
                remoteFilter: true,
                filters: [{
                    property: 'limit',
                    value: '5'
                }]
            },            
            columns: [                
                {xtype: 'datecolumn', format: 'd/m/Y', text: 'Data', dataIndex: 'dataPonto', width: '14%', align: 'center'},
                {
                    xtype: 'datecolumn', 
                    format: 'H:i:s', 
                    text: 'Entrada/1º Expediente', 
                    dataIndex: 'entrada01', 
                    width: '19%', 
                    align: 'center',
                    renderer: function(value, metaData, record) {
                        var pontoEletronicoStore = Ext.getStore('pontoeletronico');
                        var ponto = pontoEletronicoStore.findRecord('entrada01', value);
                        return ponto != null ? Ext.Date.format(ponto.get('entrada01'), 'H:i:s') : '--:--:--';
                    }
                },
                {
                    xtype: 'datecolumn', 
                    format: 'H:i:s', 
                    text: 'Saída/1º Expediente', 
                    dataIndex: 'saida01', 
                    width: '19%', 
                    align: 'center',
                    renderer: function(value, metaData, record) {
                        var pontoEletronicoStore = Ext.getStore('pontoeletronico');
                        var ponto = pontoEletronicoStore.findRecord('saida01', value);
                        return ponto != null ? Ext.Date.format(ponto.get('saida01'), 'H:i:s') : '--:--:--';
                    }
                },
                {
                    xtype: 'datecolumn', 
                    format: 'H:i:s', 
                    text: 'Entrada/2º Expediente', 
                    dataIndex: 'entrada02', 
                    width: '19%', 
                    align: 'center',
                    renderer: function(value, metaData, record) {
                        var pontoEletronicoStore = Ext.getStore('pontoeletronico');
                        var ponto = pontoEletronicoStore.findRecord('entrada02', value);
                        return ponto != null ? Ext.Date.format(ponto.get('entrada02'), 'H:i:s') : '--:--:--';
                    }
                },
                {
                    xtype: 'datecolumn', 
                    format: 'H:i:s', 
                    text: 'Saída/2º Expediente', 
                    dataIndex: 'saida02', 
                    width: '19%', 
                    align: 'center',
                    renderer: function(value, metaData, record) {
                        var pontoEletronicoStore = Ext.getStore('pontoeletronico');
                        var ponto = pontoEletronicoStore.findRecord('saida02', value);
                        return ponto != null ? Ext.Date.format(ponto.get('saida02'), 'H:i:s') : '--:--:--';
                    }
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                    text: 'Total/dia',
                    dataIndex: 'totaldia',
                    width: '10%',
                    align: 'center',
                    renderer: function(value, metaData, record) {
                        var pontoEletronicoStore = Ext.getStore('pontoeletronico');
                        var ponto = pontoEletronicoStore.findRecord('totaldia', value);
                        return ponto != null ? Ext.Date.format(ponto.get('totaldia'), 'H:i:s') : '--:--:--';
                    }
                }
            ],
            forceFit: true,
            columnLines: true,
            emptyText: 'Nenhum ponto registrado',
            region: 'south',
            height: '40%',
            dockedItems: [
                {                    
                    xtype: 'toolbar',                    
                    dock: 'top',
                    layout: {
                        pack: 'start',
                        type: 'hbox'
                    },
                    items: [                        
                        {
                            xtype: 'button',
                            text: 'Gerar Relatório',
                            itemId: 'exportar_pdf_usuario',
                            tooltip: 'Gerar um relatório PDF com os pontos registrados no mês passado.',
                            iconCls: 'pdf'
                        },
                        {
                            xtype: 'button',
                            text: 'Justificar ponto',
                            itemId: 'justificarPonto',
                            iconCls: 'justificar',
                            tooltip: 'Justificar algum horário',
                            disabled: false
                        },
                        {
                            xtype: 'button',
                            text: 'Corrigir Ponto',
                            itemId: 'corrigirPonto',
                            iconCls: 'corrigirHorarios',
                            tooltip: 'Corrige todos os pontos adicionando os cálculo de horas trabalhadas por dia',
                            hidden: true,
                            listeners: {                                                
                                beforerender: function(thisComponent, e0pts) {
                                    var me = this;
                                    Ext.Ajax.request({
                                        method: 'POST',
                                        url: 'php/security/importUserSession.php',
                                        success: function(conn, response, options, e0pts) {
                                            var result = Packt.util.Util.decodeJSON(conn.responseText);             
                                            if(result.user_id == 1) {   
                                                thisComponent.setVisible(true);                                                              
                                            }
                                        }
                                    });
                                }
                            } 
                        }
                    ]
                }
            ]
        }        
    ]
});


/*Ext.onReady(function(){	
	var panel = Ext.create('Ext.panel.Panel', {
		renderTo: Ext.getBody(),
		dockedItems: [{
			xtype: 'toolbar',
			itemId: 'tbar',
	        dock: 'bottom',
	        items: [{
	        	itemId: 'relogio'
	        }]
		}]
	})
	var relogio = {
	    run: function(){
	    	var data = Ext.Date.format(new Date(), 'd/m/Y H:i:s');
            var panelRelogio = Ext.ComponentQuery.query('#panelRelogio')[0];
            
	        panel.getDockedComponent('tbar').child('#relogio').setText(data);            
            panelRelogio.body.dom.innerText = data;
	    },
	    interval: 1000 //atualizando a cada 1 segundo
	}
	
	var execucaoRelogio = Ext.create('Ext.util.TaskRunner');
	execucaoRelogio.start(relogio); 
});*/