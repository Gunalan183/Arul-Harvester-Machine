# Deployment Guide

## Step-by-Step Deployment Instructions

### 1. MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project: "Harvester Billing"
4. Click "Build a Database"
5. Choose FREE tier (M0)
6. Select your preferred region
7. Click "Create Cluster"
8. Wait for cluster creation (2-3 minutes)

#### Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `harvester_admin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

#### Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

#### Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `harvester-billing`

Example:
```
mongodb+srv://harvester_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/harvester-billing?retryWrites=true&w=majority
```

### 2. Backend Deployment (Render)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: `harvester-billing-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server/server.js`
   - Instance Type: Free

6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate random string (e.g., `openssl rand -base64 32`)
   - `NODE_ENV`: `production`
   - `PORT`: `5000`

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://harvester-billing-api.onrender.com`)

### 3. Frontend Deployment (Vercel)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL

7. Update `client/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});
```

8. Click "Deploy"
9. Wait for deployment (2-3 minutes)
10. Your app is live!

### 4. Create Admin User

After deployment, create admin user:

```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourSecurePassword123"}'
```

Or use Postman/Thunder Client.

### 5. Update CORS (if needed)

In `server/server.js`, update CORS:

```javascript
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app'],
  credentials: true
}));
```

## Alternative Deployment Options

### Railway (Backend + Database)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add MongoDB plugin
6. Set environment variables
7. Deploy

### Netlify (Frontend)

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
6. Deploy

## Post-Deployment Checklist

- [ ] MongoDB cluster is running
- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Admin user is created
- [ ] Can login successfully
- [ ] Can create customers
- [ ] Can create bills
- [ ] Reports are working
- [ ] Print functionality works
- [ ] Language switching works

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB connection string
- Verify IP whitelist (0.0.0.0/0)
- Check database user credentials

### Frontend can't reach backend
- Verify VITE_API_URL is set correctly
- Check CORS configuration
- Ensure backend is running

### Authentication issues
- Verify JWT_SECRET is set
- Check token expiration
- Clear browser localStorage

## Monitoring

### Render
- View logs in Render dashboard
- Set up health checks
- Monitor resource usage

### Vercel
- View deployment logs
- Check analytics
- Monitor performance

### MongoDB Atlas
- Monitor database metrics
- Set up alerts
- Check connection logs

## Backup Strategy

1. MongoDB Atlas automatic backups (enabled by default)
2. Export data regularly:
```bash
mongodump --uri="your_connection_string"
```

3. Store backups securely

## Security Best Practices

1. Use strong JWT_SECRET
2. Enable HTTPS only
3. Set secure CORS origins
4. Use environment variables
5. Regular security updates
6. Monitor access logs
7. Implement rate limiting (optional)

## Cost Estimation

- MongoDB Atlas: FREE (M0 tier)
- Render: FREE (with limitations)
- Vercel: FREE (hobby plan)

Total: $0/month for small usage

Upgrade when needed:
- Render Pro: $7/month
- MongoDB M2: $9/month
- Vercel Pro: $20/month
