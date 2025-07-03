import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as typeof event.context.user;
  if (!session) {
    if (event.path.startsWith("/dashboard")) {
      return sendRedirect(event, "/", 302);
    }
  }
});
