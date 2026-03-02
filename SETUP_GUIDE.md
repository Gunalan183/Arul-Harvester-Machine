# Complete Setup Guide - Arul Arasan Harvester Billing System

## Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Step 2: Setup Environment

Create `.env` file in root directory:

```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/harvester-billing?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Step 3: Start Development Server

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:3000

### Step 4: Create Admin User

Open a new terminal and run:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Or use Postman/Thunder Client to POST to:
- URL: `http://localhost:5000/api/auth/register`
- Body: `{"username":"admin","password":"admin123"}`

### Step 5: Login

1. Open http://localhost:3000
2. Login with:
   - Username: `admin`
   - Password: `admin123`

## Detailed Setup

### Prerequisites

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org
   - Verify: `node --version`

2. **MongoDB Atlas Account** (Free)
   - Sign up: https://www.mongodb.com/cloud/atlas
   - Create free cluster (M0)

3. **Git** (optional)
   - Download: https://git-scm.com

### MongoDB Atlas Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up with email or Google

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `harvester_admin`
   - Password: Create strong password
   - Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `harvester-billing`

### Project Installation

1. **Clone or Download Project**
```bash
git clone <repository-url>
cd arul-arasan-harvester-billing
```

2. **Install Server Dependencies**
```bash
npm install
```

3. **Install Client Dependencies**
```bash
cd client
npm install
cd ..
```

4. **Create Environment File**
```bash
cp .env.example .env
```

5. **Edit .env File**
Update with your MongoDB URI and create a strong JWT secret:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=use_openssl_rand_base64_32_to_generate
NODE_ENV=development
```

### Running the Application

#### Development Mode (Recommended)

Run both frontend and backend together:
```bash
npm run dev
```

#### Separate Terminals

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### First Time Setup

1. **Create Admin User**

Using curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourPassword123"}'
```

Using Postman:
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "username": "admin",
  "password": "YourPassword123"
}
```

2. **Login to Application**
- Open browser: http://localhost:3000
- Enter username and password
- Click login

3. **Add First Customer**
- Click "வாடிக்கையாளர்கள்" (Customers)
- Click "வாடிக்கையாளர் சேர்" (Add Customer)
- Fill in details
- Click "சேமிக்கவும்" (Save)

4. **Create First Bill**
- Click "பில் உருவாக்கு" (Create Bill)
- Select customer
- Enter details
- Click "சேமிக்கவும்" (Save)

## Features Guide

### 1. Dashboard (முகப்பு)
- View today's income
- View monthly income
- See total bills count
- See total customers count

### 2. Customers (வாடிக்கையாளர்கள்)
- Add new customer
- Edit customer details
- Delete customer
- View customer list

### 3. Create Bill (பில் உருவாக்கு)
- Auto-generated bill number
- Select customer from dropdown
- Enter acres, start time, end time
- Enter rate per hour
- Auto-calculates total amount
- Save bill

### 4. Bills (பில்கள்)
- View all bills
- Search by customer name
- Filter by date range
- Print bill
- Delete bill

### 5. Reports (அறிக்கைகள்)
- Daily report
- Monthly report
- View income statistics
- View bill list

### 6. Language Switch
- Click "தமிழ் | English" button
- Switches between Tamil and English
- Preference saved in browser

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

1. Change backend port in `.env`:
```
PORT=5001
```

2. Change frontend proxy in `client/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',
    changeOrigin: true
  }
}
```

### MongoDB Connection Error

1. Check internet connection
2. Verify MongoDB URI in `.env`
3. Check IP whitelist in MongoDB Atlas
4. Verify database user credentials

### Cannot Login

1. Ensure admin user is created
2. Check backend is running (http://localhost:5000/api/health)
3. Clear browser localStorage
4. Check browser console for errors

### Build Errors

1. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

2. Clear npm cache:
```bash
npm cache clean --force
```

### Tamil Font Not Showing

1. Check internet connection (font loads from Google Fonts)
2. Clear browser cache
3. Try different browser

## Development Tips

### Hot Reload
- Frontend: Auto-reloads on file changes
- Backend: Auto-restarts with nodemon

### API Testing
Use Thunder Client (VS Code extension) or Postman:
- Base URL: `http://localhost:5000/api`
- Add Authorization header: `Bearer <your_token>`

### Database Viewing
Use MongoDB Compass:
- Download: https://www.mongodb.com/products/compass
- Connect with your MongoDB URI

### Code Structure
```
client/src/
  ├── components/     # Reusable components
  ├── pages/          # Page components
  ├── locales/        # Translation files
  └── utils/          # Helper functions

server/
  ├── controllers/    # Business logic
  ├── models/         # Database schemas
  ├── routes/         # API routes
  └── middleware/     # Auth middleware
```

## Next Steps

1. **Customize**
   - Update company name in translations
   - Modify bill print layout
   - Add more fields if needed

2. **Deploy**
   - Follow DEPLOYMENT.md guide
   - Deploy to Vercel + Render
   - Use MongoDB Atlas

3. **Backup**
   - Regular database backups
   - Export important data
   - Version control with Git

## Support

For issues or questions:
1. Check this guide
2. Check DEPLOYMENT.md
3. Check README.md
4. Review error messages in console

## Security Notes

1. **Change Default Password**
   - Never use "admin123" in production
   - Use strong passwords

2. **JWT Secret**
   - Generate strong secret
   - Never commit to Git
   - Keep .env file secure

3. **MongoDB**
   - Use strong database password
   - Restrict IP access in production
   - Enable MongoDB Atlas security features

## Performance Tips

1. **Database Indexes**
   - MongoDB Atlas auto-creates indexes
   - Monitor slow queries

2. **Caching**
   - Browser caches static assets
   - Consider Redis for API caching (advanced)

3. **Optimization**
   - Minimize API calls
   - Use pagination for large lists
   - Optimize images

Happy Billing! 🚜📝
