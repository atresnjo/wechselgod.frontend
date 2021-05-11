<script lang="ts">
    import type { IBankAccountTransaction } from 'src/shared/dtos'
    import dayjs from 'dayjs'
    import AccountBalance from './AccountBalance.svelte'

    export let transaction: IBankAccountTransaction
</script>

<div class="cursor-pointer hover:bg-base-300 border p-5 bg-base-100 ">
    <div class="flex">
        <div class="flex flex-col ">
            <span class="font-bold">{transaction.counterpartName}</span>
            <span class="text-gray-500 font-semibold">
                {dayjs(transaction.bankBookingDate).format('D. MMM YYYY')}</span
            >
        </div>
        <div class="flex flex-1 justify-end">
            <AccountBalance
                balance={transaction.amount}
                isNegative={transaction.isNegative}
            />
        </div>
    </div>
</div>
