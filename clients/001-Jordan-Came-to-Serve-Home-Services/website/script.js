const form = document.querySelector("#discoveryForm");
const statusEl = document.querySelector("#formStatus");
const submitButton = form.querySelector("button[type='submit']");
const successMessage =
  "Thank you! Your answers have been submitted successfully. We will review your information and contact you soon.";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusEl.className = "form-status";
  statusEl.textContent = "";

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (form.elements._honey.value) {
    statusEl.className = "form-status success";
    statusEl.textContent = successMessage;
    form.reset();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Form submission failed.");
    }

    form.reset();
    statusEl.className = "form-status success";
    statusEl.textContent = successMessage;
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } catch (error) {
    statusEl.className = "form-status error";
    statusEl.textContent =
      "We could not submit the form from this browser. Please check your connection and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Business Discovery Form";
  }
});
