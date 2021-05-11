<script lang="ts">
    import { login } from '../client/api'
    import { onMount } from 'svelte'
    import { hasToken } from '../misc/utils'
    import AuthForm from '../components/AuthForm.svelte'
    import { Link } from 'svelte-navigator'
    import AuthSideCallout from '../components/AuthSideCallout.svelte'

    let isLoading: boolean

    onMount(() => {
        if (hasToken() == true) {
            navigate('/dashboard')
        }
    })
    export let navigate: any

    const handleLogin = async (values: any) => {
        try {
            isLoading = true
            var response = await login({ ...values.detail })
            if (response.accessToken !== undefined) {
                navigate('/dashboard')
            }
        } catch (err) {
        } finally {
            isLoading = false
        }
    }
</script>

<section class="bg-base-content h-screen">
    <div class="mx-auto flex lg:justify-center h-full flex-col lg:flex-row">
        <AuthSideCallout />
        <AuthForm
            submitButtonTitle={'Anmelden'}
            title={'Melde dich an'}
            {isLoading}
            on:submit={handleLogin}
        >
            <p class="mt-6 text-xs">
                Du hast noch kein Konto? <Link
                    to={'/auth/create'}
                    class="text-secondary">Bei WechselGod registrieren!</Link
                >
            </p>
        </AuthForm>
    </div>
</section>
