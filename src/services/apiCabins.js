import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  // https://rsnybbwcorbsuupfaphb.supabase.co/storage/v1/object/public/cabin-images/0.263912965265773-cabin-006.jpg.
  // https://rsnybbwcorbsuupfaphb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-12-02T10%3A28%3A02.605Z
  const imageName = `${Math.random()}-${newCabin.image.name}.`.replaceAll(
    "/",
    ""
  );
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1) create/edit cabin
  let query = supabase.from("cabins");
  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2) Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3) delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploadde and the cabin was not created"
    );
  }
  return data;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return error;
}
