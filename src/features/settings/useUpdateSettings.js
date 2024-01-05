import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSettings };
}
