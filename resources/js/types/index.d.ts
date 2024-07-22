export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}
type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};

// users has data property which is an array of User

export type UsersPageProps = PageProps & {
  users: {
    data: User[];
    meta: Meta;
  };
};
