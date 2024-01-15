/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { CustomTextField } from "@/components/textBox";
import { PinkButton } from "@/components/buttons";
import { useState } from "react";
import axios from "axios";
import AppProvider, { useAppContext } from "../providers/AppProvider";

const currencies = [
  {
    value: "USDC",
    label: "USDC",
  },
  {
    value: "BUSD",
    label: "BUSD",
  },
  {
    value: "STRK",
    label: "STRK",
  },
];

const networks = [
  {
    value: "Starknet",
    label: "Starknet",
  },
  {
    value: "Ethereum",
    label: "Ethereum",
  },
];

function OnrampPage() {
  const [selectedToken, setSelectedToken] = useState("BUSD");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amountToSend, setAmountToSend] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("Starknet");
  const [walletAddress, setWalletAddress] = useState("");

  // state for currency rate
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [baseCoinRate, setBaseCoin] = useState<number>(0);
  const {handleConnetWalletBtnClick,address}=useAppContext()

  // const { address } = useAppContext();

  const getExchangeRate = async (symbol: any, amount: any) => {
    try {
      const response = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
      );

      // Check if the response is successful
      if (response.status === 200) {
        const data = response.data;
        if (data && data.data && data.data.rates && data.data.rates.KES) {
          const baseCoinRate: number = data.data.rates.KES;
          const amountInKesReceived: number = amount * baseCoinRate;

          setExchangeRate(Number(amountInKesReceived.toFixed(2))); // convert to number and set state
          setBaseCoin(baseCoinRate);
          return amountInKesReceived;
        } else {
          console.log("No exchange rate data found for KES");
        }
      } else {
        console.log("Failed to fetch exchange rate from Coinbase API");
      }
    } catch (error) {
      console.log("Unable to get exchange rate", error);
    }
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const token = event.target.value;
    setSelectedToken(token);
    // Call getExchangeRate function with the selected token and numberOfTokens
    getExchangeRate(token, numberOfTokens);
  };

  const handleNumberOfTokensChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tokens = event.target.value;
    setNumberOfTokens(tokens);
    // Call getExchangeRate function with the selected token and numberOfTokens
    try {
      const amountInKesReceived = await getExchangeRate(selectedToken, tokens);
      setAmountToSend(String(amountInKesReceived));
      console.log(amountInKesReceived);
    } catch (error) {
      console.error("Error fetching exchange rate", error);
    }
  };

  //event handler for phoneNumberChange
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setPhoneNumber(phoneNumber);
  };

  //event handler for Network Change
  const handleNetworkChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const network = event.target.value as string;
    setSelectedNetwork(network);
    // Perform any additional actions you want based on the selected network
    // For example, you can call a function or update other state variables.
    console.log("Selected Network:", network);
  };

  const handleWalletAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const address = event.target.value;
    setWalletAddress(address);
  };
  //event handler for Offramp button
  const handleButtonClick = async () => {
    // Ensure all required fields are filled
    if (phoneNumber && amountToSend && selectedToken && numberOfTokens && selectedNetwork && walletAddress) {
      try {
        // Collect all information from the custom text fields
        const requestData = {
          phoneNumber: phoneNumber,
          amountToSend: amountToSend,
          selectedToken: selectedToken,
          numberOfTokens: numberOfTokens,
          selectedNetwork: selectedNetwork,
          walletAddress: walletAddress,
        };
  
        // Send a request to the specified API endpoint
        const response = await axios.post(
          "https://offrampsdk-production.up.railway.app/api/onramptransaction/",
          requestData
        );
  
        // Handle the response as needed
        console.log("Conversion API Response:", response.data);
      } catch (error) {
        console.error("Error making API request", error);
      }
    } else {
      console.warn("All fields are required.");
    }
  };
  


  return (
    <>
      <Head>
        <title>On Ramp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Container maxWidth="sm" sx={{ mt: "50px" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography sx={{ mb: "2%" }}>Select Token :</Typography>
                <CustomTextField
                  defaultValue="BUSD"
                  sx={{ width: "100%" }}
                  select
                  onChange={handleTokenChange}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200, // Set the maximum height for the menu
                          background:
                            "var(--gradient-1, linear-gradient(90deg, #FF0080 0%, #AA1CA6 100%))",
                        },
                      },
                    },
                  }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "#fff",
                      },
                      color: "#fff",
                      backgroundColor: "grey",
                      borderRadius: "12px",
                    },
                  }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{}}>
                <Typography sx={{ mb: "2%" }}>Number of Tokens :</Typography>
                <CustomTextField
                  value={numberOfTokens}
                  onChange={handleNumberOfTokensChange}
                  placeholder="0"
                  sx={{ width: "100%" }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "#fff",
                      },
                      color: "#fff",
                      backgroundColor: "grey",
                      borderRadius: "12px",
                    },
                  }}
                ></CustomTextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {" "}
              <Box sx={{ mt: "7%" }}>
                <Typography sx={{ mb: "2%" }}>
                  Sender's phone number :
                </Typography>
                <CustomTextField
                  placeholder="+254 333 333"
                  sx={{ width: "100%" }}
                  onChange={handlePhoneNumberChange}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "#fff",
                      },
                      color: "#fff",
                      backgroundColor: "grey",
                      borderRadius: "12px",
                    },
                  }}
                ></CustomTextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mt: "7%" }}>
                <Typography sx={{ mb: "2%" }}>Amount to Send :</Typography>
                <CustomTextField
                  value={amountToSend}
                  placeholder="Amount to receive"
                  sx={{ width: "100%" }}
                  onChange={handleNumberOfTokensChange} // Assuming you want to use the same function
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "#fff",
                      },
                      color: "#fff",
                      backgroundColor: "grey",
                      borderRadius: "12px",
                    },
                  }}
                ></CustomTextField>
              </Box>
            </Grid>

            {/* //network */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography sx={{ mb: "2%" }}>Select Network :</Typography>
                <CustomTextField
                  value={selectedNetwork}
                  // defaultValue="Starknet"
                  sx={{ width: "100%" }}
                  select
                  onChange={(event) => handleNetworkChange(event)}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200, // Set the maximum height for the menu
                          background:
                            "var(--gradient-1, linear-gradient(90deg, #FF0080 0%, #AA1CA6 100%))",
                        },
                      },
                    },
                  }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "#fff",
                      },
                      color: "#fff",
                      backgroundColor: "grey",
                      borderRadius: "12px",
                    },
                  }}
                >
                  {networks.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            </Grid>

            {/* paste address */}
            <Grid item xs={12} md={6}>
              <Box sx={{}}>
                <Typography sx={{ mb: "2%" }}>
                  Paste Wallet Address :
                </Typography>
                <CustomTextField
                  value={walletAddress}
                  onChange={handleWalletAddressChange}
                  placeholder="0x"
                  sx={{ width: "100%" }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "#fff",
                      },
                      color: "#fff",
                      backgroundColor: "grey",
                      borderRadius: "12px",
                    },
                  }}
                ></CustomTextField>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: "7%", display: "flex", justifyContent: "center" }}>
            <PinkButton
             
              onClick={ address?handleButtonClick:handleConnetWalletBtnClick}
              sx={{ width: "100%" }}
            >
              {address ? "Offramp" : "Connect wallet"}
            </PinkButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default OnrampPage;
