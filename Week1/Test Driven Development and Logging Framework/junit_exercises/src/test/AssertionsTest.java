package Hands_on.Junit;

import static org.junit.Assert.*;
import org.junit.Test;

public class AssertionsTest{

    @Test
    public void testAssertions(){

        assertEquals(5,2+3);
        
        assertTrue(5>3);
        
        assertFalse(5<3);

        
        String s=null;
        assertNull(s);

        
        Object obj=new Object();
        assertNotNull(obj);
    }
}