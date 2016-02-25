$(document).ready(function() {

    $('#registrationForm').formValidation({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nome: {
                validators: {
                    notEmpty: {
                        message: 'Nome obrigatório'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'Digite entre 6 e 30 letras'
                    },
                }
            }
            ,segundo_nome: {
                validators: {
                    notEmpty: {
                        message: 'Segundo Nome obrigatório'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'Digite entre 6 e 30 letras'
                    },
                }
            }
            ,email: {
                validators: {
                    notEmpty: {
                        message: 'Email Obrigatório!'
                    },
                    emailAddress: {
                        message: 'Digite um email válido!'
                    }
                }
            },sexo: {
                validators: {
                    notEmpty: {
                        message: 'Sexo Obrigatório!'
                    }
                }
            },telefone: {
                validators: {
                    notEmpty: {
                        message: 'Telefone Obrigatório!'
                    },
                }
            },
            
        }
    });
}).on('success.form.fv', function(e) {
            

            var caminho = "/timebook/public/mailer/adicionar";
    var nome = $("#nome").val();
    var segundo_nome = $("#segundo_nome").val();
    var email = $("#email").val();
    var telefone = $("#telefone").val();
    var sexo = $('input[name=sexo]:checked', '#registrationForm').val();
    var evento = $("#id_evento").val();

    $.ajax({
        url: caminho,
        type: 'post',
        data: {
            time_nome: nome,
            time_segundo_nome: segundo_nome,
            time_email: email,
            time_telefone: telefone,
            time_sexo: sexo,
            time_id_evento: evento,
        }, beforeSend: function() {
        }, success: function(e) {
            
            if(e==1){
                $('#registrationForm').formValidation('resetForm', true);
                $("#myModal").modal("hide");
                alert("Participante cadastrado com sucesso!");
            }else{
                alert(e);
            }
            return false;
        }, error: function(e) {
        }
    })    
            
});