<script lang="ts">
    import type { IBankAccount } from 'src/shared/dtos'
    import { navigate } from 'svelte-navigator'
    import SparkasseLogo from '../assets/sparkasse.svg'
    import AccountBalance from './AccountBalance.svelte'
    import { openDeleteBankAccountModal } from '../store'

    export let bankAccount: IBankAccount
    const open = () =>
        navigate(`/accounts/${bankAccount.id}`, { state: bankAccount })
</script>

<div
    class="p-4 hover:bg-base-300  flex flex-col space-y-2 rounded-lg bg-white mt-2"
>
    <div on:click={open} class="flex cursor-pointer">
        <div class="flex space-x-3 flex-1 justify-center">
            <img
                class="max-w-8 max-h-10"
                src={SparkasseLogo}
                alt="Sparkasse Logo"
            />
        </div>
    </div>
    <div class="cursor-pointer" on:click={open}>
        <span class="font-bold pt-3 mr-10 mb-2">{bankAccount?.accountName}</span>
        <span class="text-gray-500 tracking-widest text-sm">
            {bankAccount?.iban}
        </span>
    </div>
    <div class="flex align-text-bottom">
        <AccountBalance
            balance={bankAccount.balance}
            isNegative={bankAccount.isNegative}
        />

        <div
            on:click={() => {
                $openDeleteBankAccountModal = {
                    bankAccount: bankAccount,
                    show: true,
                }
            }}
            class="flex flex-1 justify-end"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="cursor-pointer hover:bg-base-300 "
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
                    fill="currentColor"
                /><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    fill="currentColor"
                /></svg
            >
        </div>
    </div>
</div>
