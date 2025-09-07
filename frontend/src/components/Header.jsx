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
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo e Título */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold hidden sm:block">
            {isAdminPage ? "Painel Administrativo" : "Top 5 Músicas"}
          </h1>
          {!isAdminPage && (
            <span className="text-muted-foreground hidden md:block">
              Tião Carreiro & Pardinho
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Menu Dropdown para mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          <div className="hidden md:flex items-center gap-4">
            {!isHomePage && !isAuthPage && !isProfilePage && (
              <Button variant="outline" onClick={handleNavigateToHome}>
                <Home className="h-4 w-4 mr-2" />
                Página Inicial
              </Button>
            )}
            {user && !isAdminPage && (
              <Button variant="outline" onClick={handleNavigateToAdmin}>
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Painel Admin
              </Button>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
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
