const LEGACY_ORIGIN = "https://insurance.lametayel.co.il";

const SKIPPED_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "accept-encoding",
]);

const SKIPPED_RESPONSE_HEADERS = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "transfer-encoding",
]);

function appendQueryValue(searchParams, key, value) {
  if (Array.isArray(value)) {
    value.forEach((item) => searchParams.append(key, String(item)));
    return;
  }

  if (value !== undefined && value !== null) {
    searchParams.append(key, String(value));
  }
}

function serializeParsedBody(body, contentType) {
  if (body === undefined || body === null) return undefined;
  if (Buffer.isBuffer(body) || typeof body === "string") return body;

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => appendQueryValue(params, key, value));
    return params.toString();
  }

  if (contentType.includes("application/json")) {
    return JSON.stringify(body);
  }

  return body;
}

async function getRequestBody(request) {
  const contentType = String(request.headers["content-type"] || "");
  const parsedBody = serializeParsedBody(request.body, contentType);
  if (parsedBody !== undefined) return parsedBody;

  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

function rewriteLocation(location) {
  if (!location) return location;
  return location.replace(/^https:\/\/insurance\.lametayel\.co\.il/i, "");
}

function rewriteCookie(cookie) {
  return cookie.replace(/;\s*Domain=\.?(?:insurance\.)?lametayel\.co\.il/gi, "");
}

export default async function handler(request, response) {
  try {
    const rawPath = Array.isArray(request.query.path)
      ? request.query.path.join("/")
      : String(request.query.path || "");
    const cleanPath = rawPath.replace(/^\/+/, "");
    const target = new URL(`/${cleanPath}`, LEGACY_ORIGIN);

    if (target.origin !== LEGACY_ORIGIN) {
      response.status(400).json({ error: "Invalid legacy path" });
      return;
    }

    Object.entries(request.query).forEach(([key, value]) => {
      if (key !== "path") appendQueryValue(target.searchParams, key, value);
    });

    const headers = new Headers();
    Object.entries(request.headers).forEach(([key, value]) => {
      if (SKIPPED_REQUEST_HEADERS.has(key.toLowerCase()) || value === undefined) return;
      headers.set(key, Array.isArray(value) ? value.join(", ") : String(value));
    });
    headers.set("accept-encoding", "identity");
    headers.set("origin", LEGACY_ORIGIN);
    headers.set("referer", `${LEGACY_ORIGIN}/${cleanPath}`);

    const method = request.method || "GET";
    const body = method === "GET" || method === "HEAD" ? undefined : await getRequestBody(request);
    const legacyResponse = await fetch(target, {
      method,
      headers,
      body,
      redirect: "manual",
    });

    response.status(legacyResponse.status);
    legacyResponse.headers.forEach((value, key) => {
      const normalizedKey = key.toLowerCase();
      if (SKIPPED_RESPONSE_HEADERS.has(normalizedKey) || normalizedKey === "set-cookie") return;
      response.setHeader(key, normalizedKey === "location" ? rewriteLocation(value) : value);
    });

    const cookies = legacyResponse.headers.getSetCookie?.() || [];
    if (cookies.length) {
      response.setHeader("set-cookie", cookies.map(rewriteCookie));
    } else {
      const cookie = legacyResponse.headers.get("set-cookie");
      if (cookie) response.setHeader("set-cookie", rewriteCookie(cookie));
    }

    if (method === "HEAD") {
      response.end();
      return;
    }

    response.end(Buffer.from(await legacyResponse.arrayBuffer()));
  } catch (error) {
    console.error("Legacy proxy failed", error);
    response.status(502).json({ error: "Legacy purchase service is unavailable" });
  }
}
