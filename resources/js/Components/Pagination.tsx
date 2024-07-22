import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { Link } from "@inertiajs/react";

type PaginationProps = {
  pagination: any; // Replace 'any' with a more specific type if available
  users: {
    meta: {
      current_page: number;
      last_page: number;
    };
  };
};

export default function Paginations({ pagination, users }: PaginationProps) {
  console.log(pagination, users);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${Math.max(users.meta.current_page - 1, 1)}`}
          />
        </PaginationItem>
        {Array.from({ length: users.meta.last_page }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`?page=${i + 1}`}
              className="inline-flex justify-center items-center w-10 h-10 text-sm font-medium whitespace-nowrap rounded-md transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`?page=${Math.min(
              users.meta.current_page + 1,
              users.meta.last_page
            )}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
