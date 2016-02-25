<?php

class ClienteController extends Tokem_ControllerBase
{

    protected $_clientes = null;
    protected $_endereco = null;
    protected $_anamnese = null;
    protected $_antecedentes = null;
    protected $_habitos = null;
    protected $_perimetria = null;
    protected $_inspecao = null;
    protected $_sensibilidade = null;
    protected $_tratamentos = null;

    protected $_dbAdapter = null;

    public function init()
    {
        parent::init();
        $this->_clientes = new Application_Model_Clientes();
        $this->_endereco = new Application_Model_Endereco();

        $this->_dbAdapter = Zend_Db_Table::getDefaultAdapter();
        //$this->_notification = new Tokem_Notification();
        $this->_baseUrl = $url = Zend_Controller_Front::getInstance()->getBaseUrl();
    }

    public function indexAction()
    {
        
        $this->view->headScript()->appendFile($this->_baseUrl . '/js_system/jquery-system.js');
        

        $listUsers = $this->_clientes->fetchAll("cli_tipo = 2",null);
      
       /*remover pagination não esta sendo usado*/
        $paginator = Zend_Paginator::factory($listUsers);
        $paginator->setCurrentPageNumber($this->_getParam('page'));
        $paginator->setItemCountPerPage(50);

        Zend_Paginator::setDefaultScrollingStyle('Sliding');
        Zend_View_Helper_PaginationControl::setDefaultViewPartial('pagination.phtml');

        $this->view->paginator = $paginator;
    }    


