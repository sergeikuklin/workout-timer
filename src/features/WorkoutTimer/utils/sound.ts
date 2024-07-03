const secondSound = new Audio('1sec.mp3');
const lastSecondSound = new Audio('last.mp3');
const completeSound = new Audio('complete.mp3');

const playSound = (sound: HTMLAudioElement) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
};

export const playSecondSound = () => playSound(secondSound);

export const playLastSecondSound = () => playSound(lastSecondSound);

export const playCompleteSound = () => playSound(completeSound);
