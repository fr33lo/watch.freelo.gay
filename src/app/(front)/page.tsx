import { siteConfig } from "@/configs/site";
import Link from "next/link";
import TypingAnimation from "@/components/ui/typing-animation";

export default function Index() {
  return (
    <>
      {/* Terminal-style Hero Section */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="bg-terminal-bg min-h-screen flex flex-col items-center justify-center font-terminal px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal Header */}
          <header className="mb-8">
            <h1 className="text-terminal-accent text-2xl md:text-4xl font-bold mb-2">
              {siteConfig.name}
            </h1>
            <div className="text-terminal-text">
              <TypingAnimation 
                text="welcome to the ultimate streaming terminal!" 
                speed={30}
                delay={500}
              /> <span className="animate-blink text-terminal-accent">▸</span>
            </div>
          </header>

          {/* ASCII Art Section */}
          <div className="flex flex-wrap justify-center items-start gap-8 mb-8">
            {/* Terminal/TV ASCII */}
            <div className="flex-shrink-0">
              <pre className="ascii-art text-sm md:text-base">
{`  ╔════════════════╗
  ║  ████████████  ║
  ║  █ STREAMING █  ║
  ║  █   PORTAL  █  ║  
  ║  █    v2.0   █  ║
  ║  ████████████  ║
  ╚════════════════╝
     [ WATCH NOW ]`}
              </pre>
            </div>

            {/* Content Description */}
            <div className="flex-1 min-w-[300px] text-left">
              <h2 className="text-terminal-accent text-xl font-bold mb-4">streaming.exe loaded successfully</h2>
              
              <p className="mb-4 text-terminal-text">
                access unlimited movies, tv shows, and anime through our retro terminal interface. 
                no subscriptions, no bullshit, just pure streaming goodness.
              </p>
              
              <div className="mb-6">
                <div className="text-terminal-accent font-bold mb-2">available content:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-terminal-accent mr-2">►</span> movies
                  </div>
                  <div className="flex items-center">
                    <span className="text-terminal-accent mr-2">►</span> tv shows  
                  </div>
                  <div className="flex items-center">
                    <span className="text-terminal-accent mr-2">►</span> anime
                  </div>
                  <div className="flex items-center">
                    <span className="text-terminal-accent mr-2">►</span> documentaries
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/new-and-popular"
                  className="bg-terminal-bg-dark text-terminal-accent border border-terminal-accent px-6 py-2 font-bold hover:bg-terminal-accent hover:text-terminal-bg transition-colors duration-150 uppercase tracking-wider"
                >
                  [ ENTER PORTAL ]
                </Link>
                <Link 
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-terminal-accent border border-terminal-accent px-6 py-2 font-bold hover:text-terminal-accent-bright hover:border-terminal-accent-bright transition-colors duration-150 uppercase tracking-wider"
                >
                  [ SOURCE CODE ]
                </Link>
              </div>
            </div>
          </div>

          {/* Terminal Status Bar */}
          <div className="border-t border-dashed border-terminal-accent pt-4 mt-8">
            <div className="flex flex-wrap justify-center gap-8 text-sm font-terminal">
              <div><span className="text-terminal-accent">STATUS:</span> ONLINE</div>
              <div><span className="text-terminal-accent">USERS:</span> 420,069</div>
              <div><span className="text-terminal-accent">UPTIME:</span> 99.9%</div>
              <div><span className="text-terminal-accent">PING:</span> <span className="animate-blink">12ms</span></div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="bg-terminal-bg-dark py-16 px-4 font-terminal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-terminal-accent text-3xl md:text-5xl font-bold mb-4">
              SYSTEM FEATURES
            </h2>
            <p className="text-terminal-text max-w-3xl mx-auto text-lg">
              {siteConfig.name} terminal v2.0 includes advanced streaming protocols and 
              retro interface design for maximum viewing efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="border border-terminal-accent bg-terminal-bg p-6 transition-colors duration-150 hover:border-terminal-accent-bright">
              <div className="mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────┐
│   DATABASE  │
│ ██████████  │
│ ██████████  │  
└─────────────┘`}
                </pre>
              </div>
              <div>
                <h3 className="text-terminal-accent font-bold text-lg mb-2 uppercase">Vast Library</h3>
                <p className="text-terminal-text text-sm">
                  Thousands of movies, shows, and anime across all genres and decades.
                  Updated daily with the latest releases.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="border border-terminal-accent bg-terminal-bg p-6 transition-colors duration-150 hover:border-terminal-accent-bright">
              <div className="mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────┐
│     AI      │
│   ★ ★ ★ ★   │
│   RECOMM.   │  
└─────────────┘`}
                </pre>
              </div>
              <div>
                <h3 className="text-terminal-accent font-bold text-lg mb-2 uppercase">Smart Recommendations</h3>
                <p className="text-terminal-text text-sm">
                  Advanced AI algorithms suggest content tailored to your viewing patterns.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="border border-terminal-accent bg-terminal-bg p-6 transition-colors duration-150 hover:border-terminal-accent-bright">
              <div className="mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────┐
│  📱 💻 📺  │
│   DEVICES   │
│ EVERYWHERE  │  
└─────────────┘`}
                </pre>
              </div>
              <div>
                <h3 className="text-terminal-accent font-bold text-lg mb-2 uppercase">Multi-Device</h3>
                <p className="text-terminal-text text-sm">
                  Stream on phones, tablets, laptops, smart TVs, and gaming consoles.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="border border-terminal-accent bg-terminal-bg p-6 transition-colors duration-150 hover:border-terminal-accent-bright">
              <div className="mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────┐
│    PARTY    │
│ 👥 SYNC 👥  │
│  TOGETHER   │  
└─────────────┘`}
                </pre>
              </div>
              <div>
                <h3 className="text-terminal-accent font-bold text-lg mb-2 uppercase">Watch Parties</h3>
                <p className="text-terminal-text text-sm">
                  Synchronized viewing with friends. Chat and react in real-time.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="border border-terminal-accent bg-terminal-bg p-6 transition-colors duration-150 hover:border-terminal-accent-bright">
              <div className="mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────┐
│     4K      │
│   ULTRA     │
│    HD++     │  
└─────────────┘`}
                </pre>
              </div>
              <div>
                <h3 className="text-terminal-accent font-bold text-lg mb-2 uppercase">HD Quality</h3>
                <p className="text-terminal-text text-sm">
                  Crystal clear 4K, Ultra HD, and HDR streaming for premium viewing.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="border border-terminal-accent bg-terminal-bg p-6 transition-colors duration-150 hover:border-terminal-accent-bright">
              <div className="mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────┐
│    FREE     │
│  $0.00 💰   │
│   ALWAYS    │  
└─────────────┘`}
                </pre>
              </div>
              <div>
                <h3 className="text-terminal-accent font-bold text-lg mb-2 uppercase">Always Free</h3>
                <p className="text-terminal-text text-sm">
                  No subscriptions, no credit cards, no bullshit. Streaming should be free.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mx-auto text-center md:max-w-[58rem]"> */}
        {/*   <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7"> */}
        {/*     Taxonomy also includes a blog and a full-featured documentation site */}
        {/*   </p> */}
        {/* </div> */}
      </section>
    </>
  );
}
