"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Copy, RefreshCw } from "lucide-react";

interface Joke {
  setup?: string;
  delivery?: string;
  joke?: string;
  type: string;
}

export default function JokeGenerator() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data: Joke = await response.json();
      setJoke(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while fetching the joke"
      );
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!joke) return;

    const jokeText =
      joke.type === "twopart"
        ? `${joke.setup}\n${joke.delivery}`
        : joke.joke;

    navigator.clipboard.writeText(jokeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayJoke = () => {
    if (!joke) return "";
    return joke.type === "twopart"
      ? `${joke.setup}\n\n${joke.delivery}`
      : joke.joke;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">😂</span>
            </div>
            <span className="text-xl font-bold text-white">JokeHub</span>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Random Joke
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-3xl -z-10" />

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Laugh Out
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {" "}Loud
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Get random jokes instantly! Click the button below to generate a new
            joke and brighten your day.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Joke Display Card */}
          <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 mb-8 min-h-48 flex flex-col justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader className="w-12 h-12 text-orange-400 animate-spin" />
                <p className="text-slate-400">Loading a hilarious joke...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-red-400 text-center">
                  <p className="text-lg font-semibold mb-2">Oops! Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            ) : joke ? (
              <div className="space-y-4">
                {joke.type === "twopart" ? (
                  <>
                    <p className="text-lg text-slate-300">
                      <span className="font-semibold text-orange-400">Q:</span> {joke.setup}
                    </p>
                    <p className="text-lg text-slate-300">
                      <span className="font-semibold text-orange-400">A:</span> {joke.delivery}
                    </p>
                  </>
                ) : (
                  <p className="text-lg text-slate-300">{joke.joke}</p>
                )}
                <div className="text-sm text-slate-500 pt-4">
                  Type: {joke.type === "twopart" ? "Q&A" : "Single"}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <p className="text-lg">Click the button below to generate your first joke! 🎉</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={fetchJoke}
              disabled={loading}
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Get Another Joke
                </>
              )}
            </Button>

            {joke && (
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="lg"
                className="border-slate-700 text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Copy className="w-5 h-5" />
                {copied ? "Copied!" : "Copy Joke"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {joke && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-t border-slate-800">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Joke Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Type</p>
                <p className="text-white font-semibold">
                  {joke.type === "twopart" ? "Question & Answer" : "Single Line"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">From</p>
                <p className="text-white font-semibold">Official Joke API</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>
            Powered by{" "}
            <a
              href="https://official-joke-api.appspot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition"
            >
              Official Joke API
            </a>
          </p>
          <p className="text-sm mt-2">&copy; 2024 JokeHub. Made with ❤️</p>
        </div>
      </footer>
    </div>
  );
}
