import { useState, useEffect } from 'preact/hooks';
import Collage_Info from './Collage_Info';

export default function Collage({ collages }) {

    // const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [collage, setCollage] = useState("");

  useEffect(() => {
    if (collages.length > 0) {
        console.log(collages[0])
      // Load image onto canvas when component mounts
      const canvas = document.getElementById("viewport");
      const context = canvas.getContext("2d");

      const image = new Image();
      image.src = collages[0].data.src;
      
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };

      // Set the collage state
      setCollage(collages[0]);
    }
  }, [collages]); // The effect will re-run whenever the collages prop changes

  return (
    <div>
      <canvas id="viewport"></canvas>
      <Collage_Info infos={collage}/>
    </div>
  );
}
