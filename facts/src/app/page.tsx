import { Button } from "@/components/ui/button";
import { getRandomFact, addFact, getFact } from "./database";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logger } from "@/app/logger";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    fact: string;
  };
}) {
  const fact = searchParams.fact
    ? await getFact(+searchParams.fact)
    : await getRandomFact();

    logger.info(fact);

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="container mx-auto max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            <Link href="/">Random Fact</Link>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Discover a new interesting fact every time you visit.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">
              {fact?.content}
            </p>
          </div>
        </div>
        <form
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          action={async (data: FormData) => {
            "use server";
            const content = data.get("fact") as string;
            const fact = await addFact(content);
            revalidatePath("/");
            redirect("/?fact=" + fact.id);
          }}
        >
          <div className="grid gap-4">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                htmlFor="fact"
              >
                New Fact
              </label>
              <textarea
                name="fact"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                id="fact"
                placeholder="Enter a new interesting fact..."
                required
                rows={3}
              />
            </div>
            <Button className="w-full" type="submit">
              Submit Fact
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
