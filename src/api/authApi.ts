import { api } from '@/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CommonResType } from '@/types/commonApiType';
import { computed } from 'vue';
import { useTokenStore } from '@/stores/token';

// 로그인
type LoginDataType = {
	member_id: string;
	member_password: string;
};
type LoginResType = CommonResType<{
	access_token: string;
	refresh_token: string;
}>;
export const useLoginApi = () => {
	const url = '/front/login';
	const queryClient = useQueryClient();
	const tokenStore = useTokenStore();
	return useMutation<AxiosResponse<LoginResType>, AxiosError, LoginDataType>({
		mutationFn: (data: LoginDataType) => api.post(url, data),
		onSuccess: (res) => {
			if (res.data.success) {
				queryClient.clear(); // 로그인시 이전의 모든 캐시 삭제
				tokenStore.setToken(res.data.data.access_token, res.data.data.refresh_token); // 토큰 저장
			}
		},
	});
};

// 로그아웃
type LogoutResType = CommonResType;
export const useLogoutApi = () => {
	const url = '/front/logout';
	const queryClient = useQueryClient();
	const tokenStore = useTokenStore();
	return useMutation<AxiosResponse<LogoutResType>, AxiosError>({
		mutationFn: () => api.post(url),
		onSettled: () => {
			queryClient.clear(); // 로그아웃시 이전의 모든 캐시 삭제
			tokenStore.resetToken(); // 토큰 삭제
		},
	});
};

// 인증번호 요청
type SendAuthDataType = {
	member_cell: string;
	type: 'join' | 'modify';
};
type SendAuthResType = CommonResType;
export const useSendAuthApi = () => {
	const url = '/front/sendAuthSms';
	return useMutation<AxiosResponse<SendAuthResType>, AxiosError, SendAuthDataType>({
		mutationFn: (data: SendAuthDataType) => api.post(url, data),
	});
};

// 인증번호 확인
type CheckCertificationDataType = {
	auth_number: string;
	member_cell: string;
	type: 'join' | 'modify';
};
type CheckCertificationResType = CommonResType;
export const useCheckCertificationApi = () => {
	const url = '/front/checkCertification';
	return useMutation<AxiosResponse<CheckCertificationResType>, AxiosError, CheckCertificationDataType>({
		mutationFn: (data: CheckCertificationDataType) => api.post(url, data),
	});
};

// 아이디 중복 확인(가입시)
type CheckIdDuplicateDataType = {
	param: string;
	param_type: 'id' | 'nickname';
};
type CheckIdDuplicateResType = CommonResType;
export const useCheckIdDuplicateApi = () => {
	const url = '/front/checkJoinDuplicate';
	return useMutation<AxiosResponse<CheckIdDuplicateResType>, AxiosError, CheckIdDuplicateDataType>({
		mutationFn: (data: CheckIdDuplicateDataType) => api.post(url, data),
	});
};

// 회원가입
type SignupDataType = {
	member_id: string;
	member_name: string;
	member_cell: string;
	member_email: string;
	member_zipcode: string;
	member_address: string;
	member_address_detail: string;
	member_password: string;
	member_mail_send_agree: '동의' | '비동의';
	member_sms_send_agree: '동의' | '비동의';
	member_tm_agree: '동의' | '비동의';
};
type SignupResType = CommonResType<{
	access_token: string;
	refresh_token: string;
}>;
export const useSignupApi = () => {
	const url = '/front/signup';
	return useMutation<AxiosResponse<SignupResType>, AxiosError, SignupDataType>({
		mutationFn: (data: SignupDataType) => api.post(url, data),
	});
};

// 유저정보
type GetMemberInfoResType = {
	member_pk: number;
	member_id: string;
	member_name: string;
	member_cell: string;
	member_email: string;
	member_zipcode: string;
	member_address: string;
	member_address_detail: string;
	member_mail_send_agree: '동의' | '비동의';
	member_sms_send_agree: '동의' | '비동의';
	member_tm_agree: '동의' | '비동의';
	free_trial_domestic: 'true' | 'false';
	free_trial_overfutures: 'true' | 'false';
	free_trial_overseas: 'true' | 'false';
	free_trial_virtual: 'true' | 'false';
};
export const useGetMemberInfoApi = () => {
	const url = '/front/getMemberInfo'; // url 변경시 mypageApi.ts파일의 useModifyMemberInfoApi 부분의 invalidateQueries의 queryKey도 변경해야함
	const tokenStore = useTokenStore();
	return useQuery<AxiosResponse, AxiosError, GetMemberInfoResType>({
		queryKey: [url],
		queryFn: () => api.get(url),
		select: (res) => res.data?.data?.member,
		staleTime: 1000 * 60 * 60, // 1시간 stale. 로그아웃이나 정보 수정시 invalidateQueries로 캐시 삭제
		gcTime: 1000 * 60 * 60 * 24, // 24시간
		enabled: computed(() => tokenStore.isLogin),
	});
};

// 아이디 찾기
type FindMemberIdDataType = {
	member_cell: string;
};
type FindMemberIdResType = CommonResType<{
	member_id: string;
}>;
export const useFindMemberIdApi = () => {
	const url = '/front/findMemberId';
	return useMutation<AxiosResponse<FindMemberIdResType>, AxiosError, FindMemberIdDataType>({
		mutationFn: (data: FindMemberIdDataType) => api.post(url, data),
	});
};

// 비밀번호 찾기
type FindMemberPasswordDataType = {
	member_id: string;
	member_cell: string;
};
type FindMemberPasswordResType = CommonResType;
export const useFindMemberPasswordApi = () => {
	const url = '/front/findMemberPassword';
	return useMutation<AxiosResponse<FindMemberPasswordResType>, AxiosError, FindMemberPasswordDataType>({
		mutationFn: (data: FindMemberPasswordDataType) => api.post(url, data),
	});
};

// 비밀번호 재설정
type ResetPwDataType = {
	member_id: string;
	member_password: string;
};
type ResetPwResType = CommonResType;
export const useResetPwApi = () => {
	const url = '/front/resetPw';
	return useMutation<AxiosResponse<ResetPwResType>, AxiosError, ResetPwDataType>({
		mutationFn: (data: ResetPwDataType) => api.post(url, data),
	});
};
