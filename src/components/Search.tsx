import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { setSearch } from "../redux/slices/filtersReducer.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";

export default function Search() {
  const { search } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <TextField.Root
      placeholder="Search the docs…"
      size={"3"}
      style={{ width: "100%" }}
      mb={"5"}
      value={search}
      onChange={(event) => dispatch(setSearch(event.target.value))}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}
