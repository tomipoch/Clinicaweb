--EIFA_CABECERA_BOLETA
--EIFA_CUERPO_BOLETA
--EIFA_CABECERA_BOLETA
--EIFA_CUERPO_BOLETA
--EIFA_FORMA_DE_PAGO
--EIFA_DETALLES_CARGO
--EIFA_AUXILIARES
--EIFA_HORARIOS
--EIFA_DETALLES_HORARIO
--EIFA_MEDICAMENTOS
--EIFA_INDICACIONES
--EIFA_DESCRIPCION_DEL_DIAGNOSTICO
--EIFA_DIAGNOSTICO
-- check ========================================================================================================================================================
CREATE
OR REPLACE FUNCTION pk_generador(
    p_nombre_tabla IN VARCHAR2,
    p_nombre_columna IN VARCHAR2
) RETURN NUMBER IS v_max_id NUMBER;

BEGIN EXECUTE IMMEDIATE 'SELECT MAX(' || p_nombre_columna || ') FROM ' || p_nombre_tabla INTO v_max_id;

IF v_max_id IS NULL THEN v_max_id := 1;

ELSE v_max_id := v_max_id + 1;

END IF;

RETURN v_max_id;

END generar_nueva_pk;

-- check ========================================================================================================================================================
-- CABECERA DE BOLETA
CREATE
OR REPLACE PROCEDURE crud_cabecera_boleta (
    p_accion IN VARCHAR2,
    p_cod_boleta IN OUT NUMBER,
    p_cod_auxiliar IN OUT NUMBER,
    p_cod_forma_pago IN OUT NUMBER,
    p_total_a_pagar IN OUT NUMBER,
    p_rut_paciente IN OUT NUMBER,
    p_fecha IN OUT DATE,
    p_resultado OUT VARCHAR2
) IS pk_cod_boleta NUMBER;

BEGIN -- Bloquear la tabla para evitar concurrencia
EXECUTE IMMEDIATE 'LOCK TABLE EIFA_CABECERA_BOLETA IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN pk_cod_boleta := pk_generador('EIFA_CABECERA_BOLETA', 'COD_BOLETA');

-- Operación de inserción
INSERT INTO
    EIFA_CABECERA_BOLETA (
        COD_BOLETA,
        COD_AUXILIAR,
        COD_FORMA_PAGO,
        TOTAL_A_PAGAR,
        RUT_PACIENTE,
        FECHA
    )
VALUES
    (
        pk_cod_boleta,
        p_cod_auxiliar,
        p_cod_forma_pago,
        p_total_a_pagar,
        p_rut_paciente,
        p_fecha
    );

ELSIF p_accion = 'READ' THEN -- Operación de lectura
SELECT
    COD_AUXILIAR,
    COD_FORMA_PAGO,
    TOTAL_A_PAGAR,
    RUT_PACIENTE,
    FECHA INTO p_cod_auxiliar,
    p_cod_forma_pago,
    p_total_a_pagar,
    p_rut_paciente,
    p_fecha
FROM
    EIFA_CABECERA_BOLETA
WHERE
    COD_BOLETA = p_cod_boleta;

ELSIF p_accion = 'UPDATE' THEN -- Operación de actualización
UPDATE
    EIFA_CABECERA_BOLETA
SET
    COD_AUXILIAR = p_cod_auxiliar,
    COD_FORMA_PAGO = p_cod_forma_pago,
    TOTAL_A_PAGAR = p_total_a_pagar,
    RUT_PACIENTE = p_rut_paciente,
    FECHA = p_fecha
WHERE
    COD_BOLETA = p_cod_boleta;

ELSIF p_accion = 'DELETE' THEN -- Operación de eliminación
DELETE FROM
    EIFA_CABECERA_BOLETA
WHERE
    COD_BOLETA = p_cod_boleta;

END IF;

-- Liberar el bloqueo
COMMIT;

p_resultado := 'Operación realizada con éxito';

EXCEPTION
WHEN OTHERS THEN -- En caso de error, liberar el bloqueo
ROLLBACK;

p_resultado := SQLERRM;

END crud_cabecera_boleta;

-- CHECK ========================================================================================================================================================
-- CUERPO DE BOLETA
CREATE
OR REPLACE PROCEDURE crud_cuerpo_boleta (
    p_accion IN VARCHAR2,
    p_cod_cuerpo IN OUT NUMBER,
    p_cod_medicamento IN OUT NUMBER,
    p_cod_procedimiento IN OUT NUMBER,
    p_cod_boleta IN OUT NUMBER,
    p_cantidad IN OUT NUMBER,
    p_valor IN OUT NUMBER,
    p_resultado OUT VARCHAR2
) IS pk_cod_cuerpo NUMBER;

