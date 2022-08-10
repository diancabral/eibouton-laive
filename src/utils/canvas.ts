export const setCanvasScale = (element: HTMLCanvasElement, scale: number, width: number, height: number) => {
  element.style.width = width + 'px';
  element.style.height = height + 'px';
  element.width = width * scale;
  element.height = height * scale;
};

export const clearCanvasScreen = (context: CanvasRenderingContext2D, scale: number, width: number, height: number, color?: string) => {
  context.scale(scale, scale);
  context.fillStyle = color || 'transparent';
  context.fillRect(0, 0, width, height);
};

export const startLineFrom = (context: CanvasRenderingContext2D, x: number, y: number) => {
  context.beginPath();
  context.moveTo(x + 0.5, y + 0.5);
};

export const drawLineTo = (context: CanvasRenderingContext2D, x: number, y: number) => {
  context.lineTo(x + 0.5, y + 0.5);
};

type CanvasConstructorProps = {
  element: HTMLCanvasElement;
  scale: number;
  width: number;
  height: number;
};

type StartLineFromParams = {
  x: number;
  y: number;
};

type DrawLineToParams = StartLineFromParams;

type DrawCallbackParams = {
  context: CanvasRenderingContext2D;
  from: (params: StartLineFromParams) => void;
  to: (params: DrawLineToParams) => void;
};

export class Canvas {
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _scale: number = 1;
  private _width: number = 0;
  private _height: number = 0;

  constructor({ element, scale, width, height }: CanvasConstructorProps) {
    this._element = element;
    this._context = this._element.getContext('2d') as CanvasRenderingContext2D;
    this._scale = scale;
    this._width = width;
    this._height = height;

    this.setCanvasScale();
    this.clearCanvasScreen();
  }

  setCanvasScale() {
    this._element.style.width = this._width + 'px';
    this._element.style.height = this._height + 'px';
    this._element.width = this._width * this._scale;
    this._element.height = this._height * this._scale;
  }

  clearCanvasScreen = () => {
    this._context.scale(this._scale, this._scale);
    this._context.fillStyle = 'transparent';
    this._context.fillRect(0, 0, this._width, this._height);
  };

  startLineFrom = ({ x, y }: StartLineFromParams) => {
    this._context.beginPath();
    this._context.moveTo(x + 0.5, y + 0.5);
  };

  drawLineTo = ({ x, y }: DrawLineToParams) => {
    this._context.lineTo(x + 0.5, y + 0.5);
  };

  drawLine(callback: ({ context, from, to }: DrawCallbackParams) => unknown) {
    if (this._context) {
      callback({ context: this._context, from: this.startLineFrom, to: this.drawLineTo });
      this._context.stroke();
    }
  }
}
