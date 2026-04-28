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
        hellboyDiv.style.cssText = "position: fixed; bottom: 20px; left: 20px; width: 100px; height: 100px; z-index: 9999; cursor: pointer;";
        hellboyDiv.innerHTML = `
            <model-viewer id="hellboy-model" src="Hellboy.glb" 
                camera-orbit="0deg 75deg 2m" 
                auto-rotate 
                style="width: 100%; height: 100%; --poster-color: transparent;" 
                shadow-intensity="1" environment-image="neutral" exposure="1">
            </model-viewer>
        `;
        document.body.appendChild(hellboyDiv);
    }
});
