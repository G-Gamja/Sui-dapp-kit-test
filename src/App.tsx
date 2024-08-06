import {
  ConnectButton,
  useCurrentAccount,
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSignPersonalMessage,
} from "@mysten/dapp-kit";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

function App() {
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { currentWallet } = useCurrentWallet();
  const account = useCurrentAccount();

  const [digest, setDigest] = useState("");
  const [signMessageBytes, setSignMessageBytes] = useState("");
  const [senderAddress, setsenderAddress] = useState("");
  const [receiverAddress, setreceiverAddress] = useState("");
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Cosmostation wallet api test dapp</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <WalletStatus />
        </Container>
      </Container>

      {/* <ConnectModal
        trigger={
          <Button
            onClick={(aa) => {
              try {
                console.log("Connect button clicked");
                console.log(aa);
              } catch (error) {
                console.error(error);
              }
            }}
          />
        }
        open
        onOpenChange={(isOpen) => {
          try {
            console.log("Connect modal open state changed:", isOpen);
          } catch (error) {
            console.error(error);
          }
        }}
      /> */}
    </>
  );
}

export default App;
