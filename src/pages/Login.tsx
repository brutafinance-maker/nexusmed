import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { Stethoscope, Mail, Lock, User, UserCheck, ArrowLeft, Loader2 } from 'lucide-react';

export const Login = () => {
  const { user, loginWithGoogle, loginWithEmail, registerWithEmail, completeProfile, needsOnboarding } = useUser();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  // Pre-fill name if available during onboarding
  useEffect(() => {
    if (needsOnboarding && user) {
      if (user.name && !name) setName(user.name);
    }
  }, [needsOnboarding, user]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError('Falha ao entrar com Google. Tente novamente.');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'register') {
        if (!name || !nickname) {
          setError('Nome e Apelido são obrigatórios.');
          setLoading(false);
          return;
        }
        await registerWithEmail(email, password, name, nickname);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação. Verifique os dados.');
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await completeProfile(name, nickname);
    } catch (err: any) {
      setError('Erro ao salvar perfil.');
      setLoading(false);
    }
  };

  if (needsOnboarding) {
    return (
      <div className="min-h-screen bg-bg-slate flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pbl-card !p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-med-blue-light text-med-blue rounded-xl mb-4">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-text-main">Complete seu Perfil</h2>
              <p className="text-sm text-text-muted mt-2">Só mais um passo para começar sua trilha.</p>
            </div>

            <form onSubmit={handleCompleteProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-text-muted px-1 uppercase tracking-wider">Como deseja ser chamado?</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full pl-12 pr-4 py-3 bg-bg-slate border border-border rounded-xl focus:ring-2 focus:ring-med-blue-light outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-text-muted px-1 uppercase tracking-wider">Apelido (Username)</label>
                <div className="relative">
                  <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="@apelido"
                    className="w-full pl-12 pr-4 py-3 bg-bg-slate border border-border rounded-xl focus:ring-2 focus:ring-med-blue-light outline-none transition-all font-medium"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs font-bold px-1">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-med-blue text-white rounded-xl font-bold hover:bg-med-blue-dark transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Salvar e Entrar'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-slate flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-med-blue rounded-2xl mb-4 shadow-lg text-white">
            <Stethoscope size={32} />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-med-blue tracking-tighter"
          >
            NEXUS<span className="font-light">MED</span>
          </motion.h1>
          <p className="text-text-muted mt-2 font-medium">Educação Médica com Metodologia PBL.</p>
        </div>

        <motion.div 
          layout
          className="pbl-card !p-8 shadow-2xl shadow-med-blue/5 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-text-main mb-6">
                {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
              </h2>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'register' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-muted px-1 uppercase tracking-wider">Nome</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nome"
                          className="w-full px-4 py-3 bg-bg-slate border border-border rounded-xl focus:ring-2 focus:ring-med-blue-light outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-muted px-1 uppercase tracking-wider">Apelido</label>
                        <input 
                          type="text" 
                          required
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          placeholder="Apelido"
                          className="w-full px-4 py-3 bg-bg-slate border border-border rounded-xl focus:ring-2 focus:ring-med-blue-light outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-text-muted px-1 uppercase tracking-wider">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-bg-slate border border-border rounded-xl focus:ring-2 focus:ring-med-blue-light outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-text-muted px-1 uppercase tracking-wider">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3.5 bg-bg-slate border border-border rounded-xl focus:ring-2 focus:ring-med-blue-light outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-[11px] font-bold px-1">{error}</p>}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-med-blue text-white rounded-xl font-bold hover:bg-med-blue-dark transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (mode === 'login' ? 'Entrar agora' : 'Cadastrar conta')}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-text-muted font-bold">Ou continue com</span></div>
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white border border-border rounded-xl font-bold text-text-main hover:bg-slate-50 transition-all shadow-sm group active:scale-95"
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span className="text-sm">Google</span>
              </button>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                  className="text-sm text-text-muted hover:text-med-blue font-bold transition-colors"
                >
                  {mode === 'login' ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
