export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password')

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${url.origin}/auth/callback`,
            },
        });

        if (error) 
            return fail(500, {message: 'Server error. Try again later.', succes: false, email});

        return {
            message: 'Please check your email for a magic link to log in.',
            success: true,
        }
    },
}