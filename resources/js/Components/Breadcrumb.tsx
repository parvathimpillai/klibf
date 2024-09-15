import { usePage, Link } from "@inertiajs/react"; // Import Link from Inertia
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { User } from "@/types";

export function Breadcrumbs({ user }: { user: User }) {
  const { url } = usePage(); // Get the current URL
  const pathSegments = url.split("/").filter(Boolean); // Split the URL into segments

  const isDashboard = route().current("dashboard"); // Check if the current route is the dashboard

  return (
    <Breadcrumb className="flex-shrink-0">
      <BreadcrumbList>
        <BreadcrumbItem>
          {isDashboard ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <Link href={route("dashboard")}>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </Link>
          )}
        </BreadcrumbItem>
        {!isDashboard && (
          <>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            {pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`; // Construct the href
              const isLast = index === pathSegments.length - 1; // Check if it's the last segment
              const isUserSegment =
                pathSegments[index - 1] === "users" && !isNaN(Number(segment));

              let displayText =
                segment.charAt(0).toUpperCase() + segment.slice(1);
              if (isUserSegment && user) {
                displayText = user.name; // Use the user's name instead of the ID
              }

              return (
                <BreadcrumbItem key={index}>
                  {isLast ? (
                    <BreadcrumbPage>{displayText}</BreadcrumbPage>
                  ) : (
                    <>
                      <Link href={href}>
                        <BreadcrumbPage>{displayText}</BreadcrumbPage>
                      </Link>
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                    </>
                  )}
                </BreadcrumbItem>
              );
            })}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
