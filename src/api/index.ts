// core
import { computed } from 'vue';
// axios
import axios from 'axios';
// store
import { useTokenStore } from '@/stores/token';
// router
import Router from '../router';
// mem - 토큰 재발급 위함
import mem from 'mem';

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	// headers: {
	// 	ClientSecret: import.meta.env.VITE_CLIENT_SECRET,
	// },
});

// 토큰 재발급 함수
const requestToken = mem(
	async (): Promise<string | void> => {
		const tokenStore = useTokenStore();
		const refreshToken = computed(() => tokenStore.getRefreshToken);
		try {
			const tokenRes = await instance.post('/front/requestToken', {
				refresh_token: refreshToken.value,
			});
			const accessToken = tokenRes.data?.data.access_token;
			if (accessToken) {
				tokenStore.setAccessToken(tokenRes.data.data.access_token);
			}
			return accessToken;
		} catch (e: any) {
			// 네트워크 에러는 제외
			if (e.code !== 'ERR_NETWORK') {
				Router.push('/');
				alert('로그인이 만료되었습니다. 다시 로그인해주세요');
				tokenStore.resetToken();
			}
		}
	},
	{ maxAge: 1000 }
);

// request 보내기전 작업
instance.interceptors.request.use(
	(request: any) => {
		const tokenStore = useTokenStore();
		const isLogin = computed(() => tokenStore.isLogin);
		const accessToken = computed(() => tokenStore.getAccessToken);
		request.headers.Authorization = isLogin.value ? accessToken.value : null;
		return request;
	},
	(error) => {
		// 2xx 범위 외의 에러 상태코드는 여기에서
		return Promise.reject(error);
	}
);
// response 받은 후 작업
instance.interceptors.response.use(
	async (response: any) => {
		const { config, data } = response;
		const error = response?.data?.error;
		console.log(`${config.url} \n`, data); // 데이터 콘솔로 찍기

		const tokenStore = useTokenStore();

		// 2xx 범위 내의 에러는 여기에서
		if (error) {
			console.error(error.code, error.message); // 에러 콘솔로 찍기
			// refresh 토큰 만료(91) 시 로그아웃
			if (Number(error.code) === 91) {
				tokenStore.resetToken();
				Router.push('/');
				alert('로그인이 만료되었습니다. 다시 로그인해주세요');
			}
			// 로그인한 경우에 토큰 불일치시 재발급
			if (Number(error.code) === 97) {
				const accessToken = await requestToken(); // 토큰 재발급

				// 새 토큰이 정상적으로 발급되면 토큰 저장 후, 중단된 요청을 재요청
				if (accessToken) {
					config.headers.Authorization = accessToken;
					return instance(config);
				}
			}
		}
		return response;
	},

	// 2xx 범위 외의 에러 상태코드는 여기에서
	(error) => {
		console.error(`${error.config.url} \n`, error);

		if (error.code === 'ERR_NETWORK') {
			alert('네트워크 에러. 잠시 후 시도해주세요');
		} else if (error.code === 'ERR_BAD_RESPONSE') {
			alert('서버가 응답하지 않습니다. 서비스 관리자에게 문의해주세요');
		} else if (error.code === 'ECONNABORTED') {
			alert('요청시간을 초과했습니다. 잠시 후 시도해주세요');
		} else if (error.code === 'ERR_BAD_REQUEST') {
			alert('올바르지 않은 요청입니다. 서비스 관리자에게 문의해주세요');
		} else {
			alert(error.code);
		}

		return Promise.reject(error);
	}
);

export const api = {
	get: <T>(url: string, params?: any, config?: any) => instance.get<T>(url, { params, ...config }),
	post: <T>(url: string, data?: any, config?: any) => instance.post<T>(url, data, config),
	put: <T>(url: string, data?: any, config?: any) => instance.put<T>(url, data, config),
	patch: <T>(url: string, data?: any, config?: any) => instance.patch<T>(url, data, config),
	delete: <T>(url: string, params?: any, config?: any) => instance.delete<T>(url, { params, ...config }),
};
