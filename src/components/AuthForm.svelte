<script lang="ts">
    import { createForm } from 'svelte-forms-lib'
    import type { IAuthRequest } from '../shared/dtos'
    import * as yup from 'yup'
    import { createEventDispatcher } from 'svelte'

    export let isLoading: boolean = false
    export let title: string = ''
    export let submitButtonTitle: string = ''
    var dispatcher = createEventDispatcher()

    const { touched, form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email('Please enter a valid email')
                .required('Email is required.'),
            password: yup.string().min(6).required('Password is required.'),
        }),
        onSubmit: async (values: IAuthRequest) => dispatcher('submit', values),
    })
</script>

<form
    on:submit|preventDefault={handleSubmit}
    class="w-full lg:w-1/2 flex justify-center bg-base-content dark:bg-gray-900"
>
    <div
        class="w-full sm:w-4/6 md:w-3/6 lg:w-2/3 text-primary-content dark:text-gray-100 flex flex-col justify-center px-2 sm:px-0 py-16"
    >
        <div class="px-2 sm:px-6">
            <h3
                class="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight"
            >
                {title}
            </h3>
        </div>
        <div class="mt-8 w-full px-2 space-y-4 sm:px-6">
            <div class="flex flex-col mt-8">
                <label
                    for="email"
                    class="text-lg pb-2 font-semibold leading-tight"
                    >Email</label
                >
                <input
                    bind:value={$form.email}
                    class="text-neutral input"
                    type="email"
                    id="email"
                    autocomplete="email"
                    on:change={handleChange}
                    placeholder="email"
                />
                {#if $errors.email || $touched.email}
                    <small class="text-error">{$errors.email}</small>
                {/if}
            </div>
            <div class="flex flex-col mt-5">
                <label
                    for="password"
                    class="text-lg pb-2 font-semibold fleading-tight"
                    >Passwort</label
                >
                <input
                    id="password"
                    required
                    aria-required="true"
                    name="password"
                    type="password"
                    placeholder="passwort"
                    class="input text-neutral"
                    bind:value={$form.password}
                    autocomplete="current-password"
                    on:change={handleChange}
                />

                {#if $errors.password || $touched.password}
                    <small class="text-error">{$errors.password}</small>
                {/if}
            </div>
        </div>

        <div class="px-2 sm:px-6">
            <button
                class:loading={isLoading}
                type="submit"
                class="btn btn-primary w-full block mt-3 hover:bg-primary-focus"
            >
                {submitButtonTitle}
            </button>

            <slot />
        </div>
    </div>
</form>
