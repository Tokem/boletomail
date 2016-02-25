<?php

class CadastroController extends Zend_Controller_Action
{


	public function init()
    {
        
        $this->_clientes = new Application_Model_Clientes();
        $this->_dbAdapter = Zend_Db_Table::getDefaultAdapter();
        $this->_baseUrl = $url = Zend_Controller_Front::getInstance()->getBaseUrl();        
    }


    public function indexAction()
	{

        $form = new Application_Form_Cadastro();
        $request = $this->getRequest();
        
        if ($request->isPost() && $form->isValid($request->getPost())) {

        }

        $this->view->form = $form;

	   $this->_helper->layout->disableLayout();
	}


}