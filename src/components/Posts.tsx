import type { PostT } from "../types";
import Post from "./Post";
import { Box, Grid, Skeleton } from "@radix-ui/themes";

type PostsProps = {
  data: PostT[];
  columns: "1" | "2" | "3" | "4";
  isLoading: boolean;
};

export default function Posts({ data, columns, isLoading }: PostsProps) {
  const posts = isLoading
    ? [...new Array(5)].map((_, index) => (
        <Skeleton key={index} minWidth={"100%"} width={"100%"} height={"280px"}>
          <Box maxWidth={{ initial: "100%", sm: "500px" }} width={"100%"}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi,
            iusto ipsum. Voluptate, aliquam et repellendus rem, iusto magnam
            fugit neque aut reiciendis debitis dignissimos necessitatibus,
            maiores eius error voluptatum inventore consectetur deserunt
            distinctio laboriosam impedit ipsam. Quidem voluptatibus qui
            doloremque corporis, magnam eos minima hic * delectus doloribus
            voluptates aliquid dolor!
          </Box>
        </Skeleton>
      ))
    : data.map((el) => <Post el={el} key={el.id} />);

  return (
    <Grid columns={{ initial: "1", sm: columns }} gap={"4"}>
      {posts}
    </Grid>
  );
}
