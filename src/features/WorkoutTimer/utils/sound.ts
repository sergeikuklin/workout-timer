const secondSound = new Audio(`${import.meta.env.BASE_URL}1sec.mp3`);
const lastSecondSound = new Audio(`${import.meta.env.BASE_URL}last.mp3`);
const completeSound = new Audio(`${import.meta.env.BASE_URL}complete.mp3`);

const playSound = (sound: HTMLAudioElement) => {
  sound.volume = 1;
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
};

export const playSecondSound = () => playSound(secondSound);

export const playLastSecondSound = () => playSound(lastSecondSound);

export const playCompleteSound = () => playSound(completeSound);

export const initSounds = () => {
  secondSound.volume = 0;
  lastSecondSound.volume = 0;
  completeSound.volume = 0;
  playSecondSound();
  playLastSecondSound();
  playCompleteSound();
};
