import { getFrequencyByNoteKey } from '../providers/MIDIProvider/utils';
import fourier from 'fourier';
import Gain from './Gain';

const SAMPLE_RATE = Math.pow(2, 12);

class Oscillator {
  private _context: AudioContext;
  private _node: OscillatorNode;
  private _gain: Gain;
  private _key: number = 0;

  constructor(context: AudioContext) {
    this._context = context;
    this._node = this._context.createOscillator();
    this._gain = new Gain(this._context);
    this._node.connect(this._gain.node);
  }

  get node(): GainNode {
    return this._gain.node;
  }

  setKey(key: number, from?: number, time: number = 0) {
    this._key = key;
    if (from && time > 0) {
      this._node.frequency.value = getFrequencyByNoteKey(from);
      this._node.frequency.linearRampToValueAtTime(getFrequencyByNoteKey(key), this._context.currentTime + time);
      return key;
    }
    this._node.frequency.value = getFrequencyByNoteKey(key);
  }

  set octave(octave: number) {
    this._node.frequency.value = getFrequencyByNoteKey(this._key + (octave || 0) * 12);
  }

  set fine(fine: number) {
    this._node.detune.value = fine || 0;
  }

  set wave(val: OscillatorType) {
    // let realAxis = new Float32Array(SAMPLE_RATE);
    // let imagAxis = new Float32Array(SAMPLE_RATE);

    // // sawtooh
    // // for (let x = 1; x < SAMPLE_RATE; x++) {
    // //   const shift = x;
    // //   imagAxis[x] = (2 / Math.PI) * (Math.pow(1, shift - 1) / shift) * Math.cos(Math.PI * shift);
    // // }

    // // triangle
    // // for (let x = 1; x < SAMPLE_RATE; x += 2) {
    // //   const shift = x;
    // //   imagAxis[x] = (8 / Math.pow(Math.PI, 2)) * (Math.pow(-1, (shift - 1) / 2) / Math.pow(shift, 2)) * (Math.PI * shift);
    // // }

    // // var shift = 2 * Math.PI * 0.2;
    // // realAxis[1] = (realAxis[0] * Math.cos(shift)) - (imagAxis[1] * Math.sin(shift));
    // // imagAxis[1] = (realAxis[0] * Math.sin(shift)) + (imagAxis[1] * Math.cos(shift));

    // // sine
    // // var shift = 2 * Math.PI * 0.2; //0.3 is the phase
    // // imag[1] = 0 * Math.sin(shift) + 1 * Math.cos(shift);
    // // real[1] = 0 * Math.cos(shift) - 1 * Math.sin(shift);

    // // console.log(real, imag);

    // // square
    // for(let x = 0; x < SAMPLE_RATE; x+=2) {
    //   imagAxis[x] = Math.sin(x);
    // }
    // console.log(fourier.dft(realAxis, imagAxis));

    // this._node.setPeriodicWave(this._context.createPeriodicWave(realAxis, imagAxis));

    this._node.type = val;
  }

  calcDetuneFine(index: number, voices: number, detune: number) {
    if (!detune) return 0;
    if (voices % 2 === 0) {
      return [...Array(voices + 1).keys()].map((_, i) => (i - voices / 2) * detune).filter((val) => val)[index];
    } else {
      return [...Array(voices).keys()].map((_, i) => (i - voices / 2 / 1.5) * detune)[index];
    }
  }

  stop(release: number = 0) {
    this._node.stop(this._context.currentTime + release);
    this._node.disconnect();
  }

  play(attack: number = 0, decay: number = 0, sustain: number = 100, release?: number) {
    this._node.start(this._context.currentTime);
    this._gain.node.gain.cancelScheduledValues(this._context.currentTime);
    this._gain.volume = 0;
    this._gain.node.gain.linearRampToValueAtTime(1, this._context.currentTime + attack / 1000);
    this._gain.node.gain.linearRampToValueAtTime(sustain / 100, this._context.currentTime + (attack + decay) / 1000);
  }

  connectTo(node: AudioNode) {
    return this._gain.connectTo(node);
  }
}

export default Oscillator;
