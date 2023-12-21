// pages/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import OfframpPage from '../components/OfframpPage'



const HomePage = () => {
  const [currentPage, setCurrentPage] = useState("onramp");
  const router = useRouter();
  const handlePageToggle = () => {
    setCurrentPage((current) => (current === "onramp" ? "offramp" : "onramp"));
  };

  useEffect(() => {
    // router.push('/offramp')
  }, []);

  return (
    <div>
      <OfframpPage />
    </div>
  );
};

export default HomePage;
