import { execa } from "https://deno.land/x/easy_std@v0.6.4/src/process.ts";
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

import { version } from "./src/version.ts";
import { normalizeSSH } from "./src/normalize.ts";

if (import.meta.main) {
  const commander = new Command()
    .name("g")
    .version(version)
    .description(`simplify git operations`)
    .action(() => {
      execa(["git", "add", "."]);
    });

  const commit = new Command().alias("m").alias("commit").description(
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

  const release = new Command().alias("release").description(
    "release new tag",
  ).arguments("<tag:string>").action(async (_, tag) => {
    await execa(["git", "add", "."]);
    await execa(["git", "commit", "-m", "chore: update"]);
    await execa(["git", "tag", tag]);
    await execa(["git", "push", "--tags"]);
  });

  const clone = new Command().alias("clone").description("clone remote repo")
    .arguments("<repo:string>").action(async (_, repo) => {
      await execa(["git", "clone", normalizeSSH(repo)]);
    });

  await commander
    .command("p", push)
    .command("r", release)
    .command("l", clone)
    .command("c", commit)
    .parse(Deno.args);
}
