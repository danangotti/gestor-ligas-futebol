

export function Hero() {
return(
// 1. Tag externa da seção (Fundo cinza claro da paleta: #F8FAFC)
<section className="bg-bg-primary py-20 px-6">

{/* 2. Container centralizado em GRID (2 colunas) */}
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

{/* COLUNA 1 : Textos e Botões */}
{/* flex flex-col = empilha titulo, subtitulo e botoes */}
{/* items-start = alinhamento a esquerda */}
<div className="flex flex-col items-start">

{/* text-4xl md:text-5xl = fonte tem 36px no celular e 48 no pc(md) */}
{/* leading-tight = ajusta altura da linha */}
<h1 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
Organize seu campeonato de forma simples.</h1>

{/* mt-4 = afasta o paragrafo em 16px */}
{/* leading-relaxed = espaco leve entre linhas */}
<p className="text-lg text-text-secondary mt-4 leading-relaxed">
Crie ligas, cadastre equipes e jogadores, registre partidas e acompanhe a classificação em um só lugar.</p>

{/* flex flex-col sm:flex-row = no celular(col) ficam empilhados, e em telas maiores(sm:flex-row) eles ficam lado a lado */}
{/* gap-4 = cria espaco de 16px entre os botoes */}
{/* mt-8 = empurra os botoes 32px abaixo do texto */}
<div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">

{/* hover:bg-brand-green-dark altera a cor para o verde escuro #166534 ao passar o mouse. */}
{/* shadow-sm: Dá uma sombra bem sutil para descolar o botão do fundo. */}
<button className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-3 rounded-lg shadow-sm transition-colors">
Criar minha liga</button>

<button className="border border-border-main text-text-primary hover:bg-bg-secondary font-semibold px-6 py-3 rounded-lg transition-colors">
Conheça o sistema</button>
</div>
</div>

{/* COLUNA 2 (DIREITA): Card da Tabela (DEVE FICAR DENTRO DO GRID!) */}

{/* rounded-x1 = arredondamento dos cantos */}
{/* p-6 = padding interno */}
<div className="bg-white border border-border-main rounded-xl p-6">
<h3 className="text-brand-green font-bold border-b border-border-main pb-3 mb-6">Classificação</h3>

{/* space y-3 no <ol> = espacamento vertical de 16px */}
<ol className="space-y-4">
    {/* flex justify-between items-center na <li>: Encosta o nome do time na esquerda e os pontos na direita. */}
        {/* text-brand-green font-bold no 1º colocado */}
            <li className="flex justify-between items-center text-sm font-semibold text-text-primary py-2">
              <span>1º Cruzeiro</span>
              <span className="text-brand-green font-bold">24 pts</span>
            </li>
            <li className="flex justify-between items-center text-sm font-medium text-text-secondary py-2">
              <span>2º Flamengo</span>
              <span>21 pts</span>
            </li>
            <li className="flex justify-between items-center text-sm font-medium text-text-secondary py-2">
              <span>3º Palmeiras</span>
              <span>20 pts</span>
            </li>
          </ol>

</div>
</div>

</section>
)

}