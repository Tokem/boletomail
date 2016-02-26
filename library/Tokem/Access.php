<?php

class Tokem_Access
{
       
    public function  permissions(){
        
          /*Adiciona os papeis */ 
        $acl = new Zend_Acl();
        $acl->addRole(new Zend_Acl_Role('administrador'));   
        $acl->addRole(new Zend_Acl_Role('usuario'));
        
        /*Adicionaos recursos ou paginas que podem ser vistas*/
        $acl->addResource('index');
        $acl->addResource('cadastro');
        $acl->addResource('usuario');
        $acl->addResource('boleto');
        
        //$acl->deny('administrador','cliente','operador');
        
        try {
            //$acl->allow(array('administrador','operador','cliente','social'));
            $acl->allow('administrador',array('usuario','index','boleto'));
            $acl->allow('usuario',array('boleto'));
            
        } catch (Exception $exc) {
            echo "<pre>".$exc->getMessage()."</pre>";
        }
        
       Zend_Registry::set('acl', $acl);
        
    }
   
}
