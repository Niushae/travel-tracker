import type { DrizzleError } from "drizzle-orm";

import { and, eq, like, or } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";

import db from "~/lib/db";
import { InsertLocation, location } from "~/lib/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join("; ");

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existingLocation = await db.query.location.findFirst({ where: and(eq(location.name, result.data.name), eq(location.userId, event.context.user.id)) });

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists!",
    }));
  }

  let slug = slugify(result.data.name);
  const existing = await db.query.location.findMany({ where: or(eq(location.slug, `${slug}`), like(location.slug, `^${slug}-[a-z0-9]{5}$`)) });

  if (existing.length > 0) {
    let newSlug = generateSlug();
    for (let i = 0; i < existing.length; i++) {
      if (existing[i].slug === newSlug) {
        newSlug = generateSlug();
        i = 0;
      }
    }
    slug = newSlug;
  }

  function generateSlug() {
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvxyz", 5);
    const slugId = `${slug}-${nanoid()}`;
    return slugId;
  }

  try {
    const created = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id,
    }).returning();
    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug") {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "slug must be unique (the location name is used to generate the slug).",
      }));
    }

    throw error;
  }
});
