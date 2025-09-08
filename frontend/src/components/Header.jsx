import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  User,
  LayoutDashboard,
  LogIn,
  Settings,
  Music,
} from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };

  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const isAdminPage = location.pathname === "/admin";
  const isHomePage = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isProfilePage = location.pathname === "/profile";

  return (
    <header className="glass border-b sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo e Título */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {isAdminPage ? "Admin" : "Top Músicas"}
              </h1>
              {!isAdminPage && (
                <span className="text-xs text-muted-foreground">
                  Tião Carreiro & Pardinho
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Menu Dropdown para mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              {!isHomePage && !isAuthPage && !isProfilePage && (
                <DropdownMenuItem onClick={handleNavigateToHome}>
                  <Home className="h-4 w-4 mr-2" />
                  Página Inicial
                </DropdownMenuItem>
              )}
              {user && !isAdminPage && (
                <DropdownMenuItem onClick={handleNavigateToAdmin}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Painel Admin
                </DropdownMenuItem>
              )}
              {user ? (
                <>
                  {!isProfilePage && (
                    <DropdownMenuItem onClick={handleNavigateToProfile}>
                      <Settings className="h-4 w-4 mr-2" />
                      Meu Perfil
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    Sair
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  {!isAuthPage && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/login" className="flex items-center">
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/signup" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Cadastrar
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu para desktop */}
          <div className="hidden md:flex items-center gap-3">
            {!isHomePage && !isAuthPage && !isProfilePage && (
              <Button
                variant="ghost"
                onClick={handleNavigateToHome}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Início
              </Button>
            )}
            {user && !isAdminPage && (
              <Button
                variant="ghost"
                onClick={handleNavigateToAdmin}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Button>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{user?.name || user?.email}</p>
                    <p className="text-muted-foreground">
                      {isAdminPage ? "Administrador" : "Usuário"}
                    </p>
                  </div>
                  {!isProfilePage && (
                    <DropdownMenuItem onClick={handleNavigateToProfile}>
                      <Settings className="h-4 w-4 mr-2" />
                      Meu Perfil
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !isAuthPage && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Link to="/signup">Cadastrar</Link>
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
