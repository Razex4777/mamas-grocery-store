import ProductCarousel from './ProductCarousel';

export default function FeaturedProducts() {

  return (
    <section className="relative featured-bg py-16 sm:py-20">
      {/* Title block */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-6xl mb-12">
          {/* Top meta row - mobile first */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-black/70 uppercase">NOTRE SÉLECTION</p>
              <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                Produits Vedettes
              </h2>
              <p className="mt-3 text-base sm:text-lg text-black/70 max-w-2xl">
                Découvrez notre sélection de produits premium pour la vente en gros. Des prix avantageux pour les professionnels et revendeurs.
              </p>
            </div>

            {/* Inline chips / filters - decorative for now */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto py-1 md:py-0">
              {['Tous', 'Nouveaux', 'Populaires', 'Remises', 'Bio'].map((label) => (
                <button
                  key={label}
                  className="shrink-0 rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2 text-sm font-medium text-black hover:bg-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider line */}
          <div className="mt-8 h-px w-full bg-black/10" />

          {/* Helper row: stats + actions */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white/70 backdrop-blur p-4 border border-black/10">
              <p className="text-sm text-black/60">Catalogue</p>
              <p className="text-2xl font-bold text-black">{new Intl.NumberFormat('fr-FR').format(8)} produits</p>
            </div>
            <div className="rounded-xl bg-white/70 backdrop-blur p-4 border border-black/10">
              <p className="text-sm text-black/60">Expédition</p>
              <p className="text-2xl font-bold text-black">48h en moyenne</p>
            </div>
            <div className="rounded-xl bg-white/70 backdrop-blur p-4 border border-black/10 flex items-center justify-between">
              <div>
                <p className="text-sm text-black/60">Envie d\'en voir plus ?</p>
                <p className="text-lg font-semibold text-black">Parcourez tout le catalogue</p>
              </div>
              <button
                className="ml-4 shrink-0 rounded-xl bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Voir plus
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <ProductCarousel />
      </div>

      {/* Thin grid overlay */}
      <div className="featured-grid absolute inset-0" aria-hidden />

    </section>
  );
}


