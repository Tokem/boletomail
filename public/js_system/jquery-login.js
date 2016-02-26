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

    var caminho = "/boletomail/public/login";
    var email = $("#email").val();
    var senha = $("#senha").val();
    var redirectAdmin = "/boletomail/public/usuario/";
    var redirectUsuario = "/boletomail/public/boleto";

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


          console.log(e);

          setTimeout( function() {
                    $("#btn-login").button('complete');
                    
                    var obj = jQuery.parseJSON(e);

                    if(obj.resultado!=1){
                       $("#mensagem").html(""); 
                       $("#mensagem").html("*Login ou senhas invalidos!");
                       $("#mensagem").show();
                    }else{

                      if(obj.permissao=="usuario"){
                        $(location).attr('href',redirectUsuario); 
                      }
                      
                    }
                    
                }, 2000 );
        }, error: function(e) {
        }
    })
  
};