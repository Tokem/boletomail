<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControllerBase
 *
 * @author Rodolfo almeida
 */
class Tokem_ControllerBase extends Zend_Controller_Action {
   
    
    protected $_acl = null;
    protected $_usuarios = null;
    protected $_eventos = null;
    protected $_bandas = null;
    public $identity = null;
    

    public function init()
    {
         parent::init();
        

        $auth = Zend_Auth::getInstance();
        $identity = $auth->getIdentity();
        $this->identity = $identity;
        
        $this->_clientes = new Application_Model_Clientes();
    
        $acl = new Zend_Acl();
        $acl->getRoles(); //array
        $recurssos = $acl->getResources(); //array        


        $controller = Zend_Controller_Front::getInstance()->getRequest()->getControllerName();
        $action =Zend_Controller_Front::getInstance()->getRequest()->getActionName();

        $this->_acl = Zend_Registry::get('acl');
        $actionName = $this->_request->getControllerName();
        
        
        if(!isset($identity->cli_permissao)){
           $this->_redirect('/login');
           exit; 
        }    

        if(!$this->_acl->isAllowed("$identity->cli_permissao",$actionName)){
            $this->_redirect('/login');
            exit;
        }
        

        
        $this->_acl = Zend_Registry::get('acl');
        $actionName = $this->_request->getControllerName();
        
    
        $session = new Zend_Session_Namespace( 'Zend_Auth' );
        $session->setExpirationSeconds( 864000 );
        Zend_Session::rememberMe(864000);
        $timeLeftTillSessionExpires = $_SESSION [ '__ZF' ][ 'Zend_Auth' ][ 'ENT' ]  - time ();

        $env =  getenv('APPLICATION_ENV');
        if($env=="production"){
            error_reporting(0);
            ini_set('display_errors', 'off');        
        } 


        
    }
    

    
    
    
    
}

?>