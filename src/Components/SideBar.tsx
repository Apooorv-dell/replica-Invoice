import {
  Image,
  List,
  ListIcon,
  Center,
  ListItem,
  Icon,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsAppIndicator, BsGraphUpArrow } from "react-icons/bs";
import { PiSquaresFourLight } from "react-icons/pi";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

import { useNavigate } from "react-router-dom";

import logo from "../assets/Group 30.svg";

type iconGroup = {
  title: String;
  icon: IconType;
};

const SideBar = () => {
  const navigate = useNavigate();
  const iconList: iconGroup[] = [
    {
      title: "Overview",
      icon: BsAppIndicator,
    },
    {
      title: "Analytics",
      icon: BsGraphUpArrow,
    },
    {
      title: "Catalog",
      icon: PiSquaresFourLight,
    },
    {
      title: "Invoices",
      icon: LiaFileInvoiceDollarSolid,
    },

    {
      title: "Account",
      icon: RiAccountCircleLine,
    },
  ];

  return (
    <>
      <Center>
        <List margin={"24px"}>
          <Center mb={"32px"}>
            <Image src={logo} mb={"32px"} />
          </Center>
          {iconList.map((link: iconGroup) => (
            <ListItem key={link.title.toString()}>
              <HStack
                width={"108px"}
                cursor={'pointer'}
                mb={"40px"}
                onClick={() => {
                  navigate("/dashboard/" + link.title);
                }}
              >
                <ListIcon
                  as={link.icon}
                  boxSize={"30px"}
                  padding={"auto"}
                  color={"white"}
                />
                <Text ml={"4px"} color={"white"}>
                  {" "}
                  {link.title}
                </Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Center>
      <Box
        ml={"24px"}
        mt={"100%"}
        position={"fixed"}
        bottom={"10"}
        as="button"
        onClick={() => {
          localStorage.removeItem("x-auth-token");
          window.location.replace("/");
        }}
      >
        <Icon as={MdOutlineLogout} boxSize={"30px"} color={"white"} />
      </Box>
    </>
  );
};

export default SideBar;
