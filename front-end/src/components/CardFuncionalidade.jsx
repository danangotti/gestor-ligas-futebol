
// O componente recebe um objeto contendo os dados: { titulo, descricao, icone }
export function CardFuncionalidade({ titulo, descricao, icone }) {
  return (
    // Card Container com a paleta oficial do Liggo
    // bg-white = Fundo branco
    // border border-border-main = Borda sutil (#E2E8F0)
    // rounded-xl = Borda arredondada
    // p-6 = Padding interno
    // hover:-translate-y-1 = Efeito sutil de elevação ao passar o mouse
    <div className="bg-white border border-border-main rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      
      {/* <div> do Ícone com fundo de destaque verde */}
      <div className="w-12 h-12 bg-bg-secondary rounded-lg flex items-center justify-center text-2xl mb-4">
        {icone}
      </div>

      {/* Título do Card */}
      <h3 className="text-lg font-bold text-text-primary mb-2">
        {titulo}
      </h3>

      {/* Descrição do Card */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {descricao}
      </p>

    </div>
  );
}