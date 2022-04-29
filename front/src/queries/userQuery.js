import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post } from "../utils/api";
import { useNavigate } from "react-router-dom";

/**
 * 현재 유저상태를 받아오며, token이 없다면 userState는 false를 기본값으로 가집니다.
 * @returns {{userState: (object|boolean), isLoading: boolean, isLogin: boolean, error: string}}
 */
export function useCurrentUser() {
  const { isLoading, error, data } = useQuery(
    "userState",
    () => get("user/current").then((res) => res.data),
    {
      initialData: false,
      staleTime: Infinity,
      onSuccess: () => console.log("로그인 성공!"),
      onError: () => console.log("로그인 실패"),
    }
  );

  return { userState: data, isLoading, isLogin: !!data, error };
}

/**
 * 유저 로그인 핸들러입니다.
 * @param {function} setShowAlert 요청 실패 시 alert를 활성화 해줄 상태변경 함수입니다.
 * @returns {function} useMutation 훅을 반환합니다.
 */
export const useUserLogin = (setShowAlert = () => {}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (loginData) => await post("user/login", loginData), {
    onSuccess: (res) => {
      const jwtToken = res.data.token;
      sessionStorage.setItem("userToken", jwtToken);
      queryClient.invalidateQueries("userState");
      navigate("/");
    },
    onError: () => setShowAlert(true),
  });
};