BEGIN -- Bloquear la tabla para evitar concurrencia
EXECUTE IMMEDIATE 'LOCK TABLE EIFA_CUERPO_BOLETA IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN -- Operación de inserción
pk_cod_cuerpo := pk_generador('EIFA_CUERPO_BOLETA', 'COD_CUERPO');

INSERT INTO
    EIFA_CUERPO_BOLETA (
        COD_CUERPO,
        COD_MEDICAMENTO,
        COD_PROCEDIMIENTO,
        COD_BOLETA,
        CANTIDAD,
        VALOR
    )
VALUES
    (
        pk_cod_cuerpo,
        p_cod_medicamento,
        p_cod_procedimiento,
        p_cod_boleta,
        p_cantidad,
        p_valor
    );

ELSIF p_accion = 'READ' THEN -- Operación de lectura
SELECT
    COD_MEDICAMENTO,
    COD_PROCEDIMIENTO,
    COD_BOLETA,
    CANTIDAD,
    VALOR INTO p_cod_medicamento,
    p_cod_procedimiento,
    p_cod_boleta,
    p_cantidad,
    p_valor
FROM
    EIFA_CUERPO_BOLETA
WHERE
    COD_CUERPO = p_cod_cuerpo;

ELSIF p_accion = 'UPDATE' THEN -- Operación de actualización
UPDATE
    EIFA_CUERPO_BOLETA
SET
    COD_MEDICAMENTO = p_cod_medicamento,
    COD_PROCEDIMIENTO = p_cod_procedimiento,
    COD_BOLETA = p_cod_boleta,
    CANTIDAD = p_cantidad,
    VALOR = p_valor
WHERE
    COD_CUERPO = p_cod_cuerpo;

ELSIF p_accion = 'DELETE' THEN -- Operación de eliminación
DELETE FROM
    EIFA_CUERPO_BOLETA
WHERE
    COD_CUERPO = p_cod_cuerpo;

END IF;

-- Liberar el bloqueo
COMMIT;

p_resultado := 'Operación realizada con éxito';

EXCEPTION
WHEN OTHERS THEN -- En caso de error, liberar el bloqueo
ROLLBACK;

p_resultado := SQLERRM;

END crud_cuerpo_boleta;

--  REVISAR FUNCION ========================================================================================================================================================X
-- FORMA DE PAGO
CREATE
OR REPLACE PROCEDURE crud_forma_de_pago (
    p_accion IN VARCHAR2,
    p_cod_forma_pago IN OUT NUMBER,
    p_medio_de_pago IN OUT VARCHAR2,
    p_cuotas IN OUT NUMBER,
    p_num_cuotas IN OUT NUMBER,
    p_valor_cuota IN OUT NUMBER,
    p_resultado OUT VARCHAR2
) IS pk_cod_forma_pago NUMBER;

BEGIN EXECUTE IMMEDIATE 'LOCK TABLE EIFA_FORMA_DE_PAGO IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN -- Insert
pk_cod_forma_pago := pk_generador('EIFA_FORMA_DE_PAGO', 'COD_FORMA_PAGO');

INSERT INTO
    EIFA_FORMA_DE_PAGO (
        COD_FORMA_PAGO,
        MEDIO_DE_PAGO,
        CUOTAS,
        NUM_CUOTAS,
        VALOR_CUOTA
    )
VALUES
    (
        pk_cod_forma_pago,
        p_medio_de_pago,
        p_cuotas,
        p_num_cuotas,
        p_valor_cuota
    );

ELSIF p_accion = 'READ' THEN -- Select
SELECT
    COD_FORMA_PAGO,
    MEDIO_DE_PAGO,
    CUOTAS,
    NUM_CUOTAS,
    VALOR_CUOTA INTO p_cod_forma_pago,
    p_medio_de_pago,
    p_cuotas,
    p_num_cuotas,
    p_valor_cuota
FROM
    EIFA_FORMA_DE_PAGO
WHERE
    COD_FORMA_PAGO = p_cod_forma_pago;

ELSIF p_accion = 'UPDATE' THEN -- Update
UPDATE
    EIFA_FORMA_DE_PAGO
SET
    MEDIO_DE_PAGO = p_medio_de_pago,
    CUOTAS = p_cuotas,
    NUM_CUOTAS = p_num_cuotas,
    VALOR_CUOTA = p_valor_cuota
