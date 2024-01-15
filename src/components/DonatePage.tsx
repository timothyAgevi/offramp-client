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

function DonatePade(){
    const [selectedToken, setSelectedToken] = useState("BUSD");
  const [numberOfTokens, setNumberOfTokens] = useState("");

  // state for currency rate
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [baseCoinRate, setBaseCoin] = useState<number>(0);
  const {handleConnetWalletBtnClick,address}=useAppContext()
  
}