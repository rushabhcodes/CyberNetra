
import FacebookFetchComponent from "@/components/FacebookFetch";
import InstagramFetchComponent from "@/components/InstagramFetch";
import SearchProfile from "@/components/SearchProfile";
import XFetchComponent from "@/components/XFetch";

export default function Home() {
  return (
    <div>   
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
    </div>
  );
}     
