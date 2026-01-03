import Image from "next/image";
import { SpinningStar } from "./list";
import TextPressure from "@/components/textPressure";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex min-h-screen min-w-screen flex-col items-baseline bg-bg-grey gap-20 py-32 px-16 sm:items-start">
        <div className="flex gap-4 items-baseline">
          <h1 className="text-6xl font-extralight whitespace-nowrap">hi, i'm</h1>
          <div className="w-36 h-16">
            <TextPressure
              fontFamily="Playpen Sans"
              fontUrl="https://fonts.gstatic.com/s/playpensans/v1/dg43_pj1p6gXP0gzAZgm4c8XQArSU7ACgADrTYEA2DuXSUPGHy4.woff2"
              text="neşet"
              flex={false}
              width={false}
              italic={false}
            />
          </div>
        </div>
        <SpinningStar />
      </main>
    </div>
  );
}
