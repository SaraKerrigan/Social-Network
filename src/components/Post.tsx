import {
  BookmarkFilledIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  EyeOpenIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  TextField,
  IconButton,
  Separator,
  Text,
  Skeleton,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance.ts";
import { toggleFavorite } from "../redux/slices/postsReducer.ts";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import type { Comment, PostT, User } from "../types.ts";

type PostProps = {
  el: PostT;
};

export default function Post({ el }: PostProps) {
  const { favoritePosts } = useAppSelector((state) => state.posts);

  const isFavorite = favoritePosts.find((post) => post.id === el.id);

  const [user, setUser] = useState<User | null>(null);
  // для объктов, которые могут быть пустыми лучше ставить null, т.к. пустой объект в формате булеан будет true

  const [comments, setComments] = useState<Comment[]>([]);

  const [openComments, setOpenComments] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function toggleComments() {
    setOpenComments((prev) => !prev);
    // переключает предыдущее состояние на противоположное (true на false и false на true)
  }

  useEffect(() => {
    if (el.userId) {
      axiosInstance.get(`/users/${el.userId}`).then((res) => {
        setUser(res.data);
      });
    }
    if (el.id) {
      axiosInstance.get(`/comments/post/${el.id}`).then((res) => {
        setComments(res.data.comments);
      });
    }
  }, []);

  return (
    <Box maxWidth={{ initial: "100%", sm: "500px" }} width={"100%"}>
      <Card style={{ height: "100%" }}>
        <Flex
          direction={"column"}
          justify={"between"}
          style={{ height: "100%" }}
        >
          {user ? (
            <Flex direction={"column"}>
              <Flex justify={"between"}>
                <Link
                  to={`/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Flex gap="3" align="center">
                    <Avatar
                      size="3"
                      src={user.image}
                      radius="full"
                      // user?.image - безопасное обращение к свойству объекта (если такого свойства может не быть)
                      fallback="T"
                    />
                    <Box>
                      <Text
                        as="div"
                        size="2"
                        weight="bold"
                        style={{ color: "initial" }}
                      >
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {user.username}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
                <Flex gap={"2"}>
                  {el.tags.map((tag) => (
                    <Badge color="blue">{tag}</Badge>
                  ))}
                </Flex>
              </Flex>

              <Separator my="3" size="4" />
              <Heading size={"5"} mb={"3"}>
                {el.title}
              </Heading>
              <Text>{el.body}</Text>
            </Flex>
          ) : (
            <Flex direction={"column"}>
              <Flex justify={"between"}>
                <Skeleton>
                  {" "}
                  <Link
                    to={`/profile/id`}
                    style={{ textDecoration: "none" }}
                  >
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        // src={user.image}
                        radius="full"
                        // user?.image - безопасное обращение к свойству объекта (если такого свойства может не быть)
                        fallback="T"
                      />
                      <Box>
                        <Text
                          as="div"
                          size="2"
                          weight="bold"
                          style={{ color: "initial" }}
                        >
                          name lastName
                        </Text>
                        <Text as="div" size="2" color="gray">
                          username
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                </Skeleton>

                <Flex gap={"2"}>
                  {el.tags.map((tag) => (
                    <Badge color="blue">{tag}</Badge>
                  ))}
                </Flex>
              </Flex>

              <Separator my="3" size="4" />
              <Heading size={"5"} mb={"3"}>
                {el.title}
              </Heading>
              <Text>{el.body}</Text>
            </Flex>
          )}

          <Flex direction={"column"}>
            <Separator my="3" size="4" />
            <Flex justify={"between"}>
              <Flex gap={"4"}>
                <Flex align={"center"} gap={"1"}>
                  <EyeOpenIcon />
                  <Text size={"2"}>{el.views}</Text>
                </Flex>
                <Flex align={"center"} gap={"1"}>
                  <HeartIcon />
                  <Text size={"2"}>{el.reactions.likes}</Text>
                </Flex>
                <Flex align={"center"} gap={"1"} onClick={toggleComments}>
                  <ChatBubbleIcon />
                  <Text size={"2"}>{comments.length}</Text>
                </Flex>
              </Flex>
              <IconButton
                variant={isFavorite ? "classic" : "outline"}
                onClick={() => dispatch(toggleFavorite(el))}
              >
                {isFavorite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
              </IconButton>
            </Flex>
            {openComments && (
              // если условие слева возвращает true то справа возращается разметка
              <>
                <Separator size={"4"} my={"3"} />
                <Flex direction={"column"} gap={"2"}>
                  {comments.map((comment) => {
                    return (
                      <Flex gap="3" align="end">
                        <Avatar
                          size="1"
                          radius="full"
                          fallback={comment.user.fullName[0]}
                        />
                        <Card>
                          <Text as="div" size="1" weight="bold">
                            {comment.user.fullName}
                          </Text>
                          <Text as="div" size="1" color="gray">
                            {comment.body}
                          </Text>
                        </Card>
                      </Flex>
                    );
                  })}
                </Flex>
                <Flex mt={"3"} gap={"2"}>
                  <TextField.Root
                    placeholder="Write the comment"
                    size={"2"}
                    style={{ width: "100%" }}
                  ></TextField.Root>
                  <IconButton>
                    <PaperPlaneIcon />
                  </IconButton>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
