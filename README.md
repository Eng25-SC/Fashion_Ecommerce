
# **E-Commerce Website for Clothing**

## **Project Overview**
This is a full-stack e-commerce website built for selling clothing. It consists of three main modules:
- **Admin**: For managing the website, adding products, and viewing orders.
- **Backend**: The API and database management system.
- **Frontend**: The customer-facing user interface.

## **Technologies Used**
- **Frontend**: React, Vite, Tailwind CSS/Bootstrap (if used)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

---

## **Project Structure**
```
Ecommerce-App/
├── admin/       # Admin panel for managing the store
├── backend/     # Backend for APIs and database handling
├── frontend/    # Customer-facing UI
├── .gitignore   # Ignored files for Git
├── README.md    # Project documentation
```

---

## **Installation and Setup**

### **Prerequisites**
- [Node.js](https://nodejs.org/) installed on your system.
- [MongoDB](https://www.mongodb.com/) for the database.
- A package manager like `npm` or `yarn`.

---

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd Ecommerce-App
```

---

### **2. Setting Up the Backend**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the server:
   ```bash
   npm run server
   ```
   The backend will run on `http://localhost:5000`.

---

### **3. Setting Up the Frontend**
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000` (or a different port assigned by Vite).

---

### **4. Setting Up the Admin Panel**
1. Navigate to the `admin` folder:
   ```bash
   cd ../admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The admin panel will run on `http://localhost:4000` (or another port assigned by Vite).

---

## **Features**
- **Frontend**:
  - User authentication and registration.
  - Browse products with categories.
  - Add to cart and wishlist functionality.
  - Checkout and payment integration.

- **Backend**:
  - RESTful APIs for handling product, user, and order data.
  - Secure authentication with JWT.
  - MongoDB integration.

- **Admin Panel**:
  - Manage products (add, update, delete).
  - View and manage user orders.

---

## **Available Scripts**

### **Backend**
- `npm run server`: Starts the backend server.

### **Frontend**
- `npm run dev`: Starts the development server for the frontend.

### **Admin**
- `npm run dev`: Starts the development server for the admin panel.

---

## **Contributing**
Feel free to open issues and contribute to the project. Make sure to create a feature branch for any major changes.

---


