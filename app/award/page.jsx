import Image from "next/image";

const Page = () => {
  return (
    <div className={"flex flex-col h-screen items-center justify-center"}>
      <Image
        src="/under-maintain.gif"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default Page;
