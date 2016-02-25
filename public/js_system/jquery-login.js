$('#login').on("keyup keypress", function(e) {
  var code = e.keyCode || e.which; 
  if (code  == 13) {               
    e.preventDefault();    

    $("#btn-login").click ();
    return false;
  }
});

$(document).ready(function() {

    $("#login").bootstrapValidator({

        message: 'Valor não aceito!',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'Email Obrigatório!'
                    },
                    emailAddress: {
                        message: 'Digite um email válido!'
                    }
                }
            },senha: {
                validators: {
                    notEmpty: {
                        message: 'Senha obrigatória'
                    },
                }
            }
            
        }
    });
});


function onLoginSuccess(e) {

    var caminho = "/timebook/public/login";
    var email = $("#email").val();
    var senha = $("#senha").val();
    var redirectAdmin = "/timebook/public/banda";
    var redirectMusico = "/timebook/public/banda";
    var redirectProdutor = "/timebook/public/banda";


    $.ajax({
        url: caminho,
        type: 'post',
        data: {
            "email": email,
            "senha": senha,
        }, beforeSend: function() {
          $("#btn-login").button('loading');
          $("#mensagem").hide();   
        }, success: function(e) {

          setTimeout( function() {
                    $("#btn-login").button('complete');
                    
                    var obj = jQuery.parseJSON(e);

                    if(obj.resultado!=1){
                       $("#mensagem").html(""); 
                       $("#mensagem").html("*Login ou senhas invalidos!");
                       $("#mensagem").show();
                    }else{

                      if(obj.permissao=="administrador"){
                        $(location).attr('href',redirectAdmin); 
                      }

                      if(obj.permissao=="musico"){
                        $(location).attr('href',redirectMusico); 
                      }

                      if(obj.permissao=="administrador-agenda"){
                        $(location).attr('href',redirectAdmin); 
                      }
                      if(obj.permissao=="produtor"){
                        $(location).attr('href',redirectProdutor); 
                      }
                      // else{
                      //   $(location).attr('href',redirec); 
                      // }
                      
                    }
                    
                }, 2000 );
        }, error: function(e) {
        }
    })
  
};