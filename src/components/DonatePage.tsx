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

function DonatePage() {
  const [selectedToken, setSelectedToken] = useState("BUSD");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amountToSend, setAmountToSend] = useState("");
  const { handleConnetWalletBtnClick, address } = useAppContext();

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const token = event.target.value;
    setSelectedToken(token);
    // Call getExchangeRate function with the selected token and numberOfTokens
    // getExchangeRate(token, numberOfTokens);
  };

  const handleNumberOfTokensChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tokens = event.target.value;
    setNumberOfTokens(tokens);
  };

  //event handler for phoneNumberChange
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setPhoneNumber(phoneNumber);
  };

  //event handler for phoneNumberChange
  const handleAmountToSendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amountToSend = event.target.value;
    setAmountToSend(amountToSend);
  };
  return (
    <>
      <Head>
        <title>Donations</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Container maxWidth="sm" sx={{ mt: "50px" }}>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>

                <text> VIA Crypto</text>

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
          </Grid>

          <text> VIA FIAT</text>
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
            
          </Container>
      </Box>
    </>
  );
}

export default DonatePage;
