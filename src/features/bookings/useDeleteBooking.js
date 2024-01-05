import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: ({ bookingId }) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Could Not Delete Booking"),
  });
  return { deleteBooking, isDeleting };
}
