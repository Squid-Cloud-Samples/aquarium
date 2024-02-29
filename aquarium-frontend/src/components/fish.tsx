import React, { useEffect, useState, useRef } from 'react';
import { Constant, FishMovement } from '../shared/constants';

interface FishProps {
  fishImage: string;
  width: number;
  height: number;
  initialMovement: FishMovement;
}

const Fish: React.FC<FishProps> = ({
  fishImage,
  width,
  height,
  initialMovement,
}) => {
  const [fishMovement, setFishMovement] = useState(initialMovement);

  useEffect(() => {
    // relocate();
    // console.log({ initialMovement });
    const timerID = setInterval(() => tick(), Constant.tick_interval);
    return () => clearInterval(timerID);
  });

  const chooseRandomMovement = () => {
    const xVelocity = Math.random() * Constant.max_x_velocity;
    const yVelocity = Math.random() * Constant.max_y_velocity;
    const zVelocity = Math.random() * Constant.max_z_velocity;
    const xDirection = Math.random() < 0.5 ? 'left' : 'right';
    const yDirection = Math.random() < 0.5 ? 'up' : 'down';
    const zDirection = Math.random() < 0.5 ? 'in' : 'out';
    let prevMovement = { ...fishMovement };
    setFishMovement({
      ...prevMovement,
      xVelocity: xVelocity,
      yVelocity: yVelocity,
      xDirection: xDirection,
      yDirection: yDirection,
      zVelocity: zVelocity,
      zDirection: zDirection,
    });
  };

  function tick() {
    move();
    if (Math.random() < Constant.chance_to_change_direction) {
      chooseRandomMovement();
    }
  }

  function relocate() {
    let prevMovement = { ...fishMovement };
    setFishMovement({
      ...prevMovement,
      x:
        Math.random() *
          (window.innerWidth * Constant.x_scale -
            Constant.max_scale_factor * Constant.image_width) +
        window.innerWidth * 0.1,
      y:
        Math.random() *
        (window.innerHeight * 0.8 -
          Constant.max_scale_factor * Constant.image_height),
      yDirection: 'down',
      yVelocity: 1,
      z: Constant.min_z, // start in the back
      zVelocity: 0.1,
    });
  }

  function move() {
    let updateMovement = { ...fishMovement };

    const maxWidth =
      (window.innerWidth - width) / 2 +
      width -
      Constant.max_scale_factor * Constant.image_width;
    const minWidth = (window.innerWidth - width) / 2;
    const maxHeight =
      (window.innerHeight - height) / 2 +
      height -
      Constant.max_scale_factor * Constant.image_height;
    const minHeight = (window.innerHeight - height) / 2;
    if (
      fishMovement.x > maxWidth ||
      fishMovement.x < minWidth ||
      fishMovement.y > maxHeight ||
      fishMovement.y < minHeight
    ) {
      relocate(); // if the fish is outisde the window (window was resized, probably)
    }

    if (
      fishMovement.x > maxWidth
      // window.innerWidth - Constant.max_scale_factor * Constant.image_width
    ) {
      console.log({ maxWidth });
      console.log(fishMovement.x);

      updateMovement.xDirection = 'left';
    } else if (
      fishMovement.x < minWidth
      // Constant.max_scale_factor * Constant.image_width
    ) {
      console.log({ minWidth });
      updateMovement.xDirection = 'right';
    }

    if (
      fishMovement.y > maxHeight

      // window.innerHeight - Constant.max_scale_factor * Constant.image_height
    ) {
      console.log({ maxHeight });
      console.log(fishMovement.y);
      updateMovement.yDirection = 'up';
    } else if (
      fishMovement.y < minHeight
      // Constant.max_scale_factor * Constant.image_height
    ) {
      console.log(fishMovement.y);
      console.log('top');
      updateMovement.yDirection = 'down';
    }

    if (fishMovement.z > -1) {
      updateMovement.zDirection = 'in';
    } else if (fishMovement.z < Constant.min_z) {
      updateMovement.zDirection = 'out';
    }

    updateMovement.x =
      updateMovement.x +
      (updateMovement.xDirection === 'right'
        ? updateMovement.xVelocity
        : -updateMovement.xVelocity);
    updateMovement.y =
      updateMovement.y +
      (updateMovement.yDirection === 'down'
        ? updateMovement.yVelocity
        : -updateMovement.yVelocity);
    updateMovement.z =
      updateMovement.z +
      (updateMovement.zDirection === 'in'
        ? -updateMovement.zVelocity
        : updateMovement.zVelocity);

    setFishMovement(updateMovement);
  }

  function render() {
    let yScale = 2 - fishMovement.z / Constant.min_z;
    let xScale = fishMovement.xDirection === 'right' ? yScale : -yScale;
    let fishScale = { transform: `scaleX(${xScale}) scaleY(${yScale})` };
    let fishStyle = {
      ...fishScale,
      left: fishMovement.x,
      top: fishMovement.y,
      zIndex: Math.round(fishMovement.z),
    };

    return <img className='fish' style={fishStyle} src={fishImage} />;
  }

  return render();
};

export default Fish;
