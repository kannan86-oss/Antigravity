
console.log("Script started");
try {
    await import('./js/main.js');
    console.log("Import succeeded");
} catch (e) {
    console.log("Caught error:");
    console.log(e.toString());
    if (e.stack) console.log(e.stack);
}
console.log("Script finished");
