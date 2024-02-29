import { useEffect, useState, useRef } from 'react';
import Fish from './fish';
import '../styles/style.css';
import { useSquid } from '@squidcloud/react';
import { FishMovement, Constant } from '../shared/constants';

const Aquarium = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [fishes, setFishes] = useState<string[]>([]);
  const [fishMovements, setFishMovements] = useState<FishMovement[]>([]);
  const fishImages = [
    './images/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif',
    './images/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif',
    './images/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif',
    './images/clownfishb.gif',
  ];
  const squid = useSquid();
  console.log(squid);
  console.log(squid.queue('fish'));

  useEffect(() => {
    const queue = squid.queue('fish');
    console.log(queue);
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      console.log(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
      console.log(ref.current.offsetHeight);
    }

    // Set the min and max locations for the fish to appear
    const maxWidth = (window.innerWidth - width) / 2 + width;
    const minWidth = (window.innerWidth - width) / 2;
    const maxHeight = (window.innerHeight - height) / 2 + height;
    const minHeight = (window.innerHeight - height) / 2;
    const subscription = queue.consume().subscribe((message) => {
      console.log(message);
      const fishImageRandom = randomInteger(0, 3);
      // const xRandom =
      //   Math.random() *
      //   (window.innerWidth - Constant.max_scale_factor * Constant.image_width);
      const xRandom = randomInteger(minWidth, maxWidth);
      // const yRandom =
      //   Math.random() *
      //   (window.innerHeight -
      //     Constant.max_scale_factor * Constant.image_height);
      const yRandom = randomInteger(minHeight, maxHeight);
      const zRandom = Math.random() * Constant.min_z;
      console.log({ xRandom });
      console.log({ yRandom });
      const newFishMovement: FishMovement = {
        x: xRandom,
        xDirection: 'right',
        xVelocity: 2,
        y: yRandom,
        yDirection: 'down',
        yVelocity: 1,
        z: zRandom,
        zDirection: 'in',
        zVelocity: 0.1,
      };
      const newFishImage = fishImages[fishImageRandom];
      setFishes((prev) => [...prev, newFishImage]);
      setFishMovements((prev) => [...prev, newFishMovement]);
    });

    return () => {
      console.log('unsubscribed');
      subscription.unsubscribe();
    };
  }, []);

  // generate random integer for which fish to display
  const randomInteger = (min: number, max: number) => {
    console.log(min);
    console.log(max);
    const randomNum = Math.random();
    console.log({ randomNum });
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log({ random });
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const addNewFish = () => {
    const queue = squid.queue('fish');
    console.log('adding new fish');
    queue.produce(['hello']);
  };

  return (
    <div className='app-container'>
      <div className='view'>
        <div className='tank' ref={ref}>
          {fishes.map((fish, index) => (
            <Fish
              key={index}
              fishImage={fish}
              width={width}
              height={height}
              initialMovement={fishMovements[index]}
            />
          ))}
          <div className='water' style={{ zIndex: -1 }}></div>
          <div className='water' style={{ zIndex: -10 }}></div>
          <div className='water' style={{ zIndex: -20 }}></div>
          <div className='water' style={{ zIndex: -30 }}></div>
          <div className='water' style={{ zIndex: -40 }}></div>
          <div className='water' style={{ zIndex: -50 }}></div>
          <div className='water' style={{ zIndex: -60 }}></div>
        </div>
      </div>
      <button onClick={addNewFish}>Add a fish</button>
    </div>
  );
};

export default Aquarium;
