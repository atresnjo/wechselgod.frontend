import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import type {
    IAccountDetailsResponse,
    IAuthRequest,
    IAuthResponse,
    IBankDetails,
    IGetBankAccountTransactionsResponse,
    IImportBankResponse,
    IRefreshTokenRequest,
} from '../shared/dtos'
import { getAccessToken, getTokens, storeTokens } from '../misc/utils'

const client = axios.create({ baseURL: 'http://localhost:5000/' })

client.interceptors.request.use((request) => {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`
    return request
})

const refreshAuthLogic = (failedRequest) =>
    refreshToken()
        .then((tokenRefreshResponse) => {
            storeTokens(tokenRefreshResponse)
            failedRequest.response.config.headers[
                'Authorization'
            ] = `Bearer ${getAccessToken()}`

            return Promise.resolve()
        })
        .catch((err) => {
            console.log('error')
        })

createAuthRefreshInterceptor(client, refreshAuthLogic)

export const findBank = async (searchTerm: string): Promise<IBankDetails[]> => {
    try {
        const response = await client.get<IBankDetails[]>(
            `/banks/search?searchTerm=${searchTerm}`
        )
        return response.data
    } catch (err) {
        throw err
    }
}

export const getPersonalDetails =
    async (): Promise<IAccountDetailsResponse> => {
        try {
            const response = await client.get<IAccountDetailsResponse>(
                `/accounts/details`
            )
            return response.data
        } catch (err) {
            throw err
        }
    }

export const getBankAccountTransactions = async (
    bankId: string
): Promise<IGetBankAccountTransactionsResponse> => {
    try {
        const response = await client.get<IGetBankAccountTransactionsResponse>(
            `/accounts/banks/${bankId}/transactions`
        )
        return response.data
    } catch (err) {
        throw err
    }
}

export const importBank = async (
    bankId: string
): Promise<IImportBankResponse> => {
    try {
        const response = await client.post<IImportBankResponse>(
            `/accounts/banks?id=${bankId}`
        )
        return response.data
    } catch (err) {
        throw err
    }
}

export const deleteBank = async (
    bankId: string
): Promise<IImportBankResponse> => {
    try {
        const response = await client.delete(`/accounts/banks/${bankId}`)
        return response.data
    } catch (err) {
        throw err
    }
}

export const refreshToken = async (): Promise<IAuthResponse> => {
    var request: IRefreshTokenRequest = { ...getTokens() }
    try {
        const response = await client.post<IAuthResponse>(
            'auth/refresh',
            request
        )
        if (response.data) {
            storeTokens(response.data)
        }
        return response.data!
    } catch (err) {
        throw err
    }
}

export const login = async (request: IAuthRequest): Promise<IAuthResponse> => {
    try {
        const response = await client.post<IAuthResponse>('auth/login', request)
        if (response.data) {
            storeTokens(response.data)
        }
        return response.data!
    } catch (err) {
        throw err
    }
}

export const register = async (
    request: IAuthRequest
): Promise<IAuthResponse> => {
    try {
        const response = await client.post<IAuthResponse>(
            'auth/create',
            request
        )
        if (response.data) {
            storeTokens(response.data)
        }
        return response.data!
    } catch (err) {
        throw err
    }
}
