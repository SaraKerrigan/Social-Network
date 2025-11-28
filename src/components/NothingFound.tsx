import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

type NothingProps = {
  text: string;
};

export default function NothingFound({ text }: NothingProps) {
  return (
    <Box maxWidth="500px" width={"100%"}>
      <Card>
        <Flex justify={"between"} align={"center"}>
          <Heading>{text}</Heading>
          <MagnifyingGlassIcon style={{ width: "30px", height: "30px" }} />
        </Flex>
      </Card>
    </Box>
  );
}
