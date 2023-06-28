<script>
  import { createClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";

  const supabaseUrl = "YOUR_SUPABASE_URL";
  const supabaseKey = "YOUR_SUPABASE_KEY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  let email = "";
  let password = "";
  let showMFA = false;

  async function handleLogin() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.mfaRequired) {
        // MFA verification is required
        // Show the MFA page
        showMFA = true;
      } else {
        // User logged in successfully
        console.log("Logged in successfully:", data.user);
      }
    } else {
      const error = await response.json();
      console.error("Login error:", error.message);
    }
  }

  onMount(() => {
    // Check if the user is already logged in
    const user = supabase.auth.user();
    if (user) {
      console.log("User already logged in:", user);
    }
  });
</script>

<main>
  <h1>Login</h1>

  {#if !showMFA}
    <form on:submit|preventDefault={handleLogin}>
      <label>
        Email:
        <input type="email" bind:value={email} required />
      </label>

      <label>
        Password:
        <input type="password" bind:value={password} required />
      </label>

      <button type="submit">Login</button>
    </form>
  {:else}
    <!-- MFA verification page -->
  {/if}
</main>
