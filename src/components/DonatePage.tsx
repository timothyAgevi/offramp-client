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

function DonatePage(){
const [selectedToken, setSelectedToken] = useState("BUSD");
const [numberOfTokens, setNumberOfTokens] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [amountToSend, setAmountToSend] = useState("");
const {handleConnetWalletBtnClick,address}=useAppContext()


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

}
export default DonatePage;