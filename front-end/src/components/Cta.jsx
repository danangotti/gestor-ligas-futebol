// src/components/Cta.jsx

export function Cta() {
  return (
    // <section className="max-w-7xl mx-auto px-6 py-12">
    // Centraliza o container na tela com margens respiráveis
    <section className="max-w-7xl mx-auto px-6 py-12">
      
      {/* CARD DO CTA */}
      {/* bg-brand-green = Fundo verde principal oficial da marca (#16A34A) */}
      {/* rounded-2xl = Cantos bem arredondados para visual moderno de SaaS */}
      {/* p-10 md:p-16 = Espaçamento interno amplo */}
      {/* text-center = Alinha todos os textos no centro */}
      {/* shadow-lg = Sombra suave para destacar do fundo */}
      <div className="bg-brand-green rounded-2xl p-10 md:p-16 text-center text-white shadow-lg">
        
        {/* Título do CTA */}
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Pronto para organizar o seu campeonato?
        </h2>

        {/* Subtítulo explicativo */}
        <p className="text-lg text-green-50 mt-4 max-w-2xl mx-auto leading-relaxed">
          Crie sua liga gratuitamente e experimente a plataforma completa em menos de 2 minutos.
        </p>

        {/* Botão de Ação do CTA */}
        {/* bg-white = Fundo branco para dar o máximo de contraste com o card verde */}
        {/* text-brand-green-dark = Texto em verde escuro (#166534) para leitura limpa */}
        {/* hover:bg-green-50 = Transição suave ao passar o mouse */}
        <div className="mt-8 flex justify-center">
          <button className="bg-white hover:bg-green-50 text-brand-green-dark font-bold px-8 py-4 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5">
            Criar minha liga grátis
          </button>
        </div>

      </div>

    </section>
  );
}