// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.toggle("active")
}

// Set Active Nav Link
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-menu a")

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
})

// Form Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm(formData) {
  const errors = []

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters")
  }

  if (!validateEmail(formData.email)) {
    errors.push("Please enter a valid email address")
  }

  if (!formData.password || formData.password.length < 6) {
    errors.push("Password must be at least 6 characters")
  }

  return errors
}

// Show Toast Notification
function showToast(message, type = "success") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 3000)
}

// Chart Helper Functions
function createSimpleChart(containerId, labels, values, maxValue = null) {
  const container = document.getElementById(containerId)
  if (!container) return

  const max = maxValue || Math.max(...values)
  const chartHTML = `
        <div class="simple-bar-chart">
            ${labels
              .map(
                (label, i) => `
                <div style="height: ${(values[i] / max) * 100}%; flex: 1; background: linear-gradient(to top, var(--primary-green), var(--mint-glow)); border-radius: 4px 4px 0 0; position: relative;">
                    <div style="position: absolute; bottom: -30px; left: 0; right: 0; text-align: center; font-size: 0.9rem; color: var(--muted-text);">${label}</div>
                    <div style="position: absolute; top: -25px; left: 0; right: 0; text-align: center; font-weight: 500; color: var(--primary-green);">${values[i]}</div>
                </div>
            `,
              )
              .join("")}
        </div>
    `
  container.innerHTML = chartHTML
}

// Local Storage Helpers
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error("Error saving to localStorage:", e)
  }
}

function getFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (e) {
    console.error("Error reading from localStorage:", e)
    return defaultValue
  }
}

// Mock Authentication
function mockLogin(email, password) {
  if (validateEmail(email) && password.length >= 6) {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      loginTime: new Date().toISOString(),
    }
    saveToLocalStorage("currentUser", userData)
    return { success: true, user: userData }
  }
  return { success: false, error: "Invalid credentials" }
}

function mockLogout() {
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

function getCurrentUser() {
  return getFromLocalStorage("currentUser", null)
}

function isUserLoggedIn() {
  return getCurrentUser() !== null
}

// Redirect if not authenticated
function requireAuth() {
  if (!isUserLoggedIn()) {
    window.location.href = "login.html"
  }
}
