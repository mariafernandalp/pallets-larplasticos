import { motion } from 'motion/react';
import { ArrowRight, Phone, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function FinalCTA() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/create-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, whatsapp, email, empresa, mensagem }),
      });

      if (!res.ok) throw new Error('Erro ao enviar');

      await res.json();
      setStatus('success');

      // Dispara o Pixel do Meta (Facebook) para evento de Lead
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <section id="contato" className="py-24 bg-[#0B1120] relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Recebemos sua solicitação!
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Um de nossos especialistas entrará em contato em breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="py-24 bg-[#0B1120] relative overflow-hidden flex items-center">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Fale Conosco</span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1]">
              Pronto para otimizar sua <span className="text-brand-500">cadeia de suprimentos?</span>
            </h2>

            <p className="text-slate-400 text-lg mb-12">
              Preencha o formulário e um de nossos especialistas entrará em contato para oferecer a melhor solução em Pallets Plásticos para sua operação.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Atendimento Rápido</h4>
                  <p className="text-slate-400">Nossa equipe comercial está de prontidão.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Garantia de Fábrica</h4>
                  <p className="text-slate-400">Direto da maior indústria de plásticos do Brasil.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="joao@empresa.com.br"
                  className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Empresa</label>
                <input
                  type="text"
                  required
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Nome da sua empresa"
                  className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Como podemos ajudar?</label>
                <textarea
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Nos conte sobre sua operação (tipo de indústria, armazenamento em solo ou porta-pallet, peso da carga) e a quantidade estimada."
                  className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Erro ao enviar. Tente novamente ou ligue para nós.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-bold px-4 py-4 rounded-lg flex items-center justify-center transition-colors group text-[15px]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar Cotação
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
