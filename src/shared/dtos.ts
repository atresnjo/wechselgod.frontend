export interface IAuthRequest {
    email: string
    password: string
}

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
}

export interface IBankDetails {
    id: number
    name: string
    blz: string
    bic: string
}

export interface IAccountDetailsResponse {
    bankAccounts: IBankAccount[]
    transactions: IBankAccountTransaction[]
}

export interface IBankTransactionItem {
    bankBookingDate: Date
    transactions: IBankAccountTransaction[]
    amountSpent: string
}

export interface IGetBankAccountTransactionsResponse {
    transactions: IBankTransactionItem[]
}

export interface IBankAccountTransaction {
    id: number
    accountId: string
    valueDate: Date
    bankBookingDate: Date
    purpose: string
    amount: string
    counterpartName: string
    formattedBalance: number
    counterpartAccountNumber: string
    counterpartIban: string
    isNegative: boolean
    counterpartBic: string
}

export interface IBankAccount {
    id: string
    accountName: string
    iban: string
    balance: string
    formattedBalance: number
    isNegative: boolean
    bankConnectionId: string
}

export interface IImportBankResponse {
    redirectUrl: string
}

export interface IRefreshTokenRequest {
    accessToken: string
    refreshToken: string
}