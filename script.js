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

    // --- 3. Cybernetic Grid Shader Background Setup ---
    if (typeof THREE !== 'undefined' && document.getElementById('vanta-bg')) {
        initCyberneticGridShader();
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
    
    // --- 9. Three.js About Desk Scene ---
    if(typeof THREE !== 'undefined' && document.getElementById('about-3d-desk')) {
        initThreeDesk();
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increased ambient light significantly
    scene.add(ambientLight);
    
    // Key light (strong main light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Accent light cyan
    const pointLight = new THREE.PointLight(0x00f5ff, 3, 50); 
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Accent light purple
    const pointLight2 = new THREE.PointLight(0x7b2fff, 3, 50); 
    pointLight2.position.set(5, -5, -5);
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
        color: 0xffffff, // Set back to pure white to let the texture shine brightly
        roughness: 0.4,  // Slightly shinier
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

    // Initial setup for interactions (OrbitControls)
    let controls;
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false; // Disable zooming, keep it fixed size
        controls.enablePan = false;  // Disable panning
        controls.autoRotate = true;  // Keep rotating when not interacted with
        controls.autoRotateSpeed = 0.5;
        controls.enableDamping = true; // Smooth rotation
        controls.dampingFactor = 0.05;
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Regular continuous rotation if OrbitControls didn't load
        if(!controls) {
            earthGroup.rotation.y += 0.003;
            earthGroup.rotation.x += 0.001;
        } else {
            controls.update(); // Update controls (handles autoRotate and damping)
        }

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

// --- 8. Three.js About Desk Scene ---
function initThreeDesk() {
    const container = document.getElementById('about-3d-desk');
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(4, 3, 5); // Angle looking down at the desk

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Bright enough to see details
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0x7b2fff, 2, 20);
    purpleLight.position.set(-2, 2, 2);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x00f5ff, 2, 20);
    cyanLight.position.set(2, 2, -2);
    scene.add(cyanLight);

    // OrbitControls for interactivity
    let deskControls;
    if (typeof THREE.OrbitControls !== 'undefined') {
        deskControls = new THREE.OrbitControls(camera, renderer.domElement);
        deskControls.enableZoom = true;
        deskControls.minDistance = 3;
        deskControls.maxDistance = 10;
        deskControls.enablePan = false;
        deskControls.autoRotate = true;
        deskControls.autoRotateSpeed = 0.8;
        deskControls.enableDamping = true;
        deskControls.dampingFactor = 0.05;
        
        // Limit vertical rotation to prevent turning it completely upside down
        deskControls.maxPolarAngle = Math.PI / 2 + 0.1; 
        deskControls.minPolarAngle = 0.5;
    }

    // Load Low-Poly Desk GLTF Model
    if (typeof THREE.GLTFLoader !== 'undefined') {
        const loader = new THREE.GLTFLoader();
        
        // This is a free, CC-0 low-poly computer desk model loaded from a raw GitHub repo or CDN.
        // As a placeholder, we use a basic scene if it fails, but this URL provides a good representation based on public assets.
        const modelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF/Fox.gltf'; // Fallback sample if desk is unavailable
        
        // Let's create a programmatic desk just in case external GLTF fails to load instantly, 
        // to ensure the scene looks good no matter what.
        const deskGroup = new THREE.Group();
        
        // Table top
        const tableGeo = new THREE.BoxGeometry(3, 0.1, 1.5);
        const tableMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });
        const table = new THREE.Mesh(tableGeo, tableMat);
        table.position.y = 0;
        table.castShadow = true;
        table.receiveShadow = true;
        deskGroup.add(table);
        
        // Monitor Stand
        const standGeo = new THREE.BoxGeometry(0.2, 0.4, 0.2);
        const standMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const stand = new THREE.Mesh(standGeo, standMat);
        stand.position.set(0, 0.25, -0.4);
        deskGroup.add(stand);

        // Monitor
        const monitorGeo = new THREE.BoxGeometry(1.5, 0.8, 0.1);
        const monitorMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const monitor = new THREE.Mesh(monitorGeo, monitorMat);
        monitor.position.set(0, 0.6, -0.4);
        monitor.rotation.x = -0.1;
        deskGroup.add(monitor);
        
        // Monitor Screen (Glowing)
        const screenGeo = new THREE.PlaneGeometry(1.4, 0.7);
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, side: THREE.DoubleSide });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0.6, -0.34);
        screen.rotation.x = -0.1;
        deskGroup.add(screen);

        // Keyboard
        const kbGeo = new THREE.BoxGeometry(0.8, 0.05, 0.3);
        const kbMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const keyboard = new THREE.Mesh(kbGeo, kbMat);
        keyboard.position.set(0, 0.08, 0.3);
        deskGroup.add(keyboard);
        
        // Mouse
        const mouseGeo = new THREE.BoxGeometry(0.12, 0.04, 0.2);
        const mouseMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const pcMouse = new THREE.Mesh(mouseGeo, mouseMat);
        pcMouse.position.set(0.6, 0.08, 0.3);
        deskGroup.add(pcMouse);

        scene.add(deskGroup);
        
        // Move the whole group down slightly to center it
        deskGroup.position.y = -0.5;
    }

    // Animation Loop
    function animateDesk() {
        requestAnimationFrame(animateDesk);

        if (deskControls) {
            deskControls.update(); 
        }

        renderer.render(scene, camera);
    }
    animateDesk();

    // Handle Resize
    window.addEventListener('resize', () => {
        if(!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- 10. Cybernetic Grid Shader Background ---
function initCyberneticGridShader() {
    const container = document.getElementById('vanta-bg');
    if (!container) return;

    // 1) Renderer, Scene, Camera, Clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // 2) GLSL Shaders
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))
                     * 43758.5453123);
      }

      void main() {
        // normalize coords around center
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy)
                     / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy)
                     / iResolution.y;

        float t         = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        // warp effect around mouse
        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;

        // grid lines
        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        // base grid color pulsing
        vec3 gridColor = vec3(0.1, 0.5, 1.0);
        vec3 color     = gridColor
                       * line
                       * (0.5 + sin(t * 2.0) * 0.2);

        // energetic pulses along grid
        float energy = sin(uv.x * 20.0 + t * 5.0)
                     * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += vec3(1.0, 0.2, 0.8) * energy * line;

        // glow around mouse
        float glow = smoothstep(0.1, 0.0, mouseDist);
        color += vec3(1.0) * glow * 0.5;

        // subtle noise
        color += random(uv + t * 0.1) * 0.05;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // 3) Uniforms, Material, Mesh
    const uniforms = {
        iTime:       { value: 0 },
        iResolution: { value: new THREE.Vector2() },
        iMouse:      { value: new THREE.Vector2(
                         window.innerWidth / 2,
                         window.innerHeight / 2
                     ) }
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4) Resize handler
    const onResize = () => {
        const width  = container.clientWidth;
        const height = container.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        renderer.setSize(width, height);
        uniforms.iResolution.value.set(width * dpr, height * dpr);
    };
    window.addEventListener('resize', onResize);
    onResize(); // set initial size

    // 5) Mouse handler
    const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        // Calculate mouse position relative to the container
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Prevent values going totally wild outside the hero section
        x = Math.max(0, Math.min(x, container.clientWidth));
        y = Math.max(0, Math.min(y, container.clientHeight));
        
        // Shader expects origin at bottom-left in physical pixels
        uniforms.iMouse.value.set(
            x * dpr,
            (container.clientHeight - y) * dpr
        );
    };
    window.addEventListener('mousemove', onMouseMove);

    // 6) Animation loop
    renderer.setAnimationLoop(() => {
        uniforms.iTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    });
}
