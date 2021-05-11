<script lang="ts">
    import type { IBankAccountTransaction } from 'src/shared/dtos'
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'
    import _ from 'dayjs/locale/de'
    import AccountBalance from './AccountBalance.svelte'

    dayjs.extend(relativeTime)
    dayjs.locale('de')

    export let transactions: IBankAccountTransaction[] = []
</script>

<div class="w-full pt-3 pb-6 ">
    <div
        class="bg-base-100 rounded-lg px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto"
    >
        <table class="w-full whitespace-nowrap">
            <thead>
                <tr class="h-16 w-full text-sm leading-none text-neutral">
                    <th class="font-normal text-left pl-4">Empfänger</th>
                    <th class="font-normal text-left pl-12">Grund</th>
                    <th class="font-normal text-left pl-12">Betrag</th>
                    <th class="font-normal text-left pl-20">Datum</th>
                </tr>
            </thead>
            <tbody class="w-full">
                {#each transactions as transaction}
                    <tr
                        class="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                        <td class="pl-4 cursor-pointer">
                            <div class="flex items-center">
                                <div class="w-10 h-10">
                                    <img
                                        alt=""
                                        class="w-full pt-2 h-full"
                                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                                    />
                                </div>
                                <div class="pl-4">
                                    <p class="font-medium">
                                        {transaction?.counterpartName}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="pl-12">
                            <p
                                class="text-sm font-medium leading-none w-64 truncate text-gray-800"
                            >
                                {transaction?.purpose}
                            </p>
                        </td>
                        <td class="pl-12">
                            <span class="font-medium">
                                <AccountBalance
                                    balance={transaction.amount}
                                    isNegative={transaction.isNegative}
                                />
                            </span>
                        </td>
                        <td class="pl-20">
                            <p class="font-medium">
                                {dayjs(transaction?.bankBookingDate).format(
                                    'D. MMM YYYY'
                                )}
                            </p>
                            <p class="text-xs leading-3 text-gray-600 mt-2">
                                {dayjs(transaction?.bankBookingDate).fromNow()}
                            </p>
                        </td>

                        <td class="px-7 2xl:px-0">
                            <button class="focus:outline-none pl-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                                        stroke="#A1A1AA"
                                        stroke-width="1.25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                                        stroke="#A1A1AA"
                                        stroke-width="1.25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                                        stroke="#A1A1AA"
                                        stroke-width="1.25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                            <div
                                class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden"
                            >
                                <div
                                    class="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                >
                                    <p>Edit</p>
                                </div>
                                <div
                                    class="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                >
                                    <p>Delete</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
