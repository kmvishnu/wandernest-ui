import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="hidden md:block">Dashboard</BreadcrumbPage>
                  <BreadcrumbPage className="md:hidden">wanderNest</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Banner Section */}
          <div className="max-h-[50vh] flex-1 rounded-xl overflow-hidden">
            <img
              src="/images/banner.jpg"
              alt="Travel Banner"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Hotels Section */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {[
              { id: 1, name: "Hotel Grand", image: "/images/hotel1.jpg" },
              { id: 2, name: "Seaside Resort", image: "/images/hotel2.jpg" },
              { id: 3, name: "Mountain View Inn", image: "/images/hotel3.jpg" },
            ].map((hotel) => (
              <div
                key={hotel.id}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                {/* Hotel Name & Arrow */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-black bg-opacity-60 px-3 py-2 rounded-lg">
                  <span className="text-white font-semibold">{hotel.name}</span>
                  <ArrowRight className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
