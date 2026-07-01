const form = document.querySelector("#discoveryForm");
const statusEl = document.querySelector("#formStatus");
const submitButton = form.querySelector("button[type='submit']");
const successScreen = document.querySelector("#successScreen");
const successMessage =
  "Assessment successfully received.";

function showSuccessScreen() {
  form.hidden = true;
  successScreen.hidden = false;
  successScreen.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
    showSuccessScreen();
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
    showSuccessScreen();
  } catch (error) {
    statusEl.className = "form-status error";
    statusEl.textContent =
      "We could not submit the form from this browser. Please check your connection and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit My Business Assessment";
  }
});
