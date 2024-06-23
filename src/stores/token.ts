import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
	state: () => {
		return {
			accessToken: '',
			refreshToken: '',
		};
	},
	getters: {
		isLogin(state) {
			return !!state.accessToken;
		},
		getAccessToken(state) {
			return state.accessToken;
		},
		getRefreshToken(state) {
			return state.refreshToken;
		},
	},
	actions: {
		setToken(accessToken: string, refreshToken: string) {
			this.accessToken = accessToken;
			this.refreshToken = refreshToken;
		},
		setAccessToken(token: string) {
			this.accessToken = token;
		},
		resetToken() {
			this.$reset();
		},
	},
	persist: true,
	// persist: [
	// 	{
	// 		paths: ['accessToken', 'refreshToken'],
	// 		storage: sessionStorage,
	// 	},
	// 	{
	// 		paths: ['isAutoLogin', 'accessToken_local', 'refreshToken_local'],
	// 		storage: localStorage,
	// 	},
	// ],
});
