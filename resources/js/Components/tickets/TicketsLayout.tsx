import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const data: Payment[] = [
  {
    id: "4d5e6f7g",
    amount: 300,
    status: "failed",
    email: "bob@example.com",
  },
  {
    id: "5e6f7g8h",
    amount: 350,
    status: "pending",
    email: "charlie@example.com",
  },
  {
    id: "6f7g8h9i",
    amount: 400,
    status: "success",
    email: "dave@example.com",
  },
  {
    id: "7g8h9i0j",
    amount: 450,
    status: "processing",
    email: "eve@example.com",
  },
  {
    id: "8h9i0j1k",
    amount: 500,
    status: "failed",
    email: "frank@example.com",
  },
  {
    id: "9i0j1k2l",
    amount: 550,
    status: "pending",
    email: "grace@example.com",
  },
  {
    id: "0j1k2l3m",
    amount: 600,
    status: "success",
    email: "heidi@example.com",
  },
  {
    id: "1k2l3m4n",
    amount: 650,
    status: "processing",
    email: "ivan@example.com",
  },
  {
    id: "2l3m4n5o",
    amount: 700,
    status: "failed",
    email: "judy@example.com",
  },
  {
    id: "3m4n5o6p",
    amount: 750,
    status: "pending",
    email: "mallory@example.com",
  },
  {
    id: "4n5o6p7q",
    amount: 800,
    status: "success",
    email: "nathan@example.com",
  },
  {
    id: "5o6p7q8r",
    amount: 850,
    status: "processing",
    email: "olivia@example.com",
  },
  {
    id: "6p7q8r9s",
    amount: 900,
    status: "failed",
    email: "peggy@example.com",
  },
  {
    id: "7q8r9s0t",
    amount: 950,
    status: "pending",
    email: "quentin@example.com",
  },
  {
    id: "8r9s0t1u",
    amount: 1000,
    status: "success",
    email: "rachel@example.com",
  },
  {
    id: "9s0t1u2v",
    amount: 1050,
    status: "processing",
    email: "steve@example.com",
  },
  {
    id: "0t1u2v3w",
    amount: 1100,
    status: "failed",
    email: "trent@example.com",
  },
  {
    id: "1u2v3w4x",
    amount: 1150,
    status: "pending",
    email: "ursula@example.com",
  },
  {
    id: "2v3w4x5y",
    amount: 1200,
    status: "success",
    email: "victor@example.com",
  },
  {
    id: "3w4x5y6z",
    amount: 1250,
    status: "processing",
    email: "wendy@example.com",
  },
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  // create 10 more
  {
    id: "1a2b3c4d",
    amount: 150,
    status: "pending",
    email: "john.doe@example.com",
  },
  {
    id: "2b3c4d5e",
    amount: 200,
    status: "processing",
    email: "jane.doe@example.com",
  },
  {
    id: "3c4d5e6f",
    amount: 250,
    status: "success",
    email: "alice@example.com",
  },
  {
    id: "4d5e6f7g",
    amount: 300,
    status: "failed",
    email: "bob@example.com",
  },
  {
    id: "5e6f7g8h",
    amount: 350,
    status: "pending",
    email: "charlie@example.com",
  },
  {
    id: "6f7g8h9i",
    amount: 400,
    status: "processing",
    email: "dave@example.com",
  },
  {
    id: "7g8h9i0j",
    amount: 450,
    status: "success",
    email: "eve@example.com",
  },
  {
    id: "8h9i0j1k",
    amount: 500,
    status: "failed",
    email: "frank@example.com",
  },
  {
    id: "9i0j1k2l",
    amount: 550,
    status: "pending",
    email: "grace@example.com",
  },
  {
    id: "0j1k2l3m",
    amount: 600,
    status: "processing",
    email: "heidi@example.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 w-8 h-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TicketsLayout() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
