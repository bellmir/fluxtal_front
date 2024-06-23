import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import stores from '@/stores';
// vue-query
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
// style
import 'swiper/css/bundle';
import '@/assets/css/reset.css';
import '@/assets/css/common.scss';
// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Skeleton from 'primevue/skeleton';
import Tooltip from 'primevue/tooltip';
import ConfirmationService from 'primevue/confirmationservice'; // confirm dialog
import ToastService from 'primevue/toastservice'; // toast

if (import.meta.env.PROD) {
	console.log = () => {};
	console.error = () => {};
	console.debug = () => {};
}

// vue-query 기본 옵션 설정
const vueQueryPluginOptions: VueQueryPluginOptions = {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false, // 모바일 환경에서 background -> foreground로 올라올때 필요
				retry: false,
				// retryDelay: (attemptIdx) => Math.min(1000 * 3 ** attemptIdx, 30000),
			},
		},
	},
};

const app = createApp(App);
app.use(stores);
app.use(router);
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			// prefix: 'p',
			cssLayer: false,
			darkModeSelector: '.app-dark-mode',
		},
	},
});
app.use(ToastService);
app.use(ConfirmationService);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Skeleton', Skeleton);
app.directive('tooltip', Tooltip);
app.mount('#app');