WHERE
    COD_FORMA_PAGO = p_cod_forma_pago;

ELSIF p_accion = 'DELETE' THEN -- Delete
DELETE FROM
    EIFA_FORMA_DE_PAGO
WHERE
    COD_FORMA_PAGO = p_cod_forma_pago;

END IF;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

p_resultado := SQLERRM;

END crud_forma_de_pago;

-- CHECK ========================================================================================================================================================X
-- AUXILIARES
CREATE
OR REPLACE PROCEDURE crud_auxiliares (
    p_accion IN VARCHAR2,
    p_cod_cargo IN OUT NUMBER,
    p_cod_auxiliar IN OUT NUMBER,
    p_nombre_cargo IN OUT VARCHAR2,
    p_resultado OUT VARCHAR2
) IS pK_cod_cargo NUMBER;

BEGIN EXECUTE IMMEDIATE 'LOCK TABLE EIFA_AUXILIARES IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN -- Insert
pK_cod_cargo := pk_generador('EIFA_DETALLES_CARGO', 'COD_CARGO');

INSERT INTO
    EIFA_DETALLES_CARGO (COD_CARGO, COD_AUXILIAR, NOMBRE_CARGO)
VALUES
    (pK_cod_cargo, p_cod_auxiliar, p_nombre_cargo);

ELSIF p_accion = 'READ' THEN -- Select
SELECT
    COD_CARGO,
    COD_AUXILIAR,
    NOMBRE_CARGO INTO p_cod_cargo,
    p_cod_auxiliar,
    p_nombre_cargo
FROM
    EIFA_DETALLES_CARGO
WHERE
    COD_CARGO = p_cod_cargo;

ELSIF p_accion = 'UPDATE' THEN -- Update
UPDATE
    EIFA_DETALLES_CARGO
SET
    COD_AUXILIAR = p_cod_auxiliar,
    NOMBRE_CARGO = p_nombre_cargo
WHERE
    COD_CARGO = p_cod_cargo;

ELSIF p_accion = 'DELETE' THEN -- Delete
DELETE FROM
    EIFA_DETALLES_CARGO
WHERE
    COD_CARGO = p_cod_cargo;

END IF;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

p_resultado := SQLERRM;

END crud_auxiliares;

-- CHECK ========================================================================================================================================================X
-- INDICIACIONES
CREATE
OR REPLACE PROCEDURE crud_indicaciones (
    p_accion IN VARCHAR2,
    p_cod_indicaciones IN OUT NUMBER,
    p_cod_medicamento IN OUT NUMBER,
    p_indicaciones IN OUT CLOB,
    p_resultado OUT VARCHAR2
) IS pk_cod_indicaciones NUMBER;

BEGIN EXECUTE IMMEDIATE 'LOCK TABLE EIFA_INDICACIONES IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN -- Insert
pk_cod_indicaciones := pk_generador('EIFA_INDICACIONES', 'COD_INDICACIONES');

INSERT INTO
    EIFA_INDICACIONES (COD_INDICACIONES, COD_MEDICAMENTO, INDICACIONES)
VALUES
    (
        pk_cod_indicaciones,
        p_cod_medicamento,
        p_indicaciones
    );

ELSIF p_accion = 'READ' THEN -- Select
SELECT
    COD_INDICACIONES,
    COD_MEDICAMENTO,
    INDICACIONES INTO p_cod_indicaciones,
    p_cod_medicamento,
    p_indicaciones
FROM
    EIFA_INDICACIONES
WHERE
    COD_INDICACIONES = p_cod_indicaciones;

ELSIF p_accion = 'UPDATE' THEN -- Update
UPDATE
    EIFA_INDICACIONES
SET
    COD_MEDICAMENTO = p_cod_medicamento,
    INDICACIONES = p_indicaciones
WHERE
    COD_INDICACIONES = p_cod_indicaciones;

ELSIF p_accion = 'DELETE' THEN -- Delete
DELETE FROM
    EIFA_INDICACIONES
WHERE
    COD_INDICACIONES = p_cod_indicaciones;

END IF;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

p_resultado := SQLERRM;

END crud_indicaciones;

-- CHECK ========================================================================================================================================================X
-- DESCRIPCION DEL DIAGNOSTICO
CREATE
OR REPLACE PROCEDURE crud_descripcion_del_diagnostico (
    p_accion IN VARCHAR2,
    p_cod_descripcion IN OUT NUMBER,
    p_cod_tratamiento IN OUT NUMBER,
    p_cod_diagnostico IN OUT NUMBER,
    p_descripcion IN OUT CLOB,
    p_resultado OUT VARCHAR2
) IS pk_cod_descripcion NUMBER;

