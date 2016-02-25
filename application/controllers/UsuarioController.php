<?php

class UsuarioController extends Tokem_ControllerBase
{

    protected $_clientes = null;
    protected $_permissoesBandas = null;
    protected $_permissoes = null;
    protected $_logs = null;
    
    protected $_notification = null;
    protected $_dbAdapter = null;

    public function init()
    {
        parent::init();
        
        $this->_clientes = new Application_Model_Clientes();
        $this->_permissoesBandas = new Application_Model_PermissoesBandas();
        $this->_permissoes = new Application_Model_Permissoes();

        $this->_dbAdapter = Zend_Db_Table::getDefaultAdapter();
        $this->_baseUrl = $url = Zend_Controller_Front::getInstance()->getBaseUrl();
    }

    public function indexAction()
    {


        $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/jquery.dataTables.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/ZeroClipboard.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/TableTools.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/dataTables.bootstrap_03.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery.maskedinput.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery.pstrength-min.1.2.js');
        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery-system.js'); 

        $listUsers = $this->_clientes->fetchAll("cli_tipo = 1",null);
      
       /*remover pagination não esta sendo usado*/
        $paginator = Zend_Paginator::factory($listUsers);
        $paginator->setCurrentPageNumber($this->_getParam('page'));
        $paginator->setItemCountPerPage(50);

        Zend_Paginator::setDefaultScrollingStyle('Sliding');
        Zend_View_Helper_PaginationControl::setDefaultViewPartial('pagination.phtml');

        $this->view->paginator = $paginator;
        $this->view->list = $listUsers;
    }
   
