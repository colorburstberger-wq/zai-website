import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Build the DATABASE_URL from Supabase connection info if not set directly
function getDatabaseUrl(): string {
  // Priority 1: Direct DATABASE_URL env var
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL

  // Priority 2: Build from Supabase Postgres connection info
  const dbHost = process.env.SUPABASE_DB_HOST
  const dbPassword = process.env.SUPABASE_DB_PASSWORD
  if (dbHost && dbPassword) {
    return `postgresql://postgres:${encodeURIComponent(dbPassword)}@${dbHost}:5432/postgres`
  }

  // Priority 3: Build from project URL (direct connection)
  const projectUrl = process.env.SUPABASE_URL
  if (projectUrl) {
    const projectId = projectUrl.replace('https://', '').replace('.supabase.co', '')
    return `postgresql://postgres.lmkrkevuuiipqyrgoknd:Akarsh%40123.@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`
  }

  // Fallback: local SQLite (dev only)
  return 'file:./db/custom.db'
}

const databaseUrl = getDatabaseUrl()

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
    log: process.env.NODE_ENV !== 'production' ? ['query'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db