BEGIN EXECUTE IMMEDIATE 'LOCK TABLE EIFA_DESCRIPCION_DEL_DIAGNOSTICO IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN -- Insert
pk_cod_descripcion := pk_generador(
    'EIFA_DESCRIPCION_DEL_DIAGNOSTICO',
    'COD_DESCRIPCION'
);

INSERT INTO
    EIFA_DESCRIPCION_DEL_DIAGNOSTICO (
        COD_DESCRIPCION,
        COD_TRATAMIENTO,
        COD_DIAGNOSTICO,
        DESCRIPCION
    )
VALUES
    (
        pk_cod_descripcion,
        p_cod_tratamiento,
        p_cod_diagnostico,
        p_descripcion
    );

ELSIF p_accion = 'READ' THEN -- Select
SELECT
    COD_DESCRIPCION,
    COD_TRATAMIENTO,
    COD_DIAGNOSTICO,
    DESCRIPCION INTO p_cod_descripcion,
    p_cod_tratamiento,
    p_cod_diagnostico,
    p_descripcion
FROM
    EIFA_DESCRIPCION_DEL_DIAGNOSTICO
WHERE
    COD_DESCRIPCION = p_cod_descripcion;

ELSIF p_accion = 'UPDATE' THEN -- Update
UPDATE
    EIFA_DESCRIPCION_DEL_DIAGNOSTICO
SET
    COD_TRATAMIENTO = p_cod_tratamiento,
    COD_DIAGNOSTICO = p_cod_diagnostico,
    DESCRIPCION = p_descripcion
WHERE
    COD_DESCRIPCION = p_cod_descripcion;

ELSIF p_accion = 'DELETE' THEN -- Delete
DELETE FROM
    EIFA_DESCRIPCION_DEL_DIAGNOSTICO
WHERE
    COD_DESCRIPCION = p_cod_descripcion;

END IF;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

p_resultado := SQLERRM;

END crud_descripcion_del_diagnostico;

-- CHECK ========================================================================================================================================================X
-- DIAGNOSTICO
CREATE
OR REPLACE PROCEDURE crud_diagnostico (
    p_accion IN VARCHAR2,
    p_cod_diagnostico IN OUT NUMBER,
    p_rut_paciente IN OUT NUMBER,
    p_cod_medico IN OUT NUMBER,
    p_cod_medicamento IN OUT NUMBER,
    p_fecha IN OUT DATE,
    p_resultado OUT VARCHAR2
) IS pk_cod_diagnostico NUMBER;

BEGIN EXECUTE IMMEDIATE 'LOCK TABLE EIFA_DIAGNOSTICO IN EXCLUSIVE MODE';

IF p_accion = 'CREATE' THEN -- Insert
pk_cod_diagnostico := pk_generador(
    'EIFA_DIAGNOSTICO',
    'COD_DIAGNOSTICO'
);

INSERT INTO
    EIFA_DIAGNOSTICO (
        COD_DIAGNOSTICO,
        RUT_PACIENTE,
        COD_MEDICO,
        COD_MEDICAMENTO,
        FECHA
    )
VALUES
    (
        pk_cod_diagnostico,
        p_rut_paciente,
        p_cod_medico,
        p_cod_medicamento,
        p_fecha
    );

ELSIF p_accion = 'READ' THEN -- Select
SELECT
    COD_DIAGNOSTICO,
    RUT_PACIENTE,
    COD_MEDICO,
    COD_MEDICAMENTO,
    FECHA INTO p_cod_diagnostico,
    p_rut_paciente,
    p_cod_medico,
    p_cod_medicamento,
    p_fecha
FROM
    EIFA_DIAGNOSTICO
WHERE
    COD_DIAGNOSTICO = p_cod_diagnostico;

ELSIF p_accion = 'UPDATE' THEN -- Update
UPDATE
    EIFA_DIAGNOSTICO
SET
    RUT_PACIENTE = p_rut_paciente,
    COD_MEDICO = p_cod_medico,
    COD_MEDICAMENTO = p_cod_medicamento,
    FECHA = p_fecha
WHERE
    COD_DIAGNOSTICO = p_cod_diagnostico;

ELSIF p_accion = 'DELETE' THEN -- Delete
DELETE FROM
    EIFA_DIAGNOSTICO
WHERE
    COD_DIAGNOSTICO = p_cod_diagnostico;

END IF;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

p_resultado := SQLERRM;

END crud_diagnostico;