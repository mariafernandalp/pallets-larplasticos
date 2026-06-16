import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react';

const products = [
  {
    name: "Flex Pallet",
    type: "Movimentação intensa em solo",
    badge: "Carga Dinâmica",
    imgId: "flex",
    variants: [
      {
        name: "Liso 3 Run.",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 150mm' },
          { label: 'Peso', value: '15,8Kg' },
          { label: 'Material', value: 'PEAD ou PP' },
          { label: 'Carga Estática', value: '7000Kg' }
        ]
      },
      {
        name: "Vazado 3 Run.",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 105mm' },
          { label: 'Peso', value: '14,8Kg' },
          { label: 'Material', value: 'PEAD ou PP' },
          { label: 'Carga Estática', value: '5000Kg' }
        ]
      },
      {
        name: "Liso 3 Run. + Abas",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 105mm' },
          { label: 'Peso', value: '15,8Kg' },
          { label: 'Material', value: 'PEAD ou PP' },
          { label: 'Carga Estática', value: '7000Kg' }
        ]
      },
      {
        name: "Vaz. 3 Run. + Abas",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 105mm' },
          { label: 'Peso', value: '14,8Kg' },
          { label: 'Material', value: 'PEAD ou PP' },
          { label: 'Carga Estática', value: '5000Kg' }
        ]
      }
    ]
  },
  {
    name: "Eco Pallet",
    type: "Fabricado com resinas recuperadas",
    badge: "Sustentável",
    imgId: "eco",
    specs: [
      { label: 'Dimensões', value: '1000 x 1200 x 150mm' },
      { label: 'Peso', value: '8,5Kg' },
      { label: 'Material', value: 'PEAD ou PP' },
      { label: 'Carga Estática', value: '2000Kg' },
      { label: 'Carga Dinâmica', value: '800Kg' }
    ]
  },
  {
    name: "Heavy Pallet",
    type: "Para as maiores cargas da indústria",
    badge: "Máxima Carga",
    imgId: "heavy",
    specs: [
      { label: 'Dimensões', value: '1000 x 1200 x 160mm' },
      { label: 'Peso', value: '20Kg' },
      { label: 'Material', value: 'PEAD ou PP' },
      { label: 'Carga Estática', value: 'Até 8000Kg' },
      { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
      { label: 'No Rack', value: 'Até 1200Kg (Virgem)' },
    ]
  },
  {
    name: "Smart Pallet",
    type: "Movimentações curtas e exportação",
    badge: "Versátil",
    imgId: "smart",
    variants: [
      {
        name: "1210-6 Liso",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 150mm' },
          { label: 'Peso', value: '15,8 Kg' },
          { label: 'Material', value: 'PEAD ou PP' },
          { label: 'Cores', value: 'Preto, Branco, Cinza, Virgem' },
          { label: 'Carga Estática', value: '7600Kg' },
          { label: 'Carga Dinâmica', value: '2000Kg' },
          { label: 'No rack', value: '1000Kg' },
        ]
      },
      {
        name: "1210-6 Vazado",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 150mm' },
          { label: 'Peso', value: '14,7 Kg' },
          { label: 'Material', value: 'PEAD ou PP' },
          { label: 'Cores', value: 'Preto, Branco, Cinza, Virgem' },
          { label: 'Carga Estática', value: '7000Kg' },
          { label: 'Carga Dinâmica', value: '2000Kg' },
          { label: 'No rack', value: '1000Kg' },
        ]
      }
    ]
  },
  {
    name: "Master Pallet",
    type: "Ambientes super exigentes",
    badge: "Heavy Duty",
    imgId: "master",
    variants: [
      {
        name: "Liso",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 170mm' },
          { label: 'Peso', value: '20Kg' },
          { label: 'Material', value: 'PEAD ou PEMD' },
          { label: 'Carga Estática', value: 'Até 8000Kg' },
          { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
          { label: 'No Rack', value: 'Até 1500Kg (Virgem)' },
        ]
      },
      {
        name: "Vazado",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 170mm' },
          { label: 'Peso', value: '18,8Kg' },
          { label: 'Material', value: 'PEAD ou PEMD' },
          { label: 'Carga Estática', value: 'Até 8000Kg' },
          { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
          { label: 'No Rack', value: 'Até 1500Kg (Virgem)' },
        ]
      },
      {
        name: "4 Ent. Liso",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 170mm' },
          { label: 'Peso', value: '20Kg' },
          { label: 'Material', value: 'PEAD / PEMD' },
          { label: 'Carga Estática', value: 'Até 8000Kg' },
          { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
          { label: 'No Rack', value: 'Até 700Kg (Virgem)' },
        ]
      },
      {
        name: "4 Ent. Vazado",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 170mm' },
          { label: 'Peso', value: '18,5Kg' },
          { label: 'Material', value: 'PEAD / PEMD' },
          { label: 'Carga Estática', value: 'Até 8000Kg' },
          { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
          { label: 'No Rack', value: 'Até 700Kg (Virgem)' },
        ]
      },
      {
        name: "4 Ent. + Abas Liso",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 180mm' },
          { label: 'Peso', value: '20Kg' },
          { label: 'Material', value: 'PEAD / PEMD' },
          { label: 'Carga Estática', value: 'Até 8000Kg' },
          { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
          { label: 'No Rack', value: 'Até 700Kg (Virgem)' },
        ]
      },
      {
        name: "4 Ent. + Abas Vaz.",
        specs: [
          { label: 'Dimensões', value: '1000 x 1200 x 180mm' },
          { label: 'Peso', value: '19Kg' },
          { label: 'Material', value: 'PEAD / PEMD' },
          { label: 'Carga Estática', value: 'Até 8000Kg' },
          { label: 'Carga Dinâmica', value: 'Até 2500Kg' },
          { label: 'No Rack', value: 'Até 700Kg (Virgem)' },
        ]
      }
    ]
  }
];

