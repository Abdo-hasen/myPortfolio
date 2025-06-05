// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll) with enhanced settings
  AOS.init({
    duration: 1000,
    easing: "ease-out-cubic",
    once: true,
    offset: 100,
    delay: 100,
  })

  // Enhanced Preloader with fade effect
  const preloader = document.querySelector(".preloader")
  setTimeout(() => {
    preloader.style.opacity = "0"
    preloader.style.transition = "opacity 0.5s ease"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }, 1200)

  // Enhanced Navbar Scroll Effect
  const navbar = document.querySelector(".navbar")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 50) {
      navbar.classList.add("scrolled")
      navbar.style.transform = currentScrollY > lastScrollY ? "translateY(-100%)" : "translateY(0)"
    } else {
      navbar.classList.remove("scrolled")
      navbar.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })

  // Enhanced Active Navigation Link with Intersection Observer
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id')

        navLinks.forEach(link => {
          link.classList.remove('active')
          if (link.getAttribute('href').substring(1) === currentId) {
            link.classList.add('active')
          }
        })
      }
    })
  }, observerOptions)

  sections.forEach(section => {
    sectionObserver.observe(section)
  })

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero-section')
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      heroSection.style.transform = `translateY(${parallax}px)`
    })
  }



  // Enhanced Back to Top Button with progress indicator
  const backToTopBtn = document.querySelector(".back-to-top")

  if (backToTopBtn) {
    // Create progress circle
    const progressCircle = document.createElement('div')
    progressCircle.innerHTML = `
      <svg width="50" height="50" style="position: absolute; top: 0; left: 0;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(99, 102, 241, 0.3)" stroke-width="3"/>
        <circle cx="25" cy="25" r="20" fill="none" stroke="var(--primary)" stroke-width="3"
                stroke-dasharray="125.6" stroke-dashoffset="125.6"
                style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.3s ease;"/>
      </svg>
    `
    backToTopBtn.appendChild(progressCircle)

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      const progressCircleElement = backToTopBtn.querySelector('circle:last-child')

      if (scrollTop > 300) {
        backToTopBtn.classList.add("active")
        if (progressCircleElement) {
          const offset = 125.6 - (scrollPercent * 125.6)
          progressCircleElement.style.strokeDashoffset = offset
        }
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
  }

  // Enhanced Typewriter Effect with multiple phrases
  const typewriter = document.querySelector(".typewriter")
  if (typewriter) {
    const phrases = [
      "Backend Developer",
      "Laravel Expert",
      "PHP Specialist",
      "API Developer",
      "Database Designer"
    ]
    let currentPhrase = 0
    let isDeleting = false
    let text = ""
    let charIndex = 0

    typewriter.textContent = ""

    function type() {
      const fullText = phrases[currentPhrase]

      if (isDeleting) {
        text = fullText.substring(0, charIndex - 1)
        charIndex--
      } else {
        text = fullText.substring(0, charIndex + 1)
        charIndex++
      }

      typewriter.textContent = text

      let typeSpeed = isDeleting ? 75 : 120

      // Add some randomness to typing speed for more natural feel
      typeSpeed += Math.random() * 50

      if (!isDeleting && charIndex === fullText.length) {
        typeSpeed = 2000 // Pause at end
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        currentPhrase = (currentPhrase + 1) % phrases.length
        typeSpeed = 800 // Pause before next phrase
      }

      setTimeout(type, typeSpeed)
    }

    // Start typing after a delay
    setTimeout(type, 1500)
  }

  // Add mouse movement parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    const cube = document.querySelector('.cube')
    if (cube) {
      const rotateX = (mouseY - 0.5) * 20
      const rotateY = (mouseX - 0.5) * 20
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  })

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

  // Enhanced mobile touch interactions
  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)'
    })

    card.addEventListener('touchend', function() {
      this.style.transform = ''
    })
  })

  // Skill tags interactive animation
  const skillTags = document.querySelectorAll('.skill-tag')
  skillTags.forEach((tag, index) => {
    tag.addEventListener('mouseenter', function() {
      // Animate nearby tags
      skillTags.forEach((otherTag, otherIndex) => {
        if (Math.abs(index - otherIndex) <= 2 && index !== otherIndex) {
          otherTag.style.transform = 'translateY(-3px) scale(1.02)'
        }
      })
    })

    tag.addEventListener('mouseleave', function() {
      skillTags.forEach(otherTag => {
        otherTag.style.transform = ''
      })
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove('lazy')
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))

  // Add loading animation to buttons
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (!this.classList.contains('btn-disabled')) {
        // Create ripple effect
        const ripple = document.createElement('span')
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.width = ripple.style.height = size + 'px'
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'
        ripple.classList.add('ripple')

        this.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      }
    })
  })

  console.log('🚀 Portfolio loaded successfully with enhanced animations!')
})
