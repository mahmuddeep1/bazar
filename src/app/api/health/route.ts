import { MongoClient } from "mongodb";

export async function GET() {
    const env = {
        MONGODB_URL: !!process.env.MONGODB_URL,
        BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? null,
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
        GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
    };

    if (!process.env.MONGODB_URL) {
        return Response.json({ env, mongo: "MONGODB_URL পাওয়া যায়নি" });
    }

    const client = new MongoClient(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 8000,
    });
    try {
        await client.connect();
        await client.db("bangla-news-24").command({ ping: 1 });
        return Response.json({ env, mongo: "connected ✅" });
    } catch (e) {
        return Response.json({ env, mongo: "failed ❌", reason: (e as Error).message });
    } finally {
        await client.close();
    }
}