import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    url: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("sites.store"));
  };

  return (
    <>
      <Head title="Create New Site" />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create New Site</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <Label htmlFor="name">Site Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              required
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mb-4">
            <Label htmlFor="url">Site URL</Label>
            <Input
              id="url"
              type="url"
              value={data.url}
              onChange={(e) => setData("url", e.target.value)}
              required
            />
            <InputError message={errors.url} className="mt-2" />
          </div>
          <Button type="submit" processing={processing}>
            Create Site
          </Button>
        </form>
      </div>
    </>
  );
}
