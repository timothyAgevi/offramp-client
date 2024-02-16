import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { CustomTextField } from "@/components/textBox";
import { PinkButton } from "@/components/buttons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/AppProvider";



async function getCurrencyExchangeRate(fromCurrency: string, toCurrency: string, amount: number) {
  try {
    const response = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`);
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[toCurrency]) {
        const baseCoinRate: number = data.data.rates[toCurrency];
        const amountInCurrencyReceived: number = amount * baseCoinRate;
        return amountInCurrencyReceived;
      } else {
        console.log("No exchange rate data found for", toCurrency);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
}

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
    value: "AAVE",
    label: "AAVE",
  },
  {
    value: "KES",
    label: "KES",
  },
  {
    value: "BTC",
    label: "BTC",
  },
  {
    value: "STRK",
    label: "STRK",
  },
];

function CurrencyPage() {
  const [fromCurrency, setFromCurrency] = useState<string>("BTC");
  const [toCurrency, setToCurrency] = useState<string>("KES");
  const [numberOfTokens, setNumberOfTokens] = useState<number | "">(0);
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState<string>("");
  const [amountToReceive, setAmountToReceive] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address, handleConnetWalletBtnClick } = useAppContext();

  useEffect(() => {
    const fetchRatesData = async () => {
      try {
        const tokens = typeof numberOfTokens === "number" ? numberOfTokens : parseFloat(numberOfTokens); // Convert numberOfTokens to number
        const amountInCurrencyReceived = await getCurrencyExchangeRate(fromCurrency, toCurrency, tokens);
        setAmountToReceive(String(amountInCurrencyReceived));
      } catch (error) {
        console.error("Error fetching exchange rates", error);
      }
    };
    fetchRatesData();
  }, [fromCurrency, toCurrency, numberOfTokens]); // Watch for changes in fromCurrency, toCurrency, and numberOfTokens

  const handleTokenChangeForExchangeRate = (event: React.ChangeEvent<{ value: unknown }>, field: string) => {
    const token = event.target.value as string;
    if (field === "from") {
      setFromCurrency(token);
    } else if (field === "to") {
      setToCurrency(token);
    }
  };

  const handleNumberOfTokensChangeForExchangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim(); // Remove leading and trailing whitespace
    if (value === "") {
      setNumberOfTokens(""); // Set to empty string if input is empty
      setAmountToReceive(""); // Reset amountToReceive when input is empty
      return;
    }
    const tokens = parseFloat(value);
    if (isNaN(tokens)) {
      setErrorMessage("Invalid input. Please enter a valid number.");
    } else {
      setErrorMessage("");
      setNumberOfTokens(tokens);
    }
  };

  const handleButtonClick = async () => {
    if (recipientPhoneNumber && amountToReceive) {
      try {
        const requestData = {
          phoneNumber: recipientPhoneNumber,
          amountToReceive: amountToReceive,
          selectedToken: toCurrency,
          numberOfTokens: typeof numberOfTokens === "number" ? numberOfTokens : parseFloat(numberOfTokens), // Convert numberOfTokens to number
        };
        const response = await axios.post(
          "https://offrampsdk-production.up.railway.app/api/offramptransaction/",
          requestData
        );
        console.log("Conversion API Response:", response.data);
      } catch (error) {
        console.error("Error making API request", error);
      }
    } else {
      console.warn("Phone number and amount to receive are required.");
    }
  };

  return (
    <>
      <Head>
        <title>Currency</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Container maxWidth="sm" sx={{ mt: "50px" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography sx={{ mb: "2%" }}>From Currency :</Typography>
                <CustomTextField
                  value={fromCurrency}
                  sx={{ width: "100%" }}
                  select
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleTokenChangeForExchangeRate(event, "from")}
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
              <Box>
                <Typography sx={{ mb: "2%" }}>To Currency :</Typography>
                <CustomTextField
                  value={toCurrency}
                  sx={{ width: "100%" }}
                  select
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleTokenChangeForExchangeRate(event, "to")}
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
                  onChange={handleNumberOfTokensChangeForExchangeRate}
                  placeholder="0"
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mt: "7%" }}>
                <Typography sx={{ mb: "2%" }}>Amount to Receive :</Typography>
                <CustomTextField
                  value={amountToReceive}
                  placeholder="Amount to receive"
                  sx={{ width: "100%" }}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: "7%", display: "flex", justifyContent: "center" }}>
            <PinkButton onClick={address ? handleButtonClick : handleConnetWalletBtnClick} sx={{ width: "100%" }}>
              {address ? 'Offramp' : 'Connect wallet'}
            </PinkButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CurrencyPage;
