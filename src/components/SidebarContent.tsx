import {
  Divider,
  Flex,
  Image,
  Spacer,
  Stack,
  StackProps,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { IconType } from "react-icons";
import moh from "../images/moh.json";
import who from "../images/who.json";
import { $categoryOptions } from "../Store";
import NavItem from "./NavItem";
interface SidebarProps extends StackProps {}

const SidebarContent = ({ ...rest }: SidebarProps) => {
  const categoryOptions = useStore($categoryOptions);
  return (
    <Stack
      bg={useColorModeValue("white", "gray.900")}
      w={{ base: "full", md: "250px" }}
      pos="fixed"
      h="calc(100vh - 58px)"
      {...rest}
      spacing="15px"
      p="5px"
    >
      <Flex alignItems="center" justifyContent="center">
        <Image src={moh} alt="Dan Abramov" boxSize="100px" />
      </Flex>
      <Divider />
      <Text fontSize="xl" fontWeight="bold" textTransform="uppercase">
        Thematic Areas
      </Text>
      <Divider />
      {categoryOptions.map((link) => (
        <NavItem key={link.value} option={link} />
      ))}
      <Spacer />
      <Divider />
      <Flex alignItems="center" justifyContent="center">
        <Image src={who} alt="WHO" boxSize="78px" p={0} m={0} />
      </Flex>
    </Stack>
  );
};

export default SidebarContent;