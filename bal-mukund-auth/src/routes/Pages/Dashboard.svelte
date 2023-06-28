<script>
    import { onDestroy } from "svelte";
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabase";

    let user;
    let session;

    async function checkAuth() {
        const {
            user: authUser,
            session: authSession,
            error,
        } = await supabase.auth.user();

        if (error) {
            console.error("Auth check error:", error.message);
            goto("/login");
        } else {
            user = authUser;
            session = authSession;

            if (!session) {
                // No active session, redirect to login
                goto("/login");
            } else if (session.expires_at <= Date.now()) {
                // Session token has expired, refresh the session
                const { error: refreshError } =
                    await supabase.auth.api.refreshSession();
                if (refreshError) {
                    console.error(
                        "Session refresh error:",
                        refreshError.message
                    );
                    goto("/login");
                }
            }
        }
    }

    checkAuth();

    onDestroy(() => {
        // Clean up any subscriptions or resources
    });
</script>

<main>
    <h1>Welcome, {user?.email}</h1>
    <p>This is the protected dashboard page.</p>
</main>
