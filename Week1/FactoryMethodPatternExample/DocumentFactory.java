/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author sande
 */
public class DocumentFactory {
    
    public static Document createDocument(String type){
        if(type.equalsIgnoreCase("WORD")){
            return new WordDocument();
        }
        else if(type.equalsIgnoreCase("PDF")){
            return new PdfDocument();
        }
        else if(type.equalsIgnoreCase("EXCEL")){
            return new ExcelDocument();
        }
        return null;
    }
}
