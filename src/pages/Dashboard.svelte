<script lang="ts">
    import { onMount } from 'svelte'
    import BankAccountCard from '../components/BankAccountCard.svelte'
    import { getPersonalDetails } from '../client/api'
    import type { IBankAccount, IBankAccountTransaction } from '../shared/dtos'
    import Navigation from '../components/Navigation.svelte'
    import { navigate } from 'svelte-navigator'
    import Dinero from 'dinero.js'
    import DeleteBankAccountModal from '../components/DeleteBankAccountModal.svelte'
    import TransactionsTable from '../components/TransactionsTable.svelte'
    import { clearTokens } from '../misc/utils'

    Dinero.globalLocale = 'de-DE'
    Dinero.defaultCurrency = 'EUR'

    let bankAccounts: IBankAccount[] = []
    let lastTransactions: IBankAccountTransaction[] = []

    $: {
        if (bankAccounts.length > 0) {
            firstBankAccount = bankAccounts[0]
        }
    }

    let firstBankAccount: IBankAccount
    let totalBalance: string = '0'
    let totalSpent: string = '0'
    let isTotalBalanceNegative: number = 0
    let isTotalSpentNegative: number = 0
    let showDropDownMenu: boolean = false

    onMount(async () => {
        var response = await getPersonalDetails()
        bankAccounts = [...response.bankAccounts]
        lastTransactions = [...response.transactions]

        let dinero = Dinero({
            amount: 0,
            precision: 3,
        })

        bankAccounts.forEach((x) => {
            if (x.isNegative) {
                dinero = dinero.subtract(Dinero({ amount: x.formattedBalance }))
            } else {
                dinero = dinero.add(Dinero({ amount: x.formattedBalance }))
            }
        })
        totalBalance = dinero.toFormat('$0,0.00')
        isTotalBalanceNegative = Math.sign(dinero?.getAmount())
        calculateTotalSpent()
    })

    const calculateTotalSpent = () => {
        let dinero = Dinero({
            amount: 0,
            precision: 3,
        })

        lastTransactions.forEach((x) => {
            if (x.isNegative) {
                dinero = dinero.subtract(Dinero({ amount: x.formattedBalance }))
            } else {
                dinero = dinero.add(Dinero({ amount: x.formattedBalance }))
            }
        })
        totalSpent = dinero.toFormat('$0,0.00')
        isTotalSpentNegative = Math.sign(dinero?.getAmount())
    }

    const addAccount = () => navigate('/accounts/add')
</script>

