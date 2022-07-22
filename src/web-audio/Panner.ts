class Panner {
  private _node: StereoPannerNode

  constructor(context: AudioContext) {
    this._node = context.createStereoPanner();
  }

  set pan(value: number) {
    this._node.pan.value = (value / 50) - 1;
  }

  connectTo(node: AudioNode) {
    return this._node.connect(node);
  }
}

export default Panner;
