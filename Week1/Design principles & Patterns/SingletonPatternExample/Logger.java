/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author sande
 */
public class Logger {
    private static Logger instance;
    private Logger(){
        System.out.print("Logger instance created");
    }
    public static Logger getInstance(){
        if(instance==null){
            instance=new Logger();
        }
        return instance;    
    }
        
    public void log(String message){
        System.out.print("\nLog:"+message);
    }
}
