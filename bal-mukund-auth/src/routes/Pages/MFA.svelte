<script>
    import { createClient } from "@supabase/supabase-js";
    import { onMount } from "svelte";
    import {
        PUBLIC_SUPABASE_URL,
        PUBLIC_SUPABASE_ANON_KEY,
    } from "$env/static/public";

    const supabase = createClient(
        PUBLIC_SUPABASE_URL,
        PUBLIC_SUPABASE_ANON_KEY
    );

    let email = "";
    let verificationCode = "";

    async function handleMFAVerify() {
        const response = await fetch("/api/auth/mfa-verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, verificationCode }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("MFA verification successful:", data.message);
        } else {
            const error = await response.json();
            console.error("MFA verification error:", error.message);
        }
    }

    onMount(() => {
        // Fetch the user's email from the previous login step (Login.svelte)
        // You can store the email in a shared state management system like stores or context
        email = "user@example.com";
    });
</script>

<main>
    <h1>MFA Verification</h1>

    <form on:submit|preventDefault={handleMFAVerify}>
        <label>
            Email:
            <input type="email" disabled bind:value={email} />
        </label>

        <label>
            Verification Code:
            <input type="text" bind:value={verificationCode} required />
        </label>

        <button type="submit">Verify</button>
    </form>
</main>
