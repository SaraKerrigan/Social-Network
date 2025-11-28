import {
  Button,
  Card,
  Flex,
  RadioCards,
  Select,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { useEffect } from "react";
import {
  clearFilters,
  getTags,
  setSort,
  setTag,
} from "../redux/slices/filtersReducer.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import type { Sort } from "../types.ts";

export default function Filters() {
  const dispatch = useAppDispatch();

  const { sort, tag, tags, loadingTags } = useAppSelector(
    (state) => state.filters
  );

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const renderTags = loadingTags
    ? [...new Array(21)].map((_, index) => (
        <Skeleton key={index} width={"88px"} height={"40px"}>
          magical
        </Skeleton>
      ))
    : (tags ?? []).map((t) => (
        <RadioCards.Item key={t} value={t}>
          {t}
        </RadioCards.Item>
      ));

  return (
    <Card>
      <Flex direction={"column"} gap={"5"}>
        <Flex direction={"column"}>
          <Text color="gray" ml={"1"}>
            Sort By:
          </Text>
          <Select.Root
            size="3"
            defaultValue="0"
            value={sort}
            onValueChange={(value) => dispatch(setSort(value as Sort))}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="0">Default</Select.Item>
              <Select.Item value="1">Views ↑</Select.Item>
              <Select.Item value="2">Views ↓</Select.Item>
              <Select.Item value="3">Body ↑</Select.Item>
              <Select.Item value="4">Body ↓</Select.Item>
              <Select.Item value="5">Title</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction={"column"}>
          <Text color="gray" ml={"1"}>
            Filter By:
          </Text>
          <RadioCards.Root
            size="1"
            columns={{ initial: "4", sm: "3" }}
            value={tag}
            onValueChange={(value) => dispatch(setTag(value))}
          >
            {renderTags}
          </RadioCards.Root>
        </Flex>

        <Button onClick={() => dispatch(clearFilters())}>Clear Filters</Button>
      </Flex>
    </Card>
  );
}
