
import FacebookFetchComponent from "@/components/FacebookFetch";
import InstagramFetchComponent from "@/components/InstagramFetch";
import XFetchComponent from "@/components/XFetch";

export default function Home() {
  return (
    <div>       
      <div className="grid grid-cols-3 min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* <Test {data}/> */}

        <InstagramFetchComponent></InstagramFetchComponent>
        <FacebookFetchComponent></FacebookFetchComponent>
        <XFetchComponent></XFetchComponent>
      </div>
    </div>
  );
}   
  