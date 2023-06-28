<script>
    import { createClient } from '@supabase/supabase-js';
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
    
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

    let email = '';
    let password = '';

    async function handleLogin() {
        const { user, error } = await supabase.auth.signInWith({
            email,
            password,
        });

        if (error) {
            console.error('Login error: ', error.message);
        } else {
            console.log('Logged in successfully: ', user);
        }
    }
</script>

<main>
    <h1>Login</h1>
  
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
  </main>