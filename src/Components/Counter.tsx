import { HStack, Button, Box } from "@chakra-ui/react";

// interface Props {
//  count:number;
//  onInc: ()=>  void;
//  onDec: ()=>  void;
// }

const Counter = () => {
  return (
    <>
      <HStack maxW={"100px"}>
        <Button size={"xs"}>+</Button>
        <Box borderRadius={"4px"} px={"4px"}>
          {" "}
        </Box>
        <Button size={"xs"}>-</Button>
      </HStack>
    </>
  );
};

export default Counter;
