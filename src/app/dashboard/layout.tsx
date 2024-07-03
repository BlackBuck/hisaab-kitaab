import SideNav from "../ui/dashboard/sidenav";
// import { getServerSession } from "next-auth";
// import AuthProvider from "@/app/ui/dashboard/session-provider";

export default function Layout({children} : {children: React.ReactNode}) {
    return (
      <div className="flex bg-gray-100 h-screen flex-col sm:overflow-hidden md:flex-row ">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 text-black overflow-y-auto md:p-12">
        {children}
      </div>
    </div>   
    );
}
