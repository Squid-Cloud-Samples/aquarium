export interface Constants {
  max_scale_factor: number;
  image_width: number;
  image_height: number;
  min_z: number;
  max_x_velocity: number;
  max_y_velocity: number;
  max_z_velocity: number;
  chance_to_change_direction: number;
  tick_interval: number;
  x_scale: number;
}

export interface FishMovement {
  x: number;
  xDirection: 'left' | 'right';
  xVelocity: number;
  y: number;
  yDirection: 'up' | 'down';
  yVelocity: number;
  z: number;
  zDirection: 'in' | 'out';
  zVelocity: number;
}

export const Constant: Constants = {
  max_scale_factor: 2,
  image_width: 50,
  image_height: 29,
  min_z: -70,
  max_x_velocity: 4,
  max_y_velocity: 2,
  max_z_velocity: 0.1,
  chance_to_change_direction: 0.01,
  tick_interval: 75,
  x_scale: 0.8,
};
