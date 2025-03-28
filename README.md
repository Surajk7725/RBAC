# Role-Based Access Control (RBAC)

## Description  

This project implements a secure and scalable **Authentication and Role-Based Access Control (RBAC)** system. It allows users to register, log in, and perform specific actions based on their assigned roles (**Student**, **Faculty**, or **Admin**). The system ensures secure session management using **JWT**, robust data handling with **MongoDB**, and follows **OWASP** guidelines for enhanced security.  

## Technologies Used  

### Frontend  
- **React**  
- **Tailwind CSS**  
- **Axios** for API requests    

### Backend  
- **Express.js**  
- **MongoDB** with **Mongoose**  
- **JWT** for authentication  
- **bcrypt** for password hashing  
- **express-validator** for input validation  
- **express-rate-limiter** for request limiting   

## Features  

### Authentication  
- **Register**: Users can sign up with their email, password, and role.  
- **Login**: Users receive a JWT token on successful login.  
- **Logout**: JWT token invalidation handled securely on the client side.  

### Authorization  
- **Role Management**: Access restricted endpoints based on user roles.  
- **Predefined Roles**:  
  - **Student**: Home Page.  
  - **Faculty**: Home Page.  
  - **Admin**: Home Page and Add Roles.  

### Security  
- Strong password policies enforced during registration.  
- Validation of user inputs on both client and server sides.  
- Rate-limiting and protection against common vulnerabilities like XSS and CSRF.  

## Preparation Notes  

Before deploying the system, ensure the following:  
- **Environment Variables**: Set up `.env` files for secure storage of API keys, database URIs, and JWT secrets.  
- **Database Connection**: Verify MongoDB Atlas or local database configurations.  
- **CORS Setup**: Ensure proper CORS settings for secure API communication.  
- **Error Handling**: Implement logging and error-handling mechanisms.  

Click [here](https://phantom-limburger-d0f.notion.site/Role-Based-Access-Control-RBAC-1c3423b247c5804d9835df8f0daeac6a) for detailed preparation guidelines.  

## Deployment  

### Frontend  
Deployed on **Vercel**: [Frontend Deployment Link](https://rbac-1.vercel.app/)  

### Backend  
Deployed on **Vercel**: [Backend Deployment Link](https://rbac-suraj.vercel.app/)  
