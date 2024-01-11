import { SingleToken } from "./SingleToken";

export const TokensContainer = ({ tokens }) => {
  return (
    <>
      <div className="tokenHeader">Token Value</div>
      <div className="tokens">
        {Object.keys(tokens).map((resource) => {
          return (
            <SingleToken
              resourceName={resource}
              key={resource}
              tokens={tokens}
            />
          );
        })}
      </div>
    </>
  );
};
