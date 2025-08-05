# Setup Guide for Todo App

## 🚀 Quick Setup Steps

### 1. Environment Variables Setup

Create a `.env.local` file in the root directory with your Neon database URL:

```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

**To get your Neon database URL:**
1. Go to your Neon dashboard
2. Click on your project
3. Go to "Connection Details"
4. Copy the connection string
5. Replace the placeholder in `.env.local`

### 2. Database Setup

Run these commands to set up your database:

```bash
# Generate Prisma client
npm run db:generate

# Push the schema to your database
npm run db:push
```

### 3. Local Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your todo app!

### 4. Vercel Deployment

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add todo app with database integration"
git push origin main
```

#### Step 2: Configure Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add `DATABASE_URL` with your Neon connection string
5. Redeploy your application

#### Step 3: Database Migration on Vercel
After deployment, you can run database migrations using Vercel's CLI:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Run database migration
vercel env pull .env.local
npx prisma db push
```

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check your `DATABASE_URL` in `.env.local`
   - Ensure your Neon database is active
   - Verify the connection string format

2. **Prisma Client Error**
   - Run `npm run db:generate` to regenerate the client
   - Restart your development server

3. **Build Errors on Vercel**
   - Check that `DATABASE_URL` is set in Vercel environment variables
   - Ensure all dependencies are properly installed

### Useful Commands:

```bash
# View your database in Prisma Studio
npm run db:studio

# Reset database (⚠️ This will delete all data)
npx prisma db push --force-reset

# Check database connection
npx prisma db pull
```

## 📝 Next Steps

Once your app is running, you can:

1. **Add more features:**
   - Todo categories/tags
   - Due dates
   - User authentication
   - Todo sharing

2. **Enhance the UI:**
   - Dark mode
   - Drag and drop reordering
   - Search and filtering
   - Bulk operations

3. **Add testing:**
   - Unit tests for components
   - Integration tests for API routes
   - E2E tests with Playwright

## 🎉 You're All Set!

Your todo app is now ready with:
- ✅ Full CRUD operations
- ✅ Database persistence
- ✅ Modern UI with Tailwind CSS
- ✅ Deployed on Vercel
- ✅ Connected to Neon PostgreSQL

Happy coding! 🚀 