
// Show the processing view while the browser waits for the server
document.querySelector("#upload-form").addEventListener("submit", () => {
  document.querySelector("#view-upload").classList.add("hidden");
  document.querySelector("#view-processing").classList.remove("hidden");
  document.querySelector("#view-processing").classList.add("flex");
});