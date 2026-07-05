package com.library1;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.library.service.BookService;

public class LibraryManagementApplication {

    public static void main(String[] args) {

        ApplicationContext context =new ClassPathXmlApplicationContext("applicationContext.xml");

        BookService service =context.getBean("bookService", BookService.class);

        System.out.println("Setter Dependency Injection was implemented successfully.");
        System.out.println("The BookRepository bean was injected into the BookService bean through the Spring IoC container.\n");

        service.displayService();
    }
}