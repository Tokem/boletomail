<?php

class Application_Form_Cadastro extends Zend_Form
{

    public function init()
    {
         /*validadores*/
        $validarTamanho = new Zend_Validate_StringLength(2,100);
        $validarEmail = new Zend_Validate_EmailAddress();
        $validarUrl = new Zend_Validate_Hostname();
        
        /*filtros*/
        $stripTags =  new Zend_Filter_StripTags();
        $trim = new Zend_Filter_StringTrim();
        
        /*Elementos do formulario*/
        $nome = new Zend_Form_Element_Text('cli_nome');
        $nome->setLabel('Nome:')
             ->setRequired(true)
             ->addFilter($stripTags)
             ->addFilter($trim)
             ->addValidator($validarTamanho)
             ->setAttrib('class', 'form-control');

        $sexo = new Zend_Form_Element_Radio('cli_sexo');
        $sexo->setLabel('Sexo:')
          ->setRequired(true)
          ->addMultiOptions(array(
            'Masculinio' => 'Masculino',
            'Feminino' => 'Femino'
          ));

        $datanasc = new Zend_Form_Element_Text('cli_data_nasc');
        $datanasc->setLabel('Data de Nascimento:')
             ->setRequired(true)
             ->addFilter($stripTags)
             ->addFilter($trim)
             ->setAttrib('class', 'form-control');

        

        $cpf = new Zend_Form_Element_Text('cli_cpf');
        $cpf->setLabel('CPF:')
             ->setRequired(true)
             ->addFilter($stripTags)
             ->addFilter($trim)
             ->setAttrib('class', 'form-control');
     
        
        $email = new Zend_Form_Element_Text('cli_email');
        $email->setLabel('Email')
              ->setRequired(true)
              ->addFilter($stripTags)
              ->addFilter($trim)
              ->addValidator($validarEmail)
              ->setAttrib('class', 'form-control');



        $repetirEmail = new Zend_Form_Element_Password('repeat-senha');
        $repetirEmail->setLabel('Repetir email:')
                ->setRequired(true)
                ->addFilter($stripTags)
                ->addFilter($trim)
                ->addValidator(new Zend_Validate_StringLength(array('min' => 6,'max' => 30)))
                ->addValidator('identical', true, array('cli_email'))
                ->setIgnore(true)
                ->setAttrib('class', 'form-control');
       
        
        $telefone = new Zend_Form_Element_Text('cli_telefone');
        $telefone->setLabel('Telefone')
              ->setRequired(true)
              ->addFilter($stripTags)
              ->addFilter($trim)
              ->setAttrib('class', 'form-control');
        
        $senha = new Zend_Form_Element_Password('cli_senha');
        $senha->setLabel('Senha:')
                ->setRequired(true)
                ->addFilter($stripTags)
                ->addFilter($trim)
                ->addValidator(new Zend_Validate_StringLength(array('min' => 6,'max' => 12)))
                ->setAttrib('class', 'form-control');
        
        
        $repetir = new Zend_Form_Element_Password('repeat-password');
        $repetir->setLabel('Repetir senha:')
                ->setRequired(true)
                ->addFilter($stripTags)
                ->addFilter($trim)
                ->addValidator(new Zend_Validate_StringLength(array('min' => 6,'max' => 12)))
                ->addValidator('identical', true, array('cli_senha'))
                ->setIgnore(true)
                ->setAttrib('class', 'form-control');
       
        

        
        $submit = new Zend_Form_Element_Submit('Enviar');
        $submit->setLabel('Enviar Dados')
                ->setIgnore(true)
                ->setAttrib('class','btn btn-lg btn-success btn-block');
        
        $this->setAttrib('id','form-usuario');
        
        $this->addElements(array(
            $nome,
            $sexo,
            $datanasc,
            $email,
            $repetirEmail,
            $cpf,
            $telefone,
            $senha,
            $repetir,
            $submit,
        ));
    }


}

