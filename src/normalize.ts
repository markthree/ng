/**
 * Handling github HTTPS links to standard github SSH
 * @param repo
 * @returns normalized repo
 * @example
 * ```ts
 * import { normalizeSSH } from "https://deno.land/x/m3g@$STD_VERSION/normalize.ts";
 *
 * normalizeSSH("https://github.com/markthree/dnrm") // returns git@github.com:markthree/dnrm.git
 * ```
 */
export function normalizeSSH(repo: string) {
  const httpsPrefix = "https://github.com/";
  if (repo.startsWith(httpsPrefix)) {
    return repo.replace(httpsPrefix, "git@github.com:") + ".git";
  }
  return repo;
}
