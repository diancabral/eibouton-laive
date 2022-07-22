import { getFrequencyByNoteKey } from '../contexts/MIDIContext/utils';

class Oscilattor {
  private _context: AudioContext;
  private _node: OscillatorNode;
  private _timestamp = 0;

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

  set key(key: number) {
    this._node.frequency.value = getFrequencyByNoteKey(key);
  }

  set fine(val: number) {
    this._node.detune.value = val;
  }

  stop(release: number = 0) {
    this._node.stop(this._context.currentTime + release);
    this._node.disconnect();
  }

  play() {
    if (this._timestamp) this.stop();
    this._node.start(this._context.currentTime);
    this._timestamp = +new Date();
  }

  connectTo(node: AudioNode) {
    return this._node.connect(node);
  }
}

export default Oscilattor;
