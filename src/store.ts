import { writable } from 'svelte/store'

import type { IBankAccount } from './shared/dtos'

export const openDeleteBankAccountModal = writable<Partial<BankAccountModalState>>({
    bankAccount: null,
    show: false,
})

export interface BankAccountModalState {
    show: boolean
    bankAccount: IBankAccount
}
