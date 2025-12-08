import { Banana, Sparkles } from 'lucide-react';

export default function EmptyHero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">

      <div className="mb-14">
        <div className="relative inline-flex">
          <div className="w-3 h-3 rounded-full bg-linear-to-br from-emerald-400 to-cyan-500 absolute -top-2 -right-2 animate-pulse"></div>
          <Sparkles className="w-16 h-16 text-muted-foreground/30 stroke-1" />
        </div>
      </div>


      <h1 className="text-3xl md:text-4xl font-normal mb-3 text-center tracking-tight text-foreground">
        Ready to create
      </h1>


      <p className="text-muted-foreground/70 text-base mb-20 text-center max-w-xs font-light">
        Type your prompt below to begin
      </p>


      <div className="w-px h-8 bg-linear-to-b from-transparent via-border to-transparent mb-6"></div>


      <div className=" flex text-xs text-muted-foreground/50 tracking-wide">
       <p>Powered by Nano Banana</p> <Banana fill='yellow' color='yellow' />
      </div>
    </div>
  );
}