    public function editarAction(){

        $form = new Application_Form_Cliente();

        /* Obtem o valor passado por $_GET */
        $id = (int) $this->getRequest()->getParam('id');

        $dados = $this->getRequest()->getParams();

        /* Dados para popular o formulario */
        /* Seta a ação do formulario */
        $form->setAction($this->_helper->url('editar/id/' . $id));

        /* Modifica o botão de criar para editar */
        //$form->getElement('btnusuario')->setAttribs(array('name' => 'edit', 'id' => 'edit','class'=>'btn btn-success'))->setLabel('Editar cliente');

        /* Obtem um unico usuário através do id passado */
        $cliente = $this->_clientes->find($id)->current();

        /* Formata as datas vindas do banco */
        $data = $cliente->cli_data_nasc;
        $format = Zend_Date::DATETIME_MEDIUM;
        $date = new Zend_Date();
        $date->set($data)->get($format);
        $cliente['cli_data_nasc'] = date('d/m/Y', strtotime($data));

        /* Popula o formulario com os valores retornados do banco */
        $form->populate($cliente->toArray());



        if (!$dados['cli_senha']) {
            $form->getElement('cli_senha')->setRequired(false);
            $form->getElement('repeatpassword')->setRequired(false);
        }

        $request = $this->getRequest();


        if ($request->isPost() && $form->isValid($request->getPost())) {

            try {


                $aux = explode('/', $dados['cli_data_nasc']);
                $dados['cli_data_nasc'] = $aux[2] . "-".$aux[1]."-".$aux[0];

                $cliente->cli_idade = $dados['cli_idade'];
                $cliente->cli_telefone = $dados['cli_telefone'];
                $cliente->cli_profissao = $dados['cli_profissao'];
                $cliente->cli_cpf = $dados['cli_cpf'];
                $cliente->cli_indicacao = $dados['cli_indicacao'];
                $cliente->cli_anotacao = $dados['cli_anotacao'];
                $cliente->cli_nome = $dados['cli_nome'];
                $cliente->cli_email = $dados['cli_email'];
                $cliente->cli_data_cadastro = $cliente->cli_data_cadastro;
                $cliente->cli_ativo = $cliente->cli_ativo;
                

                if ($dados['cli_senha']) {
                    $senha = $dados['cli_senha'];
                    $cliente->cli_senha = md5($dados['cli_senha']);
                }

                $cliente->save();
                $nome = $dados['cli_nome'];
                
                 $this->_helper->flashMessenger('<div class="alert  alert-info fade in">
                                                <button class="close" data-dismiss="alert" type="button">×</button>
                                                <strong>Paciente editado!</strong>
                                                Paciente editado com sucesso!
                                                </div>');
                
                    $this->_redirect('/cliente/ficha/id/' .$id);
                    

            } catch (Zend_Db_Exception $e) {
                
                // echo $e->getMessage();
                // exit;
                
                $this->_dbAdapter->rollBack();
                $flashMessenger = $this->_helper->FlashMessenger;
                $flashMessenger->addMessage('<div class="alert fade in">
                                                <button class="close" data-dismiss="alert" type="button">x</button>
                                                <strong>Ocorreu um erro!</strong>
                                                Se o erro persistir entre em contato com o suporte!
                                                </div>');

                $this->_helper->redirector('index');
            }
        }
            $this->view->formCliente = $form;

        
    }
    

   

   }


   public function enderecoAction(){

        /* Obtem o valor passado por $_GET */
        $id = (int) $this->getRequest()->getParam('id');
        $request = $this->getRequest();
        $endereco = $this->_endereco->fetchRow("cli_codigo_fk='$id' ", null);
        $dados = $this->getRequest()->getParams();
        
    if(isset($endereco)){


        try {


                $endereco->end_logradouro=$dados["end_logradouro"];
                $endereco->end_numero=$dados["end_numero"];
                $endereco->end_bairro=$dados["end_bairro"];
                $endereco->end_cidade=$dados["end_cidade"];
                $endereco->end_estado=$dados["end_estado"];
                $endereco->end_cep=$dados["end_cep"];
                $endereco->end_complemento=$dados["end_complemento"];
                
                $endereco->save();
                
                
                $this->_helper->flashMessenger('<div class="alert  alert-info fade in">
                                                <button class="close" data-dismiss="alert" type="button">×</button>
                                                <strong>Endereço editado!</strong>
                                                Endereço editado com sucesso!
                                                </div>');
                
                    $this->_redirect('/cliente/ficha/id/' .$id);
                    

            } catch (Zend_Db_Exception $e) {
                
                echo $e->getMessage();
                exit;
                
                $this->_dbAdapter->rollBack();
                $flashMessenger = $this->_helper->FlashMessenger;
                $flashMessenger->addMessage('<div class="alert fade in">
                                                <button class="close" data-dismiss="alert" type="button">x</button>
                                                <strong>Ocorreu um erro!</strong>
                                                Se o erro persistir entre em contato com o suporte!
                                                </div>');

                $this->_redirect('/cliente/ficha/id/' .$id);
            }


       
    }else{

        if ($request->isPost()) {

            $this->_dbAdapter->beginTransaction();

            $endereco=array(
                "end_logradouro"=>$dados["end_logradouro"],
                "end_numero"=>$dados["end_numero"],
                "end_bairro"=>$dados["end_bairro"],
                "end_cidade"=>$dados["end_cidade"],
                "end_estado"=>$dados["end_estado"],
                "end_cep"=>$dados["end_cep"],
                "end_complemento"=>$dados["end_complemento"],
                "cli_codigo_fk"=>$id,
            );

            try {
                
                
                $lastId = $this->_endereco->insert($endereco);

                $this->_dbAdapter->commit();
                
                
                $flashMessenger = $this->_helper->FlashMessenger;
                $flashMessenger->addMessage('<div class="alert  alert-info fade in">
                                                <button class="close" data-dismiss="alert" type="button">×</button>
                                                <strong>Endereço adicionado!</strong>
                                                Endereço adicionado com sucesso!
                                                </div>');
                
                $this->_redirect('/cliente/ficha/id/' . $id);
                exit;
                
            } catch (Zend_Db_Exception $e) {
                
                echo $e->getMessage();
                exit;
                
                $this->_dbAdapter->rollBack();
                $flashMessenger = $this->_helper->FlashMessenger;
                $flashMessenger->addMessage('<div class="alert fade in">
                                                <button class="close" data-dismiss="alert" type="button">x</button>
                                                <strong>Ocorreu um erro!</strong>
                                                Se o erro persistir entre em contato com o suporte!
                                                </div>');

                $this->_helper->redirector('index');
            }

        }

       }


   }

   

    public function listarAction()
    {
        // action body
    }


}