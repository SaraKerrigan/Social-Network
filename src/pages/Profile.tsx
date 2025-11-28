import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { useEffect } from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router";

import { getProfile, getProfilePosts } from "../redux/slices/userReducer.ts";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";

export default function Profile() {
  const dispatch = useAppDispatch();

  const { profile, userPosts, isUserPostsLoading } = useAppSelector(
    (store) => store.user
  );

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
      dispatch(getProfilePosts(id));
    }
  }, [id]);

  console.log(profile);
  // console.log(userPosts);

  return (
    <>
      <Flex
        justify={"between"}
        align={{ initial: "stretch", sm: "center" }}
        gap={"2"}
        direction={{ initial: "column", sm: "row" }}
      >
        <Card style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {profile ? (
            <Flex gap={"3"} align={"center"}>
              <Avatar size="7" src={profile.image} fallback="A" />
              <Flex direction={"column"} gap={"2"}>
                <Heading>{profile.firstName}</Heading>
                <Text>{profile.gender}</Text>
              </Flex>
            </Flex>
          ) : (
            <Flex gap={"3"} align={"center"}>
              <Skeleton>
                <Avatar size="7" fallback="A" />
              </Skeleton>
              <Flex direction={"column"} gap={"2"}>
                <Skeleton>
                  <Heading>Benjamin</Heading>
                </Skeleton>
                <Skeleton>
                  <Text>male</Text>
                </Skeleton>
              </Flex>
            </Flex>
          )}
        </Card>
        <Box maxWidth={{ initial: "100%", sm: "500px" }}>
          <Card
            style={{
              minHeight: "100%",
              paddingLeft: "20px",
              paddingRight: "20px",
              width: "100%",
            }}
          >
            <Flex
              gap={"3"}
              height={"100%"}
              align={{ initial: "stretch", xs: "center" }}
              direction={{ initial: "column", xs: "row" }}
            >
              <Box width={{ initial: "100%", xs: "calc(100% / 3)" }}>
                {profile ? (
                  <Flex direction={"column"} justify={"center"}>
                    <Heading size={"3"} mb={"2"}>
                      {profile.company.name}
                    </Heading>
                    <Text size={"3"}>{profile.company.department}</Text>
                    <Text size={"2"} color="gray">
                      {profile.role}
                    </Text>
                  </Flex>
                ) : (
                  <Flex direction={"column"} justify={"center"}>
                    <Skeleton>
                      <Heading size={"3"} mb={"2"}>
                        Kuhlman LLC
                      </Heading>
                    </Skeleton>
                    <Skeleton>
                      <Text size={"3"}>Product Managemen</Text>
                    </Skeleton>
                    <Skeleton>
                      <Text size={"2"} color="gray">
                        user
                      </Text>
                    </Skeleton>
                  </Flex>
                )}
              </Box>

              <Separator
                orientation={{ initial: "horizontal", xs: "vertical" }}
                size={{ initial: "4", xs: "3" }}
              />
              <Box width={{ initial: "100%", xs: "calc(100% / 3)" }}>
                {profile ? (
                  <Flex direction={"column"} justify={"center"}>
                    <Heading size={"3"} mb={"2"}>
                      {profile.university}
                    </Heading>
                    <Text size={"3"}>{profile.address.stateCode}</Text>
                    <Text size={"2"} color="gray">
                      {profile.address.country}
                    </Text>
                  </Flex>
                ) : (
                  <Flex direction={"column"} justify={"center"}>
                    <Skeleton>
                      <Heading size={"3"} mb={"2"}>
                        University of Michigan--Ann Arbor
                      </Heading>
                    </Skeleton>

                    <Skeleton>
                      <Text size={"3"}>DE</Text>
                    </Skeleton>
                    <Skeleton>
                      <Text size={"2"} color="gray">
                        United States
                      </Text>
                    </Skeleton>
                  </Flex>
                )}
              </Box>

              <Separator
                orientation={{ initial: "horizontal", xs: "vertical" }}
                size={{ initial: "4", xs: "3" }}
              />
              <Box width={{ initial: "100%", xs: "calc(100% / 3)" }}>
                {profile ? (
                  <Flex direction={"column"} justify={"center"}>
                    <Heading size={"3"} mb={"2"}>
                      {profile.age} y.o.
                    </Heading>
                    <Text size={"3"}>{profile.birthDate}</Text>
                    <Text size={"2"} color="gray">
                      {profile.address.city}
                    </Text>
                  </Flex>
                ) : (
                  <Flex direction={"column"} justify={"center"}>
                    <Skeleton>
                      <Heading size={"3"} mb={"2"}>
                        34 y.o.
                      </Heading>
                    </Skeleton>
                    <Skeleton>
                      <Text size={"3"}>1990-11-1</Text>
                    </Skeleton>
                    <Skeleton>
                      <Text size={"2"} color="gray">
                        San Diego
                      </Text>
                    </Skeleton>
                  </Flex>
                )}
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>
      <Separator size={"4"} my={"5"} />
      <Heading size={"7"} mb={"5"}>
        User's posts
      </Heading>
      <Posts data={userPosts} columns={"2"} isLoading={isUserPostsLoading} />
    </>
  );
}
