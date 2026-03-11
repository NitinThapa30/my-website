// Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- 0.1 Retro Boot Sequence ---
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    
    if (bootScreen && bootText && !sessionStorage.getItem('booted')) {
        // Only run boot sequence once per session
        document.body.style.overflow = 'hidden';
        
        const bootLines = [
            'INIT SYSLOG... OK',
            'MOUNTING CORE VFS... OK',
            'LOADING NEURAL_NET_V4...',
            'ESTABLISHING SECURE CONNECTION...',
            'HANDSHAKE SUCCESSFUL.',
            'LOADING ASSETS: HTML, CSS, JS...',
            'COMPILING SHADERS...',
            'BYPASSING MAINFRAME ENCRYPTION [██████████]',
            'ACCESS GRANTED.',
            'SYSTEM READY.'
        ];
        
        let lineIndex = 0;
        
        function typeBootLine() {
            if (lineIndex < bootLines.length) {
                bootText.innerHTML += bootLines[lineIndex] + '<br>';
                lineIndex++;
                setTimeout(typeBootLine, 100 + Math.random() * 200); // Random delay
            } else {
                // Formatting complete, hide screen
                setTimeout(() => {
                    bootScreen.classList.add('hidden');
                    document.body.style.overflow = '';
                    sessionStorage.setItem('booted', 'true');
                }, 800);
            }
        }
        
        // Start typing after a short initial pause
        setTimeout(typeBootLine, 500);
    } else if (bootScreen) {
        // If already booted this session, hide immediately
        bootScreen.style.display = 'none';
    }

    // --- 0.2 Reading Progress Bar ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if(!scrollProgress) return;
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });

    // --- 1. Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    // Detect touch device to disable custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && cursorDot && cursorOutline) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    } else {
        window.addEventListener('mousemove', (e) => {
            if(!cursorDot || !cursorOutline) return;
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add slight delay to outline for trail effect using animation api
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // --- 2. Navbar Scroll Effect & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 3. Vanta.js Background Setup ---
    if (typeof VANTA !== 'undefined' && document.getElementById('vanta-bg')) {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00f5ff,         // Cyan
            backgroundColor: 0x050508, // Very dark background
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00,
            showDots: true
        });
    }

    // --- 4. Typed.js Subtitle ---
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-subtitle', {
            strings: ['Game Developer', 'AI Engineer', 'Full-Stack Developer', 'Unreal Engine 5 Dev'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            cursorChar: '_',
            smartBackspace: true
        });
    }

    // --- 5. GSAP Scroll Animations & Counters ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade in up
        gsap.utils.toArray('.reveal-up').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                autoAlpha: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Fade in side (Timeline)
        gsap.utils.toArray('.reveal-side').forEach(element => {
            const isRight = element.classList.contains('right');
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                x: isRight ? 50 : -50,
                autoAlpha: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Skill Bars fill
        gsap.utils.toArray('.progress-fill').forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%",
                },
                width: targetWidth,
                duration: 1.5,
                ease: "power3.inOut"
            });
        });

        // Stats Counters
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // --- 6. Resume Modal Logic ---
    const resumeBtn = document.getElementById('resume-link');
    const modal = document.getElementById('resume-modal');
    const closeBtn = document.getElementById('close-resume');

    if(resumeBtn && modal && closeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close on clicking outside modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 7. Three.js Hero Custom Mesh (Rotating Icosahedron) ---
    if(typeof THREE !== 'undefined' && document.getElementById('three-hero-container')) {
        initThreeHero();
    }
    
    // --- 8. Three.js Skills Orbiting Spheres ---
    if(typeof THREE !== 'undefined' && document.getElementById('skills-canvas-container')) {
        initThreeSkills();
    }
});

