class Gain {
  private _node: GainNode;

  constructor(context: AudioContext) {
    this._node = context.createGain();
  }

  get node(): GainNode {
    return this._node;
  }

  set volume(val: number) {
    this._node.gain.value = 1 - val / -100;
  }

  connectTo(node: AudioNode) {
    return this._node.connect(node);
  }
}

export default Gain;
