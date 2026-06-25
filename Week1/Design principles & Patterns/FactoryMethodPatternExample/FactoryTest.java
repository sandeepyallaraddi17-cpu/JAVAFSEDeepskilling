/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author sande
 */
public class FactoryTest {
    public static void main(String[] args){
        Document doc1=DocumentFactory.createDocument("Word");
        Document doc2=DocumentFactory.createDocument("Excel");
        Document doc3=DocumentFactory.createDocument("Pdf");
        doc1.create();
        doc2.create();
        doc3.create();
    }
}
