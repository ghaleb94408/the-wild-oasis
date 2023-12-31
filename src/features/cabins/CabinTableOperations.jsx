import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "no discount" },
          { value: "with-discount", label: "with discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (Low first)" },
          { value: "regularPrice-desc", label: "Sort by price (High first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (High first)" },
        ]}
      />
    </TableOperations>
  );
}
