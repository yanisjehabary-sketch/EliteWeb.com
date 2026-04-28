document.addEventListener('DOMContentLoaded', () => {
    // Vanta Dots Background
    if (typeof VANTA !== 'undefined' && VANTA.DOTS) {
        VANTA.DOTS({
            el: ".bg-animation",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0ea5e9,
            color2: 0x5959af,
            backgroundColor: 0x030712,
            size: 8.20,
            spacing: 74.00
        });
    }

    // Hellboy Character on every page
    if (!document.getElementById('hellboy-container')) {
        const hellboyDiv = document.createElement('div');
        hellboyDiv.id = 'hellboy-container';
        hellboyDiv.style.cssText = "position: fixed; bottom: 20px; left: 20px; width: 220px; height: 220px; z-index: 9999; cursor: grab; transition: opacity 0.3s, transform 0.3s;";
        
        hellboyDiv.innerHTML = `
            <div id="hellboy-tutorial-cursor" style="position:absolute; top:50%; left:50%; font-size:2rem; color:#0ea5e9; pointer-events:none; z-index:10001; opacity:0; transform:translate(-50%, -50%);">
                <i class="fa-solid fa-arrow-pointer"></i>
            </div>
            <div id="hellboy-menu" style="position:absolute; top:-180px; left:0; background:rgba(3,7,18,0.95); border:1px solid #0ea5e9; padding:15px; border-radius:15px; display:none; flex-direction:column; gap:10px; width:180px; z-index:10000; backdrop-filter:blur(15px); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="color:#fff; font-size:0.7rem; margin-bottom:5px;">Taille du personnage</div>
                <input type="range" id="size-slider" min="100" max="450" value="220" style="width:100%; cursor:pointer; accent-color:#0ea5e9;">
                
                <button onclick="changeHellboyColor()" style="background: linear-gradient(135deg, #0ea5e9, #5959af); border:none; color:#fff; padding:8px; border-radius:8px; cursor:pointer; font-size:0.75rem; font-weight:600;">Changer Couleur</button>
                <button onclick="disableHellboy()" style="background:#ef4444; border:none; color:#fff; padding:8px; border-radius:8px; cursor:pointer; font-size:0.75rem; font-weight:600;">Désactiver</button>
                <button onclick="toggleHellboyMenu()" style="background:#333; border:none; color:#fff; padding:8px; border-radius:8px; cursor:pointer; font-size:0.75rem; font-weight:600;">Fermer</button>
            </div>
            <model-viewer id="hellboy-model" src="Hellboy.glb" 
                camera-orbit="0deg 90deg auto" 
                camera-target="0m 0.8m 0m"
                autoplay
                style="width: 100%; height: 100%; --poster-color: transparent;" 
                shadow-intensity="1" environment-image="neutral" exposure="1">
            </model-viewer>
            <style>
                @keyframes demo-move {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(30px); }
                    75% { transform: translateX(-30px); }
                }
                @keyframes demo-cursor {
                    0%, 100% { opacity: 0; }
                    10%, 90% { opacity: 1; }
                }
                .hellboy-demo-active {
                    animation: demo-move 3s infinite ease-in-out;
                }
                .cursor-demo-active {
                    animation: demo-cursor 3s infinite ease-in-out;
                }
            </style>
        `;

        const model = hellboyDiv.querySelector('#hellboy-model');
        const menu = hellboyDiv.querySelector('#hellboy-menu');
        const tutCursor = hellboyDiv.querySelector('#hellboy-tutorial-cursor');
        const sizeSlider = hellboyDiv.querySelector('#size-slider');
        
        let currentHue = 0;
        let animationIndex = 0;

        // START DEMO ANIMATION
        setTimeout(() => {
            hellboyDiv.classList.add('hellboy-demo-active');
            tutCursor.classList.add('cursor-demo-active');
        }, 1500);

        const stopDemo = () => {
            hellboyDiv.classList.remove('hellboy-demo-active');
            tutCursor.classList.remove('cursor-demo-active');
            tutCursor.style.display = 'none';
        };

        // SIZE SLIDER
        sizeSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            hellboyDiv.style.width = `${val}px`;
            hellboyDiv.style.height = `${val}px`;
        });

        // ANIMATION CYCLING
        model.addEventListener('load', () => {
            const anims = model.availableAnimations;
            if (anims.length > 0) {
                model.animationName = anims[0];
                model.play();
                model.addEventListener('finished', () => {
                    animationIndex = (animationIndex + 1) % anims.length;
                    model.animationName = anims[animationIndex];
                    model.play();
                });
            }
        });

        // DRAG AND DROP
        let isDragging = false;
        let offsetX, offsetY;

        hellboyDiv.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
            isDragging = true;
            stopDemo();
            hellboyDiv.style.cursor = 'grabbing';
            hellboyDiv.style.transition = 'opacity 0.3s';
            offsetX = e.clientX - hellboyDiv.getBoundingClientRect().left;
            offsetY = e.clientY - hellboyDiv.getBoundingClientRect().top;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            hellboyDiv.style.left = `${e.clientX - offsetX}px`;
            hellboyDiv.style.top = `${e.clientY - offsetY}px`;
            hellboyDiv.style.bottom = 'auto';
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            hellboyDiv.style.cursor = 'grab';
        });

        model.addEventListener('click', (e) => {
            if (isDragging) return;
            stopDemo();
            toggleHellboyMenu();
        });

        window.toggleHellboyMenu = () => {
            menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
        };

        window.changeHellboyColor = () => {
            currentHue = (currentHue + 90) % 360;
            model.style.filter = `hue-rotate(${currentHue}deg)`;
        };

        window.disableHellboy = () => {
            hellboyDiv.style.opacity = '0';
            setTimeout(() => hellboyDiv.remove(), 300);
        };

        document.body.appendChild(hellboyDiv);
    }
});
