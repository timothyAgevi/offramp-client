// pages/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import OfframpPage from '../components/OfframpPage'
import DonatePage from "@/components/DonatePage";
import OnrampPage from "@/components/OnrampPage";
import CurrencyPage from "@/components/currencyPage";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState("offramp");
  const router = useRouter();

  const handlePageToggle = () => {
    setCurrentPage((current: string) => {
      switch (current) {
        case "offramp":
          return "onramp";
        case "onramp":
          return "donate";
        case "donate":
          case "Currency":
          return "Currency";
        default:
          return "offramp";
        
      }
    });
  };

  useEffect(() => {
    // router.push('/offramp')
  }, []);

  return (
    <div>
      {currentPage === "offramp" && <OfframpPage />}
      {currentPage === "onramp" && <OnrampPage />}
      {currentPage === "donate" && <DonatePage />}
      {currentPage === "Currency" && <CurrencyPage />}

      {/* <button onClick={handlePageToggle}>Toggle Page</button> */}
    </div>
  );
};

export default HomePage;
