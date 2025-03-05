// app/page.tsx
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-black text-slate-200">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-amber-500">Raja</span>
            <span className="text-slate-200">rsi.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Exploring the ancient roots and evolving stories of words through
            time
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-amber-500 text-stone-900 rounded-lg hover:bg-amber-400 transition-colors font-medium">
               Explorer
            </button>
            <button className="px-8 py-3 border border-amber-500/20 text-amber-500 rounded-lg hover:bg-amber-500/10 transition-colors">
              Historical Archives
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            <span className="text-amber-500">My</span> Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Etymology Card */}
            <div className="bg-stone-800 p-6 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors">
              <h3 className="text-xl font-semibold text-amber-500 mb-3">
              Philosophy.
              </h3>
              <p className="text-slate-400">
              "Philosophy helps us understand life, think critically, and seek truth."
              </p>
            </div>

            {/* Historical Card */}
            <div className="bg-stone-800 p-6 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors">
              <h3 className="text-xl font-semibold text-amber-500 mb-3">
                History.
              </h3>
              <p className="text-slate-400">
              "History teaches us lessons from the past to guide our future."
              </p>
            </div>

            {/* Research Card */}
            <div className="bg-stone-800 p-6 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors">
              <h3 className="text-xl font-semibold text-amber-500 mb-3">
                Environment.
              </h3>
              <p className="text-slate-400">
              "The environment is our home; protecting it ensures a better future for all."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p className='text-white text-xl'>God is dead. God remains dead. And we have killed him.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
