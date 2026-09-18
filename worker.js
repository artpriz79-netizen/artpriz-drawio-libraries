const AUTH_USER = "artpriz";
const PASSWORD_SALT = "76558a9da2c7a5df8851572457402834";
const PASSWORD_HASH = "0b21c7fd61be3470636503b8105f6c63451dfffa7273626174abb2f0e0239e6a";

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function authorized(request) {
  const header = request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) return false;

  try {
    const decoded = atob(header.slice(6));
    const splitAt = decoded.indexOf(":");
    if (splitAt < 0) return false;

    const username = decoded.slice(0, splitAt);
    const password = decoded.slice(splitAt + 1);
    if (username !== AUTH_USER) return false;

    const candidate = await sha256Hex(PASSWORD_SALT + password);
    return timingSafeEqual(candidate, PASSWORD_HASH);
  } catch {
    return false;
  }
}

function unauthorized() {
  return new Response(
    `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ArtPriz Constructor — доступ</title>
<style>
body{font-family:Arial,sans-serif;background:#111827;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0}
.box{max-width:520px;padding:34px;text-align:center}.muted{color:#cbd5e1;line-height:1.55}
</style>
</head>
<body><div class="box"><h1>🏆 ArtPriz Constructor</h1><p class="muted">Доступ только для сотрудников ArtPriz. Введите корпоративный логин и пароль в окне браузера.</p></div></body>
</html>`,
    {
      status: 401,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "WWW-Authenticate": 'Basic realm="ArtPriz Constructor", charset="UTF-8"',
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer"
      }
    }
  );
}

export default {
  async fetch(request, env) {
    if (!(await authorized(request))) {
      return unauthorized();
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "no-referrer");
    headers.set("Cache-Control", "private, no-store");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
