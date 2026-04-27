const stripe = Stripe('pk_live_51TQagSL0UTvcR6ggoUhMKhqEbRIqETZEFQi8TCgorueqBKjwZtMzPGuOTxvj1CFdvgzW3AUc60VHyrYyBoNtdWkC00hBRX3uPJ');

async function createCheckoutSession(plan) {
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Traitement...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plan: plan }),
        });

        const session = await response.json();

        if (session.error) {
            alert("Erreur : " + session.error);
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert(result.error.message);
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Une erreur est survenue lors de la redirection vers le paiement.");
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'all';
    }
}

// Check for payment status in URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
        alert("🎉 Paiement réussi ! Nous vous contacterons très prochainement pour démarrer votre projet.");
    }
});
