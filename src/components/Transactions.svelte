<script lang="ts">
    import type { IBankTransactionItem } from '../shared/dtos'
    import TransactionCard from './TransactionCard.svelte'
    import dayjs from 'dayjs'
    export let transactions: IBankTransactionItem[]
</script>

<div class="flex flex-col pt-6">
    {#each transactions as item}
        <div class="flex pb-5 flex-col">
            <div class="flex flex-row">
                <span
                    class="pl-1 text-gray-400  tracking-wider pb-1 font-semibold"
                >
                    {dayjs(item.bankBookingDate).format('D. MMM YYYY')}</span
                >
                <span
                    class="flex flex-1  text-gray-400 tracking-wider  justify-end"
                >
                    {item.amountSpent} €
                </span>
            </div>
            {#each item.transactions as transaction}
                <TransactionCard {transaction} />
            {/each}
        </div>
    {/each}
</div>