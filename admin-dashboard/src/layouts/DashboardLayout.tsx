import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, HelpCircle, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
  User,
  Menu,
} from "lucide-react";
import { useState } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    {
      name: "Testimonials",
      href: "/dashboard/testimonials",
      icon: MessageSquare,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 w-64 shadow-2xl`}
      >
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="flex items-center gap-3 px-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/50">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-slate-400">Management System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      active ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="p-4 border bg-slate-700/50 backdrop-blur-sm rounded-xl border-slate-600">
              <p className="mb-1 text-xs text-slate-400">Need help?</p>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start w-full px-2 text-blue-400 hover:text-blue-300 hover:bg-slate-600"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Support Center
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`${
          sidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-slate-100"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Dashboard
                </h2>
                <p className="text-sm text-slate-500">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-slate-100"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 gap-3 px-3 hover:bg-slate-100 rounded-xl"
                  >
                    <Avatar className="w-8 h-8 border-2 border-blue-100">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-700">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-col items-start hidden md:flex">
                      <span className="text-sm font-medium text-slate-700">
                        {user?.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        Administrator
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col p-2 space-y-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-blue-100">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="text-white bg-gradient-to-br from-blue-600 to-blue-700">
                            {user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-3 text-slate-500" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <Settings className="w-4 h-4 mr-3 text-slate-500" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                    onClick={() => logout()}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
