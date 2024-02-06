import { useState, useEffect } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Update the greeting when the component mounts
    setGreeting(randomMessage());
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div>
      <h3 >{greeting}! Thank you for visiting!</h3>
      {/* <button onClick={() => setGreeting(randomMessage())}>
        New Greeting
      </button> */}
    </div>
  );
}