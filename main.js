// Hero Slider
const slides = document.querySelectorAll(".slide");
let current = 0;

function nextSlide() {
    slides[current].classList.remove("active");
    current++;
    if (current >= slides.length) {
        current = 0;
    }
    slides[current].classList.add("active");
}

// Change image every 5 seconds
setInterval(nextSlide, 5000);

// ====================
// PROJECTS DATA & GALLERY
// ====================

// Menu Data - Electrical Projects Only
const menuData = {
    Owncompound: [
        {
            title: "Own Compound",
            description: "Full electrical installation including lights, sockets, CCTV, and data points. Smart-home ready with pre-wiring for future expansion.",
            images: [
                "electric project/download (1).jpg",
                "electric project/download (2).jpg",
                "electric project/download (4).jpg"
            ],
            features: ["💡 Lights", "🔌 Sockets", "📡 Data", "📷 CCTV"]
        },
        {
            title: "Bungalo (3 Bedroom)",
            description: "Complete electrical fit-out with lighting, power outlets, camera pre-wiring, and structured data cabling.",
            images: [
                "electric project/download.jpg",
                "electric project/image copy 2.png"
            ],
            features: ["💡 Lights", "🔌 Sockets", "📡 Data", "📷 CCTV"]
        },
        {
            title: "Mansionate",
            description: "Premium electrical installation with smart lighting control, garden lighting, concealed wiring, and home automation pre-wiring.",
            images: [
                "images/mansionate-1.jpg",
                "images/mansionate-2.jpg",
                "images/mansionate-3.jpg"
            ],
            features: ["💡 Lights", "🔌 Sockets", "📡 Data", "📷 CCTV", "🏠 Automation"]
        }
    ],
    Institutions: [
        {
            title: "Institutions - School Building",
            description: "Heavy-duty electrical infrastructure with emergency lighting, backup circuits, and high-capacity distribution for educational facilities.",
            images: [
                "images/institution-1.jpg",
                "images/institution-2.jpg",
                "images/institution-3.jpg"
            ],
            features: ["💡 Emergency Lights", "🔌 Heavy Duty Sockets", "⚡ Backup Circuits", "📡 Network Cabling"]
        },
        {
            title: "Institutions - Hospital Wing",
            description: "Critical power systems with redundant circuits, medical equipment outlets, and backup generator integration.",
            images: [
                "electric project/image copy 10.png",
                "electric project/image copy 11.png"
            ],
            features: ["⚡ Redundant Circuits", "🔌 Medical Outlets", "🔄 Backup Integration", "💡 Emergency Lighting"]
        }
    ],
    mansion: [
        {
            title: "Mansion - Luxury Home",
            description: "Premium electrical installation with smart lighting control, garden lighting, concealed wiring, and home automation pre-wiring.",
            images: [
                "electric project/image copy 3.png",
                "electric project/image copy 5.png",
                "electric project/image copy 14.png"
            ],
            features: ["💡 Smart Lights", "🔌 Premium Sockets", "📡 Automation", "📷 CCTV", "🌿 Garden Lighting"]
        },
        {
            title: "Mansion - Villa Project",
            description: "Complete luxury electrical fit-out with integrated audio-visual systems, motorized curtains, and climate control pre-wiring.",
            images: [
                "electric project/image copy 6.png",
                "electric project/image copy 7.png",
                "electric project/image copy 8.png"
            ],
            features: ["💡 Ambient Lighting", "🔌 Designer Outlets", "🎵 AV Integration", "🌡️ Climate Control"]
        }
    ],
    rentals: [
        {
            title: "Rentals - Apartment Complex",
            description: "Cost-effective, durable wiring with individual sub-meters for tenant billing and pre-wiring for internet/cameras.",
            images: [
                "images/own-compound-3.jpg",
                "images/rentals-2.jpg"
            ],
            features: ["🔌 Individual Meters", "📡 Shared Internet", "📷 Common CCTV", "💡 Common Lighting"]
        },
        {
            title: "Rentals - Student Hostel",
            description: "High-capacity electrical system with multiple socket points per room, common area lighting, and security system pre-wiring.",
            images: [
                "electric project/image copy 2.png",
                "electric project/image copy 4.png"
            ],
            features: ["🔌 Multi-Socket Points", "💡 Common Lighting", "📷 Security Cameras", "📡 Data Points"]
        }
    ]
};

