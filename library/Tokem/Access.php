<?php

class Tokem_Access
{
       
    public function  permissions(){
        
          /*Adiciona os papeis */ 
        $acl = new Zend_Acl();
        $acl->addRole(new Zend_Acl_Role('administrador'));   
        $acl->addRole(new Zend_Acl_Role('administrador-agenda'));   
        $acl->addRole(new Zend_Acl_Role('usuario'));
        $acl->addRole(new Zend_Acl_Role('musico'));
        $acl->addRole(new Zend_Acl_Role('produtor'));
        $acl->addRole(new Zend_Acl_Role('cliente'));
        
        /*Adicionaos recursos ou paginas que podem ser vistas*/
        $acl->addResource('index')
        ->addResource('usuario')
        ->addResource('cliente')
        ->addResource('eventos')
        ->addResource('agenda')
        ->addResource('banda')
        ->addResource('backup')
        ->addResource('estilos');
        
        //$acl->deny('administrador','cliente','operador');
        
        try {
            //$acl->allow(array('administrador','operador','cliente','social'));
            $acl->allow('administrador',array('usuario','cliente','index','estilos','eventos','agenda','banda','backup'));
            $acl->allow('administrador-agenda',array('banda','agenda','index','backup'));
            $acl->allow('produtor',array('agenda','index','banda'));
            $acl->allow('musico',array('agenda','index','banda'));
            $acl->allow('usuario',array('cliente','index','estilos','eventos','banda'));
            $acl->allow('cliente',array('cliente','estilos','eventos','banda'));
            
        } catch (Exception $exc) {
            echo "<pre>".$exc->getMessage()."</pre>";
        }
        
       Zend_Registry::set('acl', $acl);
        
    }
   
}
