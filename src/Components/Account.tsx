import {
  Box,
  Center,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BusinessService, { Business } from "../Service/BusinessService";
import apiClient from "../Service/api-client";

type User = {
  name: string;
  email: string;
  phoneNo: number;
};

const Account = () => {
  const [user, setUser] = useState<User>();
  const [businesDetail, setBusinessDetail] = useState<Business>();

  useEffect(() => {
    BusinessService.getAll<Business>().then(({ data }) =>
      setBusinessDetail(data[0])
    );
  }, []);

  useEffect(() => {
    apiClient
      .get<User>("/users/me")
      .then(({ data }) => setUser(data))

      .catch((er) => console.log(er));
  }, []);

  return (
    <>
      <Box padding={"2rem"}>
        <Heading mb={"2rem"} textAlign={'center'}> Account</Heading>
        <Box
          // border={"1px solid black"}
          padding={"2rem"}
          borderRadius={"10px"}
          boxShadow={"0px 20px 60px #EEEFF1 "}
        >
          <Heading size={"md"} textAlign={"center"}>
            Personal Detail
          </Heading>

          <Box display={"flex"} ml={"3rem"} columnGap={"3rem"}>
            <Box>
              <Box
                m={"1rem"}
                width={"150px"}
                height={"150px"}
                bg={"tomato"}
                borderRadius={"50%"}
                display={"grid"}
              >
                <Center fontSize={"60px"} color={"white"}>
                  {user?.name[0].toUpperCase()}
                </Center>
              </Box>
              <Heading size={"sm"} m={"1rem"}>
                {user?.name.toUpperCase()}
              </Heading>
            </Box>{" "}
            <TableContainer alignSelf={"center"}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Phone no.</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{user?.email}</Td>
                    <Td>{user?.phoneNo}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box
          mt={"3rem"}
          padding={"2rem"}
          borderRadius={"10px"}
          boxShadow={"0px 20px 60px #EEEFF1 "}
          height={"300px"}
          pl={"3rem"}
        >
          <Heading size={"md"} textAlign={"center"} mb={"2rem"}>
            Business Detail
          </Heading>

          <TableContainer alignSelf={"center"} border={"none"}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Shop Name</Th>
                  <Th>GSTIN no.</Th>
                  <Th>Address</Th>
                  <Th>City</Th>
                  <Th>Pincode</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{businesDetail?.shopName}</Td>
                  <Td>{businesDetail?.gstin}</Td>
                  <Td>{businesDetail?.address}</Td>
                  <Td>{businesDetail?.city}</Td>
                  <Td>{businesDetail?.pincode}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>{" "}
    </>
  );
};

export default Account;
