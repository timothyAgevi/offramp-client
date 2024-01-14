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




function OfframpPage() {
  const [selectedToken, setSelectedToken] = useState("BUSD");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

  // state for currency rate
const [exchangeRate, setExchangeRate] = useState<number>(0);
const [baseCoinRate, setBaseCoin] = useState<number>(0);

const {address,handleConnetWalletBtnClick}=useAppContext();

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
//TODOS: Add deduction and make it accept diffrent currencies
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

 

  const handleTokenChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const token = event.target.value;
    setSelectedToken(token);
    // Call getExchangeRate function with the selected token and numberOfTokens
    getExchangeRate(token, numberOfTokens);
  };

  const handleNumberOfTokensChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
    const tokens = event.target.value;
    setNumberOfTokens(tokens);
    // Call getExchangeRate function with the selected token and numberOfTokens
try{
  const amountInKesReceived= await getExchangeRate(selectedToken, tokens);
  setAmountToReceive(String(amountInKesReceived));
  console.log(amountInKesReceived);
}catch(error){
  console.error("Error fetching exchange rate", error);
}  
   
  };

//event handler for RecipientPhoneNumberChange
  const handleRecipientPhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setRecipientPhoneNumber(phoneNumber);
  };

 // Update the function to use the state variables directly
const handleButtonClick = async () => {
  // Ensure both phone number and amount to receive are filled
  if (recipientPhoneNumber && amountToReceive) {
    try {
      // Collect all information from the custom text fields
      const requestData = {
        phoneNumber: recipientPhoneNumber,
        amountToReceive: amountToReceive,
        selectedToken: selectedToken,
        numberOfTokens: numberOfTokens,
      };

      // Send a request to the specified API endpoint
      const response = await axios.post(
        "https://offrampsdk-production.up.railway.app/api/tofiattransactions/",
        requestData
      );

      // Handle the response as needed
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
        <title>Off Ramp</title>
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
                  Recipient phone number :
                </Typography>
                <CustomTextField
                  placeholder="+254 333 333"
                  sx={{ width: "100%" }}
                  onChange={handleRecipientPhoneNumberChange}
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
                <Typography sx={{ mb: "2%" }}>Amount to Receive :</Typography>
                <CustomTextField
                  value={amountToReceive}
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
          </Grid>

          <Box sx={{ mt: "7%", display: "flex", justifyContent: "center" }}>
            <PinkButton 
            
             onClick={address ? handleButtonClick : handleConnetWalletBtnClick}


             sx={{ width: "100%" }}> 
            {address?'Offramp':'Connect wallet'}
            
            </PinkButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OfframpPage;