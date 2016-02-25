SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `timebook` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `timebook` ;

-- -----------------------------------------------------
-- Table `timebook`.`time_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_clientes` (
  `cli_codigo` INT NOT NULL AUTO_INCREMENT,
  `cli_nome` VARCHAR(100) NULL,
  `cli_senha` VARCHAR(45) NULL,
  `cli_email` VARCHAR(45) NULL,
  `cli_ativo` TINYINT(1) NULL DEFAULT 1,
  `cli_permissao` VARCHAR(45) NULL,
  `cli_tipo` VARCHAR(45) NULL,
  `cli_anotacao` VARCHAR(45) NULL,
  `cli_data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cli_foto` TEXT NULL,
  `cli_telefone` VARCHAR(45) NULL,
  PRIMARY KEY (`cli_codigo`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_eventos` (
  `eve_id` INT NOT NULL AUTO_INCREMENT,
  `eve_nome` VARCHAR(45) NULL,
  `eve_data` DATE NULL,
  `eve_local` TEXT NULL,
  `eve_atracoes` TEXT NULL,
  `eve_data_fim` DATE NULL,
  `eve_mailing` INT NULL DEFAULT 0,
  PRIMARY KEY (`eve_id`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_mailing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_mailing` (
  `mai_id` INT NOT NULL AUTO_INCREMENT,
  `mai_nome` VARCHAR(45) NULL,
  `mai_segundo_nome` VARCHAR(45) NULL,
  `mai_email` VARCHAR(45) NULL,
  `mai_telefone` VARCHAR(45) NULL,
  `mai_sexo` VARCHAR(45) NULL,
  `mai_data_cadastro` DATE NULL,
  `eve_cod_fk` INT NOT NULL,
  PRIMARY KEY (`mai_id`),
  INDEX `fk_time_mailing_time_evento1_idx` (`eve_cod_fk` ASC))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_telefones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_telefones` (
  `tel_cod` INT NOT NULL AUTO_INCREMENT,
  `tel_telefone` VARCHAR(45) NULL,
  `tel_ramal` VARCHAR(45) NULL,
  `tel_setor` VARCHAR(45) NULL,
  `tel_nome_contato` VARCHAR(45) NULL,
  `cli_codigo_fk` INT NOT NULL,
  PRIMARY KEY (`tel_cod`),
  INDEX `fk_time_telefone_time_clientes1_idx` (`cli_codigo_fk` ASC))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_estilos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_estilos` (
  `est_id` INT NOT NULL AUTO_INCREMENT,
  `est_nome` VARCHAR(45) NULL,
  PRIMARY KEY (`est_id`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_estilo_eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_estilo_eventos` (
  `eves_id` INT NOT NULL AUTO_INCREMENT,
  `time_mailing_mal_id` INT NOT NULL,
  `time_estilos_est_cod` INT NOT NULL,
  INDEX `fk_time_mailing_has_time_estilos_time_estilos1_idx` (`time_estilos_est_cod` ASC),
  INDEX `fk_time_mailing_has_time_estilos_time_mailing1_idx` (`time_mailing_mal_id` ASC),
  PRIMARY KEY (`eves_id`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_enderecos` (
  `end_cod` INT NULL,
  `end_logradouro` TEXT NULL,
  `end_bairro` VARCHAR(45) NULL,
  `end_cidade` VARCHAR(45) NULL,
  `end_estado` VARCHAR(45) NULL,
  `end_cep` VARCHAR(45) NULL,
  `end_numero` VARCHAR(45) NULL,
  `end_complemento` VARCHAR(45) NULL,
  `cli_codigo_fk` INT NOT NULL,
  INDEX `fk_time_endereco_time_clientes1_idx` (`cli_codigo_fk` ASC),
  PRIMARY KEY (`cli_codigo_fk`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_fisica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_fisica` (
  `fis_cod` INT NULL,
  `fis_cpf` VARCHAR(45) NULL,
  `fis_idade` VARCHAR(45) NULL,
  `fis_data_nasc` DATE NULL,
  `cli_profissao` VARCHAR(45) NULL,
  `cli_identidade` VARCHAR(45) NULL,
  `cli_codigo_fk` INT NOT NULL,
  INDEX `fk_time_fisica_time_clientes1_idx` (`cli_codigo_fk` ASC),
  PRIMARY KEY (`cli_codigo_fk`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_juridica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_juridica` (
  `jur_cod` INT NULL,
  `jur_cnpj` VARCHAR(45) NULL,
  `jur_razao_social` TEXT NULL,
  `jur_nome_fantasia` VARCHAR(45) NULL,
  `jur_ins_estadual` VARCHAR(45) NULL,
  `jur_responsavel` VARCHAR(45) NULL,
  `cli_codigo_fk` INT NOT NULL,
  PRIMARY KEY (`cli_codigo_fk`),
  INDEX `fk_time_juridica_time_clientes1_idx` (`cli_codigo_fk` ASC))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_documentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_documentos` (
  `doc_pro` INT NOT NULL AUTO_INCREMENT,
  `doc_nome` TEXT NULL,
  `doc_local` TEXT NULL,
  `cli_codigo_fk` INT NOT NULL,
  PRIMARY KEY (`doc_pro`),
  INDEX `fk_time_documentos_time_clientes1_idx` (`cli_codigo_fk` ASC))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `timebook`.`time_estilos_eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timebook`.`time_estilos_eventos` (
  `ese_id` INT NOT NULL AUTO_INCREMENT,
  `eve_id_fk` INT NOT NULL,
  `est_id_fk` INT NOT NULL,
  INDEX `fk_time_eventos_has_time_estilos_time_estilos1_idx` (`est_id_fk` ASC),
  INDEX `fk_time_eventos_has_time_estilos_time_eventos1_idx` (`eve_id_fk` ASC),
  PRIMARY KEY (`ese_id`))
ENGINE = MyISAM;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
