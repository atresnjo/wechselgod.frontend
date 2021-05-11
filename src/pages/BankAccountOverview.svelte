<script lang="ts">
    import { onMount } from 'svelte'
    import {  useParams, Link } from 'svelte-navigator'
    import Title from '../components/Title.svelte'
    import Subtitle from '../components/Subtitle.svelte'
    import SparkasseLogo from '../assets/sparkasse.svg'
    import type {
        IBankAccount,
        IBankTransactionItem,
    } from '../shared/dtos'
    import AccountBalance from '../components/AccountBalance.svelte'
    import { getBankAccountTransactions } from '../client/api'
    import Transactions from '../components/Transactions.svelte'
    import Navigation from '../components/Navigation.svelte'

    const params = useParams()

    export let location: any
    let bankAccountId = $params.id
    let bankAccount: IBankAccount = location.state
    let transactions: IBankTransactionItem[] = []

    onMount(async () => {
        const response = await getBankAccountTransactions(bankAccountId)
        transactions = response.transactions
        console.log(transactions)
    })
</script>

<div class=" w-full bg-base-content h-full">
    <Navigation />
    <div class="max-w-7xl lg:my-12 container px-6 mx-auto flex flex-col ">
        <div class="flex flex-col">
            <div class="flex flex-col">
                <ul class="flex text-primary text-sm lg:text-base">
                    <li class="inline-flex items-center">
                        <Link to="/dashboard">Meine Konten</Link>
                        <svg
                            class="h-5 w-auto text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </li>
                    <li class="inline-flex items-center">
                        <a href="/components">Kontoübersicht</a>
                    </li>
                </ul>
                <div
                    class="flex items-center justify-between text-primary  w-full my-4  sm:pr-4"
                >
                    <div class="mr-6 space-y-1">
                        <Title text={'Kontoübersicht'} />
                        <Subtitle text={' Lass uns zusammen Geld sparen! 💰'} />
                    </div>
                </div>
            </div>
 
            <div class="mt-40 flex-col rounded-lg text-center flex bg-base-100">
                <div class="pt-6">
                    <h3
                        class="md:text-3xl  tracking-widest font-bold  text-neutral"
                    >
                        {bankAccount?.accountName}
                    </h3>
                </div>
                <div class="card-body text-center">
                    <div class="flex justify-center">
                        <img
                            class="max-w-8 max-h-10"
                            src={SparkasseLogo}
                            alt="Svelte Logo"
                        />
                    </div>
                    <div class="mt-4 ">
                        <h2
                            class="text-1xl tracking-wider text-gray-400 uppercase"
                        >
                            kontostand
                        </h2>
                        <AccountBalance
                            balance={bankAccount.balance}
                            isNegative={bankAccount.isNegative}
                            overview={true}
                        />
                    </div>
                    <div class="card-actions justify-center">
                        <div class="w-5/12 relative">
                            <input
                                type="text"
                                placeholder="IBAN"
                                readonly={true}
                                value={bankAccount?.iban}
                                class="w-11/12 font-bold tracking-widest input border-0  bg-gray-100"
                            />
                            <button class="absolute right-0 rounded-l-none btn"
                                >Kopieren</button
                            >
                        </div>
                    </div>
                </div>
            </div>
            <Transactions {transactions} />
        </div>
    </div>
</div>
