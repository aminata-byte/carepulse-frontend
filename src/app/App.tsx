import React from 'react';

function App() {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* SECTION GAUCHE : FORMULAIRE */}
      <section className="flex-1 bg-dark flex flex-col justify-center px-10 md:px-20 lg:px-32">
        <div className="max-w-[496px] w-full mx-auto">
          
          {/* Titre avec votre couleur PRIMARY */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">bonjour</h1>
            <p className="text-gray-secondary text-lg"> Bienvenu sur carpulse</p>
          </header>

          <form className="space-y-6">
            {/* Nom Complet */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-secondary text-sm font-medium">votre nom</label>
              <input 
                type="text" 
                placeholder="champs de saisie"
                className="w-full bg-dark-light border border-dark-lighter p-4 rounded-xl text-white focus:border-primary focus:outline-none transition-all placeholder:text-white/20"
              />
            </div>

            {/* Bouton vert */}
            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-green hover:bg-primary-dark transition-transform active:scale-95 mt-4"
            >
              s'incrire
            </button>
          </form>

          {/* Footer  */}
          <footer className="mt-20 flex justify-between text-sm">
            <span className="text-primary cursor-pointer hover:underline">admin</span>
          </footer>
        </div>
      </section>
      </div>
  );
}

export default App;