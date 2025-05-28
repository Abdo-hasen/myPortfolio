// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })

  // Preloader
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none"
  }, 1000)

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0"
      navbar.style.boxShadow = "var(--shadow)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.boxShadow = "var(--shadow-sm)"
    }
  })

  // Active Navigation Link
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })



  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Typewriter Effect
  const typewriter = document.querySelector(".typewriter")
  if (typewriter) {
    const phrases = ["Software Engineer", "Backend Developer"]
    let currentPhrase = 0
    let isDeleting = false
    let text = ""

    typewriter.textContent = ""

    function type() {
      // Current phrase
      const fullText = phrases[currentPhrase]

      // If deleting, remove a character, else add a character
      if (isDeleting) {
        text = fullText.substring(0, text.length - 1)
      } else {
        text = fullText.substring(0, text.length + 1)
      }

      // Set the text
      typewriter.textContent = text

      // Typing speed
      let typeSpeed = isDeleting ? 50 : 100

      // If complete phrase, start deleting after pause
      if (!isDeleting && text === fullText) {
        typeSpeed = 1500 // Pause at end of phrase
        isDeleting = true
      } else if (isDeleting && text === "") {
        isDeleting = false
        // Move to next phrase or back to first
        currentPhrase = (currentPhrase + 1) % phrases.length
        typeSpeed = 500 // Pause before typing next phrase
      }

      setTimeout(type, typeSpeed)
    }

    // Start typing
    setTimeout(type, 1000)
  }

  // Progress Bar Animation
  const progressBars = document.querySelectorAll(".progress-bar")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"
      setTimeout(() => {
        bar.style.width = width
      }, 500)
    })
  }

  // Trigger progress bar animation when skills section is in view
  const skillsSection = document.getElementById("skills")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (skillsSection) {
    observer.observe(skillsSection)
  }

  // Form Submission with Web3Forms
  const contactForm = document.getElementById("contact-form")
  const submitBtn = document.getElementById("submit-btn")
  const btnText = submitBtn?.querySelector(".btn-text")
  const btnLoading = submitBtn?.querySelector(".btn-loading")
  const formMessage = document.getElementById("form-message")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Client-side validation
      if (!name || !email || !subject || !message) {
        showMessage("Please fill in all required fields.", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error")
        return
      }

      // Show loading state
      setLoadingState(true)

      try {
        // Submit to Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        })

        const result = await response.json()

        if (result.success) {
          showMessage("Thank you for your message! I will get back to you soon.", "success")
          contactForm.reset()
        } else {
          throw new Error(result.message || "Something went wrong")
        }
      } catch (error) {
        console.error("Form submission error:", error)
        showMessage("Sorry, there was an error sending your message. Please try again or contact me directly.", "error")
      } finally {
        setLoadingState(false)
      }
    })
  }

  // Helper function to show messages
  function showMessage(message, type) {
    if (!formMessage) return

    formMessage.innerHTML = `
      <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        const alert = formMessage.querySelector('.alert')
        if (alert) {
          alert.classList.remove('show')
          setTimeout(() => {
            formMessage.innerHTML = ''
          }, 150)
        }
      }, 5000)
    }
  }

  // Helper function to set loading state
  function setLoadingState(loading) {
    if (!submitBtn || !btnText || !btnLoading) return

    if (loading) {
      submitBtn.disabled = true
      btnText.classList.add('d-none')
      btnLoading.classList.remove('d-none')
    } else {
      submitBtn.disabled = false
      btnText.classList.remove('d-none')
      btnLoading.classList.add('d-none')
    }
  }

  // Experience & Education animations
  const experienceSection = document.getElementById("experience")
  const timelines = document.querySelectorAll(".timeline")
  const timelineItems = document.querySelectorAll(".timeline-item")

  const experienceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the timeline progress bar
          timelines.forEach((timeline) => {
            timeline.classList.add("animate")
          })

          // Animate timeline items with delay
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate")
            }, 300 * index)
          })

          experienceObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  if (experienceSection) {
    experienceObserver.observe(experienceSection)
  }
})
