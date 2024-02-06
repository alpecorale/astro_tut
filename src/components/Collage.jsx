import { useState, useEffect } from 'preact/hooks';
import Collage_Info from './Collage_Info';

export default function Collage({ collages }) {

    // const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

    const [collage, setCollage] = useState("");
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const generateCanvas = () => {
        if (collages.length > 0) {
            console.log(collages[1])
            // Load image onto canvas when component mounts
            const canvas = document.getElementById("viewport");
            const context = canvas.getContext("2d");
    
            const image = new Image();
            image.src = collages[1].data.src;
          
            image.onload = () => {
                const windowWidth = window.innerWidth * 0.7;
                const windowHeight = window.innerHeight * 0.6;

                // Update canvas size
                setCanvasSize({ width: windowWidth, height: windowHeight });

                // Adjust canvas size to be 60% of window height and 70% of window width
                canvas.width = windowWidth;
                canvas.height = windowHeight;

                // Calculate aspect ratio to size the image proportionately within the canvas
                const aspectRatio = image.width / image.height;
                const canvasAspectRatio = windowWidth / windowHeight;

                let drawWidth, drawHeight, xOffset, yOffset;

                if (aspectRatio > canvasAspectRatio) {
                    drawWidth = windowWidth;
                    drawHeight = windowWidth / aspectRatio;
                    xOffset = 0;
                    yOffset = (windowHeight - drawHeight) / 2;
                } else {
                    drawWidth = windowHeight * aspectRatio;
                    drawHeight = windowHeight;
                    xOffset = (windowWidth - drawWidth) / 2;
                    yOffset = 0;
                }

                context.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
            };

            const drawImageProportionally = (image, context, canvasWidth, canvasHeight) => {
                const aspectRatio = image.width / image.height;
                const canvasAspectRatio = canvasWidth / canvasHeight;
        
                let drawWidth, drawHeight, xOffset, yOffset;
        
                if (aspectRatio > canvasAspectRatio) {
                  drawWidth = canvasWidth;
                  drawHeight = canvasWidth / aspectRatio;
                  xOffset = 0;
                  yOffset = (canvasHeight - drawHeight) / 2;
                } else {
                  drawWidth = canvasHeight * aspectRatio;
                  drawHeight = canvasHeight;
                  xOffset = (canvasWidth - drawWidth) / 2;
                  yOffset = 0;
                }
        
                context.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
              };
    
            // Set the collage state
            setCollage(collages[1]);

            // Add event listener for window resize
            window.addEventListener("resize", updateCanvasSize);

            return () => {
                // Cleanup: remove event listener
                window.removeEventListener("resize", updateCanvasSize);
            };
        }
      }

  

    useEffect(generateCanvas, [collages]); // The effect will re-run whenever the collages prop changes

    return (
        <div>
        <canvas id="viewport"></canvas>
        <Collage_Info infos={collage}/>
        </div>
    );
}
