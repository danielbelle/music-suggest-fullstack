import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t mt-auto py-6">
      <div className="container flex flex-col sm:flex-row items-center justify-between px-4">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Top 5 Músicas. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Tião Carreiro & Pardinho
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/danielbelle/music-suggest-fullstack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/50"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
