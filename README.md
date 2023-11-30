<<<<<<< Updated upstream


# Logger

Welcome to the Logger's documentation. This guide will help you how to use logger to track count of your visitors.

## Introduction to Logger

Logger is your partner for counting visitors with ease, offering insights without intrusion.

# Getting Started

1. **Registering Your Application**
=======
![Screenshot 2023-10-06 004218](https://github.com/anurag-327/QuickSign/assets/98267696/8bdd4350-1af0-4f4f-8bf3-96eae202b04a)
![Screenshot 2023-10-06 004555](https://github.com/anurag-327/QuickSign/assets/98267696/6602d047-dc9c-4416-9a07-4fef891dcd90)

# Quick Sign

Welcome to the Logger's documentation. This guide will help you how to use logger to track count of your visitors.

## Introduction to OAuth

Logger is your partner for counting visitors with ease, offering insights without intrusion.

# \***\*Getting Started\*\***

1. \***\*Registering Your Application\*\***
>>>>>>> Stashed changes

   1. Log in to Logger .
   2. Create a new project by providing project's name and URL.

<<<<<<< Updated upstream
2. **Obtaining API Credentials**
=======
2. \***\*Obtaining API Credentials\*\***
>>>>>>> Stashed changes

   Once you've registered your application, you will receive the following credentials:

   - ClientId: Unique identification for your your project
   - clientSecret:

# Implementation

1. **Setting up Logger in your application**
<<<<<<< Updated upstream

   Make a post request to loggers's end point from your landing page with your credentials.
   
   ```jsx
   // sample post request
   const body={
   method:"post",
   headers:{
   "content-type":"application/json",
   },
   body:JSON.stringify({clientId:<Application ClientId>, clientSecret:<Application Secret>})
   }
   const response=await fetch("https://logger-mocha-six.vercel.app/api/logger",body);
   const data=await response.json();
   ```
   
![image](https://github.com/anurag-327/logger/assets/98267696/21fd4928-3dc2-48f2-8192-26f53080e64c)


=======
   Make a post request to loggers's end point from your landing page with your credentials.
   ```jsx
   **https://quicksign-bq48.onrender.com/auth/verify**
   // sample fetch request
   const body={
   method:"post",
   headers:{
   "content-type":"application/json",
   },
   body:JSON.stringify({clientId:**<Application ClientId>**, clientSecret:*<Application Secret>**})
   }
   const response=await fetch("**https://logger-mocha-six.vercel.app/api/logger**",body);
   const data=await response.json();
   ```

````
>>>>>>> Stashed changes

1. **Response schema**

```jsx
**1- OK Response
{
   visitors count
}

2-BAD RESPONSE
{
  error: <ERROR>
  message:<ERROR MESSAGE>
}**
```



# Contact

If you encounter any issues or have questions about using Logger, please contact our support team at anuragsrivastav0027@gmail.com
````
