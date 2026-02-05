/**
 * Creates a page URL based on the page name
 * @param pageName - The name of the page
 * @returns The complete URL for the page
 */
export const createPageUrl = (pageName: string): string => {
  // Adjust the base path according to your routing configuration
  const basePath = "/";
  
  // Convert page name to URL format (e.g., "MyStories" -> "my-stories")
  const pageSlug = pageName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
  
  return `${basePath}${pageSlug}`;
};

/**
 * Alternative implementation if you have a route map
 */
export const createPageUrlWithMap = (pageName: string): string => {
  const routeMap: Record<string, string> = {
    Home: "/",
    Search: "/search",
    Write: "/write",
    MyStories: "/my-stories",
    Profile: "/profile",
    Settings: "/settings",
    Subscription: "/subscription",
  };
  
  return routeMap[pageName] || "/";
};