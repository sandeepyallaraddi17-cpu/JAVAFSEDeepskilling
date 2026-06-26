SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account IN NUMBER,
    p_to_account   IN NUMBER,
    p_amount       IN NUMBER
)
IS
    v_balance NUMBER;
BEGIN

    -- Get source account balance
    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = p_from_account;

    -- Check for sufficient balance
    IF v_balance >= p_amount THEN

        -- Debit source account
        UPDATE Accounts
        SET Balance = Balance - p_amount,
            LastModified = SYSDATE
        WHERE AccountID = p_from_account;

        -- Credit destination account
        UPDATE Accounts
        SET Balance = Balance + p_amount,
            LastModified = SYSDATE
        WHERE AccountID = p_to_account;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Transfer Successful.');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient Balance.');

    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Invalid Account Number.');

END;
/

BEGIN
    TransferFunds(1, 2, 500);
END;
/

SELECT
    'ACCOUNTID|CUSTOMERID|ACCOUNTTYPE|BALANCE|LASTMODIFIED'
FROM DUAL;

SELECT
    AccountID || '|' ||
    CustomerID || '|' ||
    AccountType || '|' ||
    Balance || '|' ||
    TO_CHAR(LastModified, 'DD-MON-RR') AS OUTPUT
FROM Accounts
ORDER BY AccountID;