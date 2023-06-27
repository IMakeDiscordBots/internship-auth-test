import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, error } from '@sveltejs/sveltekit';

export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/protected-routes') || 
        (event.url.pathname.startsWith('/protected-posts') && event.request.method === 'POST')) {
        const session = await event.locals.getSession();
        if (!session)
            throw redirect(303, '/');
    }

    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    })

    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession();
        return session;
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}