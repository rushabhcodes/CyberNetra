import FacebookFetchComponent from "@/components/FacebookFetch";
import InstagramFetchComponent from "@/components/InstagramFetch";
import OSINT from "@/components/OSINT";
import SearchProfile from "@/components/SearchProfile";
import FlickeringGrid from "@/components/ui/flickering-grid";
import XFetchComponent from "@/components/XFetch";

export default function Home() {
  return (
    <div className="relative">
      <FlickeringGrid className="-z-10 absolute inset-0" 
        squareSize={4}
        gridGap={8}
        color="#60A5FA"
        maxOpacity={0.3}
        flickerChance={0.1} />
      <div className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-800 to-black drop-shadow-lg pt-10">
        CyberNetra
      </div>
      <SearchProfile></SearchProfile>

      <div className="grid grid-cols-3 min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* <Test {data}/> */}

        <InstagramFetchComponent></InstagramFetchComponent>
        <FacebookFetchComponent></FacebookFetchComponent>
        <XFetchComponent></XFetchComponent>
      </div>
      <OSINT />
    </div>
  );
}
