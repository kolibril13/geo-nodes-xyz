import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://msgozdhtfawuadxerkxq.supabase.co",
  "sb_publishable_wnNxDxsZA_SazdahnpMiIg__zR2QQvv",
  {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
    },
  }
);

// Finish OAuth and immediately leave this page
// Use replace to avoid keeping the callback URL in history
supabase.auth.getSession().then(({ data }) => {
  if (data.session) {
    window.location.replace("/");
  }
});
