import BackButton from "@/components/back/BackButton";

export default function Layout({ children }){
  return (
    <div>
      <BackButton />
      <section>{children}</section>
    </div>
  );
}