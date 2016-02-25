$(function(){
     $('a').on('mouseover', function() {
            $(this).tooltip('show');
        });

     $('button').on('mouseover', function() {
            $(this).tooltip('show');
      });

})

$(function() {
    $("#cli_senha").pstrength();
    $("#cli_telefone").mask('(99) 9999-9999');
    $("#end_cep").mask('99999-999');


    $("#per_contato_urgencia").mask('(99) 9999-9999');
    $("#cli_cpf").mask('999.999.999-99');
    $("#data_inicio").datepicker();
    $("#data_fim").datepicker();
    $("#fin_data").datepicker();
    $('#tra_data_avaliacao').datepicker();

    $("#cli_data_nasc").datepicker({
        changeMonth: true,
        changeYear: true
    });

    $('#tar_prazo-datepicker').datetimepicker({
      pickTime: false
    });    


    $("#tra_valor").maskMoney({thousands:'.', decimal:',', allowZero:true});
    $("#fin_valor").maskMoney({thousands:'.', decimal:',', allowZero:true});
    

})

$("#cli_email").on('blur', function() {

    var caminho = "/ducajobs/public/usuario/email";
    var check = $("#cli_email").val();
    
    if(check){
        $.ajax({
        url: caminho,
        type: 'post',
        data: {
            cli_email: check,
        }, beforeSend: function() {
            $("#load").fadeOut();
            $("#load").show();
            $("#mensagem_email").hide();
            $('#btnusuario').prop('disabled', true);
        }, success: function(e) {
            $("#load").fadeOut();
            setTimeout(function() {
                $("#mensagem_email").hide();
                if (e) {
                  $("#mensagem_email").html("");
                  $('#btnusuario').prop('disabled', false);
                  $("#btnusuario").button('complete');
                } else {
                    $("#btnusuario").button('loading');
                    $("#mensagem_email").html("");
                    $("#mensagem_email").html("*Email já cadastrado no sistema");
                    $("#mensagem_email").show();
                }

            }, 2000);

        }, error: function(e) {

            setTimeout(function() {
                $("#mensagem_email").html("*Erro ao pesquisar email na base de dados");
                $("#mensagem_email").show();
                $("#load").fadeOut();
            }, 2000);

        }
    })
    }
    
    
})

//Deletar Usuario
$("#deleteUser").on('click',function(){

    $('#myModal').modal('show');
    $("#modal-t").html('Deletar usuario');
    $(".modal-body").html("<p>Deseja realmente deletar este usuario?!</p><p>Esta ação não podera ser disfeita!</p>")
    
    $("#continuar").on('click',function(){
        var codigo = $("#form-usuario").attr('ref');
        var caminho ="/ducajobs/public/usuario/delete-ajax/";
        var url = location.href;  // entire url including querystring - also: window.location.href;
         var baseURL = url.substring(0, url.indexOf('/', 14))+"/guia/public/usuario/";
        
      if ( $("#form-usuario").length ){  
        $.ajax({
            url: caminho,
            type: 'post',
            data: {
                cli_codigo: codigo,
            }, beforeSend: function() {
            }, success: function(e) {
                window.location.replace("/ducajobs/public/usuario/");
            }, error: function(e) {
                console.log(e);
                return false
            }
        })
           return false; 
       } 
      
    })
    
    return false;

})

//Deletar cliente
$("#deleteCliente").on('click',function(){
    
    $('#myModal').modal('show');
    $("#modal-t").html('Deletar cliente');
    $(".modal-body").html("<p>Deseja realmente deletar este cliente?!</p><p>Esta ação não podera ser disfeita!</p>")
    
    $("#continuar").on('click',function(){
        var codigo = $("#form-cliente").attr('ref');
        var caminho ="/ducajobs/public/cliente/delete-ajax/";
        var url = location.href;  // entire url including querystring - also: window.location.href;
         var baseURL = url.substring(0, url.indexOf('/', 14))+"/guia/public/cliente/";
    
            if ( $("#form-cliente").length ){
                $.ajax({
                    url: caminho,
                    type: 'post',
                    data: {
                        cli_codigo: codigo,
                    }, beforeSend: function() {
                    }, success: function(e) {
                        window.location.replace("/ducajobs/public/cliente/");
                    }, error: function(e) {
                        console.log(e);
                        return false
                    }
                })
            }    
        
         return false;   
        
    })
    
    return false;   
})

//Deletar Usuario
$(".ver_tratamento").on('click',function(){

    $('#modal_tratamento').modal('show');
    $(".modal-title").html('Visualizar Tratamento');    


    return false;

})