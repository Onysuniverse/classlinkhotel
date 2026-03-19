import { amenities, reviews, galleryImages } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNav();
    initSections();
    initAnimations();
    initBookingForm();
    initLightbox();


    setTimeout(() => {
        document.getElementById('hero-content').classList.add('show');
    }, 400);
});

function initNav() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const openMenu = () => {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initSections() {

    const amenitiesContainer = document.getElementById('amenities-container');
    if (amenitiesContainer) {
        amenities.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `amenity-card reveal delay-${(index % 3) * 100 + 100}`;
            card.innerHTML = `
                <div class="mb-8 inline-block text-gold">
                    <i data-lucide="${item.icon}" class="w-12 h-12 stroke-[1px]"></i>
                </div>
                <h3 class="text-2xl font-serif mb-4 text-white">${item.title}</h3>
                <p class="text-slate-400 text-sm leading-relaxed font-light">${item.desc}</p>
            `;
            amenitiesContainer.appendChild(card);
        });
    }


    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = `gallery-item ${img.span} reveal delay-${(index % 4) * 100}`;
            div.innerHTML = `<img src="${img.url}" alt="Classlink Hotel Tarkwa" loading="lazy" class="lightbox-trigger">`;
            galleryGrid.appendChild(div);
        });
    }


    const reviewsContainer = document.getElementById('reviews-container');
    if (reviewsContainer) {
        reviews.forEach((review, index) => {
            const div = document.createElement('div');
            div.className = `bg-white p-10 shadow-sm border-t-2 border-gold/20 reveal delay-${index * 100}`;
            let stars = '';
            for(let i=0; i<5; i++) {
                stars += `<i data-lucide="star" class="w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-slate-200'}"></i>`;
            }
            div.innerHTML = `
                <div class="flex mb-6 space-x-1">${stars}</div>
                <p class="text-slate-600 italic mb-8 text-lg font-light leading-relaxed">"${review.text}"</p>
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-[1px] bg-gold"></div>
                    <p class="font-serif text-navy font-bold text-sm uppercase tracking-widest">${review.name}</p>
                </div>
            `;
            reviewsContainer.appendChild(div);
        });
    }

    lucide.createIcons();
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-trigger')) {
            lightboxImg.src = e.target.src;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    });

    const hideLightbox = () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });
}

function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = 'PROCESSING...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            alert('Thank you for your interest! Your reservation inquiry has been received. Our team at Classlink Hotel will contact you at your provided email/phone within 24 hours to confirm rates and availability.');
            form.reset();
            btn.disabled = false;
            btn.innerText = originalText;
            btn.style.opacity = '1';
        }, 2000);
    });
}
