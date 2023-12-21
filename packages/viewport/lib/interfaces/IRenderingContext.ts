export default interface IRenderingContext<TImageSource, TImageData extends { data: any }> {
  canvas: TImageSource;
  globalAlpha: number;
  strokeStyle: any;
  fillStyle: any;
  font: string;
  save(): void;
  restore(): void;
  beginPath(): void;
  closePath(): void;
  fill(): void;
  fillText(text: string, x: number, y: number): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
  stroke(): void;
  lineTo(x: number, y: number): void;
  clearRect(x: number, y: number, w: number, h: number): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  scale(x: number, y: number): void;
  drawImage(
    image: TImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ): void;
  createImageData(sw: number, sh: number): TImageData;
  getImageData(sx: number, sy: number, sw: number, sh: number): TImageData;
  putImageData(imageData: TImageData, dx: number, dy: number): void;
}
