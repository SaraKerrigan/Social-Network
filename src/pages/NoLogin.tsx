import { Button, Flex, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router";

export default function NoLogin() {
  const navigate = useNavigate();

  return (
    <Flex
      mt={"9"}
      direction={"column"}
      align={"center"}
      justify={"center"}
      gap={"5"}
    >
      <Heading size={"7"}>
        This page is only available to authorized users.
      </Heading>
      <Button onClick={() => navigate("/login")}>Go Back to login</Button>
    </Flex>
  );
}
