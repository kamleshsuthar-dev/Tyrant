import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ReviewFilter({handleFilter ,handleSort }) {
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [selectedFilter, setSelectedFilter] = useState(null);

   
  return (
    <div className="flex gap-5">
      {/* Sort Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center">
            Sort: {selectedSort} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => { setSelectedSort("Oldest"); handleSort("oldest"); }}>
            Oldest (Old to New)
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { setSelectedSort("Newest"); handleSort("latest"); }}>
            Newest (New to Old)
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { setSelectedSort("Highest"); handleSort("highest"); }}>
            Highest Rated (5⭐ to 1⭐)
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { setSelectedSort("Lowest"); handleSort("lowest"); }}>
            Lowest Rated (1⭐ to 5⭐)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center">
            Filter: {selectedFilter ? `${selectedFilter}⭐` : "All"} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => { setSelectedFilter(null); handleFilter(null); }}>
            All Reviews
          </DropdownMenuItem>
          {[5, 4, 3, 2, 1].map((star) => (
            <DropdownMenuItem key={star} onSelect={() => { setSelectedFilter(star); handleFilter(star); }}>
              {star}⭐ Reviews
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
