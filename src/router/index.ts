import { createRouter, createWebHistory } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';
import Home from '@/pages/Home/Home.vue';
import Notfound404 from '@/pages/Notfound404/Notfound404.vue';

const routes = [
	{
		path: '/',
		component: Home,
		beforeEnter: [],
	},
	{
		// AutoContract
		path: '/AutoContract',
		name: 'AutoContract',
		component: () => import('@/pages/AutoContract/AutoContract.vue'),
	},

	{
		// 404 페이지
		path: '/404',
		name: '404',
		component: Notfound404,
	},
	{
		// 존재하지 않는 페이지 404로 리다이렉트
		path: '/:pathMatch(.*)*',
		redirect: '/404',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			if (to.hash && from.hash !== to.hash) {
				// 다른 hash로 이동하는경우 부드럽게 해당 hash로 이동
				return {
					el: to.hash,
					behavior: 'smooth',
					top: 70, // header 높이만큼 더 내려서 이동
				};
			} else if (from.path !== to.path) {
				// path가 다른 경우 맨위로
				return { top: 0 };
			} else if (from.fullPath === to.fullPath) {
				// path, query, hash가 바뀌지 않은경우 부드럽게 위로 스크롤
				return { top: 0, behavior: 'smooth' };
			}
		}
	},
});

let loadingTimeId: ReturnType<typeof setTimeout>; // 페이지 변경시 로딩 시작
router.beforeEach((to, from) => {
	const loadingStore = useLoadingStore();

	// 1초뒤에 페이지로딩 시작
	clearTimeout(loadingTimeId); // 페이지로딩 시작 취소
	loadingTimeId = setTimeout(() => {
		loadingStore.startPageLoading();
	}, 300);
});
router.afterEach(() => {
	const loadingStore = useLoadingStore();
	clearTimeout(loadingTimeId); // 페이지로딩 시작 취소
	loadingStore.finishPageLoading();
});

export default router;
