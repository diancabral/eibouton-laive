import type * as CSS from 'csstype';

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

type Axis = { x?: number; y?: number };

type Size = { width: number; height: number };

type BoxStyle = {
  background: CanvasFillStrokeStyles['fillStyle'];
  cursor?: CSS.Property.Cursor;
};

type LineStyle = {
  strokeWidth: number;
  fill: CanvasFillStrokeStyles['fillStyle'];
};

type TextStyle = {
  color: string;
  font?: string;
  align: CanvasTextAlign;
  value: string;
};

type Listeners = {
  onHover: (Partial<BoxStyle> & { return?: () => unknown }) | (() => unknown);
  onActive: (Partial<BoxStyle> & { return?: () => unknown }) | (() => unknown);
  onBlur: () => unknown;
  onClick: () => unknown;
};

type CanvasDrawLineToParams = Axis;
type CanvasStartLineFromParams = Axis;

export type CanvasDrawBoxParams = Size & Axis & BoxStyle & Partial<Listeners>;
export type CanvasDrawLineParams = Partial<Size> & Axis & LineStyle;
export type CanvasWriteTextParams = Axis & TextStyle;

type CanvasConstructorProps = {
  element: HTMLCanvasElement;
  name?: string;
  scale?: number;
  pointerAxis?: Axis;
  mouseClick?: boolean;
  mouseActive?: boolean;
  scrollY?: number;
} & Size;

export class Canvas {
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _scale: number;
  private _width: number;
  private _height: number;
  private _pointerAxis: Axis;
  private _mouseClick: boolean;
  private _mouseActive: boolean;
  private _mouseHover = false;
  private _scrollY: number;

  constructor({ element, scale = 1, width = 0, height = 0, pointerAxis = {} as Axis, mouseClick = false, mouseActive = false, scrollY = 0 }: CanvasConstructorProps) {
    this._element = element;
    this._context = this._element.getContext('2d') as CanvasRenderingContext2D;
    this._scale = scale;
    this._width = width;
    this._height = height;
    this._pointerAxis = pointerAxis;
    this._mouseClick = mouseClick;
    this._mouseActive = mouseActive;
    this._scrollY = scrollY;
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

  private _startLineFrom = ({ x = 0, y = 0 }: CanvasStartLineFromParams) => {
    this._context.beginPath();
    this._context.moveTo(x + 0.5, y + 0.5 + this._scrollY);
  };

  private _drawLineTo = ({ x = 0, y = 0 }: CanvasDrawLineToParams) => {
    this._context.lineTo(x + 0.5, y + 0.5 + this._scrollY);
  };

  private get pointerY() {
    return (this._pointerAxis.y || 0) * this._scale;
  }

  private get pointerX() {
    return (this._pointerAxis.x || 0) * this._scale;
  }

  drawBox = ({ x = 0, y = 0, width, height, background, onHover, onActive, onClick }: CanvasDrawBoxParams) => {
    if (!this._context) return false;

    const box = new Path2D();
    box.rect(x, y + this._scrollY, width, height);

    const isHover = this._context.isPointInPath(box, this.pointerX, this.pointerY);

    this._context.fillStyle = (background || '') as string;

    if (isHover) {
      if (typeof onHover !== 'function') {
        if (onHover?.background) this._context.fillStyle = onHover?.background as string;
        if (onHover?.cursor) this._element.style.cursor = onHover?.cursor;
        if (onHover?.return) onHover?.return();
      } else if (isHover && typeof onHover === 'function') {
        onHover();
      }
      this._mouseHover = true;
    } else {
      if (!this._mouseHover) this._element.style.cursor = '';
    }

    if (this._mouseActive && isHover && typeof onActive !== 'function') {
      if (onActive?.background) this._context.fillStyle = onActive?.background as string;
      if (onActive?.return) onActive?.return();
    } else if (this._mouseActive && isHover && typeof onActive === 'function') onActive();

    if (this._mouseClick && isHover && typeof onClick === 'function') onClick();

    this._context.fill(box);
  };

  drawLine = ({ x = 0, y = 0, strokeWidth, width, height, fill }: CanvasDrawLineParams) => {
    if (!this._context) return false;

    this._startLineFrom({ x, y });

    this._context.lineWidth = strokeWidth;
    this._context.strokeStyle = fill;

    if (width) this._drawLineTo({ x: x + width || this._width, y });
    else if (height) this._drawLineTo({ x, y: y + height || this._height });

    this._context.stroke();
  };

  writeText = ({ x = 0, y = 0, color, align, font = '700 10px Albert Sans', value }: CanvasWriteTextParams) => {
    if (!this._context) return false;
    this._context.font = font;
    this._context.fillStyle = color;
    this._context.textAlign = align;
    this._context.fillText(value, x, y + this._scrollY);
  };
}
