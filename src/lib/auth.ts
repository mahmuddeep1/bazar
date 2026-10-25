// ফাইলের জায়গা: src/lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
    throw new Error("MONGODB_URL .env ফাইলে পাওয়া যায়নি");
}

// dev mode এর hot reload এ বারবার নতুন connection খোলা ঠেকাতে global এ রাখা হচ্ছে
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const client = globalForMongo._mongoClient ?? new MongoClient(mongoUrl);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = client;

const db = client.db("bangla-news-24");

// key থাকলেই শুধু provider চালু হবে, না থাকলে server crash করবে না
const socialProviders = {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
              google: {
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              },
          }
        : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
        ? {
              github: {
                  clientId: process.env.GITHUB_CLIENT_ID,
                  clientSecret: process.env.GITHUB_CLIENT_SECRET,
              },
          }
        : {}),
};

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    trustedOrigins: ["http://localhost:3000"],
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
    },
    socialProviders,
});