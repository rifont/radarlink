import Balancer from "react-wrap-balancer";
import { Twitter } from "@/components/shared/icons";
import Technology from "@/components/home/technologies";

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <a
          href="https://twitter.com/richard_fontein/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="animate-fade-up mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing RadarLink
          </p>
        </a>
        <h1
          className="animate-fade-up from-primary to-foreground/50 font-display bg-gradient-to-br bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Collaborative, networked technology radar</Balancer>
        </h1>
        <p
          className="animate-fade-up text-primary/80 mt-6 text-center opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Data visualisation tools to deepen your understanding of the tech landscape across your network and beyond.
          </Balancer>
        </p>
        <div
          className="animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Technology />
        </div>
      </div>
    </>
  );
}
