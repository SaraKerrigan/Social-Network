import { useEffect } from "react";

import { Box, Flex } from "@radix-ui/themes";
import Posts from "../components/Posts";
import Search from "../components/Search";
import Filters from "../components/Filters";
import NothingFound from "../components/NothingFound";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { getAllPosts } from "../redux/slices/postsReducer.ts";

export default function Home() {
  const { sort, tag, search } = useAppSelector((state) => state.filters);

  const { postsList, isPostsLoading } = useAppSelector((state) => state.posts);
  // state - это store

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [sort, tag, search]);

  return (
    <Flex gap={"5"} direction={{ initial: "column-reverse", sm: "row" }}>
      {postsList.length === 0 ? (
        <NothingFound text={"Nothing found..."} />
      ) : (
        <Posts data={postsList} columns={"1"} isLoading={isPostsLoading} />
      )}
      <Box maxWidth={{ initial: "100%", sm: "355px" }}>
        <Flex direction={"column"} style={{ width: "100%" }}>
          <Search />
          <Filters />
        </Flex>
      </Box>
    </Flex>
  );
}
