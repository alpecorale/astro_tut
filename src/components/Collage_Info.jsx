import { useState, useEffect } from 'preact/hooks';

export default function Collage_Info({infos}) {

    console.log(infos)
//   const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [info, setInfo] = useState("");

  useEffect(() => {
    // Update the greeting when the component mounts
    // setInfo(randomMessage());
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div>
      <ul>
        <li>{infos ? infos.data.title : "Title"}</li>
        <li>Description: {infos ? infos.data.description : ""}</li>
        <li>Link: {infos ? infos.data.link : ""}</li>
      </ul>
    </div>
  );
}