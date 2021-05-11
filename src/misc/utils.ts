import type { IAuthResponse } from '../shared/dtos'

export const accessTokenKey: string = 'access_token'
export const refreshTokenKey: string = 'refresh_token'

const storeAccessToken = (token: string) =>
    localStorage.setItem(accessTokenKey, token)
const storeRefreshToken = (token: string) =>
    localStorage.setItem(refreshTokenKey, token)
export const storeTokens = (payload: IAuthResponse) => {
    storeAccessToken(payload.accessToken)
    storeRefreshToken(payload.refreshToken)
}

export const getTokens = () => {
    return { accessToken: getAccessToken(), refreshToken: getRefreshToken() }
}

export const hasToken = () => {
    return getTokens().accessToken != null
}

export const getAccessToken = () => localStorage.getItem(accessTokenKey)
export const getRefreshToken = () => localStorage.getItem(refreshTokenKey)
export const clearTokens = () => {
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
}