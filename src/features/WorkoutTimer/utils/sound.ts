const secondSound = new Audio(`${import.meta.env.BASE_URL}1sec.mp3`);
const lastSecondSound = new Audio(`${import.meta.env.BASE_URL}last.mp3`);
const completeSound = new Audio(`${import.meta.env.BASE_URL}complete.mp3`);

const playSound = (sound: HTMLAudioElement) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
};

export const playSecondSound = () => {
  secondSound.volume = 1;
  playSound(secondSound);
};

export const playLastSecondSound = () => {
  lastSecondSound.volume = 1;
  playSound(lastSecondSound);
};

export const playCompleteSound = () => {
  completeSound.volume = 1;
  playSound(completeSound);
};

export const initSounds = () => {
  secondSound.volume = 0;
  lastSecondSound.volume = 0;
  completeSound.volume = 0;
  playSound(secondSound);
  playSound(lastSecondSound);
  playSound(completeSound);
};