// Global variable to track active category
let activeCategory = "Owncompound";

// Function to change image in a specific gallery
function changeImage(projectIndex, imageIndex) {
    const project = menuData[activeCategory][projectIndex];
    if (!project || !project.images[imageIndex]) return;
    
    const mainImg = document.getElementById(`mainImg${projectIndex}`);
    if (mainImg) {
        mainImg.src = project.images[imageIndex];
    }
    
    // Update active thumbnail styling
    const thumbnails = document.querySelectorAll(`#gallery-${projectIndex} .gallery-thumbnails img`);
    thumbnails.forEach((thumb, idx) => {
        if (idx === imageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Dynamically generate all cards from menuData based on active category
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    const projects = menuData[activeCategory];
    
    projects.forEach((project, idx) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Build thumbnails HTML
        let thumbnailsHtml = '';
        project.images.forEach((img, imgIdx) => {
            thumbnailsHtml += `<img src="${img}" onclick="changeImage(${idx}, ${imgIdx})" class="${imgIdx === 0 ? 'active' : ''}" alt="Thumbnail ${imgIdx + 1}">`;
        });
        
        // Build features HTML
        let featuresHtml = '';
        project.features.forEach(feature => {
            featuresHtml += `<span class="badge">${feature}</span>`;
        });
        
        card.innerHTML = `
            <div class="image-gallery" id="gallery-${idx}">
                <img class="gallery-main" id="mainImg${idx}" src="${project.images[0]}" alt="${project.title}">
                <div class="gallery-thumbnails">
                    ${thumbnailsHtml}
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-features">
                    ${featuresHtml}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ====================
// MENU TAB FUNCTIONALITY
// ====================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const projectsContainer = document.getElementById('projectsContainer');
    
    // If projectsContainer doesn't exist in the original HTML, create it
    if (!projectsContainer) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            const container = document.createElement('div');
            container.id = 'projectsContainer';
            container.className = 'projects-grid';
            projectsGrid.parentNode.replaceChild(container, projectsGrid);
        }
    }
    
    // Initial render
    renderProjects();
    
    // Add click event to menu tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Update active category
            activeCategory = tab.dataset.category;
            // Render the corresponding menu items
            renderProjects();
        });
    });
});

// ====================
// CONTACT FORM HANDLING
// ====================

// Wait for DOM to load for form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('status');
    const toast = document.getElementById('toast');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('UserName')?.value || '',
                phone: document.getElementById('PhoneNumber')?.value || '',
                location: document.getElementById('location')?.value || '',
                projectType: document.getElementById('ProjectType')?.value || '',
                message: document.getElementById('message')?.value || '',
                timestamp: new Date().toISOString()
            };
            
            // Basic validation
            if (!formData.name || !formData.phone || !formData.message) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Phone validation (Kenyan format)
            const phoneRegex = /^07\d{8}$|^01\d{8}$|^2547\d{8}$|^\+2547\d{8}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                showToast('Please enter a valid phone number', 'error');
                return;
            }
            
            // Disable submit button to prevent double submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            
            try {
                // Send to Formspree (free service) - Replace with your Formspree endpoint
                const response = await fetch('https://formspree.io/f/your-endpoint-here', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    showToast('Enquiry sent successfully! We will contact you soon.', 'success');
                    form.reset();
                    if (statusDiv) statusDiv.innerHTML = '<span style="color: #28a745;">✓ Enquiry sent successfully!</span>';
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('Failed to send enquiry. Please try again or call us directly.', 'error');
                if (statusDiv) statusDiv.innerHTML = '<span style="color: #dc3545;">✗ Failed to send. Please call us instead.</span>';
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send';
                }
            }
        });
    }
    
    // Toast notification function
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } else {
            alert(message);
        }
    }
    
    // Make showToast globally available
    window.showToast = showToast;
});

// ====================
// MOBILE MENU TOGGLE
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
});

// ====================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu && navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                    }
                }
            }
        });
    });
});
