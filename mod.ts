import { execa } from "https://deno.land/x/ndeno@v1.2.0/src/process.ts";
import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

import { version } from "./src/version.ts";

if (import.meta.main) {
  const commander = new Command()
    .name("g")
    .version(version)
    .description(`simplify git operations`)
    .action(() => {
      execa(["git", "add", "."]);
    });

  const commit = new Command().alias("commit").description(
    "commit with message",
  )
    .arguments("<message:string>")
    .action((_, message) => {
      execa(["git", "commit", "-m", `${message}`]);
    });

  const push = new Command().alias("push").description("push remote").action(
    () => {
      execa(["git", "push"]);
    },
  );

  await commander
    .command("p", push)
    .command("c", commit)
    .parse(Deno.args);
}
