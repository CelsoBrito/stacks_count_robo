import p5 from 'p5';

export class Estoque {
  cima: boolean = false;
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  quantidade: number = 0;

  tamanhoDaMalhaEmPixel: number;

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
    s.stroke(0);
    s.strokeWeight(2);
    s.noFill();

    this.corMouseCobre(s);

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

  corMouseCobre(s: p5) {
    if(this.cima){
      s.noFill();
    }else{
      s.noFill();
      s.rect(
        this.malhaParaPixel(this.x),
        this.malhaParaPixel(this.y),
        this.malhaParaPixel(this.w),
        this.malhaParaPixel(this.h)
      );
      let novaCor = s.color('#000');
      novaCor.setAlpha(50);
      s.fill(novaCor);
    }
  }

  malhaParaPixel(valor: number): number {
    return valor*this.tamanhoDaMalhaEmPixel;
  }
}
