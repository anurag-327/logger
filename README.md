# Quick Sign

Welcome to the Logger's documentation. This guide will help you how to use logger to track count of your visitors.

## Introduction to OAuth

Logger is your partner for counting visitors with ease, offering insights without intrusion.

# **Getting Started**

1. **Registering Your Application**

   1. Log in to Logger .
   2. Create a new project by providing project's name and URL.

2. **Obtaining API Credentials**
   Once you've registered your application, you will receive the following credentials:

   - applicationId: Unique identification for your your project
   - clientSecret:

# Implementation

1. **Setting up Logger in your application**

   Make a post request to loggers's end point from your landing page with your credentials.

   ```jsx
   // sample post request
   const body={
   method:"post",
   headers:{
   "content-type":"application/json",
   },
   body:JSON.stringify({applicationId:<Application ClientId>, clientSecret:<Application Secret>})
   }
   const response=await fetch("https://logger-mocha-six.vercel.app/api/logger/v1",body);
   const data=await response.json();
   ```

1. **Response schema**

```jsx
1- OK Response
{
   visitors count
}

2-BAD RESPONSE
{
  error: <ERROR>

}
```

# Contact

If you encounter any issues or have questions about using Logger, please contact our support team at anuragsrivastav0027@gmail.com

```

```