    public function cadastrarAction()
    {

       $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/jquery.dataTables.js');
       $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/ZeroClipboard.js');
       $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/TableTools.js');
       $this->view->headScript()->appendFile($this->_baseUrl . '/js/datatable/dataTables.bootstrap_03.js'); 
       $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery.maskedinput.js');
       $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery.pstrength-min.1.2.js');
       $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery-system.js'); 

       $form = new Application_Form_Usuario();
       $form->setAction($this->_helper->url('cadastrar'));
       $request = $this->getRequest();

        if ($request->isPost() && $form->isValid($request->getPost())) {

            $this->_dbAdapter->beginTransaction();
                
            $dados = $form->getValues();
            try {
                
                $dados['cli_data_cadastro'] = date('Y-m-d');
                $senha = $dados['cli_senha'];
                $nome = $dados['cli_nome'];
                $dados['cli_senha'] = md5($dados['cli_senha']);

                $bandas = $dados["bandas"];

                $usuario = array(
                    "cli_nome"=>$dados["cli_nome"],
                    "cli_senha"=>$dados["cli_senha"],
                    "cli_email"=>$dados["cli_email"],
                    "cli_ativo"=>$dados["cli_ativo"],
                    "cli_permissao"=>$dados["cli_permissao"],
                    "cli_tipo"=>$dados["cli_tipo"],
                    "cli_data_cadastro"=>$dados["cli_data_cadastro"],
                    "cli_telefone"=>$dados["cli_telefone"],
                    );

                $lastId = $this->_clientes->insert($usuario);

                if (!is_null($bandas)){
                

                    foreach ($bandas as $key => $value) {
                        $listaBandas[] = $value;
                    }

                    $json =json_encode($listaBandas);
                    $permissoes = array("cli_codigo_fk"=>"$lastId","per_itens"=>$json);

                    $this->_permissoes->insert($permissoes);
                }
                    
                $this->_dbAdapter->commit();
                
                
                $flashMessenger = $this->_helper->FlashMessenger;
                        $flashMessenger->addMessage('<div class="alert alert-success" role="alert">
                                                  <strong>SUCESSO!</strong> Tudo ocorreu bem!
                                                  </div>');
                
                $this->_helper->redirector('index');
                
            } catch (Zend_Db_Exception $e) {
                
                echo $e->getMessage();
                exit;
                
                $this->_dbAdapter->rollBack();
                $flashMessenger = $this->_helper->FlashMessenger;
                $flashMessenger->addMessage('<div class="alert alert-danger" role="alert">
                                                  <strong>ERRO!</strong> Ocorreu algum erro se o erro persistir entre em contato com o suporte!.
                                                  </div>');


                $this->_helper->redirector('index');
            }
        }

        $this->view->formUsuario = $form;
    }
    
    
    public function emailAction()
    {   
         $request = $this->getRequest();
        
        if ($request->isXmlHttpRequest()) {
            try {
                
                $dados = $this->getRequest()->getParams();
                $email =$dados['cli_email'];
                
                /* Obtem um unico usuÃƒÂ¡rio atravÃƒÂ©s do id passado */
                $cliente = $this->_clientes->findByEmail($email);
                
                if($cliente){
                    echo false;
                }else{
                    echo true;
                }
                
            } catch (Zend_Db_Exception $e) {
                echo "<pre>".$e->getMessage()."</pre>";
                //echo "error";
                exit;
            }
        }
         
        exit;
        
    }
    
    public function editarAction() {
        
        $form = new Application_Form_Usuario();

        /* Obtem o valor passado por $_GET */
        $id = (int) $this->getRequest()->getParam('id');

        $dados = $this->getRequest()->getParams();

        /* Dados para popular o formulario */
        /* Seta a ação do formulario */
        $form->setAction($this->_helper->url('editar/id/' . $id));

        /* Modifica o botão de criar para editar */
        $form->getElement('btnusuario')->setAttribs(array('name' => 'edit', 'id' => 'edit','class'=>'btn btn-success'))->setLabel('Editar usuario');

        /* Obtem um unico usuário através do id passado */
        $usuario = $this->_clientes->find($id)->current();
        
        $bandas = $this->_permissoes->fetchRow("cli_codigo_fk = '$id' ",null);

        @$listaBandas = json_decode($bandas->per_itens);

        $usuarioForm = array("cli_nome"=>$usuario->cli_nome,
            "cli_email"=>$usuario->cli_email,
            "cli_telefone"=>$usuario->cli_telefone,
            "cli_senha"=>$usuario->cli_senha,
            "cli_permissao"=>$usuario->cli_permissao,
            "bandas"=>@$listaBandas);


        /* Popula o formulario com os valores retornados do banco */
        $form->populate($usuarioForm);
        

        if (!@$dados['cli_senha']) {
            $form->getElement('cli_senha')->setRequired(false);
            $form->getElement('repeatpassword')->setRequired(false);
        }

        $request = $this->getRequest();
        if ($request->isPost() && $form->isValid($request->getPost())) {


            $this->_dbAdapter->beginTransaction();

            try {

                $usuario->cli_nome = $dados['cli_nome'];
                $usuario->cli_email = $dados['cli_email'];
                $usuario->cli_permissao = $dados['cli_permissao'];
                $usuario->cli_data_cadastro = $usuario->cli_data_cadastro;
                $usuario->cli_ativo = $usuario->cli_ativo;
                

                if ($dados['cli_senha']) {
                    $senha = $dados['cli_senha'];
                    $usuario->cli_senha = md5($dados['cli_senha']);
                }


                $bandasPost = $dados["bandas"];
                if (!is_null($bandasPost)){
                    
                    foreach ($bandasPost as $key => $value) {
                        $permissoes[] = $value;
                    }


                    $json =json_encode($permissoes);
                    $this->_permissoes = $this->_permissoes->fetchRow("cli_codigo_fk='$id'",null);
                        
                    if(is_null($this->_permissoes)){
                    
                            try {

                                foreach ($bandasPost as $key => $value) {
                                    $listaBandas[] = $value;
                                }

                                $json =json_encode($listaBandas);
                                $permissoes = array("cli_codigo_fk"=>"$id","per_itens"=>$json);
                                $novasPermissoes = new Application_Model_Permissoes();
                                $novasPermissoes->insert($permissoes);
                                
                            } catch (Zend_Db_Exception $e) {

                                echo $e->getMessage();
                                exit;
                        
                            //$this->_dbAdapter->rollBack();
                            $flashMessenger = $this->_helper->FlashMessenger;   
                            $flashMessenger->addMessage('<div class="alert alert-danger" role="alert">
                                                              <strong>ERRO!</strong> Se Ocorrer novamente chame o suporte!
                                                              </div>');
                            
                            $this->_helper->redirector('index');
                                
                            }
                    }else{

                        try {
                            $this->_permissoes->per_itens = $json;
                            $this->_permissoes->save();    
                        } catch (Zend_Db_Exception $e) {

                            echo $e->getMessage();
                            exit;
                    
                        //$this->_dbAdapter->rollBack();
                        $flashMessenger = $this->_helper->FlashMessenger;   
                        $flashMessenger->addMessage('<div class="alert alert-danger" role="alert">
                                                          <strong>ERRO!</strong> Se Ocorrer novamente chame o suporte!
                                                          </div>');
                        
                        $this->_helper->redirector('index');
                            
                        }
                    }    
                                    
                }else{
                    $this->_permissoes = $this->_permissoes->fetchRow("cli_codigo_fk='$id'",null);
                    if(!is_null($this->_permissoes)){
                      $this->_permissoes->delete();  
                    }
                }


                $usuario->save();
                $nome = $dados['cli_nome'];
                
                $this->_dbAdapter->commit();

                $flashMessenger = $this->_helper->FlashMessenger;   
                $flashMessenger->addMessage('<div class="alert alert-success" role="alert">
                                                  <strong>SUCESSO!</strong> Tudo ocorreu bem!
                                                  </div>');
                $this->_helper->redirector('index');
            } catch (Zend_Db_Exception $e) {
                
                // echo $e->getMessage();
                // exit;
                
                $this->_dbAdapter->rollBack();
                $flashMessenger = $this->_helper->FlashMessenger;   
                $flashMessenger->addMessage('<div class="alert alert-danger" role="alert">
                                                  <strong>ERRO!</strong> Se Ocorrer novamente chame o suporte!
                                                  </div>');
                
                $this->_helper->redirector('index');
            }
        }

        $this->view->formUsuario = $form;
    
    }

    public function visualizarAction()
    {
        $form = new Application_Form_Usuario();

        /* Obtem o valor passado por $_GET */
        $id = (int) $this->getRequest()->getParam('id');

        /* Dados para popular o formulario */
        /* Seta a ação do formulario */
        $form->setAction($this->_helper->url('editar/id/' . $id));
        
        /*Bloqueamos os elementos*/
        
        $form->getElement('cli_nome')->setAttrib('disable','disable');
        $form->getElement('cli_telefone')->setAttrib('disable','disable');
        $form->getElement('cli_email')->setAttrib('disable','disable');
        
        $form->getElement('repeatpassword')->setAttrib('disable','disable');
        $form->getElement('cli_permissao')->setAttrib('disable','disable');
        
        $form->removeElement('btnusuario');
        $form->removeElement('repeatpassword');
        $form->removeElement('cli_senha');
        $form->removeElement('cli_senha');       
        
        /* Obtem um unico usuário através do id passado */
        $usuario = $this->_clientes->find($id)->current();       

        /* Popula o formulario com os valores retornados do banco */
        $form->populate($usuario->toArray());

        $this->view->formUsuario = $form;
    }

    
    public function excluirAction()
    {
        $request = $this->getRequest();
        
        if ($request->isPost()) {
            
            $this->_dbAdapter->beginTransaction();
            
            try {
                
                $dados = $this->getRequest()->getParams();
                /* Obtem um unico usuário através do id passado */
                
                $obj = $this->_clientes->find($dados['id'])->current();    
                
                $obj->delete();    
                
                $this->_dbAdapter->commit();
                
                 $flashMessenger = $this->_helper->FlashMessenger;   
                 $flashMessenger->addMessage('<div class="alert alert-success" role="alert">
                                                  <strong>SUCESSO!</strong> Tudo ocorreu bem!
                                                  </div>');
               echo true;
               exit;
            } catch (Zend_Db_Exception $e) {
                
                $this->_dbAdapter->rollBack();
                
                $flashMessenger = $this->_helper->FlashMessenger;   
                $flashMessenger->addMessage('<div class="alert alert-danger" role="alert">
                                                  <strong>ERRO!</strong> Se Ocorrer novamente chame o suporte!
                                                  </div>');
                exit;
            }
        }
    }

    public function logsAction()
    {
        
    }
        
    public function logsPesquisaAction()
    {
        $this->_logs = new Application_Model_Logs();
        
        $listUsers = $this->_clientes->fetchAll("cli_tipo = 1",null);

        $paginator = Zend_Paginator::factory($listUsers);
        $paginator->setCurrentPageNumber($this->_getParam('page'));
        $paginator->setItemCountPerPage(20);

        Zend_Paginator::setDefaultScrollingStyle('Sliding');
        Zend_View_Helper_PaginationControl::setDefaultViewPartial('pagination.phtml');

        $this->view->paginator = $paginator;
    }

    public function perfilAction()
    {
        
    }

    public function listarajaxAction(){
        
    }
}