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

type Axis = { x: number; y: number };

type Size = { width: number; height: number };

type BoxStyle = {
  background: CanvasFillStrokeStyles['fillStyle'];
};

type LineStyle = {
  strokeWidth: number;
  fill: CanvasFillStrokeStyles['fillStyle'];
};

type Listeners = {
  onHover: (Partial<BoxStyle> & { return?: () => unknown }) | (() => unknown);
  onActive: (Partial<BoxStyle> & { return?: () => unknown }) | (() => unknown);
  onClick: () => unknown;
};

type StartLineFromParams = Axis;
type DrawLineToParams = Axis;
type DrawBoxParams = Size & Axis & BoxStyle & Partial<Listeners>;
type DrawLineParams = Partial<Size> & Axis & LineStyle;

type CanvasConstructorProps = {
  element: HTMLCanvasElement;
  scale: number;
  pointerAxis?: Axis;
  mouseClick?: boolean;
  mouseActive?: boolean;
} & Size;

export class Canvas {
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _scale: number = 1;
  private _width: number = 0;
  private _height: number = 0;
  private _pointerAxis: Axis;
  private _mouseClick: boolean = false;
  private _mouseActive: boolean = false;

  constructor({ element, scale, width, height, pointerAxis = {} as Axis, mouseClick = false, mouseActive = false }: CanvasConstructorProps) {
    this._element = element;
    this._context = this._element.getContext('2d') as CanvasRenderingContext2D;
    this._scale = scale;
    this._width = width;
    this._height = height;
    this._pointerAxis = pointerAxis;
    this._mouseClick = mouseClick;
    this._mouseActive = mouseActive;
    this._setCanvasScale();
    this._clearCanvasScreen();
  }

  private _setCanvasScale = () => {
    this._element.style.width = this._width + 'px';
    this._element.style.height = this._height + 'px';
    this._element.width = this._width * this._scale;
    this._element.height = this._height * this._scale;
  };

  private _clearCanvasScreen = () => {
    this._context.scale(this._scale, this._scale);
    this._context.fillStyle = 'transparent';
    this._context.fillRect(0, 0, this._width, this._height);
  };

  private _startLineFrom = ({ x, y }: StartLineFromParams) => {
    this._context.beginPath();
    this._context.moveTo(x + 0.5, y + 0.5);
  };

  private _drawLineTo = ({ x, y }: DrawLineToParams) => {
    this._context.lineTo(x + 0.5, y + 0.5);
  };

  private _setBoxStyle({ background }: BoxStyle) {
    this._context.fillStyle = background;
  }

  drawBox = ({ x, y, width, height, background, onHover, onActive, onClick }: DrawBoxParams) => {
    if (!this._context) return false;

    const box = new Path2D();
    box.rect(x, y, width, height);

    const isHover = this._context.isPointInPath(box, this._pointerAxis.x * this._scale, this._pointerAxis.y * this._scale);

    this._context.fillStyle = background || '';

    if (isHover && typeof onHover !== 'function') {
      if (onHover?.background) this._context.fillStyle = onHover?.background;
      if (onHover?.return) onHover?.return();
    } else if (isHover && typeof onHover === 'function') onHover();

    if (this._mouseActive && isHover && typeof onActive !== 'function') {
      if (onActive?.background) this._context.fillStyle = onActive?.background;
      if (onActive?.return) onActive?.return();
    } else if (isHover && typeof onActive === 'function') onActive();

    if (this._mouseClick && isHover && typeof onClick === 'function') onClick();

    this._context.fill(box);
  };

  drawLine = ({ x, y, strokeWidth, width, height, fill }: DrawLineParams) => {
    if (!this._context) return false;

    this._startLineFrom({ x, y });

    this._context.lineWidth = strokeWidth;
    this._context.strokeStyle = fill;

    if (width) this._drawLineTo({ x: x + width || this._width, y });
    else if (height) this._drawLineTo({ x, y: y + height || this._height });

    this._context.stroke();
  };
}
