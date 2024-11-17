"use client";

import { Home, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/cities" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="text-lg font-semibold">Weather App</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/visualize">Visualize</Link>
            <Button asChild variant="secondary" size="sm">
              <Link href="/cities/create">
                <Plus className="mr-2 h-4 w-4" />
                New City
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
