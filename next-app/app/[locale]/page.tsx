import Footer from "../components/Footer";
import QuickLinks from "../components/QuickLinks";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col items-center gap-8 text-center px-8 max-w-2xl w-full">
          <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
            cloudtyping.com
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
            A cloud-based typing and notes application. Create, store, and manage your notes securely in the cloud. Access your notes from anywhere, anytime.
          </p>



          <QuickLinks locale={locale} />
        </main>
      </div>
      <Footer locale={locale} />
    </>


  );
}
