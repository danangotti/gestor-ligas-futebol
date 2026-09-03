import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PaginaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Hook do react-router-dom para navegação programática
  const navegar = useNavigate();

  function enviarFormulario(evento) {
    evento.preventDefault();
    console.log("Criando conta para:", nome, email, senha);

    // Redireciona o novo usuário direto para o painel
    navegar("/dashbord");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Crie sua conta no Liggo</h1>
          <p className="text-sm text-slate-500 mt-1">
            Comece a gerenciar suas ligas de futebol em poucos minutos
          </p>
        </div>

        <form onSubmit={enviarFormulario} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Nome Completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm mt-2"
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}