const platform = globalThis.Deno ? "deno" : "br";
const tf = (await import("./tf-" + platform + ".js")).tf;
export { tf };
