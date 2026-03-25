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

    // --- 7. D3.js Hero Custom Mesh (Halftone Earth) ---
    if(typeof d3 !== 'undefined' && document.getElementById('three-hero-container')) {
        initD3Earth();
    }
    
    // --- 8. Custom Radial Orbital Timeline (Technical Arsenal) ---
    if(document.getElementById('orbital-timeline-root')) {
        initOrbitalSkills();
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
    const pointLight = new THREE.PointLight(0x1275e2, 3, 50); 
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Accent light purple
    const pointLight2 = new THREE.PointLight(0x5f78a3, 3, 50); 
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
        color: 0x1275e2,
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

    const pointLight2 = new THREE.PointLight(0x5f78a3, 1.0, 50); // Purple fill light
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    // Core Elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Core
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({ 
        color: 0x5f78a3,
        roughness: 0.2,
        metalness: 0.8
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Outer Wireframe Core
    const outerGeo = new THREE.SphereGeometry(2, 32, 32);
    const outerMat = new THREE.MeshStandardMaterial({ 
        color: 0x1275e2, // Cyan wireframe
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
    const colors = [0x1275e2, 0xc55b00, 0x5f78a3, 0x1275e2, 0x5f78a3, 0xffffff];
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
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x1275e2, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    rings.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(5.5, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x5f78a3, transparent: true, opacity: 0.4 });
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

    const purpleLight = new THREE.PointLight(0x5f78a3, 2, 20);
    purpleLight.position.set(-2, 2, 2);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x1275e2, 2, 20);
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
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x1275e2, side: THREE.DoubleSide });
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

// --- D3.js Hero Earth (Halftone / Point Map) ---
function initD3Earth() {
    const container = document.getElementById('three-hero-container');
    if (!container) return;
    
    // Clear out any existing canvases (like old Three.js content)
    container.innerHTML = '';
    
    // Create new Canvas
    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-auto rounded-2xl bg-background dark";
    canvas.style.maxWidth = "100%";
    canvas.style.height = "auto";
    // Ensure canvas stays behind the interactive parts if needed, or matches layout
    canvas.style.position = "relative";
    canvas.style.zIndex = "10";
    container.appendChild(canvas);

    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Interaction hints removed per user request

    // Initial sizing
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;
    
    // For smaller screens, don't let it overflow
    let containerWidth = width;
    let containerHeight = height;
    let radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3.geoOrthographic()
      .scale(radius)
      // Shifted down slightly per user request
      .translate([containerWidth / 2, containerHeight / 2 + 60])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // D3 variables
    let isLoading = true;
    let landFeatures;
    const allDots = [];

    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true; break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      
      const stepSize = dotSpacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background loop)
      context.beginPath();
      // Shift render center as well
      context.arc(containerWidth / 2, containerHeight / 2 + 60, currentScale, 0, 2 * Math.PI);
      
      // Cyberpunk deep space/ocean gradient - changed to deep blue
      const grd = context.createRadialGradient(
          containerWidth / 2 - currentScale * 0.3, 
          containerHeight / 2 + 60 - currentScale * 0.3, 
          0, 
          containerWidth / 2, 
          containerHeight / 2 + 60, 
          currentScale
      );
      grd.addColorStop(0, "rgba(0, 80, 255, 0.4)"); // Inner blue glow 
      grd.addColorStop(1, "rgba(2, 5, 20, 0.9)");       // Outer space dark blue
      
      context.fillStyle = grd;
      context.fill();
      context.strokeStyle = "rgba(0, 150, 255, 0.5)"; // Blue outline
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(0, 150, 255, 0.2)"; // Soft blue wireframe
        context.lineWidth = 0.5 * scaleFactor;
        context.stroke();

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = "rgba(0, 200, 255, 0.6)"; // Bright blue land masses
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight + 100 // generous bounds since we moved it down
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = "rgba(100, 150, 255, 0.9)"; // Light blue dots
            context.fill();
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");
        landFeatures = await response.json();

        // Generate dots for all land features
        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true });
          });
        });

        render();
        isLoading = false;
      } catch (err) {
        console.error("Failed to load D3 land map data", err);
      }
    };

    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.5;

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    // Interactive listeners restored per user request
    const rotationTimer = d3.timer(rotate);

    let isDragging = false;
    let startX, startY;
    let startRotation;

    const handleMouseDown = (event) => {
      // Allow pointer events passthrough handling
      autoRotate = false;
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startRotation = [...rotation];
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      
      const sensitivity = 0.5;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      rotation[0] = startRotation[0] + dx * sensitivity;
      rotation[1] = startRotation[1] - dy * sensitivity;
      rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

      projection.rotate(rotation);
      render();
    };

    const handleMouseUp = () => {
      if(isDragging) {
        isDragging = false;
        setTimeout(() => {
          autoRotate = true;
        }, 100);
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    loadWorldData();

    // Resize handling
    window.addEventListener('resize', () => {
        containerWidth = container.clientWidth;
        containerHeight = container.clientHeight;
        radius = Math.min(containerWidth, containerHeight) / 2.5;

        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
        context.scale(dpr, dpr);
        
        projection.translate([containerWidth / 2, containerHeight / 2 + 60]);
        if(!isDragging && !autoRotate) {
            render();
        }
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

// --- 11. Custom Radial Orbital Timeline (Technical Arsenal) ---
function initOrbitalSkills() {
    const root = document.getElementById('orbital-timeline-root');
    if(!root) return;

    // Data Structure mapped to the user's skills
    const timelineData = [
        { id: 1, title: 'Python', date: 'Core Language', content: 'Extensive experience in data processing, backend logic, and AI prototyping.', category: 'Programming', icon: 'fab fa-python', relatedIds: [5, 6], status: 'completed', energy: 90 },
        { id: 2, title: 'C++', date: 'Core Language', content: 'High-performance computing and game engine development.', category: 'Programming', icon: 'fas fa-code', relatedIds: [3], status: 'completed', energy: 85 },
        { id: 3, title: 'Unreal Engine 5', date: 'Game Dev', content: 'Building immersive 3D environments and complex gameplay mechanics.', category: 'Game Dev', icon: 'fas fa-gamepad', relatedIds: [2, 4], status: 'in-progress', energy: 80 },
        { id: 4, title: 'Blender', date: '3D Modeling', content: 'Creating optimized 3D assets for real-time rendering in games.', category: 'Game Dev', icon: 'fas fa-cube', relatedIds: [3], status: 'completed', energy: 75 },
        { id: 5, title: 'Mistral-7B', date: 'AI / LLMs', content: 'Fine-tuning and deploying large language models for natural interactions.', category: 'AI', icon: 'fas fa-brain', relatedIds: [1], status: 'in-progress', energy: 85 },
        { id: 6, title: 'Computer Vision', date: 'AI / CV', content: 'Object detection and Optical Character Recognition (OCR) systems.', category: 'AI', icon: 'fas fa-eye', relatedIds: [1], status: 'completed', energy: 80 },
        { id: 7, title: 'HTML/CSS/JS', date: 'Web Dev', content: 'Building responsive, interactive frontend web experiences.', category: 'WebTools', icon: 'fab fa-js', relatedIds: [], status: 'completed', energy: 90 },
        { id: 8, title: 'Docker', date: 'DevOps', content: 'Containerizing applications for consistent deployment schemas.', category: 'WebTools', icon: 'fab fa-docker', relatedIds: [], status: 'pending', energy: 70 }
    ];

    let expandedItems = {};
    let rotationAngle = 0;
    let autoRotate = true;
    let pulseEffect = {};
    let activeNodeId = null;
    let animationFrameId;

    root.innerHTML = '';
    
    const innerContainer = document.createElement('div');
    innerContainer.className = 'orbital-timeline-inner';
    
    // Abstract base layout click listener
    root.addEventListener('click', (e) => {
        if(e.target === root || e.target === innerContainer) {
            expandedItems = {};
            activeNodeId = null;
            pulseEffect = {};
            autoRotate = true;
            renderNodes();
        }
    });

    const corePulsingGroup = document.createElement('div');
    corePulsingGroup.className = 'orbital-center';
    corePulsingGroup.innerHTML = `
        <div class="orbital-center-ping1"></div><div class="orbital-center-ping2"></div><div class="orbital-center-core"></div>
    `;

    const ring = document.createElement('div');
    ring.className = 'orbital-ring';
    
    innerContainer.appendChild(corePulsingGroup);
    innerContainer.appendChild(ring);
    root.appendChild(innerContainer);

    const nodeElements = [];

    // Helper Functions
    const getRelatedItems = (itemId) => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId) => {
        if (!activeNodeId) return false;
        return getRelatedItems(activeNodeId).includes(itemId);
    };

    const centerViewOnNode = (nodeId) => {
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        if(nodeIndex === -1) return;
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        rotationAngle = 270 - targetAngle; // Set rotation so node is at front-bottom
    };

    const toggleItem = (id) => {
        // Reset others
        Object.keys(expandedItems).forEach(key => {
            if(parseInt(key) !== id) expandedItems[parseInt(key)] = false;
        });
        
        expandedItems[id] = !expandedItems[id];

        if (expandedItems[id]) {
            activeNodeId = id;
            autoRotate = false;
            pulseEffect = {};
            getRelatedItems(id).forEach(relId => { pulseEffect[relId] = true; });
            centerViewOnNode(id);
        } else {
            activeNodeId = null;
            autoRotate = true;
            pulseEffect = {};
        }
        renderNodes();
    };

    // Render logic called on tick and on click
    const renderNodes = () => {
        const total = timelineData.length;
        // Determine radius size based on container width acting responsively
        let radius = Math.min(250, root.clientWidth / 2 - 100);
        if(radius < 120) radius = 120;
        
        // Update the rings width dynamically
        ring.style.width = `${radius * 2}px`;
        ring.style.height = `${radius * 2}px`;

        timelineData.forEach((item, index) => {
            const angle = ((index / total) * 360 + rotationAngle) % 360;
            const radian = (angle * Math.PI) / 180;

            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);
            const zIndex = Math.round(100 + 50 * Math.cos(radian));
            const baseOpacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

            const isExpanded = !!expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = !!pulseEffect[item.id];
            
            const nodeEl = nodeElements[index];
            
            nodeEl.style.transform = `translate(${x}px, ${y}px)`;
            nodeEl.style.zIndex = isExpanded ? 400 : zIndex;
            nodeEl.style.opacity = isExpanded ? 1 : baseOpacity;

            // Handle Classes based on State
            if(isExpanded) nodeEl.classList.add('orbit-node-expanded');
            else nodeEl.classList.remove('orbit-node-expanded');

            if(isRelated && !isExpanded) nodeEl.classList.add('orbit-node-related');
            else nodeEl.classList.remove('orbit-node-related');

            // Handle Pulse BG
            const pulseBg = nodeEl.querySelector('.orbit-node-bg-pulse');
            if(isPulsing && !isExpanded) {
                pulseBg.style.boxShadow = '0 0 20px 10px rgba(0,245,255,0.4)';
                pulseBg.style.animation = 'orbital-pulse-glow 1s infinite alternate';
            } else {
                pulseBg.style.boxShadow = 'none';
                pulseBg.style.animation = 'none';
            }

            // Handle Card visibility
            const cardEl = nodeEl.querySelector('.orbit-card');
            cardEl.style.display = isExpanded ? 'block' : 'none';
        });
    };

    // Initial Node Creation
    timelineData.forEach((item, index) => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'orbit-node';
        
        // Pulse Bg
        const pulseBg = document.createElement('div');
        pulseBg.className = 'orbit-node-bg-pulse';
        
        // Icon Container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'orbit-node-icon-container';
        iconContainer.innerHTML = `<i class="${item.icon}"></i>`;

        // Title
        const titleEl = document.createElement('div');
        titleEl.className = 'orbit-node-title';
        titleEl.textContent = item.title;

        // Expanded details card
        const cardEl = document.createElement('div');
        cardEl.className = 'orbit-card glass-panel';
        
        let badgeClass = 'orbit-badge-pending';
        let badgeText = 'PENDING';
        if(item.status === 'completed') { badgeClass = 'orbit-badge-completed'; badgeText = 'COMPLETED'; }
        if(item.status === 'in-progress') { badgeClass = 'orbit-badge-inprogress'; badgeText = 'IN PROGRESS'; }

        // Links
        let relatedHtml = '';
        if(item.relatedIds.length > 0) {
            let linksHtml = item.relatedIds.map(rid => {
                const rt = timelineData.find(t => t.id === rid);
                return rt ? `<button class="orbit-related-link" data-id="${rid}">${rt.title} <i class="fas fa-arrow-right"></i></button>` : '';
            }).join('');
            relatedHtml = `<div class="orbit-connections-section"><div class="orbit-connections-title"><i class="fas fa-link"></i> Connected Nodes</div>${linksHtml}</div>`;
        }

        cardEl.innerHTML = `
            <div class="orbit-card-header">
                <span class="orbit-badge ${badgeClass}">${badgeText}</span>
                <span class="orbit-card-date">${item.date}</span>
            </div>
            <div class="orbit-card-title">${item.title}</div>
            <div class="orbit-card-content">${item.content}</div>
            <div class="orbit-energy-section">
                <div class="orbit-energy-header"><span><i class="fas fa-bolt" style="color:#1275e2; margin-right:4px;"></i> Energy Level</span><span>${item.energy}%</span></div>
                <div class="orbit-energy-bar-bg"><div class="orbit-energy-bar-fill" style="width: ${item.energy}%;"></div></div>
            </div>
            ${relatedHtml}
        `;

        nodeEl.appendChild(pulseBg);
        nodeEl.appendChild(iconContainer);
        nodeEl.appendChild(titleEl);
        nodeEl.appendChild(cardEl);
        
        // Node Click binding
        nodeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleItem(item.id);
        });

        innerContainer.appendChild(nodeEl);
        nodeElements.push(nodeEl);
    });

    // Delegated click for related buttons
    innerContainer.addEventListener('click', (e) => {
        const linkBtn = e.target.closest('.orbit-related-link');
        if(linkBtn) {
            e.stopPropagation();
            toggleItem(parseInt(linkBtn.dataset.id));
        }
    });

    // Animation Tick
    const tick = () => {
        if (autoRotate) {
             rotationAngle = (rotationAngle + 0.15) % 360;
             renderNodes();
        }
        animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    
    // Handle Window Resize properly
    window.addEventListener('resize', () => {
        if(root) renderNodes();
    });
}

