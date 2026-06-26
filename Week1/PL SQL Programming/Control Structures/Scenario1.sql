SET SERVEROUTPUT ON;

DECLARE
    CURSOR cust_cursor IS
        SELECT c.CustomerID,
               c.Name,
               l.LoanID,
               l.InterestRate,
               FLOOR(MONTHS_BETWEEN(SYSDATE, c.DOB)/12) AS Age
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID = l.CustomerID;

BEGIN
    FOR rec IN cust_cursor LOOP

        IF rec.Age > 60 THEN

            UPDATE Loans
            SET InterestRate = InterestRate - 1
            WHERE LoanID = rec.LoanID;

            DBMS_OUTPUT.PUT_LINE(
                '1% discount applied to '
                || rec.Name
                || ' (Customer ID: '
                || rec.CustomerID
                || ', Age: '
                || rec.Age
                || ')'
            );

        END IF;

    END LOOP;

    COMMIT;
END;
/