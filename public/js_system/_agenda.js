$(document).ready(function(){
    $(".cancel_agenda").on('click',function(){
        location.reload();
    })
})

$(document).ready(function() {

$('#surveyForm').formValidation({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            age_nome: {
                validators: {
                    notEmpty: {
                        message: 'Nome obrigatório'
                    },
                }
            },
            age_data: {
                validators: {
                    notEmpty: {
                        message: 'Data é obrigatória'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'Digite uma data válida'
                    }
                }
            },age_estado: {
                validators: {
                    notEmpty: {
                        message: 'Estado é obrigatório'
                    },
                }
            },age_cidade: {
                validators: {
                    notEmpty: {
                        message: 'Cidade é obrigatório'
                    },
                }
            },age_tipo: {
                validators: {
                    notEmpty: {
                        message: 'Tipo é obrigatório'
                    },
                }
            },'parcelas[]': {
                    // The task is placed inside a .col-xs-6 element
                    //row: '.col-xs-4',
                    validators: {
                        notEmpty: {
                            message: 'Valor das Parcelas Obrigatório!'
                        }
                    }

                }

        }
    });
}).on('success.form.fv', function(e) {
            // Prevent form submission

        var allVals = [];
        $("#modal_agenda").modal("hide");
         $('#surveyForm input:checkbox').each(function() {

            if ($(this).is(':visible')) {
                
                if( $(this).prop('checked') == false ){
                    $(this).val("nao_pago");
                    $(this).prop('checked',true);
                }

                
            }
           
         });

        e.preventDefault();

        var $form = $(e.target),
            fv    = $form.data('formValidation');

        // Use Ajax to submit form data
        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: $form.serialize(),
            success: function(result) {
                // console.log(result);
                // return false;
                if(result==="1"){
                    window.location.reload(true);
                }    

                e.preventDefault();
            }
        });

        return false;
});


