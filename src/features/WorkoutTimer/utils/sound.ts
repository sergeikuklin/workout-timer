const secondSound = new Audio(`${import.meta.env.BASE_URL}1sec.mp3`);
const lastSecondSound = new Audio(`${import.meta.env.BASE_URL}last.mp3`);
const completeSound = new Audio(`${import.meta.env.BASE_URL}complete.mp3`);
const silentSound = new Audio(`${import.meta.env.BASE_URL}silent.mp3`);

secondSound.load();
lastSecondSound.load();
completeSound.load();

let audioContext: AudioContext;

const playSound = (sound: HTMLAudioElement) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
};

export const playSilentSound = () => playSound(silentSound);

export const playSecondSound = () => playSound(secondSound);

export const playLastSecondSound = () => playSound(lastSecondSound);

export const playCompleteSound = () => playSound(completeSound);

export const initSounds = () => {
  playSilentSound();
  document.body.addEventListener(
    'touchstart',
    () => {
      if (!audioContext) {
        audioContext = new window.AudioContext();
      } else if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    },
    { once: true }
  );
};
