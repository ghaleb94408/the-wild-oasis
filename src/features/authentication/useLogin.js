import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingin } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (user) => {
      console.log(user.user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password are not correct");
    },
  });
  return { login, isLoggingin };
}