import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Quais são os tipos de capacidade de carga dos Pallet de Plástico?",
    answer: "Um Pallet de Plástico pode ter três tipos de capacidade de carga, sendo elas:\nCarga Dinâmica: carga suportada pelo pallet em movimento.\nCarga Estática: carga suportada pelo pallet quando está em repouso no chão.\nCarga no Porta Pallet (ou Estante de Pallets): carga suportada pelo pallet quando está apoiado apenas pelas suas extremidades no Porta Pallet."
  },
  {
    question: "Quais são as aplicações de uma pallet de plástico?",
    answer: "O Pallet de Plástico é ideal para: indústrias alimentícias e farmacêuticas; cozinhas industriais; segmento hospitalar e laboratórios; logística reversa; armazenamento, manuseio e transporte de cargas em geral; áreas úmidas e câmaras frias sendo resistente a temperaturas negativas quando fabricado em material virgem."
  },
  {
    question: "Quanto tempo dura um Pallet de Plástico?",
    answer: "O Pallet Plástico quando utilizado de maneira correta seguindo todas as recomendações do fabricante pode durar até 10 anos, tendo uma vida útil 3 vezes maior que o pallet de madeira, por exemplo. Podendo gerar uma economia para as indústrias de até 75%."
  },
  {
    question: "Por que utilizar o Pallet de Plástico da LAR Plásticos?",
    answer: "O Pallet Plástico é mais resistente e 100% reciclável. Fabricado em diversas cores, não solta farpas como os em madeira, demanda pouca manutenção e é mais barato a longo prazo.\n\nAlém de possuir peso constante, reduzindo os custos logísticos da sua empresa."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600">
            Tire suas dúvidas sobre a operação com pallets plásticos e descubra todas as vantagens de modernizar a sua frota.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-brand-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-display font-semibold text-slate-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-brand-600' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
