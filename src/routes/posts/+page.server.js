import { error, fail } from '@sveltejs/kit';

export const actions = {
    createPost: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();

        if (!session) 
            throw error(401, { message: 'Unauthorized' });

        const formData = await request.formData();
        const content = formData.get('content');

        const { error: createPostError, data: newPost } = await supabase
            .from('posts')
            .insert({ content });

        if (createPostError) {
            return fail(500, {
                supabaseErrorMessage: createPostError.message,
            })
        }
        return {
            newPost,
        }
    },
}