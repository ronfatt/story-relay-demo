export function getCookieValue(cookieHeader: string, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  let value: string | null = null;
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) {
      value = part.slice(name.length + 1);
    }
  }
  return value;
}
