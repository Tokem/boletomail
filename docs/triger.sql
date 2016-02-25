DELIMITER $$

CREATE TRIGGER check_delete 
	after delete ON time_mailing for each row 
BEGIN
	DECLARE updatecount integer;
  SET updatecount = ( SELECT count(*) FROM time_mailing  WHERE eve_cod_fk = old.eve_cod_fk);
  IF updatecount>0
    THEN
      UPDATE time_eventos SET eve_mailing = updatecount WHERE eve_id = old.eve_cod_fk;
  END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER check_update 
	after insert ON time_mailing for each row 
BEGIN
	DECLARE updatecount integer;
  SET updatecount = ( SELECT count(*) FROM time_mailing  WHERE eve_cod_fk = new.eve_cod_fk);
  IF updatecount>0
    THEN
      UPDATE time_eventos SET eve_mailing = updatecount WHERE eve_id = new.eve_cod_fk;
  END IF;
END$$

DELIMITER ;