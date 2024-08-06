import {
  ConnectButton,
  useAccounts,
  useConnectWallet,
  useCurrentAccount,
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSignPersonalMessage,
  useWallets,
} from "@mysten/dapp-kit";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";
import { useEffect, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";

export function WalletStatus() {
  const account = useCurrentAccount();
  const wallets = useWallets();
  const accounts = useAccounts();
  const { mutate: connect } = useConnectWallet();

  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { currentWallet } = useCurrentWallet();

  const [digest, setDigest] = useState("");
  const [digest2, setDigest2] = useState("");

  const [defaultReceiverAddress, setDefaultReceiverAddress] = useState("");

  const [signMessageBytes, setSignMessageBytes] = useState("");
  const [signPersonalMessageBytes, setSignPersonalMessageBytes] = useState("");

  const [signPersonalMsg, setsignPersonalMsg] = useState("hello, World!");
  const [signMsg, setSignMsg] = useState("hello, World!");

  const [senderAddress, setsenderAddress] = useState(account?.address || "");
  const [receiverAddress, setreceiverAddress] = useState("");

  const [senderAddress2, setsenderAddress2] = useState(account?.address || "");
  const [receiverAddress2, setreceiverAddress2] = useState("");

  const [senderAddress3, setsenderAddress3] = useState(account?.address || "");
  const [receiverAddress3, setreceiverAddress3] = useState("");

  const [senderAddress4, setsenderAddress4] = useState(account?.address || "");
  const [receiverAddress4, setreceiverAddress4] = useState("");

  const [signTxBytes, setSignTxBytes] = useState("");
  const [signTxSig, setSignTxSig] = useState("");

  const [signTxBlockBytes, setSignTxBlockBytes] = useState("");
  const [signTxBlockSig, setSignTxBlockSig] = useState("");

  useEffect(() => {
    if (!senderAddress) {
      setsenderAddress(account?.address || "");
    }

    if (!senderAddress2) {
      setsenderAddress2(account?.address || "");
    }

    if (!senderAddress3) {
      setsenderAddress3(account?.address || "");
    }

    if (!senderAddress4) {
      setsenderAddress4(account?.address || "");
    }
  }, [
    senderAddress,
    senderAddress2,
    senderAddress3,
    senderAddress4,
    account?.address,
  ]);

  return (
    <Container my="2">
      <Heading mb="2">Wallet API</Heading>
      <Heading mb="3">
        Please install postMessage catcher for catch full request / response
        msgs
      </Heading>
      <a
        href={`https://chromewebstore.google.com/detail/postmessage-catcher/henlmhlhpgnkeecjjcbhhcfmecohnilo?hl=ko&utm_source=ext_sidebar`}
        target="_blank"
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          color: "black",
        }}
      >
        Go to PostMessage catcher install page
      </a>
      <div style={{ padding: 20 }}>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.name}>
              <button
                onClick={async () => {
                  const result =
                    await wallet.features["standard:connect"].connect();

                  console.log("🚀 ~ WalletStatus ~ result:", result);

                  // connect(
                  //   { wallet },
                  //   {
                  //     onSuccess: () => console.log("connected"),
                  //     onError: async(error) => {
                  //       console.error(error);

                  //       const result = await wallet.features['standard:connect'].connect();
                  //     },
                  //   },
                  // );
                }}
              >
                Connect to {wallet.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {account ? (
        <Flex
          direction="column"
          style={{
            paddingBottom: 40,
            marginBottom: 70,
            borderBottom: "3px solid white",
          }}
        >
          <Text>Wallet connected</Text>
          <Text>Address: {account.address}</Text>
          <Text>
            Default receiver Address (for test): {defaultReceiverAddress}
          </Text>
          <input
            placeholder="please input default receiver address"
            value={defaultReceiverAddress}
            onChange={(e) => setDefaultReceiverAddress(e.target.value)}
          />
        </Flex>
      ) : (
        <Text>Wallet not connected</Text>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <>
          <Button
            onClick={() => {
              try {
                signPersonalMessage(
                  {
                    message: new TextEncoder().encode(signPersonalMsg),
                  },
                  {
                    onSuccess: (result) =>
                      setSignPersonalMessageBytes(result.signature || ""),
                  },
                );
              } catch (error) {
                alert(error);
              }
            }}
          >
            sign Personal Message
          </Button>
          <Box
            style={{
              backgroundColor: "white",
            }}
          >
            fds
          </Box>
          <input
            placeholder="hello, World!"
            value={signPersonalMsg}
            onChange={(e) => setsignPersonalMsg(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text>{"sign personal message result: "}</Text>
            <Text
              style={{
                display: "flex",
                width: "70%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {signPersonalMessageBytes}
            </Text>
          </div>

          <div
            style={{
              width: "100%",
              margin: "4rem 0",
            }}
          />
        </>

        <>
          <Button
            onClick={async () => {
              try {
                if (account) {
                  const aa = await currentWallet?.features[
                    "sui:signMessage"
                  ]?.signMessage({
                    message: new TextEncoder().encode(signMsg),
                    account: account,
                  });
                  setSignMessageBytes(aa?.signature || "");
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            signMessage
          </Button>
          <input
            placeholder="hello, World!"
            value={signMsg}
            onChange={(e) => setSignMsg(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text>{"(Legacy) sign message result: "}</Text>
            <Text
              style={{
                display: "flex",
                width: "70%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {signMessageBytes}
            </Text>
          </div>

          <div
            style={{
              width: "100%",
              margin: "4rem 0",
            }}
          />
        </>

        <>
          <Button
            onClick={async () => {
              try {
                if (account) {
                  const tx = new Transaction();

                  tx.setSenderIfNotSet(senderAddress);

                  const [coin] = tx.splitCoins(tx.gas, ["10000000"]);
                  tx.transferObjects(
                    [coin],
                    defaultReceiverAddress || receiverAddress,
                  );

                  const aa = await currentWallet?.features[
                    "sui:signAndExecuteTransaction"
                  ]?.signAndExecuteTransaction({
                    transaction: tx,
                    chain: "sui:mainnet",
                    account: account,
                  });
                  console.log(aa);
                  setDigest(aa?.digest || "");
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            signAndExecuteTx: 0.01 수이 일반 Send
          </Button>

          <input
            placeholder="sender address"
            value={senderAddress}
            onChange={(e) => setsenderAddress(e.target.value)}
          />
          <input
            placeholder="receiver address"
            value={defaultReceiverAddress || receiverAddress}
            onChange={(e) => setreceiverAddress(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text>{"signAndExecuteTransaction result: "}</Text>
            <Text
              style={{
                display: "flex",
                width: "70%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {digest}
            </Text>
            {digest && (
              <a
                href={`https://suiscan.xyz/mainnet/tx/${digest}`}
                target="_blank"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Explorer
              </a>
            )}
          </div>
          <div
            style={{
              width: "100%",
              margin: "4rem 0",
            }}
          />
        </>

        <>
          <Button
            onClick={async () => {
              try {
                if (account) {
                  const tx = new Transaction();

                  tx.setSenderIfNotSet(senderAddress2);

                  const [coin] = tx.splitCoins(tx.gas, ["10000000"]);

                  tx.transferObjects(
                    [coin],
                    defaultReceiverAddress || receiverAddress2,
                  );

                  const aa = await currentWallet?.features[
                    "sui:signAndExecuteTransactionBlock"
                  ]?.signAndExecuteTransactionBlock({
                    transactionBlock: tx,
                    chain: "sui:mainnet",
                    account: account,
                  });
                  console.log(aa);
                  setDigest2(aa?.digest || "");
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            signAndExecuteTxBlock(legacy): 0.01 수이 일반 Send
          </Button>
          <input
            placeholder="sender address"
            value={senderAddress2}
            onChange={(e) => setsenderAddress2(e.target.value)}
          />
          <input
            placeholder="receiver address"
            value={defaultReceiverAddress || receiverAddress2}
            onChange={(e) => setreceiverAddress2(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text>{"(Legacy) signAndExecuteTransactionBlock result: "}</Text>
            <Text
              style={{
                display: "flex",
                width: "70%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {digest2}
            </Text>
            {digest2 && (
              <a
                href={`https://suiscan.xyz/mainnet/tx/${digest2}`}
                target="_blank"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Explorer
              </a>
            )}
          </div>

          <div
            style={{
              width: "100%",
              margin: "4rem 0",
            }}
          />
        </>

        <>
          <Button
            onClick={async () => {
              try {
                if (account) {
                  const tx = new Transaction();

                  tx.setSenderIfNotSet(senderAddress3);

                  const [coin] = tx.splitCoins(tx.gas, ["10000000"]);

                  tx.transferObjects(
                    [coin],
                    defaultReceiverAddress || receiverAddress3,
                  );

                  const aa = await currentWallet?.features[
                    "sui:signTransaction"
                  ]?.signTransaction({
                    transaction: tx,
                    chain: "sui:mainnet",
                    account: account,
                  });
                  console.log(aa);

                  setSignTxBytes(aa?.bytes || "");
                  setSignTxSig(aa?.signature || "");
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            signTransaction: Only sign
          </Button>
          <input
            placeholder="sender address"
            value={senderAddress3}
            onChange={(e) => setsenderAddress3(e.target.value)}
          />
          <input
            placeholder="receiver address"
            value={defaultReceiverAddress || receiverAddress3}
            onChange={(e) => setreceiverAddress3(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text>{"sign Transaction result: "}</Text>

            <Text
              style={{
                display: "flex",
                width: "30%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {`bytes: ${signTxBytes}`}
            </Text>
            <Text
              style={{
                display: "flex",
                width: "30%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {`signature: ${signTxSig}`}
            </Text>
          </div>
          <div
            style={{
              width: "100%",
              margin: "4rem 0",
            }}
          />
        </>

        <>
          <Button
            onClick={async () => {
              try {
                if (account) {
                  const tx = new Transaction();

                  tx.setSenderIfNotSet(senderAddress4);

                  const [coin] = tx.splitCoins(tx.gas, ["10000000"]);

                  tx.transferObjects(
                    [coin],
                    defaultReceiverAddress || receiverAddress4,
                  );

                  const aa = await currentWallet?.features[
                    "sui:signTransactionBlock"
                  ]?.signTransactionBlock({
                    transactionBlock: tx,
                    chain: "sui:mainnet",
                    account: account,
                  });
                  console.log(aa);

                  setSignTxBlockBytes(aa?.transactionBlockBytes || "");
                  setSignTxBlockSig(aa?.signature || "");
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            signTransactionBlock: : Only sign
          </Button>
          <input
            placeholder="sender address"
            value={senderAddress4}
            onChange={(e) => setsenderAddress4(e.target.value)}
          />
          <input
            placeholder="receiver address"
            value={defaultReceiverAddress || receiverAddress4}
            onChange={(e) => setreceiverAddress4(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text>{"sign TransactionBlock result: "}</Text>

            <Text
              style={{
                display: "flex",
                width: "30%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {`bytes: ${signTxBlockBytes}`}
            </Text>
            <Text
              style={{
                display: "flex",
                width: "30%",
                wordBreak: "break-word", // 이 부분을 수정
                whiteSpace: "normal", // 이 부분을 수정
              }}
            >
              {`signature: ${signTxBlockSig}`}
            </Text>
          </div>

          <div
            style={{
              width: "100%",
              margin: "4rem 0",
            }}
          />
        </>
      </div>
      {/* <OwnedObjects /> */}
    </Container>
  );
}
