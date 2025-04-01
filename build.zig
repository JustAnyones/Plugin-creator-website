const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    // ============================
    //  Zig infiltration detected!
    //  It's time to use the power
    //  of the meow-mazing build.zig
    //  for your Node-based project.
    //
    //  Fear not, friend, for we only
    //  come bearing a new vantage
    //  (and a splash of uwu).
    // ============================

    // Step 1: Acquire the goods (npm install)
    const npm_install = b.addSystemCommand(&[_][]const u8{
        "npm", "install",
    }, "Acquiring Node dependencies, nya~");

    // Step 2: Actually build the website (npm run build)
    const npm_build = b.addSystemCommand(&[_][]const u8{
        "npm", "run", "build",
    }, "Constructing your purrfect plugin website");

    // We must ensure the build step depends on the install step
    npm_build.step.dependOn(&npm_install.step);

    // In true Zig style, let's define a final step so users can do 'zig build' once,
    // which triggers the entire chain of events (purr). 
    const final_step = b.step("zig-catnip", "All set! Meow-nyan have a wonderful build~");
    final_step.dependOn(&npm_build.step);
}
