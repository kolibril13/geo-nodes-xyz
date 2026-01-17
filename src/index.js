import { createClient } from "@supabase/supabase-js";

export default {
  async fetch(request, env) {
    // Forward auth header (if present)
    const authHeader = request.headers.get("Authorization");

    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_KEY,
      {
        global: {
          headers: authHeader
            ? { Authorization: authHeader }
            : {}
        }
      }
    );

    // PUBLIC READ
    if (request.method === "GET") {
      const { data, error } = await supabase
        .from("entries")
        .select("id, content, created_at, user_id")
        .order("created_at", { ascending: false });

      if (error) {
        return new Response(error.message, { status: 500 });
      }

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // AUTHENTICATED WRITE
    if (request.method === "POST") {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        return new Response("Unauthorized", { status: 401 });
      }

      const body = await request.json();

      if (!body?.content) {
        return new Response("Missing content", { status: 400 });
      }

      const { error } = await supabase
        .from("entries")
        .insert({
          user_id: userData.user.id,
          content: body.content
        });

      if (error) {
        return new Response(error.message, { status: 500 });
      }

      return new Response("Inserted ✅", { status: 201 });
    }

    return new Response("Method not allowed", { status: 405 });
  }
};