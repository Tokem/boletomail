<?php

class CadastroController extends Zend_Controller_Action
{


    protected function _getAuthAdapter() {
        $dbAdapter = Zend_Db_Table::getDefaultAdapter();
        $adapter = new Zend_Auth_Adapter_DbTable($dbAdapter);
        $adapter->setTableName('clientes')
                ->setIdentityColumn('cli_email')
                ->setCredentialColumn('cli_senha');
        return $adapter;
    }

	public function init()
    {
        
        $this->_clientes = new Application_Model_Clientes();
        $this->_dbAdapter = Zend_Db_Table::getDefaultAdapter();
        $this->_baseUrl = $url = Zend_Controller_Front::getInstance()->getBaseUrl();                

        $this->_helper->layout->disableLayout();

    }

    public function recuperarAction()
    {
        
        

    }


    public function indexAction()
	{

        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery.pstrength-min.1.2.js');

        $this->view->headLink()->appendStylesheet('/timebook/public/pickadate/lib/themes/default.css');
        $this->view->headLink()->appendStylesheet('/timebook/public/pickadate/lib/themes/default.date.css');
        $this->view->headLink()->appendStylesheet('/timebook/public/pickadate/lib/themes/default.time.css');
        

        $this->view->headScript()->appendFile($this->_baseUrl . '/pickadate/lib/picker.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/pickadate/lib/picker.date.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/pickadate/lib/picker.time.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/pickadate/lib/legacy.js');
        
        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery.maskedinput.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/pickadate/lib/translations/pt_BR.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/cadastro.js');

        $form = new Application_Form_Cadastro();
        $request = $this->getRequest();
        
        if ($request->isPost() && $form->isValid($request->getPost())) {

            $dados = $form->getValues();

            $aux = explode('/', $dados['cli_data_nasc']);
            $dados['cli_data_nasc'] = $aux[2] . "-".$aux[1]."-".$aux[0];

            $cliente = array(
                "cli_nome"=>$dados["cli_nome"],
                "cli_sexo"=>$dados["cli_sexo"],
                "cli_data_nasc"=>$dados["cli_data_nasc"],
                "cli_cpf"=>$dados["cli_cpf"],
                "cli_email"=>$dados["cli_email"],
                "cli_telefone"=>$dados["cli_telefone"],
                "cli_senha"=>$dados["cli_senha"],
            );


            try {

                $this->_clientes->insert($cliente);
                $this->_helper->flashMessenger('<div class="alert  alert-success fade in">
                                                <button class="close" data-dismiss="alert" type="button">×</button>
                                                <strong>Cadastro realizado com sucesso!</strong>
                                                Tudo ocorreu bem!
                                                </div>');


            $adapter = $this->_getAuthAdapter();            
            $adapter->setIdentity($dados['cli_email'])
                    ->setCredential($dados['cli_senha']);

            $auth = Zend_Auth::getInstance();
            $result = $auth->authenticate($adapter);


            if ($result->isValid()) {
                // se der certo, pega o registro da tabela
                $usuario = $adapter->getResultRowObject();

                // grava o registro autenticado na sessão
                $auth->getStorage()->write($usuario);
                $this->_redirect('/boleto/');

            } else{
                $this->_redirect('/login/');                
            }



                

            } catch (Zend_Db_Exception $e) {
                
                echo $e->getMessage();
                exit;
                
            }

        }

        $this->view->form = $form;	   
	}


}