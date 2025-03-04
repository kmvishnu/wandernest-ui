import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: hotels, isLoading, isError } = useHotels();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar with collapse control */}
        <AppSidebar
          isCollapsed={isSidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          <header className="flex h-16 items-center gap-2">
            <SidebarTrigger
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            />
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {location.pathname === "/" && (
              <>
                {/* Banner */}
                <div className="relative w-full max-h-[50vh] overflow-hidden rounded-xl">
                  <img
                    src="/images/banner.jpg"
                    alt="Travel Banner"
                    className="w-full h-auto max-h-[50vh] object-cover md:object-center rounded-xl"
                  />
                </div>

                {/* Hotels List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {hotels?.data.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="relative h-60 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                      onClick={() => navigate(`/hotel/${hotel.id}`)}
                    >
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-black bg-opacity-60 px-3 py-2 rounded-lg">
                        <span className="text-white font-semibold">
                          {hotel.name}
                        </span>
                        <ArrowRight className="text-white" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
