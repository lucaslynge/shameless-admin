import { useEffect, useState } from "react";
import { FolderIcon, HomeIcon, UsersIcon, } from "@heroicons/react/24/outline";
import { MdCategory, MdCode, MdContactEmergency, MdEditDocument, MdReviews } from "react-icons/md";

import MobileSidebar from "@/components/Mobile/Sidebar";
import DesktopSidebar from "@/components/Desktop/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { MdOutlinePayment } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";


let sidebarNavigation = [
  { name: "Users", href: "user", icon: UsersIcon, current: false },
  { name: "Articles", href: "articles", icon: MdEditDocument, current: false },
  { name: "Categories", href: "category", icon: MdCategory, current: false },
  { name: "Reviews", href: "review", icon: MdReviews, current: false },
  { name: "Community", href: "community", icon: CgCommunity, current: false },
  { name: "Payments", href: "payment", icon: MdOutlinePayment, current: false },
  { name: "Contacts", href: "contact", icon: MdContactEmergency, current: false },
  { name: "Promo Code", href: "promo-code", icon: MdCode, current: false },
  


];

const userNavigation = [
  { name: "Your profile", href: "/app/profile" },
];

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(sidebarNavigation);
  const router = useRouter();

  useEffect(() => {
    const updatedNavigation = navigation.map((navItem) => ({
      ...navItem,
      current: router.pathname.includes(navItem.href),
    }));
    setNavigation(updatedNavigation);
  }, [router]);

  console.log(navigation.filter((item) => router.pathname.includes(item.href)));

  return (
    <>
      <div>
        <MobileSidebar
          navigation={navigation}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar navigation={navigation} />

        <div className="lg:pl-[12rem]">
          <Header
            userNavigation={userNavigation}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-4">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}