// --- 13. Flickering Grid Footer Animation ---
function initFlickerGrid() {
    const canvas = document.getElementById('flicker-grid-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    const squareSize = 3;
    const gridGap = 3;
    const maxOpacity = 0.7;
    const flickerChance = 0.1;
    // We use the new design system primary color rgb: 18, 117, 226
    const baseColor = 'rgba(18, 117, 226, ';

    let cols, rows, squares, dpr;
    let animationFrameId;
    let lastTime = 0;

    const resizeCanvas = () => {
        dpr = window.devicePixelRatio || 1;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        cols = Math.ceil(width / (squareSize + gridGap));
        rows = Math.ceil(height / (squareSize + gridGap));
        
        squares = new Float32Array(cols * rows);
        for (let i = 0; i < squares.length; i++) {
            squares[i] = Math.random() * maxOpacity;
        }
    };

    const drawGrid = (deltaTime) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const index = i * rows + j;
                
                // Flicker logic
                if (Math.random() < flickerChance * deltaTime) {
                    squares[index] = Math.random() * maxOpacity;
                }
                
                const x = i * (squareSize + gridGap) * dpr;
                const y = j * (squareSize + gridGap) * dpr;
                const size = squareSize * dpr;
                
                ctx.fillStyle = `${baseColor}${squares[index]})`;
                ctx.fillRect(x, y, size, size);
            }
        }
    };

    const animate = (time) => {
        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;
        
        drawGrid(deltaTime);
        animationFrameId = requestAnimationFrame(animate);
    };

    // Setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);
}

// Initialize the grid after DOM is loaded
document.addEventListener('DOMContentLoaded', initFlickerGrid);
