import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  let list = [];
  for (let i =0; i < 50; i++) {
    list.push(<p>Example paragraph {i}</p>);
  };
  return (
    <div>
      <h1 className="font-black text-2xl">Тут будет лендинг крч</h1>
      <Link href="/study/introduction"><Button>Начать учиться</Button></Link>
      {list}
    </div>
  );
}
