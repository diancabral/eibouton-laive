class NativeAudioContext {
  private _context: AudioContext = new window.AudioContext();

  get context(): AudioContext {
    return this._context;
  }

  get destination(): AudioDestinationNode {
    return this._context.destination;
  }
}

export default NativeAudioContext;
