# Arul Arasan Harvester Billing System

A complete production-ready MERN stack web application for Paddy Harvesting Machine business billing.

## Features

- 📊 Dashboard with real-time statistics
- 👥 Customer Management (Add, Edit, Delete)
- 📝 Bill Creation with auto-calculation
- 📋 Bill List with search and filter
- 📈 Daily and Monthly Reports
- 🌐 Multi-language support (Tamil primary, English secondary)
- 🖨️ Print-friendly bill layout
- 📱 Mobile-first responsive design
- 🔐 JWT-based authentication

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- react-i18next
- react-hot-toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd arul-arasan-harvester-billing
```

2. Install server dependencies
```bash
npm install
```

3. Install client dependencies
```bash
cd client
npm install
cd ..
```

4. Create .env file in root directory
```bash
cp .env.example .env
```

5. Update .env with your MongoDB URI and JWT secret
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
This runs both server (port 5000) and client (port 3000)

#### Production Build
```bash
npm run build
```

## Initial Setup

### Create Admin User

Use any API client (Postman, Thunder Client) or curl:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```

Then login with these credentials.

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Set build command: `cd client && npm install && npm run build`
5. Set output directory: `client/dist`
6. Deploy

### Backend (Render)

1. Go to render.com
2. Create new Web Service
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `node server/server.js`
6. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
7. Deploy

### Database (MongoDB Atlas)

1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all)
5. Get connection string
6. Update in .env and Render

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── BillPrint.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── CreateBill.jsx
│   │   │   ├── Bills.jsx
│   │   │   └── Reports.jsx
│   │   ├── locales/
│   │   │   ├── ta.json
│   │   │   └── en.json
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── i18n.js
│   │   └── index.css
│   └── package.json
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   ├── billController.js
│   │   └── reportController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Customer.js
│   │   └── Bill.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── billRoutes.js
│   │   └── reportRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register admin
- POST `/api/auth/login` - Login

### Customers
- GET `/api/customers` - Get all customers
- GET `/api/customers/:id` - Get customer by ID
- GET `/api/customers/:id/bills` - Get customer bills
- POST `/api/customers` - Create customer
- PUT `/api/customers/:id` - Update customer
- DELETE `/api/customers/:id` - Delete customer

### Bills
- GET `/api/bills` - Get all bills (with search/filter)
- GET `/api/bills/next-number` - Get next bill number
- GET `/api/bills/:id` - Get bill by ID
- POST `/api/bills` - Create bill
- DELETE `/api/bills/:id` - Delete bill

### Reports
- GET `/api/reports/dashboard` - Dashboard statistics
- GET `/api/reports/daily` - Daily report
- GET `/api/reports/monthly` - Monthly report

## License

MIT
