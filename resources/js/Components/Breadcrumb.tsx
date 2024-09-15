import { usePage } from "@inertiajs/react"; // Import usePage to get current route
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

export function Breadcrumbs() {
  const { url } = usePage(); // Get the current URL
  const pathSegments = url.split("/").filter(Boolean); // Split the URL into segments

  const isDashboard = url === route("dashboard"); // Check if the current route is the dashboard
  console.log(isDashboard);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isDashboard ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={route("dashboard")}>Dashboard</BreadcrumbLink>
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
              return (
                <BreadcrumbItem key={index}>
                  {isLast ? (
                    <BreadcrumbPage>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
                      {/* Capitalize the segment */}
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink href={href}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
                        {/* Capitalize the segment */}
                      </BreadcrumbLink>
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
