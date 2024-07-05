const secondSound = new Audio(`${import.meta.env.BASE_URL}1sec.mp3`);
const lastSecondSound = new Audio(`${import.meta.env.BASE_URL}last.mp3`);
const completeSound = new Audio(`${import.meta.env.BASE_URL}complete.mp3`);

const playSound = (sound: HTMLAudioElement) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
};

export const playSecondSound = () => playSound(secondSound);

export const playLastSecondSound = () => playSound(lastSecondSound);

export const playCompleteSound = () => playSound(completeSound);
