package Hands_on.Junit;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class CalculatorAAATest{

    private Calculator c;

    @Before
    public void setUp() {
        c=new Calculator();
        System.out.println("Setup executed");
    }

    @After
    public void tearDown() {
        c=null;
        System.out.println("Teardown executed");
    }

    @Test
    public void testAddition(){

        int a=10;
        int b=20;

        int result=c.add(a, b);

        assertEquals(30,result);
    }

    @Test
    public void testMultiplication(){

        
        int a=4;
        int b=5;

        int result=c.multiply(a,b);

        assertEquals(20,result);
    }
}