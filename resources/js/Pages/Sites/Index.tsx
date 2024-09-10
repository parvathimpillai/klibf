import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/Components/ui/table";

export default function Index({ sites }: PageProps<{ sites: any[] }>) {
  return (
    <>
      <Head title="My Sites" />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Sites</h1>
        <Link href={route("sites.create")}>
          <Button className="mb-4">Create New Site</Button>
        </Link>
        {sites.length === 0 ? (
          <p>No sites found. Please create a new site.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell>{site.name}</TableCell>
                  <TableCell>{site.url}</TableCell>
                  <TableCell>
                    <Link href={route("sites.edit", site.id)}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <form
                      action={route("sites.destroy", site.id)}
                      method="POST"
                      className="inline"
                    >
                      @csrf @method('DELETE')
                      <Button type="submit" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
