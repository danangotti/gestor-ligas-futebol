import logoLiggo from "../assets/LogoLiggo.png";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-border-main py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* BLOCO 1: LOGO DA MARCA */}
        <div className="flex items-center gap-2">
          <img src={logoLiggo} alt="Logo Liggo" className="h-9 w-auto" />
        </div>

        {/* BLOCO 2: MENU DE NAVEGAÇÃO */}
        <nav className="flex items-center gap-8">
          <a href="#funcionalidades" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors">
            Funcionalidades
          </a>
          <a href="#como-funciona" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors">
            Como funciona
          </a>
          <a href="#sobre" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors">
            Sobre
          </a>
        </nav>

        {/* BLOCO 3: AÇÕES DO USUÁRIO */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-text-primary hover:text-brand-green transition-colors">
            Entrar
          </button>
          <button className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
            Criar conta
          </button>
        </div>

      </div>
    </header>
  );
}