function ProductCard({ product }: { product: any, key?: string | number }) {
  const [activeVariant, setActiveVariant] = useState(0);
  
  const hasVariants = product.variants && product.variants.length > 0;
  const currentSpecs = hasVariants ? product.variants[activeVariant].specs : product.specs;
  const currentTypeName = hasVariants ? product.variants[activeVariant].name : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-300 transition-all group flex flex-col h-full cursor-pointer"
    >
      {/* IMAGE PLACEHOLDER AREA */}
      <div className="w-full aspect-[4/3] bg-slate-100 border-b border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-4 text-center relative overflow-hidden">
        {product.imgId === 'smart' ? (
          <img src="/smartpallets-1.jpg" alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : product.imgId === 'eco' ? (
          <img src="/EcoPallet.png" alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6 bg-white" />
        ) : product.imgId === 'master' ? (
          <img src="/masterpallets.jpg" alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : product.imgId === 'flex' ? (
          <img src="/flexpallets.jpg" alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : product.imgId === 'heavy' ? (
          <img src="/heavypallet.png" alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6 bg-white" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-slate-200 opacity-50"></div>
            <ImageIcon className="w-10 h-10 mb-3 opacity-60 relative z-10" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 relative z-10">Inserir Foto</span>
            <span className="text-sm font-medium text-slate-600 mt-1 relative z-10">{product.name}</span>
          </>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-xl font-bold text-slate-900">
            {product.name}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-brand-50 text-brand-700 rounded-md shrink-0 ml-2">
            {product.badge}
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">
          {product.type}
        </p>

        {hasVariants && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.variants.map((v: any, idx: number) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVariant(idx);
                }}
                className={`py-1.5 px-3 text-[11px] font-semibold rounded-md transition-colors ${activeVariant === idx ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        {currentSpecs && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex-grow relative">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeVariant}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-slate-600 space-y-2"
              >
                {currentSpecs.map((spec: any, idx: number) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700">{spec.label}:</span>
                    <span className="text-right">{spec.value}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const activeArrowClass = "bg-brand-500 text-white hover:bg-brand-600 hover:scale-105 shadow-brand-500/30 cursor-pointer";
  const inactiveArrowClass = "border border-slate-200 bg-white/90 backdrop-blur-sm text-slate-300 shadow-black/5 cursor-default opacity-50";

  return (
    <section id="produtos" className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Nossos Modelos
            </h2>
            <p className="text-slate-600">
              Uma solução específica projetada para cada tipo de carga.
            </p>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => scroll(-350)}
            disabled={!canScrollLeft}
            className={`absolute left-0 sm:-left-6 top-[45%] -translate-y-[45%] z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg hidden sm:flex focus:outline-none focus:ring-2 focus:ring-brand-500 ${canScrollLeft ? activeArrowClass : inactiveArrowClass}`}
            aria-label="Rolar para a esquerda"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product, index) => (
                <div key={index} className="w-[85vw] sm:w-[350px] shrink-0 snap-start flex">
                  <div className="w-full h-full">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => scroll(350)}
            disabled={!canScrollRight}
            className={`absolute right-0 sm:-right-6 top-[45%] -translate-y-[45%] z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg hidden sm:flex focus:outline-none focus:ring-2 focus:ring-brand-500 ${canScrollRight ? activeArrowClass : inactiveArrowClass}`}
            aria-label="Rolar para a direita"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
