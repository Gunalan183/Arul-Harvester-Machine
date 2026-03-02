# Quick Reference Guide

## 🚀 Common Commands

### Development
```bash
# Start both frontend and backend
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Install all dependencies
npm install && cd client && npm install && cd ..
```

### Production
```bash
# Build frontend
npm run build

# Start production server
node server/server.js
```

---

## 🔑 Default Credentials

### First Time Setup
```bash
# Create admin user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Login
- Username: `admin`
- Password: `admin123`
- **⚠️ Change in production!**

---

## 🌐 URLs

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

### Production
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.onrender.com

---

## 📝 Environment Variables

### Required (.env)
```bash
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/harvester-billing
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Generate JWT Secret
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

## 🗄️ Database Collections

### users
- username (unique)
- password (hashed)

### customers
- name (required)
- phone
- village

### bills
- billNumber (unique, auto)
- date
- customer (ref)
- acres
- startTime
- endTime
- totalMinutes (calculated)
- ratePerHour
- totalAmount (calculated)

---

## 🔌 API Quick Reference

### Auth
```bash
POST /api/auth/register
POST /api/auth/login
```

### Customers
```bash
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Bills
```bash
GET    /api/bills
GET    /api/bills/next-number
POST   /api/bills
DELETE /api/bills/:id
```

### Reports
```bash
GET /api/reports/dashboard
GET /api/reports/daily?date=2024-01-01
GET /api/reports/monthly?year=2024&month=0
```

---

## 🎨 Tailwind Classes (Common)

### Buttons
```jsx
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
```

### Input Fields
```jsx
className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700"
```

### Cards
```jsx
className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
```

---

## 🌍 Translation Keys

### Common
```javascript
t('welcome')        // வரவேற்கிறோம் / Welcome
t('save')           // சேமிக்கவும் / Save
t('cancel')         // ரத்து / Cancel
t('edit')           // திருத்து / Edit
t('delete')         // நீக்கு / Delete
t('loading')        // ஏற்றுகிறது... / Loading...
t('error')          // பிழை / Error
t('success')        // வெற்றி / Success
```

### Pages
```javascript
t('dashboard')      // முகப்பு / Dashboard
t('customers')      // வாடிக்கையாளர்கள் / Customers
t('createBill')     // பில் உருவாக்கு / Create Bill
t('bills')          // பில்கள் / Bills
t('reports')        // அறிக்கைகள் / Reports
```

---

## 🐛 Troubleshooting

### Port in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
1. Check internet connection
2. Verify MONGODB_URI in .env
3. Check IP whitelist (0.0.0.0/0)
4. Verify database credentials

### Cannot Login
1. Ensure admin user created
2. Check backend is running
3. Clear localStorage
4. Check browser console

### Build Errors
```bash
# Clean install
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

---

## 📦 Package Versions

### Frontend
- react: ^18.2.0
- vite: ^5.0.8
- tailwindcss: ^3.3.6
- react-router-dom: ^6.20.0
- axios: ^1.6.2
- react-i18next: ^13.5.0

### Backend
- express: ^4.18.2
- mongoose: ^8.0.0
- jsonwebtoken: ^9.0.2
- bcryptjs: ^2.4.3

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Set proper CORS origins
- [ ] Use environment variables
- [ ] Never commit .env file
- [ ] Regular security updates
- [ ] Monitor access logs

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
```

---

## 🎯 File Locations

### Frontend
- Pages: `client/src/pages/`
- Components: `client/src/components/`
- Translations: `client/src/locales/`
- API: `client/src/utils/api.js`
- Styles: `client/src/index.css`

### Backend
- Controllers: `server/controllers/`
- Models: `server/models/`
- Routes: `server/routes/`
- Middleware: `server/middleware/`
- Entry: `server/server.js`

---

## 🔄 Git Commands

```bash
# Initialize
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <url>
git push -u origin main

# Update
git add .
git commit -m "Update message"
git push
```

---

## 📊 MongoDB Queries

### Find all customers
```javascript
db.customers.find()
```

### Find bills by customer
```javascript
db.bills.find({ customer: ObjectId("...") })
```

### Get today's bills
```javascript
db.bills.find({
  date: {
    $gte: new Date(new Date().setHours(0,0,0,0))
  }
})
```

---

## 🎨 Color Scheme

### Primary Colors
- Blue: `#2563eb` (bg-blue-600)
- Green: `#10b981` (bg-green-500)
- Red: `#ef4444` (bg-red-500)

### Neutral Colors
- Gray: `#6b7280` (bg-gray-500)
- Dark: `#1f2937` (bg-gray-800)
- Light: `#f9fafb` (bg-gray-50)

---

## 📞 Support Links

- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com

---

## ⚡ Performance Tips

1. Use indexes in MongoDB
2. Implement pagination for large lists
3. Optimize images
4. Enable caching
5. Use CDN for static assets
6. Minimize API calls
7. Lazy load components
8. Use production builds

---

## 🎓 Learning Path

1. **Beginner:** SETUP_GUIDE.md
2. **User:** FEATURES.md
3. **Developer:** TECH_STACK.md
4. **Deploy:** DEPLOYMENT.md
5. **Reference:** This file

---

**Keep this file handy for quick reference!**
