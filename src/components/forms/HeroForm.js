"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20 focus-within:border-blue-500 border-2 border-transparent rounded"
    >
      <span className="bg-white py-4 pl-4">linksshare.com/</span>
      <div className="relative">
        <input
          type="text"
          className="border-none outline-none py-4 pl-0 pr-6"
          style={{ backgroundColor: "white", marginBottom: 0 }}
          placeholder="username"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap"
      >
        Claim for Free
      </button>
    </form>
  );
}
