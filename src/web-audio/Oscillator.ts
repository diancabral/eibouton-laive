import { getFrequencyByNoteKey } from '../providers/MIDIProvider/utils';

class Oscillator {
  private _context: AudioContext;
  private _node: OscillatorNode;

  constructor(context: AudioContext) {
    this._context = context;
    this._node = this._context.createOscillator();
  }

  get node(): OscillatorNode {
    return this._node;
  }

  set wave(val: OscillatorType) {
    this._node.type = val;
  }

  setKey(key: number, from?: number, time: number = 0) {
    if (from && time > 0) {
      this._node.frequency.value = getFrequencyByNoteKey(from);
      this._node.frequency.linearRampToValueAtTime(getFrequencyByNoteKey(key), this._context.currentTime + time);
      return key;
    }
    this._node.frequency.value = getFrequencyByNoteKey(key);
  }

  calcDetuneFine(index: number, voices: number, detune: number) {
    if (!detune) return 0;
    if (voices % 2 === 0) {
      return [...Array(voices + 1).keys()].map((_, i) => (i - (voices / 2)) * detune).filter(val => val)[index];
    } else {
      return [...Array(voices).keys()].map((_, i) => (i - ((voices / 2) / 1.5)) * detune)[index];
    }
  }

  set fine(val: number) {
    this._node.detune.value = val;
  }

  stop(release: number = 0) {
    this._node.stop(this._context.currentTime + release);
    this._node.disconnect();
  }

  play(time: number = 0) {
    this._node.start(this._context.currentTime + time);
  }

  connectTo(node: AudioNode) {
    return this._node.connect(node);
  }
}

export default Oscillator;
