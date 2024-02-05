import { GoogleOAuthButton } from "./components/GoogleOAuthButton";
import { PlayerInfoButton } from "./components/PlayerInfoButton";

function App() {
  return (
    <>
      <h1 className='font-bold'>Test frontend</h1>
      <GoogleOAuthButton>cava</GoogleOAuthButton>
      <PlayerInfoButton>me ?</PlayerInfoButton>
    </>
  );
}

export default App;
