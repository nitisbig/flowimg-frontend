
'use server'

import { db } from "@/db/connect";
import { apiKeyTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import crypto from 'crypto'

export async function generateAndStoreAPI() {
    const token = crypto.randomBytes(16).toString("hex"); 

    await db.insert(apiKeyTable).values({
        token: token
    });

    return token;
}


export async function fetchAll() {
    try {
        const keys = await db
            .select()
            .from(apiKeyTable)
            .orderBy(desc(apiKeyTable.id))

        const formattedKeys = keys.map((k) => ({
            key: k.token,
            status: Boolean(k.isActive)
        }))

        return formattedKeys
    }
    catch (err) {
        return [];
    }
}