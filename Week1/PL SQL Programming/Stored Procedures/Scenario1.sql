CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN

    UPDATE Accounts
    SET Balance = Balance * 1.01,
        LastModified = SYSDATE
    WHERE AccountType = 'Savings';

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Monthly interest (1%) applied to all savings accounts.'
    );

END;
/

SET SERVEROUTPUT ON;

BEGIN
    ProcessMonthlyInterest;
END;
/

SELECT AccountID,
       CustomerID,
       AccountType,
       Balance,
       TO_CHAR(LastModified,'DD-MON-RR') AS LastModified
FROM Accounts
ORDER BY AccountID;