<script>
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";

    let authenticated = false;

    onMount(() => {
        const session = supabase.auth.session();
        authenticated = session !== null;
    });
</script>

<main>
    {#if $authenticated}
        <slot />
    {:else}
        <Login />
    {/if}
</main>
