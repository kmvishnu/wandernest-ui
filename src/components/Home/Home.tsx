import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useHotels();
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

              
                {isError && (
                  <div className="flex flex-col items-center justify-center h-60 text-red-500 text-lg font-semibold">
                    ❌ Failed to load hotels. Please try again later.
                  </div>
                )}

                
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-60 w-full rounded-xl shadow-lg overflow-hidden bg-gray-200 animate-pulse flex flex-col"
                      >
                        {/* Placeholder for Image */}
                        <div className="h-[75%] w-full bg-gray-300"></div>

                        {/* Placeholder for Text & Button */}
                        <div className="h-[25%] flex flex-col justify-center gap-2 px-3">
                          <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
                          <div className="h-3 w-1/2 bg-gray-400 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        className="relative h-60 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => navigate(`/hotel/${hotel.id}`)}
                      >
                        <img
                          src={hotel.imageUrls[0]}
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
                )}
              </>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
