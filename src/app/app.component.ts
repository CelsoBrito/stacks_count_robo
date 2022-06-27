import { Robo } from './sketch/robo/robo';
import { Estoque } from './sketch/estoque/estoque';
import { Item, Caminho } from './sketch/';
import { Component, OnInit, ViewChild} from '@angular/core';
import { P5JSInvoker } from './drawing/p5-jsinvoker';

import entidade from './data/entidade.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends P5JSInvoker implements OnInit{
  @ViewChild('canvasElement')
  canvasElement: HTMLElement | undefined;
  roboIndicePosicao: number = 0;
  tempoAtualizar: number;

  caminhos = new Array<Caminho>();
  itens = new Array<Item>();
  estoques = new Array<Estoque>();
  robos = new Array<Robo>();

  public canvasDimensions = { w: 8, h: 20};
  tamanhoDaMalhaEmPixel = 50;

  constructor() {
    super();
    this.tempoAtualizar = 1000;
    this.startP5JS(this.canvasElement!);
  }

  ngOnInit(): void {
    this.addCaminhos();
    this.addItens();
    this.addEstoques();
    this.addRobo();
  }

  setup() {
    this.p5.createCanvas(
      this.malhaParaPixel(this.canvasDimensions.w),
      this.malhaParaPixel(this.canvasDimensions.h)
    ).parent('canvasElement');
    setTimeout(() => this.atualizarRobo(this), this.tempoAtualizar);
  }

  draw() {
    this.p5.background(245);

    // CAMINHO
    this.mostrarCaminhos();

    // ESTOQUES
    this.mostrarEstoques();

    // ITENS
    this.mostrarItens();

    // CONTORNO DO CANVAS
    this.mostrarCanvas();

    // ROBÔ
    this.mostrarRobos();


  }

  addItens() {
    entidade.itens.map(itens => {
      let novoItem = new Item(this.p5, this.tamanhoDaMalhaEmPixel);
      novoItem.criar(
        this.p5,
        itens.x,
        itens.y,
        itens.w,
        itens.h,
        itens.quantidade,
        itens.nome,
        itens.cor
      );

      this.itens.push(novoItem);
    });
  }

  mostrarItens() {
    this.itens.map(item => {
      item.mostrar(this.p5);
    });
  }

  addCaminhos() {
    entidade.caminho.map(caminho => {
      let novoCaminho = new Caminho(this.tamanhoDaMalhaEmPixel);
      novoCaminho.criar(
        caminho.x,
        caminho.y,
        caminho.w,
        caminho.h
      );

      this.caminhos.push(novoCaminho);
    });
  }

  mostrarCaminhos() {
    this.caminhos.map(caminho => {
      caminho.mostrar(this.p5);
    });
  }

  addEstoques() {
    entidade.estoque.map(estoque => {
      let novoEstoque = new Estoque(this.tamanhoDaMalhaEmPixel);
      novoEstoque.criar(
        estoque.x,
        estoque.y,
        estoque.w,
        estoque.h
      );

      this.estoques.push(novoEstoque);
    });
  }

  mostrarEstoques() {
    this.estoques.map(estoque => {
      estoque.mostrar(this.p5);
    });
  }

  addRobo() {
    let novoRobo = new Robo(this.tamanhoDaMalhaEmPixel);
    novoRobo.criar(
      this.malhaParaPixelRobo(1),
      this.malhaParaPixelRobo(0)
    );

    this.robos.push(novoRobo);
  }

  mostrarRobos() {
    this.robos.map(robo => {
      robo.mostrar(this.p5);
    });
  }

  atualizarRobo(that: this) {
    if (entidade.robo.posicoes.length > that.roboIndicePosicao + 1) {
      ++that.roboIndicePosicao;
      that.robos[0].x = that.malhaParaPixelRobo(
        entidade.robo
        .posicoes[that.roboIndicePosicao].x
      );
      that.robos[0].y = that.malhaParaPixelRobo(
        entidade.robo
        .posicoes[that.roboIndicePosicao].y
      );
      setTimeout(() => that.atualizarRobo(that), that.tempoAtualizar); // delay de 1 segundo
    }
  }

  mostrarCanvas() {
    this.p5.noFill();
    this.p5.strokeWeight(3);
    this.p5.rect(
      0,
      0,
      this.malhaParaPixel(this.canvasDimensions.w),
      this.malhaParaPixel(this.canvasDimensions.h)
    );
  }

  malhaParaPixelRobo(valor: number): number {
    return valor*this.tamanhoDaMalhaEmPixel + (this.tamanhoDaMalhaEmPixel/2);
  }

  malhaParaPixel(valor: number): number {
    return valor*this.tamanhoDaMalhaEmPixel;
  }
}
