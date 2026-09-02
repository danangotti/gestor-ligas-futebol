import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function enviarFormulario(evento) {
    evento.preventDefault();
    console.log("Enviando e-mail:", email);
    console.log("Enviando senha:", senha);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* CARD DE LOGIN */}
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        
        {/* TÍTULO */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Acesse sua conta</h1>
          <p className="text-sm text-slate-500 mt-1">
            Entre com suas credenciais para gerenciar suas ligas
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={enviarFormulario} className="flex flex-col gap-4">
          
          {/* CAMPO DE E-MAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />
          </div>

          {/* CAMPO DE SENHA */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />
          </div>

          {/* BOTÃO DE ENVIAR */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm mt-2"
          >
            Entrar
          </button>
        </form>

        {/* LINK PARA VOLTAR À LANDING PAGE */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-slate-500 hover:text-green-600 transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>

      </div>
    </div>
  );
}