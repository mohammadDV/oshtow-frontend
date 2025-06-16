import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function Home() {
  return <>
    <div className="flex items-center gap-5 m-8">
      <Button variant={'default'}>کلیک کنید!</Button>
      <Button variant={'ghost'}>کلیک کنید!</Button>
      <Button variant={'outline'}>کلیک کنید!</Button>
      <Button variant={'link'}>کلیک کنید!</Button>
      <Button variant={'destructive'}>کلیک کنید!</Button>
      <Button variant={'success'}>کلیک کنید!</Button>
    </div>
    <div className="flex items-center gap-5 m-8">
      <Button variant={'default'} size={"sm"}>کلیک کنید!</Button>
      <Button variant={'default'} size={"default"}>کلیک کنید!</Button>
      <Button variant={'default'} size={"lg"}>کلیک کنید!</Button>
    </div>
    <div className="flex items-center gap-5 m-8">
      <Icon icon="solar--user-bold" sizeClass="size-8" className="text-primary" />
    </div>
  </>;
}
