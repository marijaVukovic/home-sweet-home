export const getAuthUser = state => state.auth.data;

export const getAuthError = state => state.auth.error;

export const getAuthInProgress = state => state.auth.isLoginInProgress;
