import React, { useState, useEffect } from "react";

export const SingleToken = ({ resourceName, tokens }) => {
  const [tokenImage, setTokenImage] = useState(null);
  const lastValue = tokens[resourceName][tokens[resourceName].length - 1];

  useEffect(() => {
    const loadImage = async () => {
      try {
        const module = await import(`./assets/${resourceName}-token.png`);
        setTokenImage(module.default);
      } catch (error) {
        console.error(`Error loading image for ${resourceName}:`, error);
      }
    };

    loadImage();
  }, [resourceName]);

  return (
    <div className="tokenPic">
      <div style={{ position: "relative" }}>
        {tokenImage && (
          <>
            <img id={`${resourceName}Token`} src={tokenImage} alt={resourceName} />
            <div className={`${resourceName}Value`}>{lastValue}</div>
          </>
        )}
      </div>
    </div>
  );
};
