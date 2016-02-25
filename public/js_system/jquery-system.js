
//CAPTURAR ENDEREÇO
$(document).ready(function() {
    $("#salvar_endereco").on('click',function(){
        var endereco = $("#map_endereco").contents().find("#txtEndereco").val();
        $("#eve_local").val(endereco);
        //$("#modal-map").modal("hide");
    })
})

//Excluir
$(document).ready(function() {
        $('.remove_item').on('click',function(){
            
            var controller = $(this).attr("controller");
            var codigo = $(this).attr("id");
            var caminho = '/timebook/public/'+controller+'/excluir';
            var red = $(this).attr("redirect");


            if (typeof red === "undefined") {
                var redirect ='/timebook/public/'+controller;
            }else{
                var redirect ='/timebook/public/'+red;
            }
            
            
            $('#deletar').modal('show');

            $("#confirm_delete").on('click',function(){
                $('#deletar').modal('hide');
                
                $.ajax({
                    url: caminho,
                    type: 'post',
                    data: {
                        id: codigo,
                    }, beforeSend: function() {
                    }, success: function(e) {
                        window.location.replace(redirect);
                    }, error: function(e) {
                        window.location.replace(redirect);
                    }
                })

            })

            return false;    
        })
});

$(function(){
     $('a').on('mouseover', function() {
            $(this).tooltip('show');
        });

     $('button').on('mouseover', function() {
            $(this).tooltip('show');
      });

})

$(function() {

    if ( $("#cli_senha").length ) {
        $("#cli_senha").pstrength();    
    }

    if ( $("#cli_telefone").length ) {
        $("#cli_telefone").mask('(99) 99999-9999');
    }

    if ( $("#eve_data").length ) {
        $("#eve_data").datepicker();
    }

    if ( $("#eve_data_fim").length ) {
        $("#eve_data_fim").datepicker();
    }

    
    $("#map").on('click',function(){
        $("#modal-map").modal('show');
    })

})