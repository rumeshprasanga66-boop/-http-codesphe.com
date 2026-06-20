import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joke Generator - Get Random Jokes",
  description: "Generate random jokes instantly using our joke generator. Laugh out loud with funny jokes from the Official Joke API.",
  keywords: ["jokes", "random jokes", "funny", "joke generator", "laugh"],
  openGraph: {
    title: "Joke Generator - Get Random Jokes",
    description: "Generate random jokes instantly",
    type: "website",
  },
};

export default function JokesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