<div class="w-full bg-base-content">
    <Navigation />
    <DeleteBankAccountModal />
    <div
        class="max-w-7xl lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between"
    >
        <div>
            <h4 class="text-2xl uppercase font-bold leading-tight text-primary">
                meine konten
            </h4>
        </div>
        <div class="max-w-7xl mt-6 space-x-4">
            <button
                on:click={addAccount}
                class="btn btn-outline btn-primary bg-base-content btn-circle"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
                        fill="currentColor"
                    /><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
                        fill="currentColor"
                    /></svg
                >
            </button>

            <button
                class="btn btn-outline btn-primary bg-base-content btn-circle"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                        fill="currentColor"
                    /><path
                        d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                        fill="currentColor"
                    /></svg
                >
            </button>

            <div class="relative inline-block text-left">
                <button
                    on:click={() => (showDropDownMenu = !showDropDownMenu)}
                    class="btn btn-outline btn-primary btn-circle"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                            fill="currentColor"
                        /><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                            fill="currentColor"
                        /></svg
                    >
                    <button />
                </button>
                <div
                    class="{showDropDownMenu
                        ? 'visible'
                        : 'hidden'} origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-base-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                >
                    <div class="py-1" role="none">
                        <button
                            on:click={() => {
                                clearTokens()
                                navigate('/auth/login')
                            }}
                            class="text-base-content hover:text-primary block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-1">Ausloggen</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="max-w-7xl container mx-auto px-6">
        <div class="flex flex-row space-x-3">
            <div class="flex container">
                <div
                    class="p-4 w-full space-y-12 hover:bg-base-300 cursor-pointer flex flex-col space-y-2 rounded-lg bg-white"
                >
                    <div class="flex flex-row">
                        <div class="flex space-y-10 flex-col">
                            <span class="text-xl text-gray-400">Hauptkonto</span
                            >
                            <div class="flex flex-col">
                                <span class="text-4xl  text-neutral-focus"
                                    >{firstBankAccount?.accountName}</span
                                >
                                <span
                                    class="pl-1 text-gray-500 tracking-widest text-md"
                                >
                                    {firstBankAccount?.iban}
                                </span>
                            </div>
                        </div>

                        <div class="flex flex-col flex-1 ">
                            <span
                                class=" text-xl justify-end flex-1 flex text-gray-400"
                                >Guthaben</span
                            >

                            <span
                                class="text-4xl tracking-widest justify-end flex-1 flex ' {firstBankAccount?.isNegative
                                    ? 'text-error'
                                    : 'text-primary'}"
                                >{firstBankAccount?.balance} €</span
                            >
                        </div>
                    </div>
                    <div class="card-actions w-7/12">
                        <button
                            on:click={() => navigate('/accounts/add')}
                            class="uppercase btn mt-5 btn-primary"
                            >Konto hinzufügen</button
                        >
                        <button class="uppercase btn mt-5 btn-outline"
                            >Kontodaten exportieren</button
                        >
                    </div>
                </div>
            </div>

            <div class="flex">
                <div
                    class="p-4 hover:bg-[#497F70] cursor-pointer flex flex-col rounded-lg text-primary-content bg-[#097F70]"
                >
                    <div class="flex flex-col ">
                        <div
                            class="text-center mb-4 absolute  right-2/2 transform translate-x-1/2"
                        />

                        <div class="p-4 relative">
                            <div
                                class="animation-wrapper bounce-animation text-primary mb-4 absolute -top-14 right-1/2 transform translate-x-1/2"
                            >
                                <button class="btn btn-xl btn-circle">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        class="rounded-lg justify-center flex h-8 w-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        ><path
                                            d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z"
                                            fill="currentColor"
                                        /><path
                                            d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"
                                            fill="currentColor"
                                        /><path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                                            fill="currentColor"
                                        /></svg
                                    >
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <span class="text-2xl"
                                >Hey Adnan, ein Vertrag von Dir ist zu teuer.</span
                            >
                            <span class="text-xl pt-1"
                                >Du kannst geld sparen:</span
                            >
                            <span
                                class="text-3xl font-bold tracking-widest text-primary pt-1"
                                >416,39€</span
                            >
                        </div>
                        <button class="btn mt-5 btn-primary block w-full"
                            >Optimieren</button
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="container pt-12 mx-auto">
            <div class="flex flex-col">
                <div class="flex flex-row border-b pb-2 border-gray-200">
                    <h1 class="font-bold text-primary text-2xl uppercase">
                        Alle konten
                    </h1>
                    <div class="flex flex-1 justify-end">
                        <span
                            class="text-primary-focus tracking-widest uppercase"
                            >Gesamtguthaben:</span
                        >
                        <span
                            class="pl-1 tracking-wider ' {isTotalBalanceNegative ==
                            -1
                                ? 'text-error'
                                : 'text-primary'}"
                        >
                            {totalBalance}
                        </span>
                    </div>
                </div>
                <div class="md:grid md:grid-cols-3 mt-3 space-x-6 rounded-lg">
                    {#each bankAccounts as bankAccount}
                        <BankAccountCard {bankAccount} />
                    {/each}
                </div>
            </div>
        </div>
        <div class="container pt-20 mx-auto">
            <div class="flex flex-col">
                <div class="flex flex-row border-b pb-2 border-gray-200">
                    <h1 class="font-bold text-primary text-2xl uppercase">
                        Letzten Transaktionen
                    </h1>
                    <div class="flex flex-1 justify-end">
                        <span
                            class="text-primary-focus tracking-widest uppercase"
                            >ausgaben:</span
                        >
                        <span
                            class="pl-1 tracking-wider ' {isTotalSpentNegative ==
                            -1
                                ? 'text-error'
                                : 'text-primary'}"
                        >
                            {totalSpent}
                        </span>
                    </div>
                </div>
                <TransactionsTable transactions={lastTransactions} />
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .animation-wrapper {
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
    .bounce-animation {
        animation-name: bounce-animation;
        animation-timing-function: ease;
    }
    @keyframes bounce-animation {
        0% {
            transform: scale(1, 1) translateY(0);
        }
        10% {
            transform: scale(1.1, 0.9) translateY(0);
        }
        30% {
            transform: scale(0.9, 1.1) translateY(-18px);
        }
        50% {
            transform: scale(1, 1) translateY(0);
        }
        100% {
            transform: scale(1, 1) translateY(0);
        }
    }
</style>
