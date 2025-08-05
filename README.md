# Todo App

A modern, full-stack todo application built with Next.js, Prisma, and PostgreSQL (Neon).

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Add descriptions to todos
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Real-time updates
- ✅ Database persistence with Prisma ORM
- ✅ Deployed on Vercel with Neon PostgreSQL

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Neon PostgreSQL database
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd to-do-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
   ```
   
   Replace with your actual Neon database connection string.

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup with Neon

1. **Create a Neon account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up for a free account

2. **Create a new project**
   - Create a new PostgreSQL project
   - Note down your connection string

3. **Connect to Vercel**
   - In your Vercel project dashboard
   - Go to Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string

### Deployment on Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial todo app setup"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Import your GitHub repository to Vercel
   - Add your `DATABASE_URL` environment variable
   - Deploy!

3. **Set up database migrations**
   After deployment, run:
   ```bash
   npx prisma db push
   ```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Database Schema

```sql
model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT 
