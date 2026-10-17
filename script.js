const WHATSAPP_NUMBER = "447800642850";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#bake-type");
    const value = link.dataset.product;
    if (select) {
      const matchingOption = [...select.options].find((option) => option.text.toLowerCase().includes(value.toLowerCase()));
      if (matchingOption) select.value = matchingOption.value;
      else if (value.toLowerCase().includes("custom")) select.value = "Custom celebration bake";
      else if (value.toLowerCase().includes("loaf")) select.value = "Artisan loaf cake";
      else select.value = "Something else / not sure yet";
    }
  });
});

document.querySelector("#order-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const clean = (value) => String(value || "").trim();
  const name = clean(data.get("name"));
  const contact = clean(data.get("contact")) || "Not provided";
  const bake = clean(data.get("bake"));
  const date = clean(data.get("date")) || "Flexible / to discuss";
  const servings = clean(data.get("servings")) || "Not sure yet";
  const details = clean(data.get("details")) || "No extra details yet";

  const message = [
    "Hi Fuss-Free Bakery! I'd love to enquire about an order.",
    "",
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Bake: ${bake}`,
    `Date needed: ${date}`,
    `Servings: ${servings}`,
    `Details: ${details}`,
    "",
    "Please let me know availability, delivery options and pricing. Thank you!"
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const status = document.querySelector("#form-status");
  if (status) status.textContent = "Opening WhatsApp with your enquiry. Please review the message and tap Send.";
  window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
