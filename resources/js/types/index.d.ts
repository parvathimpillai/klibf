export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  email_verified_at: string;
  roles: string[];
  created_at: string;
}

export interface Site {
  id: number;
  name: string;
  url: string;
  created_at: string;
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

export interface BasePageProps {
  message?: string;
  filters: {
    search?: string;
  };
}

export interface UsersPageProps extends PageProps {
  users: {
    data: User[];
    meta: Meta;
  };
  message?: string;
  roles: string[];
  filters: {
    search?: string;
  };
  flash: {
    success?: string;
    error?: string;
  };
}

export interface SitesPageProps extends BasePageProps {
  sites: {
    data: Site[];
    meta: Meta;
  };
}