$(document).ready(function() {
    // The maximum number of options    

    var MAX_OPTIONS = 10;

    $('#surveyForm')
     
        // Add button click handler
        .on('click', '.addButton', function() {


            var altura = $("div.modal-backdrop.fade.in").height();
            var novaAltura = 170 + altura;

            $("div.modal-backdrop.fade.in").css({'height':novaAltura+'px'}); 

            var $template = $('#optionTemplate'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .insertBefore($template),
                $option   = $clone.find('[name="parcelas[]"]');

            // Add new field
            $('#surveyForm')
                .formValidation('addField', $clone.find('[name="parcelas[]"]'))
                .formValidation('addField', $clone.find('[name="datas[]"]'))
        })


        // Called after adding new field
        .on('added.field.fv', function(e, data) {
            // data.field   --> The field name
            // data.element --> The new field element
            // data.options --> The new field options

            if (data.field === 'parcelas[]') {
                if ($('#surveyForm').find(':visible[name="parcelas[]"]').length >= MAX_OPTIONS) {
                    $('#surveyForm').find('.addButton').attr('disabled', 'disabled');
                }
            }


            if (data.field === 'datas[]') {
                // The new due date field is just added
                // Create a new date picker
                data.element
                    .parent()
                    .datepicker({
                        format: 'dd/mm/yyyy'
                    })
                    .on('changeDate', function(evt) {
                        // Revalidate the date field
                        $('#surveyForm').formValidation('revalidateField', data.element);
                    });
            }

        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row = $(this).closest('.form-group');

            // Remove fields
            $('#surveyForm')
                .formValidation('removeField', $row.find('[name="parcelas[]"]'))
                .formValidation('removeField', $row.find('[name="datas[]"]'));

            // Remove element containing the fields
            $row.remove();
        });

        // // Called after removing the field
        // .on('removed.field.fv', function(e, data) {
        //    if (data.field === 'parcelas[]') {
        //         if ($('#surveyForm').find(':visible[name="parcelas[]"]').length < MAX_OPTIONS) {
        //             $('#surveyForm').find('.addButton').removeAttr('disabled');
        //         }
        //     }
        // });
});



// $( document ).on( "click", ".valor", function() {
//   if ( $(".valor").length ) {
//     $(".valor").maskMoney({thousands:'.', decimal:',', allowZero:true});  
//   }
  
// });

$(document).ready(function() {

  $("#owl-demo").owlCarousel({
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });

});

$(document).ready(function() {

    if ( $("#owl-demo").length ) {
        $("#owl-demo").owlCarousel({
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
      });
    }
    
});
// $("#data_inicio").datepicker();
// $("#data_fim").datepicker();

// $("#mes_inicio").datepicker({ dateFormat: 'mm/yy' });

$("#cadastrar_agenda").on('click',function(){
    $("#modal_agenda").modal("show");
    var id_banda = $(this).attr("banda");
    $("input[name='ban_id']").val(id_banda);
    var showModal  = $("#modal_agenda").data()['bs.modal'].isShown
    if(showModal){
        $("body").addClass("modal-open");
    }else{
        $("body").removeClass("modal-open");
    }    
})


$(".editar_agenda").on('click',function(){
    $("#modal_agenda").modal("show");

    var id_banda = $(this).attr("banda");
    var id_agenda = $(this).attr("agenda");

    $("input[name='age_id_fk']").val(id_agenda);
    $("input[name='ban_id']").val(id_banda);


    // Use Ajax to submit form data
        $.ajax({
            url: "/timebook/public/agenda/visualizar/",
            type: 'POST',
            data:{
             "id_agenda":id_agenda   
            },
            success: function(result) {
                
                // console.log(result);
                // return false;
                
                var obj = jQuery.parseJSON(result);

                $("#age_nome").val(obj.agenda.age_nome);
                $("#age_data").val(obj.agenda.age_data);
                $("#age_hora").val(obj.agenda.age_hora);
                $("#age_estado").val(obj.agenda.age_estado);
                $("#age_cidade").val(obj.agenda.age_cidade);
                $("#age_valor").val(obj.agenda.age_valor);
                $("#age_tipo").val(obj.agenda.age_tipo);

                if(obj.agenda.age_obs.length){$("#age_obs").html(obj.agenda.age_obs)};

                
                if(obj.hasOwnProperty('parceiro')){
                    $("#par_nome").val(obj.parceiro.par_nome);
                    $("#par_valor").val(obj.parceiro.par_valor);
                    $("#par_obs").html(obj.parceiro.par_obs);
                };

                if(obj.hasOwnProperty('contratante')){
                    
                    $("#con_nome").val(obj.contratante.con_nome);
                    $("#con_telefone").val(obj.contratante.con_telefone);

                    if(obj.contratante.con_nome.length){$("#con_email").val(obj.contratante.con_email);}
                }    
                
                if(obj.agenda.age_cache_real.length){$("#age_cache_real").val(obj.agenda.age_cache_real)};
                if(obj.agenda.age_sinal.length){$("#age_sinal").val(obj.agenda.age_sinal);}
                if(obj.agenda.age_data_sinal.length){$("#age_data_sinal").val(obj.agenda.age_data_sinal);}    
                    
                if(obj.hasOwnProperty('pagamentos')){
                    for(var i = 0; i < obj.pagamentos.length; i++){
                        //console.log(obj.pagamentos[i].par_id);
                        if(i===0){
                           $("#parcelas").show(); 
                           $('#surveyForm').find('input[name="parcelas[]"]').first().val(obj.pagamentos[i].par_valor);
                           $('#surveyForm').find('input[name="datas[]"]').first().val(obj.pagamentos[i].par_data);
                           if(obj.pagamentos[i].par_ativo==="pago"){
                              $('#surveyForm').find('input[name="pago[]"]').first().prop('checked', true);   
                           }
                        }else{

                                var $template = $('#optionTemplate'),
                                $clone    = $template
                                                .clone()
                                                .removeClass('hide')
                                                .removeAttr('id')
                                                .insertBefore($template),
                                $option   = $clone.find('[name="parcelas[]"]');

                            // Add new field
                            $('#surveyForm').formValidation('addField', $clone.find('input[name="parcelas[]"]'));
                            $('#surveyForm').formValidation('addField', $clone.find('input[name="datas[]"]')).val(obj.pagamentos[i].par_data);

                                var parcela = $('input[name="parcelas[]').eq(i).val(obj.pagamentos[i].par_valor);
                                var data = $('input[name="datas[]').eq(i).val(obj.pagamentos[i].par_data);
                                
                                if(obj.pagamentos[i].par_ativo==="pago"){
                                    $('#surveyForm').find('input[name="pago[]"]').eq(i).prop('checked', true);   
                                }

                        }//end else

                    }
                }
            }
        });

    return false;
})




// $(function() {

    
//     $("body").delegate("#dueDatePicker", "focusin", function(){
//         $(this).datepicker({format: 'dd/mm/yyyy'})
//     });

//     $("body").delegate("#age_data", "focusin", function(){
//         $(this).datepicker({format: 'dd/mm/yyyy'})
//     });
    
//     $("body").delegate("#fin_data_sinal", "focusin", function(){
//         $(this).datepicker({format: 'dd/mm/yyyy'})
//     }); 

//     $("body").delegate("#age_data_sinal", "focusin", function(){
//         $(this).datepicker({format: 'dd/mm/yyyy'})
//     }); 

//     $("body").delegate("#data_inicio", "focusin", function(){
//         $(this).datepicker({format: 'dd/mm/yyyy'})
//     });

//     $("body").delegate("#data_fim", "focusin", function(){
//         $(this).datepicker({format: 'dd/mm/yyyy'})
//     });

//     $("body").delegate("#mes_inicio", "focusin", function(){
//         $(this).datepicker({
//           format: "mm/yyyy",
//           viewMode: "months", 
//           minViewMode: "months"})
//     });

//     // $("#age_hora").mask('99:99');
//     // $("#con_telefone").mask('(99) 99999-9999');


// });



$(function() {

    
    $("body").delegate("#dueDatePicker", "focusin", function(){
        $(this).datepicker({format: 'dd/mm/yyyy'})
    });

    $("body").delegate("#age_data", "focusin", function(){
        $(this).datepicker({format: 'dd/mm/yyyy',autoclose: true})


        $("#age_data").on('changeDate', function(ev){
            $(this).datepicker('hide');
        });

    });
    
    $("body").delegate("#fin_data_sinal", "focusin", function(){
        $(this).datepicker({format: 'dd/mm/yyyy'})

        $("#fin_data_sinal").on('changeDate', function(ev){
            $(this).datepicker('hide');
        });
    }); 

    $("body").delegate("#age_data_sinal", "focusin", function(){
        $(this).datepicker({format: 'dd/mm/yyyy'})

        $("#age_data_sinal").on('changeDate', function(ev){
            $(this).datepicker('hide');
        });
    }); 

    $("body").delegate("#data_inicio", "focusin", function(){
        $(this).datepicker({format: 'dd/mm/yyyy'})

        $("#data_inicio").on('changeDate', function(ev){
            $(this).datepicker('hide');
        });
    });

    $("body").delegate("#data_fim", "focusin", function(){
        $(this).datepicker({format: 'dd/mm/yyyy'})

        $("#data_fim").on('changeDate', function(ev){
            $(this).datepicker('hide');
        });
    });

    $("body").delegate("#mes_inicio", "focusin", function(){
        $(this).datepicker({
          format: "mm/yyyy",
          viewMode: "months", 
          minViewMode: "months"})

        $("#mes_inicio").on('changeDate', function(ev){
            $(this).datepicker('hide');
        });

    });

    // $("#age_hora").mask('99:99');
    // $("#con_telefone").mask('(99) 9999-9999');


});



$(function(){
    
    $( "#btn_parcelamento" ).click(function() {
              
              $("#parcelas").toggle( "slow", function() {
                var altura = $("div.modal-backdrop.fade.in").height();
                var novaAltura = altura+170;
                $("div.modal-backdrop.fade.in").css({'height':novaAltura+'px'}); 
              });
        });
})


