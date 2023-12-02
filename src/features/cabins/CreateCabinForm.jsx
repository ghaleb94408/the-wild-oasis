import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { addCabin } from "../../services/apiCabins";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // for form management
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  // for remote state management
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("new cabin successfully created");
      // Invalidate state
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // Reset form fields
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(data) {
    mutate(data);
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
            max: { value: 25, message: "Capacity should be at most 25" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isPending}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value * 1 <= getValues().regularPrice * 1 ||
              "discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isPending}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput disabled={isPending} id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
