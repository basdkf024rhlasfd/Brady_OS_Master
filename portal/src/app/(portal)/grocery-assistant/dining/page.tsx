"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  UtensilsCrossed,
  MapPin,
  ExternalLink,
  Sparkles,
  Loader2,
  Clock,
  DollarSign,
  Baby,
  Star,
} from "lucide-react";

const STORAGE_KEY = "groceryAssistant_dining";

interface Restaurant {
  name: string;
  cuisine: string;
  kidsEatFree: string | null;
  estimatedCostFamily: number;
  address: string;
  rating: number;
  familyFriendly: boolean;
  notes: string;
  orderUrl: string | null;
}

interface DiningState {
  favorites: Restaurant[];
  lastSearched: string | null;
}

const QUICK_ORDER_LINKS = [
  {
    name: "Domino's",
    url: "https://www.dominos.com/pages/order/",
    emoji: "🍕",
    avgCost: "$35-45",
  },
  {
    name: "DoorDash",
    url: "https://www.doordash.com/",
    emoji: "🚗",
    avgCost: "Varies + fees",
  },
  {
    name: "Chick-fil-A",
    url: "https://www.chick-fil-a.com/order",
    emoji: "🐔",
    avgCost: "$40-55",
  },
  {
    name: "Walmart Deli",
    url: "https://www.walmart.com/search?q=deli+meals",
    emoji: "🏪",
    avgCost: "$15-25",
  },
];

export default function DiningPage() {
  const [state, setState] = useState<DiningState>({ favorites: [], lastSearched: null });
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Restaurant[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setState(JSON.parse(saved));
    setLoaded(true);
  }, []);

  function saveState(updated: DiningState) {
    setState(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function toggleFavorite(restaurant: Restaurant) {
    const exists = state.favorites.some((f) => f.name === restaurant.name);
    const updated = exists
      ? { ...state, favorites: state.favorites.filter((f) => f.name !== restaurant.name) }
      : { ...state, favorites: [...state.favorites, restaurant] };
    saveState(updated);
  }

  async function searchRestaurants() {
    setSearching(true);
    try {
      const res = await fetch("/api/grocery-assistant/dining", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "search" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.restaurants) {
          setResults(data.restaurants);
          saveState({ ...state, lastSearched: new Date().toISOString() });
        }
      }
    } finally {
      setSearching(false);
    }
  }

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            Dining Out
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Family-friendly restaurants, kids-eat-free deals, and quick-order links for NW Arkansas
          </p>
        </div>
        <button
          onClick={searchRestaurants}
          disabled={searching}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {searching ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          {searching ? "Searching..." : "Find Restaurants"}
        </button>
      </div>

      {/* Quick order links */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Quick Order
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ORDER_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{link.emoji}</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-medium text-foreground mt-2">{link.name}</p>
              <p className="text-xs text-muted-foreground">{link.avgCost}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Favorites */}
      {state.favorites.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Family Favorites
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {state.favorites.map((restaurant) => (
              <RestaurantCard
                key={restaurant.name}
                restaurant={restaurant}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(restaurant)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search results */}
      {results.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            NW Arkansas Family Restaurants
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {results.map((restaurant) => (
              <RestaurantCard
                key={restaurant.name}
                restaurant={restaurant}
                isFavorite={state.favorites.some((f) => f.name === restaurant.name)}
                onToggleFavorite={() => toggleFavorite(restaurant)}
              />
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && state.favorites.length === 0 && (
        <div className="text-center py-8 rounded-lg border border-dashed border-white/[0.12]">
          <MapPin className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Click &quot;Find Restaurants&quot; to discover family-friendly spots with kids-eat-free deals in Bentonville / Rogers / NW Arkansas.
          </p>
        </div>
      )}
    </div>
  );
}

function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground">{restaurant.name}</h4>
          <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
        </div>
        <button
          onClick={onToggleFavorite}
          className={cn(
            "transition-colors",
            isFavorite ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"
          )}
        >
          <Star className={cn("h-4 w-4", isFavorite && "fill-yellow-400")} />
        </button>
      </div>

      {restaurant.kidsEatFree && (
        <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/[0.08] px-2 py-1 rounded w-fit">
          <Baby className="h-3 w-3" />
          Kids eat free: {restaurant.kidsEatFree}
        </div>
      )}

      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          ~${restaurant.estimatedCostFamily} for 6
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {restaurant.address}
        </span>
      </div>

      {restaurant.notes && (
        <p className="text-xs text-muted-foreground italic">{restaurant.notes}</p>
      )}

      {restaurant.orderUrl && (
        <a
          href={restaurant.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium"
        >
          Order online <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}
