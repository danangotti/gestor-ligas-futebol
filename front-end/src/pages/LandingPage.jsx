// src/pages/LanndingPage

// 1. IMPORTAÇÃO DOS COMPONENTES
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { CardFuncionalidade } from "../components/CardFuncionalidade";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { ModalCriarLiga } from "../components/ModalCriarLiga";


export default function LandingPage() {

  // Criamos o estado:
  
  // - isModalAberto: começa como 'false' (modal fechado)
  // - setIsModalAberto: função usada para trocar o valor
  const [isModalAberto, setIsModalAberto] = useState(false);


  return (
    
    // <div min-h-screen>: Mantém o fundo ocupando 100% da altura da tela (#F8FAFC)
    <div className="min-h-screen bg-bg-primary text-text-primary">
      
      {/* 1. Header do topo da aplicação*/}
      <Header />

      {/* 2. Banner Principal da página (Hero)*/}
      <main>


        <Hero onAbrirModal={() => setIsModalAberto(true)}/>

        {/* SEÇÃO DE FUNCIONALIDADES (Usando o Fundo Secundário #F1F5F9 para variar o tom!)[cite: 2] */}
        <section className="bg-bg-secondary py-20 px-6 border-t border-border-main">
          
          <div className="max-w-7xl mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-text-primary">
                Tudo o que você precisa para gerenciar sua liga
              </h2>
              <p className="text-text-secondary mt-3 text-base">
                Recursos desenvolvidos para simplificar a organização do seu campeonato amador ou profissional.
              </p>
            </div>

            {/* Grid dos 3 Cards passando as Props dinâmicas[cite: 3] */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <CardFuncionalidade 
                icone="🏆"
                titulo="Criação de Ligas"
                descricao="Configure campeonatos de pontos corridos ou eliminatórias em poucos cliques com regras personalizadas."
              />

              <CardFuncionalidade 
                icone="👥"
                titulo="Gestão de Equipes"
                descricao="Cadastre times, escudos e o elenco completo de jogadores sem nenhuma complicação."
              />

              <CardFuncionalidade 
                icone="📊"
                titulo="Tabela Automática"
                descricao="Atualização de pontos, saldo de gols e estatísticas em tempo real após o registro das partidas."
              />

            </div>
          </div>

        </section>

        {/* Chamada para Ação (CTA) */}
        {/* passa a prop(pode inventar o nome) pro cta conseguir abrir modal*/}
        {/* e atribui a ela a ação que acontece quando executada*/}
          <Cta onAbrirModal={() => setIsModalAberto(true)}/>  
      </main>

      <Footer />

      {/* MODAL CONECTADO AO ESTADO */}
      <ModalCriarLiga 
        isOpen={isModalAberto} 
        onClose={() => setIsModalAberto(false)} 
      />
    
    </div>
    
  );
}