// Three.js Hero Initialization function
function initThreeHero() {
    const container = document.getElementById('three-hero-container');
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5.5;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add Lights for the Earth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f5ff, 2, 50); // Cyan light
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x7b2fff, 2, 50); // Purple light
    pointLight2.position.set(-5, -3, -5);
    scene.add(pointLight2);

    // Earth Group
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Load Textures
    const textureLoader = new THREE.TextureLoader();
    // Using a reliable CDN for Earth texture
    const earthMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');

    // Create Earth Geometry
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create Material (Cyberpunk tinted Earth)
    const material = new THREE.MeshStandardMaterial({ 
        map: earthMap,
        color: 0xaaaaaa, // Slightly darken base to let lights show
        roughness: 0.6,
        metalness: 0.1,
    });

    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);
    
    // Create Atmosphere Glow
    const atmosGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const atmosMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    earthGroup.add(atmosMesh);

    // Cyberpunk Wireframe Sphere around it
    const wireGeometry = new THREE.SphereGeometry(2.15, 32, 32);
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x7b2fff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    earthGroup.add(wireMesh);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotation
        earthGroup.rotation.y += 0.003;
        earthGroup.rotation.x += 0.001;
        
        wireMesh.rotation.y -= 0.001;
        wireMesh.rotation.z += 0.001;

        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        if(!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


// Three.js Skills Initialization function
function initThreeSkills() {
    const container = document.getElementById('skills-canvas-container');
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 12;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lighting - Changed to remove the "blue torch" effect. Using neutral/pinkish lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 50); // White instead of cyan
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x7b2fff, 1.0, 50); // Purple fill light
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    // Core Elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Core
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({ 
        color: 0x7b2fff,
        roughness: 0.2,
        metalness: 0.8
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Outer Wireframe Core
    const outerGeo = new THREE.SphereGeometry(2, 32, 32);
    const outerMat = new THREE.MeshStandardMaterial({ 
        color: 0x00f5ff, // Cyan wireframe
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const outerCore = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCore);
    
    // Orbiting badges/nodes - More diverse 3D assets
    const nodes = [];
    const geometries = [
        new THREE.OctahedronGeometry(0.8),
        new THREE.DodecahedronGeometry(0.8),
        new THREE.TorusGeometry(0.6, 0.2, 16, 100),
        new THREE.TetrahedronGeometry(0.8),
        new THREE.IcosahedronGeometry(0.8),
        new THREE.BoxGeometry(1, 1, 1)
    ];
    const nodeCount = 6;
    const colors = [0x00f5ff, 0xffd700, 0xff00ea, 0x00f5ff, 0x7b2fff, 0xffffff];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);
    
    for(let i = 0; i < nodeCount; i++) {
        const mat = new THREE.MeshStandardMaterial({
            color: colors[i],
            metalness: 0.6,
            roughness: 0.3
        });
        const mesh = new THREE.Mesh(geometries[i], mat);
        
        // Position in circle
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 6.5;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        
        // Random starting rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        nodeGroup.add(mesh);
        
        nodes.push({
            mesh: mesh,
            baseRotX: Math.random() * 0.03,
            baseRotY: Math.random() * 0.03,
            orbitSpeed: 0.005 + Math.random() * 0.005
        });
    }

    // Multiple Orbit rings for more complex look
    const rings = new THREE.Group();
    scene.add(rings);

    const ringGeo1 = new THREE.TorusGeometry(6.5, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    rings.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(5.5, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x7b2fff, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 4;
    rings.add(ring2);

    // Particle Dust Ring
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Orbit roughly around the radius 6 area
        const r = 5.5 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        posArray[i] = r * Math.cos(theta);
        posArray[i+1] = (Math.random() - 0.5) * 2; // slight vertical spread
        posArray[i+2] = r * Math.sin(theta);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffd700,
        transparent: true,
        opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Core rotation
        innerCore.rotation.y += 0.01;
        innerCore.rotation.x += 0.008;
        outerCore.rotation.y -= 0.005;
        outerCore.rotation.z -= 0.003;

        // Group rotation (orbit effect)
        nodeGroup.rotation.y += 0.002;
        rings.rotation.y -= 0.001;
        rings.rotation.z += 0.002;
        particlesMesh.rotation.y += 0.003;
        
        // Individual nodes spin and slightly bob
        const time = Date.now() * 0.001;
        nodes.forEach((node, i) => {
            node.mesh.rotation.x += node.baseRotX;
            node.mesh.rotation.y += node.baseRotY;
            node.mesh.position.y = Math.sin(time * 2 + i) * 0.5; // slight bobbing
        });

        renderer.render(scene, camera);
    }
    
    animate();

    // Mouse Interaction for skills canvas (parallax tilt)
    let targetX = 0;
    let targetY = 0;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    container.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
    
    function renderTilt() {
        requestAnimationFrame(renderTilt);
        // Lerp camera position gracefully
        camera.position.x += (targetX * 3 - camera.position.x) * 0.05;
        camera.position.y += (5 + targetY * 2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    }
    renderTilt();

    // Handle Resize
    window.addEventListener('resize', () => {
        if(!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- 7. Interactive Terminal Logic ---
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');
const termBody = document.getElementById('terminal-body');

if(termInput && termOutput) {
    // Keep focus when clicking inside terminal
    termBody.addEventListener('click', () => {
        termInput.focus();
    });

    termInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = ''; // clear input
            
            if(command === '') return;
            
            // Print user command
            printToTerminal(`guest@nitin-portfolio:~$ ${command}`, 'term-cmd');
            
            // Handle command
            processCommand(command);
            
            // Auto scroll to bottom
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
    
    function printToTerminal(text, className = '') {
        const p = document.createElement('p');
        p.innerHTML = text; // Allow HTML rendering for links/formatting
        if(className) p.className = className;
        termOutput.appendChild(p);
    }
    
    function processCommand(cmd) {
        switch(cmd) {
            case 'help':
                printToTerminal('Available commands:');
                printToTerminal('  whoami   - Display bio information');
                printToTerminal('  skills   - List technical arsenal');
                printToTerminal('  contact  - Initialize communication protocol');
                printToTerminal('  clear    - Clear terminal output');
                printToTerminal('  sudo     - Execute command with superuser privileges');
                break;
            case 'whoami':
                printToTerminal('Name: Nitin Thapa');
                printToTerminal('Role: Full-Stack Developer | Game Developer | AI Engineer');
                printToTerminal('Status: Seeking internship opportunities');
                break;
            case 'skills':
                printToTerminal('[CORE]: Python, C++, C#, Java, SQL');
                printToTerminal('[GAME]: Unreal Engine 5, Blender');
                printToTerminal('[ AI ]: NLP, Mistral-7B, Stable Diffusion, PyTorch');
                printToTerminal('[WEB ]: HTML, CSS, JavaScript, React (learning)');
                break;
            case 'contact':
                printToTerminal('Email: <a href="mailto:nitinomegax@gmail.com" style="color:var(--cyan)">nitinomegax@gmail.com</a>');
                printToTerminal('Location: Dehradun, Uttarakhand');
                break;
            case 'clear':
                termOutput.innerHTML = '';
                break;
            case 'sudo':
                printToTerminal('Permission denied: You do not have root access to this portfolio.', 'term-err');
                printToTerminal('This incident will be reported.');
                break;
            case 'matrix':
                printToTerminal('Wake up, Neo...', 'term-system');
                setTimeout(() => { document.body.style.filter = 'hue-rotate(90deg)'; }, 1000);
                setTimeout(() => { document.body.style.filter = 'none'; }, 4000);
                break;
            default:
                printToTerminal(`bash: ${cmd}: command not found`, 'term-err');
                printToTerminal('Type "help" to see available commands.');
        }
    }
}
