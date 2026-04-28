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
        hellboyDiv.style.cssText = "position: fixed; bottom: 20px; left: 20px; width: 220px; height: 220px; z-index: 9999; cursor: grab; transition: opacity 0.3s;";
        
        hellboyDiv.innerHTML = `
            <div id="hellboy-hint" style="position:absolute; top:-30px; left:50%; transform:translateX(-50%); background:#0ea5e9; color:white; padding:4px 10px; border-radius:20px; font-size:0.6rem; white-space:nowrap; pointer-events:none; animation: float 2s infinite ease-in-out;">
                <i class="fa-solid fa-hand-pointer"></i> Déplace-moi !
            </div>
            <div id="hellboy-menu" style="position:absolute; top:-160px; left:0; background:rgba(3,7,18,0.9); border:1px solid #0ea5e9; padding:10px; border-radius:10px; display:none; flex-direction:column; gap:5px; width:150px; z-index:10000; backdrop-filter:blur(10px); pointer-events:auto;">
                <button onclick="changeHellboySize()" style="background:#0ea5e9; border:none; color:#fff; padding:5px; border-radius:5px; cursor:pointer; font-size:0.7rem;">Changer Taille</button>
                <button onclick="changeHellboyColor()" style="background:#5959af; border:none; color:#fff; padding:5px; border-radius:5px; cursor:pointer; font-size:0.7rem;">Changer Couleur</button>
                <button onclick="disableHellboy()" style="background:#ef4444; border:none; color:#fff; padding:5px; border-radius:5px; cursor:pointer; font-size:0.7rem;">Désactiver</button>
                <button onclick="toggleHellboyMenu()" style="background:#333; border:none; color:#fff; padding:5px; border-radius:5px; cursor:pointer; font-size:0.7rem;">Fermer</button>
            </div>
            <model-viewer id="hellboy-model" src="Hellboy.glb" 
                camera-orbit="0deg 90deg auto" 
                camera-target="0m 0.8m 0m"
                autoplay
                style="width: 100%; height: 100%; --poster-color: transparent;" 
                shadow-intensity="1" environment-image="neutral" exposure="1">
            </model-viewer>
            <style>
                @keyframes float {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, -10px); }
                }
            </style>
        `;

        const model = hellboyDiv.querySelector('#hellboy-model');
        const menu = hellboyDiv.querySelector('#hellboy-menu');
        const hint = hellboyDiv.querySelector('#hellboy-hint');
        let currentSize = 220;
        let currentHue = 0;
        let animationIndex = 0;

        // ANIMATION CYCLING LOGIC
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

        // DRAG AND DROP LOGIC
        let isDragging = false;
        let offsetX, offsetY;

        hellboyDiv.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            isDragging = true;
            hint.style.display = 'none'; // Hide hint once dragged
            hellboyDiv.style.cursor = 'grabbing';
            hellboyDiv.style.transition = 'none';
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
            hellboyDiv.style.transition = 'opacity 0.3s';
        });

        // Click to toggle menu
        model.addEventListener('click', (e) => {
            if (isDragging) return;
            toggleHellboyMenu();
        });

        // Global functions
        window.toggleHellboyMenu = () => {
            menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
        };

        window.changeHellboySize = () => {
            currentSize = currentSize >= 400 ? 150 : currentSize + 50;
            hellboyDiv.style.width = `${currentSize}px`;
            hellboyDiv.style.height = `${currentSize}px`;
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
