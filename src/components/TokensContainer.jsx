import { SingleToken } from "./SingleToken";

export const TokensContainer = ({ tokens }) => {
return (
    <div className="tokensContainer">
      <div className="tokenHeader">
        Resource Point Value
        </div>
        {Object.keys(tokens).map((resource) => {
            return (
              <SingleToken resourceName={resource} key={resource} tokens={tokens} />  
            )
        })}
    </div>
  )
};