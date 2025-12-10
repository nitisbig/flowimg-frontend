'use server'

import crypto from 'crypto'
import { apiKeyTable } from "@/db/schema";
import {db} from '@/db/connect'
import { desc, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';



/* export async function store(){
    const api= crypto.randomBytes(16).toString("hex");
    await db.insert(apiTable).values({
        api: api,
        userId:
    })
    return api
} */

export async function createApiKey() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) throw new Error("Unauthorized");

  const key = "flow_img"+crypto.randomBytes(16).toString("hex");

  await db.insert(apiKeyTable).values({
    api: key,
    userId: session.user.id, // 👈 Link user to API Key
  });

  return key;
}

export async function getMyKeys() {
    const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) throw new Error("Unauthorized");

  try{
      const keys = await db
        .select()
        .from(apiKeyTable)
        .where(eq(apiKeyTable.userId, session.user.id));
    
    const formattedKeys = keys.map((k)=>({
        api: k.api,
        status: Boolean(k.isActive)
    }))
    return formattedKeys
  }
  catch (err){
    return [];
  }
}

export async function fetchAll() {
    try {
        const keys = await db
            .select()
            .from(apiKeyTable)
            .orderBy(desc(apiKeyTable.id))

        const formattedKeys = keys.map((k) => ({
            api: k.api,
            status: k.isActive
        }))

        return formattedKeys
    }
    catch (err) {
        return [];
    }
}