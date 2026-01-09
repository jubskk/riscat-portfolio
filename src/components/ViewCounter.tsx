"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    const incrementViews = async () => {
      // 1. Fetch current views
      const { data, error } = await supabase
        .from("site_stats")
        .select("views")
        .eq("id", "main")
        .single();

      if (!error && data) {
        const newViews = (data.views || 0) + 1;
        setViews(newViews);
        
        // 2. Update with incremented value
        await supabase
          .from("site_stats")
          .update({ views: newViews })
          .eq("id", "main");
      } else if (error && error.code === 'PGRST116') {
        // Row doesn't exist, create it
        await supabase
          .from("site_stats")
          .insert({ id: "main", views: 1 });
        setViews(1);
      }
    };

    incrementViews();
  }, []);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.4em] text-white/30">
      <span className="w-1 h-1 rounded-full bg-white/20 animate-pulse" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}
