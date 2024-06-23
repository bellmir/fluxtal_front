import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('view', {
	state: () => {
		return {
			// isLoading: false,
			isPageLoading: false,
		};
	},
	actions: {
		// startLoading() {
		// 	this.isLoading = true;
		// },
		// finishLoading() {
		// 	this.isLoading = false;
		// },
		startPageLoading() {
			this.isPageLoading = true;
		},
		finishPageLoading() {
			this.isPageLoading = false;
		},
	},
});
