/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dsa;

/**
 *
 * @author sande
 */
public class FinancialForecasting{

    public static double futureValue(double value,double rate,int years){

        if(years==0){
            return value;
        }

        return futureValue(value*(1+rate),rate,years-1);
    }

    public static void main(String[] args){

        double currentValue=10000;
        double growthRate=0.10;
        int years=5;

        double result=futureValue(currentValue,growthRate,years);

        System.out.println("Current Value : "+currentValue);
        System.out.println("Growth Rate : "+(growthRate*100)+"%");
        System.out.println("Years : "+years);
        System.out.println("Future Value : "+result);
    }
}
