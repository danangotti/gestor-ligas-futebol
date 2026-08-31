// src/components/Footer.jsx

// Importamos a logo oficial da marca Liggo
import logoLiggo from "../assets/LogoLiggo.png";

export function Footer() {
  return (
    // <footer className="...">: O container do rodapé
    // bg-white = Fundo branco limpo
    // border-t border-border-main = Divisória sutil no topo (#E2E8F0)[cite: 2]
    // py-12 px-6 = Espaçamento interno (48px em cima/baixo, 24px nas laterais)
    <footer className="bg-white border-t border-border-main py-12 px-6 mt-16">
      
      {/* <div> do Container Principal:
          max-w-7xl mx-auto = Centraliza o conteúdo na tela
          flex flex-col md:flex-row = Empilhado no celular, lado a lado no computador (md)
          justify-between items-center = Espaça os elementos e alinha verticalmente no centro */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* COLUNA 1: LOGO E DESCRIÇÃO CURTA DA MARCA */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={logoLiggo} alt="Logo Liggo" className="h-7 w-auto" />
          <p className="text-xs text-text-secondary text-center md:text-left">
            A plataforma completa para gestão de ligas e campeonatos de futebol.
          </p>
        </div>

        {/* COLUNA 2: LINKS RÁPIDOS DE NAVEGAÇÃO */}
        {/* text-text-secondary = Cor cinza secundária (#64748B)[cite: 2] */}
        {/* hover:text-brand-green = Transição para a cor verde principal (#16A34A) ao passar o mouse[cite: 2] */}
        <nav className="flex items-center gap-6 text-sm font-medium text-text-secondary">
          <a href="#funcionalidades" className="hover:text-brand-green transition-colors">
            Funcionalidades
          </a>
          <a href="#como-funciona" className="hover:text-brand-green transition-colors">
            Como funciona
          </a>
          <a href="#sobre" className="hover:text-brand-green transition-colors">
            Sobre
          </a>
        </nav>

      </div>

      {/* LINHA INFERIOR DE DIREITOS AUTORAIS */}
      {/* border-t border-slate-100 = Divisória interna bem suave */}
      {/* pt-6 mt-8 = Espaçamento superior */}
      <div className="max-w-7xl mx-auto border-t border-slate-100 mt-8 pt-6 text-center text-xs text-text-secondary">
        <p>© {new Date().getFullYear()} Liggo. Todos os direitos reservados.</p>
      </div>

    </footer>
  );
}