import p5 from 'p5';

export class Robo {
  cima: boolean = false;
  x: number = 0;
  y: number = 0;
  diametro: number = 40;
  roboDistancia!: number;
  cor: string = "#00f";

  tamanhoDaMalhaEmPixel: number;

  constructor(tamanhoDaMalhaEmPixel: number) {
    this.tamanhoDaMalhaEmPixel = tamanhoDaMalhaEmPixel;
  }

  criar(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  mostrar(s: p5) {
    s.noStroke();
    s.fill(this.cor);
    s.circle(this.x, this.y, this.diametro);
    s.stroke(0);

    this.emCima(s);
  }

  emCima(s: p5) {
    this.roboDistancia = s.dist(s.mouseX, s.mouseY, this.x , this.y)
    this.roboDistancia<20 ? this.cor = '#0b0bbb' : this.cor = '#00f';

    if(this.roboDistancia<20) {
      s.fill('#000');
      s.noStroke();
      s.rect(s.mouseX, s.mouseY + 30, 95, 60,8,8,8,8);
      s.fill('#fff');
      s.textSize(30);
      s.textStyle('bold');
      s.text("Robô", s.mouseX + 10, s.mouseY + 70);
    }
  }

  malhaParaPixel(valor: number): number {
    return valor*this.tamanhoDaMalhaEmPixel;
  }
}
