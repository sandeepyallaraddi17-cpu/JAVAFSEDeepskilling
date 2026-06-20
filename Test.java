/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author sande
 */
public class Test {
    public static void main(String[] args){
        Logger logger1=Logger.getInstance();
        Logger logger2=Logger.getInstance();
        logger1.log("First Message");
        logger2.log("Second Message");
        
        if(logger1==logger2){
            System.out.println("\nOnly a single instance of class exists");
            System.out.println("\nSingletonClass test verified");
        }
        else{
            System.out.println("\nMultiple instances of class exists");
        }
    }
    
}
