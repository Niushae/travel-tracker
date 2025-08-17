import { and, eq, like, or } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertLocation } from "../schema";

import db from "..";
import { location } from "../schema";

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({ where: and(eq(location.name, existing.name), eq(location.userId, userId)) });
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findMany({ where: or(eq(location.slug, `${slug}`), like(location.slug, `^${slug}-[a-z0-9]{5}$`)) });
}

export async function findUniqueSlug(slug: string) {
  const existing = await findLocationBySlug(slug);

  if (existing.length > 0) {
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvxyz", 5);
    let newSlug = `${slug}-${nanoid()}`;
    for (let i = 0; i < existing.length; i++) {
      if (existing[i].slug === newSlug) {
        newSlug = `${slug}-${nanoid()}`;
        i = 0;
      }
    }
    return newSlug;
  }
  else {
    return slug;
  }
}

export async function insertLocation(insertable: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();
  return created;
}
