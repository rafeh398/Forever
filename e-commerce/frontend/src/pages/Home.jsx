import React from 'react'
import Hero from "../Components/home/Hero"
import LatestCollecton from "../Components/home/LatestCollecton"
import BestSellers from "../Components/home/BestSellers"
import OurPolicy from "../Components/home/OurPolicy"
import NewsLetter from "../Components/home/NewsLetter"

function Home() {
  return (
    <div>
      <Hero/>
      <LatestCollecton/>
      <BestSellers/>
      <OurPolicy/>
      <NewsLetter/>
      
    </div>
  )
}

export default Home
