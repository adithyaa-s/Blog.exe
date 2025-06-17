import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function AuthButton({buttonValue, handleSubmit}) {
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    if (buttonValue === "Login") {
      handleSubmit("signin");
    } else {
      handleSubmit("signup");
    }
    setLoading(true);
  };

  return (
    <div className='d-flex justify-content-center'>
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loading…' : buttonValue}
      </Button>
    </div>
  );
}

export default AuthButton;