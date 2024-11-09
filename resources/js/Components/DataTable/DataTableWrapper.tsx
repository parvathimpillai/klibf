import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { Plus } from "lucide-react";
import Paginations from "@/Components/Pagination";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";

interface Column<T> {
  key: string;
  label: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: {
    data: T[];
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
      path: string;
      links: { url: string | null; label: string; active: boolean }[];
    };
  };
  columns: Column<T>[];
  searchPlaceholder?: string;
  routePrefix: string;
  filters?: Record<string, any>;
  createButton?: {
    label: string;
    sheet: React.ReactNode;
  };
}

export function DataTableWrapper<T extends { id: number; [key: string]: any }>({
  data,
  columns,
  searchPlaceholder = "Search...",
  routePrefix,
  filters,
  createButton,
}: DataTableProps<T>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    router.get(
      route(`${routePrefix}.index`),
      { search: term },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  }, 300);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <Input
          type="text"
          placeholder={searchPlaceholder}
          className="w-1/4"
          defaultValue={filters?.search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {createButton && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Button
                variant="outline"
                className="mb-4"
                onClick={() => setIsSheetOpen(true)}
              >
                <Plus className="mr-2 size-4" />
                {createButton.label}
              </Button>
            </SheetTrigger>
            {createButton.sheet}
          </Sheet>
        )}
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id}-${column.key}`}
                      className={column.className}
                    >
                      {column.render ? column.render(item) : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {data.meta.last_page > 1 && <Paginations pagination={data.meta} />}
    </div>
  );
}
