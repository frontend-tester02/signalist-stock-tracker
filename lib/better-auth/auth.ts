/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { connectToDatabase } from '@/database/mongoose'
import { nextCookies } from 'better-auth/next-js'

let authInstance: ReturnType<typeof betterAuth> | null = null

export const getAuth = async () => {
	if (authInstance) return authInstance

	// Wait until the DB connection is fully established
	const mongoose = await connectToDatabase()

	// Ensure Mongoose has finished connecting before accessing db
	if (mongoose?.connection.readyState !== 1) {
		await new Promise<void>((resolve, reject) => {
			mongoose?.connection.once('open', () => resolve())
			mongoose?.connection.once('error', err => reject(err))
		})
	}

	const db = mongoose?.connection.db
	if (!db) throw new Error('MongoDB connection not found')

	authInstance = betterAuth({
		database: mongodbAdapter(db as any),
		secret: process.env.BETTER_AUTH_SECRET!,
		baseURL: process.env.BETTER_AUTH_URL!,
		emailAndPassword: {
			enabled: true,
			disableSignUp: false,
			requireEmailVerification: false,
			minPasswordLength: 8,
			maxPasswordLength: 128,
			autoSignIn: true,
		},
		plugins: [nextCookies()],
	})

	return authInstance
}

export const auth = await getAuth()

// ❗ DO NOT call this directly at the module level
// because top-level await runs before DB is ready in some Next.js cases.
// Instead, import and use `await getAuth()` where needed.
