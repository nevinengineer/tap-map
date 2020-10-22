import React from "react";
import Lottie from "react-lottie";
import beerAnimation from "../static/lotties/beer.json";

const LoadingBeer = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: beerAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
};

export default LoadingBeer;
