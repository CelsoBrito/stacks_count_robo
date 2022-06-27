import p5 from 'p5';

export class Caminho {
  cima: boolean = false;
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;

  tamanhoDaMalhaEmPixel: number;
  caminhoColor = {
    on: '#dfefff',
    off: '#d0e5f7'
  }

  constructor(tamanhoDaMalhaEmPixel: number) {
    this.tamanhoDaMalhaEmPixel = tamanhoDaMalhaEmPixel;
  }

  criar(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  mostrar(s: p5) {
    s.noStroke();
    this.cima
      ? s.fill(this.caminhoColor.on)
      : s.fill(this.caminhoColor.off);
    s.rect(
      this.malhaParaPixel(this.x),
      this.malhaParaPixel(this.y),
      this.malhaParaPixel(this.w),
      this.malhaParaPixel(this.h)
    );

    this.emCima(s);
  }

  emCima(s: p5) {
    if((this.malhaParaPixel(this.x) < s.mouseX)
      && (this.malhaParaPixel(this.x) +
      this.malhaParaPixel(this.w) > s.mouseX)
      && (this.malhaParaPixel(this.y) < s.mouseY)
      && (this.malhaParaPixel(this.y) +
      this.malhaParaPixel(this.h) > s.mouseY)
    ){
      this.cima = false;
    } else {
      this.cima = true;
    }
  }

  malhaParaPixel(valor: number): number {
    return valor*this.tamanhoDaMalhaEmPixel;
  }
}
