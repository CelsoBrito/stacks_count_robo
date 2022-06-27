import p5 from 'p5';

export class Item{
  cima: boolean = false;
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  quantidade: number = 0;
  nome: string = '';
  cor: string = '#ffff00';

  s: p5;

  xToolTip: number = 0;
  yToolTip: number = 30;
  wToolTip: number = 200;
  hToolTip: number = 105;

  tamanhoDaMalhaEmPixel: number;

  constructor(s: p5, tamanhoDaMalhaEmPixel: number) {
    this.tamanhoDaMalhaEmPixel = tamanhoDaMalhaEmPixel;
    this.s = s;
  }


  criar(s: p5, x: number, y: number, w: number, h: number,
    quantidade: number, nome: string, cor: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.quantidade = quantidade;
    this.nome = nome;
    this.cor = cor;
    this.posicaoToolTip(s);
  }

  mostrar(s: p5) {
    s.stroke(0);
    s.strokeWeight(2);
    s.fill(this.cor);

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
      s.fill('#000');
      s.noStroke();

      this.posicaoToolTip(s);

      s.rect(
        s.mouseX + this.xToolTip,
        s.mouseY + this.yToolTip,
        this.wToolTip,
        this.hToolTip,
      8,8,8,8);
      s.fill('#fff');
      s.textSize(25);
      s.textStyle('bold');
      s.text(
        this.nome+' Qttd: '+this.quantidade,
        s.mouseX + this.xToolTip + 10,
        s.mouseY + this.yToolTip + 10,
        190,
        100
      );
    } else {
      this.cima = true;
    }
  }

  posicaoToolTip(s: p5) {
    this.xToolTipf(s);
    this.yToolTipf(s);
  }

  corMouseCobre(s: p5) {
    if(this.cima){
      s.fill(this.cor);
    }else{
      s.fill(this.cor);
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

  xToolTipf = (s: p5): number => {
    if(s.mouseX + this.wToolTip < 8*50){
      this.xToolTip = 0;
      return this.xToolTip;
    }else{
      this.xToolTip = -200;
      return this.xToolTip;
    }
  };

  yToolTipf = (s: p5): number => {
    if(s.mouseY + this.hToolTip < 20*50){
      this.yToolTip = 30;
      return this.yToolTip;
    }else{
      this.yToolTip = -100;
      return this.yToolTip;
    }
  };

  malhaParaPixel(valor: number): number {
    return valor*this.tamanhoDaMalhaEmPixel;
  }
}
