'use server'

import crypto from 'crypto'
import { apiKeyTable } from "@/db/schema";
import {db} from '@/db/connect'
import { and, desc, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';



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
      id: k.id,
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


export async function revokeApiKey(apiKey: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
  
    const result = await db
      .update(apiKeyTable)
      .set({ isActive: false })
      .where(
        and(
          eq(apiKeyTable.api, apiKey),
          eq(apiKeyTable.userId, session.user.id)
        )
      )
      .returning();

    if (result.length === 0) {
      return { success: false, error: "API key not found or unauthorized" };
    }
    revalidatePath("/api_key"); 
    return { success: true, message: "API key revoked successfully" };
  } catch (error) {
    console.error("Error revoking API key:", error);
    return { success: false, error: "Failed to revoke API key" };
  }
}