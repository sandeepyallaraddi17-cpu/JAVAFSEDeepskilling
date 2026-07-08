# Hands-on 4

# Difference Between JPA, Hibernate and Spring Data JPA

## Introduction

In enterprise applications, interacting with databases is one of the most important tasks. Instead of writing SQL queries for every operation, Java provides Object Relational Mapping (ORM) technologies that allow developers to work with Java objects instead of database tables.

JPA, Hibernate and Spring Data JPA are closely related technologies used for database persistence. Although they are often used together, each of them has a different purpose. Understanding their roles helps developers choose the right approach for building database-driven applications.

---

## Difference Between JPA, Hibernate and Spring Data JPA

| JPA | Hibernate | Spring Data JPA |
|-----|-----------|-----------------|
| JPA (Java Persistence API) is a specification for Object Relational Mapping (ORM). | Hibernate is an ORM framework that implements the JPA specification. | Spring Data JPA is a Spring module that simplifies working with JPA. |
| It defines a standard set of interfaces and annotations for persistence. | It provides the actual implementation required to interact with the database. | It provides repository interfaces to perform CRUD operations with minimal code. |
| JPA itself cannot perform database operations because it is only a specification. | Hibernate can directly communicate with the database and manage entities. | Spring Data JPA internally uses JPA and Hibernate to perform database operations. |
| It provides portability because different ORM frameworks can implement the same specification. | It supports advanced features like caching, lazy loading, HQL and automatic table mapping. | It automatically generates implementations for repository interfaces during runtime. |
| Developers need an implementation such as Hibernate to use JPA. | Developers manually manage sessions and transactions. | Most of the session and transaction management is handled automatically by Spring. |

---

# Hibernate Example

In Hibernate, database operations are performed using **Session**, **Transaction** and **SessionFactory**. The developer is responsible for opening the session, managing the transaction and closing the session after completing the operation.

```java
public Integer addEmployee(Employee employee) {

    Session session = factory.openSession();
    Transaction tx = null;
    Integer employeeId = null;

    try {
        tx = session.beginTransaction();
        employeeId = (Integer) session.save(employee);
        tx.commit();
    }
    catch (HibernateException e) {
        if(tx != null)
            tx.rollback();
    }
    finally {
        session.close();
    }

    return employeeId;
}
```

### Explanation

- A `Session` object is created to establish communication with the database.
- A transaction is started before inserting the record.
- The `save()` method stores the employee object in the database.
- If the operation is successful, the transaction is committed.
- If an exception occurs, the transaction is rolled back to maintain data consistency.
- Finally, the session is closed to release the database resources.

Although Hibernate provides complete control over database operations, developers need to write additional code to manage sessions and transactions.

---

# Spring Data JPA Example

Spring Data JPA simplifies database operations by providing repository interfaces. Developers only need to create a repository interface, and Spring automatically generates the implementation.

### Repository

```java
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
```

### Service

```java
@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Transactional
    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }
}
```

### Explanation

- The repository interface extends `JpaRepository`.
- Spring automatically creates the implementation of the repository at runtime.
- The `save()` method is used to insert or update records without writing SQL or Hibernate code.
- The `@Transactional` annotation automatically manages database transactions.
- No manual session handling or transaction management is required.

This approach significantly reduces the amount of code and makes the application easier to develop and maintain.

---

# Key Observations

- JPA provides only the standard specification for persistence and requires an implementation such as Hibernate.
- Hibernate implements JPA and offers complete control over database operations, but developers need to manage sessions and transactions manually.
- Spring Data JPA builds on top of JPA and Hibernate to reduce boilerplate code.
- Repository interfaces such as `JpaRepository` provide ready-made CRUD operations without requiring manual implementation.
- Spring Data JPA automatically manages transactions and repository implementations, making development faster and improving code readability.
- Because of its simplicity and reduced coding effort, Spring Data JPA is widely used in modern Spring Boot applications.

---

# Conclusion

JPA, Hibernate and Spring Data JPA work together to simplify database interaction in Java applications. JPA defines the standard rules for persistence, Hibernate provides the implementation of those rules, and Spring Data JPA further simplifies development by reducing boilerplate code through repository interfaces and automatic transaction management.

Compared to using Hibernate alone, Spring Data JPA requires less code, improves maintainability and allows developers to focus more on business logic rather than database management.
