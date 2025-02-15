// app/page.tsx
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-stone-900 text-slate-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-stone-900/95 backdrop-blur-sm z-50 px-6 py-4 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-semibold tracking-tight">
            <span className="text-amber-500">शब्द</span>
            <span className="text-slate-200">యాత్ర</span>
          </div>
          <div className="flex gap-8">
            <a href="/blog" className="hover:text-amber-500 transition-colors">
              పద్యం | Blog
            </a>
            <a
              href="https://x.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors"
            >
              संवाद | X
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-amber-500">शब्द</span>
            <span className="text-slate-200">శాస్త్రం</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Exploring the ancient roots and evolving stories of words through
            time
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-amber-500 text-stone-900 rounded-lg hover:bg-amber-400 transition-colors font-medium">
              Etymology Explorer
            </button>
            <button className="px-8 py-3 border border-amber-500/20 text-amber-500 rounded-lg hover:bg-amber-500/10 transition-colors">
              Historical Archives
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-6 bg-stone-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            <span className="text-amber-500">प्रमुख</span> అధ్యయనాలు
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Etymology Card */}
            <div className="bg-stone-800 p-6 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors">
              <h3 className="text-xl font-semibold text-amber-500 mb-3">
                Sanskrit Origins
              </h3>
              <p className="text-slate-400">
                Exploring the etymological connections between Sanskrit and
                modern languages.
              </p>
            </div>

            {/* Historical Card */}
            <div className="bg-stone-800 p-6 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors">
              <h3 className="text-xl font-semibold text-amber-500 mb-3">
                తెలుగు వ్యుత్పత్తి
              </h3>
              <p className="text-slate-400">
                Tracing the evolution of Telugu words through historical texts
                and inscriptions.
              </p>
            </div>

            {/* Research Card */}
            <div className="bg-stone-800 p-6 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors">
              <h3 className="text-xl font-semibold text-amber-500 mb-3">
                शब्द यात्रा
              </h3>
              <p className="text-slate-400">
                Journey through the transformation of words across cultures and
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2025 शब्दयात्र | Crafted with passion for etymology</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
