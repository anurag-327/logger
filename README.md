# Logger

Welcome to Logger, your partner for counting visitors with ease and gaining insights without intrusion. This tool allows you to track and analyze visitor data in real-time, providing valuable statistics for your projects.

## Getting Started

Follow these steps to integrate Logger into your project:

### Step 1: Register Your Application

1. Navigate to the Logger Dashboard by signing in to your account.
2. Click on the "Add New Application" button.
3. Fill in the required information for your application, including the name and application URL.
4. Click "Create" to register your application.
5. Once your application is created, you will be provided with an API key. This key is essential for making API requests.

### Step 2: Grab Your Credentials

1. After creating your application, go to the "Projects" section in the Logger Dashboard.
2. Locate your newly created application and copy the `applicationId` and `clientSecret` associated with it.
3. Keep your credentials securely stored, as they are necessary for authenticating requests to the Logger API.

### Step 3: Make a POST Request from Your Application

Now that you have registered your application and obtained your credentials, you can record visits and retrieve the latest statistics for your project.

- **API Endpoint:** `https://logger-mocha-six.vercel.app/api/logger/v1`
- **Request Body:**
  ```json
  {
    "applicationId": "YOUR_APPLICATION_ID",
    "clientSecret": "YOUR_CLIENT_SECRET"
  }
  ```

### Step 4: API Returns Latest Stats and Records

```json
// Success (200)
{
    visitors
}

// Error
{
    "error": "error_description"
}
```
