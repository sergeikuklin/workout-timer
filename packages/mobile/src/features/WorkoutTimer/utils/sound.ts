import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

// Import sound files as assets - React Native requires these to be imported at build time
const soundAssets = {
  secondSound: require('../../../../assets/1sec.mp3'),
  lastSecondSound: require('../../../../assets/last.mp3'),
  completeSound: require('../../../../assets/complete.mp3'),
};

let secondSound: Audio.Sound;
let lastSecondSound: Audio.Sound;
let completeSound: Audio.Sound;
let silentSound: Audio.Sound;

const loadSound = async (source: any): Promise<Audio.Sound> => {
  const { sound } = await Audio.Sound.createAsync(source);
  return sound;
};

export const initSounds = async () => {
  try {
    // Configure audio mode for playback
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false,
    });

    // Load all sound files
    secondSound = await loadSound(soundAssets.secondSound);
    lastSecondSound = await loadSound(soundAssets.lastSecondSound);
    completeSound = await loadSound(soundAssets.completeSound);
    silentSound = await loadSound(soundAssets.completeSound); // Use complete sound as silent for now

    // Play silent sound to activate audio session
    await silentSound.playAsync();

    console.log('Sounds initialized successfully');
  } catch (error) {
    console.error('Error initializing sounds:', error);
  }
};

const playSound = async (sound: Audio.Sound) => {
  try {
    if (sound) {
      await sound.replayAsync();
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const playSecondSound = () => {
  if (secondSound) {
    playSound(secondSound);
  }
};

export const playLastSecondSound = () => {
  if (lastSecondSound) {
    playSound(lastSecondSound);
  }
};

export const playCompleteSound = () => {
  if (completeSound) {
    playSound(completeSound);
  }
};

export const playSilentSound = () => {
  if (silentSound) {
    playSound(silentSound);
  }
};

export const unloadSounds = async () => {
  try {
    if (secondSound) await secondSound.unloadAsync();
    if (lastSecondSound) await lastSecondSound.unloadAsync();
    if (completeSound) await completeSound.unloadAsync();
    if (silentSound) await silentSound.unloadAsync();
  } catch (error) {
    console.error('Error unloading sounds:', error);
  }
};
