export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    const seoPages = {
      "/blog": "/seo/blog.html",
      "/blog/blog1": "/seo/blog/blog1.html",
      "/blog/blog2": "/seo/blog/blog2.html",
      "/blog/blog3": "/seo/blog/blog3.html",
      "/blog/blog5": "/seo/blog/blog5.html",
    };
    const seoPath = seoPages[requestUrl.pathname.replace(/\/$/, "") || "/"];
    if (seoPath && request.headers.get("accept")?.includes("text/html") && ["GET", "HEAD"].includes(request.method)) {
      const seoUrl = new URL(request.url);
      seoUrl.pathname = seoPath;
      seoUrl.search = "";
      const seoResponse = await env.ASSETS.fetch(new Request(seoUrl, request));
      if (seoResponse.status !== 404) return seoResponse;
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
