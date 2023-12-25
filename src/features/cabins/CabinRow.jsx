// import styled from "styled-components";

// import { formatCurrency } from "../../utils/helpers";

// import CreateCabinForm from "./CreateCabinForm";
// import ConfirmDelete from "../../ui/ConfirmDelete";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
// import useCreateCabin from "./useCreateCabin";
// import Modal from "../../ui/Modal";
// import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;
// export default function CabinRow({ cabin }) {
//   const {
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     id: cabinId,
//   } = cabin;
//   const { isDeleting, deleteCabin } = useDeleteCabin();
//   const { createCabin, isCreatePending } = useCreateCabin();
//   const { id, ...duplicateCabinData } = cabin;
//   function handleDuplicate() {
//     createCabin({
//       ...duplicateCabinData,
//       name: `copy of ${cabin.name}`,
//     });
//   }
//   return (
//     <>
//       <Table.Row role="row">
//         <Img src={image} />
//         <Cabin>{name}</Cabin>
//         <div>Fits up to {maxCapacity}</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button disabled={isCreatePending} onClick={() => handleDuplicate()}>
//             <HiSquare2Stack />
//           </button>
//           <Modal>
//             <Modal.Open opens="edit">
//               <button>
//                 <HiPencil />
//               </button>
//             </Modal.Open>
//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>
//             <Modal.Open opens="delete">
//               <button disabled={isDeleting}>
//                 <HiTrash />
//               </button>
//             </Modal.Open>
//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="cabins"
//                 disabled={isDeleting}
//                 onConfirm={() => deleteCabin(cabinId)}
//               />
//             </Modal.Window>
//           </Modal>
//           <Menus.Menu>
//             <Menus.Toggle id={cabinId}></Menus.Toggle>
//             <Menus.List id={cabinId}>
//               <Menus.Button
//                 onClick={() => handleDuplicate()}
//                 icon={<HiSquare2Stack />}
//               >
//                 Duplicate
//               </Menus.Button>
//               <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
//               <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//             </Menus.List>
//           </Menus.Menu>
//         </div>
//       </Table.Row>
//     </>
//   );
// }









import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
export default function CabinRow({ cabin }) {
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const { id, ...duplicateCabinData } = cabin;
  function handleDuplicate() {
    createCabin({
      ...duplicateCabinData,
      name: `copy of ${cabin.name}`,
    });
  }
  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId}></Menus.Toggle>
              <Menus.List id={cabinId}>
                <Menus.Button
                  onClick={() => handleDuplicate()}
                  icon={<HiSquare2Stack />}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
