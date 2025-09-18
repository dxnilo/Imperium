(function(){
	const productGrid = document.getElementById('product-grid');
	const filters = document.querySelectorAll('.filter-button');
	const yearSpan = document.getElementById('year');
	yearSpan.textContent = String(new Date().getFullYear());

	const productModal = document.getElementById('product-modal');
	const modalImage = document.getElementById('modal-image');
	const modalTitle = document.getElementById('modal-title');
	const modalCategory = document.getElementById('modal-category');
	const modalPrice = document.getElementById('modal-price');
	const modalWhatsApp = document.getElementById('modal-whatsapp');

	const categories = [
		{ key: 'camisas de compresion', title: 'Camisas de compresión' },
		{ key: 'camisillas', title: 'Camisillas' },
		{ key: 'jogger tipo cargo', title: 'Jogger tipo cargo' },
		{ key: 'joggers', title: 'Joggers' },
	];

	function toMoney(value){
		return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(value);
	}

	// Generamos imágenes más realistas para los productos
	function createProductImage(category, color = '#d4af37', accent = '#1e293b') {
		return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
			<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
				<defs>
					<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#0a0c10"/>
						<stop offset="100%" style="stop-color:#0f1318"/>
					</linearGradient>
					<linearGradient id="product" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:${color}"/>
						<stop offset="100%" style="stop-color:${accent}"/>
					</linearGradient>
				</defs>
				<rect width="100%" height="100%" fill="url(#bg)"/>
				${category === 'camisas de compresion' ? 
					'<path d="M120 100 L280 100 L280 120 L300 140 L300 300 L100 300 L100 140 L120 120 Z" fill="url(#product)" opacity="0.9"/><path d="M180 100 L220 100 L220 300 L180 300 Z" fill="url(#product)" opacity="0.7"/>' :
				category === 'camisillas' ? 
					'<path d="M140 120 L260 120 L280 140 L280 280 L120 280 L120 140 Z" fill="url(#product)" opacity="0.9"/><circle cx="200" cy="200" r="60" fill="url(#product)" opacity="0.6"/>' :
				category === 'jogger tipo cargo' ? 
					'<path d="M160 120 L240 120 L250 300 L150 300 Z" fill="url(#product)" opacity="0.9"/><rect x="170" y="200" width="60" height="20" fill="url(#product)" opacity="0.8"/><rect x="170" y="240" width="60" height="20" fill="url(#product)" opacity="0.8"/>' :
					'<path d="M160 120 L240 120 L245 300 L155 300 Z" fill="url(#product)" opacity="0.9"/><path d="M155 300 L170 320 L230 320 L245 300" fill="url(#product)" opacity="0.7"/>'
				}
				<text x="200" y="350" fill="${color}" font-family="Montserrat" font-size="16" font-weight="700" text-anchor="middle">IMPERIUN</text>
			</svg>
		`);
	}

	const catalog = [
		// Camisas de compresión
		{ id: 'comp-1', name: 'Compresión Elite Black', price: 149000, category: 'camisas de compresion', img: 'camisas de compresion/WhatsApp Image 2025-09-06 at 2.03.39 PM (4).jpeg' },
		{ id: 'comp-2', name: 'Compresión Pro White', price: 145000, category: 'camisas de compresion', img: 'camisas de compresion/WhatsApp Image 2025-09-06 at 2.03.39 PM (5).jpeg' },
		
		// Camisillas
		{ id: 'cam-1', name: 'Tank Top Premium', price: 89000, category: 'camisillas', img: 'camisillas/WhatsApp Image 2025-09-06 at 2.03.39 PM (6).jpeg' },
		{ id: 'cam-2', name: 'Dry-Fit Essential', price: 79000, category: 'camisillas', img: 'camisillas/WhatsApp Image 2025-09-06 at 2.03.40 PM.jpeg' },
		
		// Jogger tipo cargo
		{ id: 'cargo-1', name: 'Cargo Tactical Olive', price: 189000, category: 'jogger tipo cargo', img: 'jogger tipo cargo/WhatsApp Image 2025-09-06 at 2.03.39 PM (2).jpeg' },
		{ id: 'cargo-2', name: 'Cargo Military Black', price: 185000, category: 'jogger tipo cargo', img: 'jogger tipo cargo/WhatsApp Image 2025-09-06 at 2.03.39 PM (3).jpeg' },
		
		// Joggers
		{ id: 'jog-1', name: 'Jogger Classic Fit', price: 129000, category: 'joggers', img: 'joggers/WhatsApp Image 2025-09-06 at 2.03.38 PM.jpeg' },
		{ id: 'jog-2', name: 'Jogger Performance', price: 135000, category: 'joggers', img: 'joggers/WhatsApp Image 2025-09-06 at 2.03.38 PM (1).jpeg' },
		{ id: 'jog-3', name: 'Jogger Athletic Gray', price: 132000, category: 'joggers', img: 'joggers/WhatsApp Image 2025-09-06 at 2.03.38 PM (2).jpeg' },
		{ id: 'jog-4', name: 'Jogger Urban Style', price: 138000, category: 'joggers', img: 'joggers/WhatsApp Image 2025-09-06 at 2.03.38 PM (3).jpeg' },
		{ id: 'jog-5', name: 'Jogger Premium Black', price: 142000, category: 'joggers', img: 'joggers/WhatsApp Image 2025-09-06 at 2.03.39 PM.jpeg' },
		{ id: 'jog-6', name: 'Jogger Elite Series', price: 145000, category: 'joggers', img: 'joggers/WhatsApp Image 2025-09-06 at 2.03.39 PM (1).jpeg' },
	];

	function renderProducts(filter){
		const items = catalog.filter(p => filter==='todos' ? true : p.category===filter);
		productGrid.innerHTML = items.map((p, index) => `
			<article class="card" data-id="${p.id}" data-category="${p.category}" style="animation-delay: ${index * 100}ms">
				<div class="card-media">
					<img src="${p.img}" alt="${p.name}" loading="lazy" />
				</div>
				<div class="card-body">
					<h3 class="card-title">${p.name}</h3>
					<p class="card-meta">${categories.find(c=>c.key===p.category)?.title ?? ''}</p>
					<p class="card-price">${toMoney(p.price)}</p>
				</div>
				<div class="card-actions">
					<button class="btn btn-ghost" data-action="ver">Ver Detalles</button>
				</div>
			</article>
		`).join('');
		
		// Trigger animation
		requestAnimationFrame(() => {
			document.querySelectorAll('.card').forEach(card => {
				card.style.animation = 'cardAppear 0.6s ease-out forwards';
			});
		});
	}

	function setActiveFilter(btn){
		filters.forEach(b=>b.classList.toggle('active', b===btn));
	}

	filters.forEach(btn=>{
		btn.addEventListener('click',()=>{
			setActiveFilter(btn);
			renderProducts(btn.dataset.filter);
		});
	});

	productGrid.addEventListener('click', (ev)=>{
		const button = ev.target.closest('[data-action="ver"]');
		if(!button) return;
		const card = button.closest('.card');
		const id = card.dataset.id;
		const product = catalog.find(p=>p.id===id);
		openModal(product);
	});

	function openModal(product){
		modalImage.src = product.img;
		modalTitle.textContent = product.name;
		modalCategory.textContent = categories.find(c=>c.key===product.category)?.title ?? '';
		modalPrice.textContent = toMoney(product.price);
		const message = encodeURIComponent(`Hola, quiero este producto: ${product.name} (${product.id}) - Precio: ${toMoney(product.price)}`);
		modalWhatsApp.href = `https://wa.me/573007219093?text=${message}`;
		productModal.setAttribute('aria-hidden','false');
	}
	function closeModal(){
		productModal.setAttribute('aria-hidden','true');
	}
	productModal.addEventListener('click', (ev)=>{
		if(ev.target.hasAttribute('data-close')) closeModal();
	});
	window.addEventListener('keydown', (ev)=>{ if(ev.key==='Escape') closeModal(); });

	// Navegación suave
	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const target = document.querySelector(link.getAttribute('href'));
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// Actualizar links activos
				document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
				if (link.classList.contains('menu-link')) {
					link.classList.add('active');
				}
			}
		});
	});

	// Scroll spy para navbar
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.menu-link');
	
	window.addEventListener('scroll', () => {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 100;
			if (window.pageYOffset >= sectionTop) {
				current = section.getAttribute('id');
			}
		});
		
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
	});

	// Control de reproducción del video del hero
	const heroSection = document.getElementById('inicio');
	const heroVideo = document.querySelector('.hero-video');
	if (heroVideo) {
		// Intentar reproducir siempre que sea posible
		const tryPlay = () => { const p = heroVideo.play?.(); if (p && typeof p.catch === 'function') p.catch(()=>{}); };
		const pause = () => { try { heroVideo.pause?.(); } catch(_){} };
		// Pausar cuando pestaña no está visible, reanudar cuando vuelve
		document.addEventListener('visibilitychange', () => {
			if (document.hidden) pause(); else tryPlay();
		});
		// Usar IntersectionObserver para pausar si el hero no está a la vista
		const io = new IntersectionObserver((entries)=>{
			entries.forEach(entry=>{
				if (entry.isIntersecting && entry.intersectionRatio > 0.2) tryPlay(); else pause();
			});
		},{ root: null, threshold: [0, 0.2, 0.5, 1] });
		io.observe(heroSection);
		// Reintentos ante bloqueos de reproducción en iOS/Android
		heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
		heroVideo.addEventListener('canplay', tryPlay);
		window.addEventListener('focus', tryPlay);
	}

	// Navbar scroll effect
	const topbar = document.querySelector('.topbar');
	const brand = document.querySelector('.brand');
	const container = topbar.querySelector('.container');
	const menu = topbar.querySelector('.menu');
	let ticking = false;
	
	function updateNavbar() {
		const currentScrollY = window.scrollY;
		const maxScroll = 150; // Distancia total para completar la transición
		const isMobile = window.innerWidth <= 768; // Aplicar también en tablet
		
		// Calcular el progreso de 0 a 1
		const progress = Math.min(currentScrollY / maxScroll, 1);
		
		// Aplicar opacidad gradual al logo (de 1 a 0)
		const logoOpacity = Math.max(0, 1 - (progress * 1.2));
		
		// Aplicar escala gradual (de 1 a 0.8)
		const logoScale = Math.max(0.8, 1 - (progress * 0.2));
		
		// Aplicar movimiento gradual hacia arriba del logo
		const logoTranslateY = progress * -20;
		
		// Cambiar padding gradualmente (de 16px a 8px)
		const padding = Math.max(8, 16 - (progress * 8));
		
		// Cambiar gap gradualmente (de 16px a 0px)
		const gap = Math.max(0, 16 - (progress * 16));
		
		// Cambiar la altura del brand gradualmente para evitar saltos
		const brandHeight = Math.max(0, 64 - (progress * 64));
		
		// Calcular el desplazamiento del menú según el tamaño de pantalla
		let menuTranslateX = 0;
		if (window.innerWidth <= 480) {
			// En móvil, mover muy poco para no cortar las opciones
			menuTranslateX = progress * -8;
		} else if (window.innerWidth <= 768) {
			// En tablet, mover moderadamente hacia la izquierda
			menuTranslateX = progress * -15;
		}
		
		// Aplicar todas las transformaciones graduales
		brand.style.opacity = logoOpacity;
		brand.style.transform = `scale(${logoScale}) translateY(${logoTranslateY}px)`;
		brand.style.height = `${brandHeight}px`;
		brand.style.overflow = 'hidden';
		
		// El menú ya no necesita moverse porque no hay iconos sociales
		menu.style.transform = `translateX(0px)`;
		
		topbar.style.paddingTop = `${padding}px`;
		topbar.style.paddingBottom = `${padding}px`;
		container.style.gap = `${gap}px`;
		
		// Cambiar pointer-events gradualmente
		brand.style.pointerEvents = logoOpacity > 0.1 ? 'auto' : 'none';
		
		ticking = false;
	}
	
	window.addEventListener('scroll', () => {
		if (!ticking) {
			requestAnimationFrame(updateNavbar);
			ticking = true;
		}
	});

	// Animaciones de entrada para la sección de opiniones
	const opinionMessage = document.querySelector('.opinion-message');
	const phoneContainer = document.querySelector('.phone-container');
	
	if (opinionMessage && phoneContainer) {
		const opinionsObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Resetear animaciones
					opinionMessage.classList.remove('animate');
					phoneContainer.classList.remove('animate');
					
					// Activar animaciones después de un pequeño delay
					setTimeout(() => {
						opinionMessage.classList.add('animate');
						phoneContainer.classList.add('animate');
					}, 100);
				}
			});
		}, { threshold: 0.3 });
		
		opinionsObserver.observe(document.getElementById('opiniones'));
	}

	// Inicial
	renderProducts('todos');
})(); 