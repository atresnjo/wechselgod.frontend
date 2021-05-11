<script>
    import { Link } from 'svelte-navigator'
    import Logo from '../assets/logo.svg'
</script>

<nav class="w-full mx-auto bg-neutral-focus">
    <div
        class="max-w-7xl container pr-20 justify-around h-16 flex items-center lg:items-stretch mx-auto"
    >
        <div class="h-full flex items-center">
            <div class="flex pr-10">
                <img class="w-12 h-12" src={Logo} alt="Logo" />
            </div>
            <ul
                class="pr-12 xl:flex items-center text-primary-content h-full hidden tracking-widest space-x-20"
            >
                <div class="flex space-x-4">
                    <span class="text-2xl pb-1">💳</span>

                    <Link
                        to={'/dashboard'}
                        class="hover:text-primary-focus cursor-pointer  flex items-center text-sm  border-b-2 border-primary-focus"
                    >
                        Konten
                    </Link>
                </div>
                <div class="flex space-x-4">
                    <span class="text-2xl pb-1">🛡️</span>
                    <Link
                        to={'/dashboard'}
                        class="hover:text-primary-focus cursor-pointer flex items-center text-sm "
                    >
                        Versicherungswelt
                    </Link>
                </div>
                <div class="flex space-x-4">
                    <span class="text-2xl pb-1">💸</span>
                    <Link
                        to={'/dashboard'}
                        class="hover:text-primary-focus cursor-pointer flex items-center text-sm "
                    >
                        Vertragswelt
                    </Link>
                </div>
                <div class="flex space-x-4">
                    <span class="text-2xl pb-1">🛡️</span>
                    <Link
                        to={'/dashboard'}
                        class="hover:text-primary-focus cursor-pointer flex items-center text-sm "
                    >
                        Support
                    </Link>
                </div>
            </ul>
        </div>
        <div>
            <div class="w-full h-full flex items-center">
                <div
                    class="btn btn-primary btn-circle btn-outline flex items-center justify-center cursor-pointer text-primary-focus"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
                        />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</nav>
