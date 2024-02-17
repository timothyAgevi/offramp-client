import Head from "next/head";
import { Box, Container, Grid, MenuItem, Typography } from "@mui/material";
import { CustomTextField } from "@/components/textBox";
import { PinkButton } from "@/components/buttons";
import { useAppContext } from "../providers/AppProvider";
import { useCurrencyExchange ,getCurrencyExchangeRate} from 'kibokogetpricehook'; // Correctly import the hook
import React, { useState, useEffect } from 'react'; // Import useEffect

const currencies = [
  { value: "USDC", label: "USDC" },
  { value: "BUSD", label: "BUSD" },
  { value: "AAVE", label: "AAVE" },
  { value: "KES", label: "KES" },
  { value: "BTC", label: "BTC" },
  { value: "STRK", label: "STRK" },
];

function CurrencyPage() {
  const [fromCurrency, setFromCurrency] = useState<string>("STRK");
  const [toCurrency, setToCurrency] = useState<string>("USDT");
  const [numberOfTokens, setNumberOfTokens] = useState<number | string>("");
  const [amountToReceive, setAmountToReceive] = useState<number | string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address, handleConnetWalletBtnClick } = useAppContext();

  useCurrencyExchange(fromCurrency, toCurrency, numberOfTokens); // Use the hook to fetch exchange rates

  useEffect(() => {
    const calculateAmountToReceive = async () => {
      try {
        const tokens = typeof numberOfTokens === "string" ? parseFloat(numberOfTokens) : numberOfTokens;
        const rate = await getCurrencyExchangeRate(fromCurrency, toCurrency, tokens);
        if (typeof rate === 'number' && !isNaN(rate)) {
          setAmountToReceive(rate);
        } else {
          setAmountToReceive("");
        }
      } catch (error) {
        console.error("Error fetching exchange rates", error);
        setAmountToReceive("");
      }
    };

    calculateAmountToReceive();
  }, [fromCurrency, toCurrency, numberOfTokens]);

  const handleTokenChangeForExchangeRate = async (event: React.ChangeEvent<{ value: unknown }>, field: string) => {
    const token = event.target.value as string;
    if (field === "from") {
      setFromCurrency(token);
    } else if (field === "to") {
      setToCurrency(token);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value;
    if (field === "tokens") {
      setNumberOfTokens(value);
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
                  sx={{ width: "100%" }}
                  select
                  value={fromCurrency}
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
                  sx={{ width: "100%" }}
                  select
                  value={toCurrency}
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
              <Box>
                <Typography sx={{ mb: "2%" }}>Number of Tokens :</Typography>
                <CustomTextField
                  sx={{ width: "100%" }}
                  type="number"
                  value={numberOfTokens}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, "tokens")}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography sx={{ mb: "2%" }}>Amount to Receive :</Typography>
                <CustomTextField
                  sx={{ width: "100%" }}
                  value={amountToReceive}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: "7%", display: "flex", justifyContent: "center" }}>
            <PinkButton onClick={address ? handleConnetWalletBtnClick : undefined} sx={{ width: "100%" }}>
              {address ? 'Offramp' : 'Connect wallet'}
            </PinkButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CurrencyPage;
