const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan } = req.body;

  let priceData;
  switch (plan) {
    case 'essentiel':
      priceData = { name: 'Formule Essentiel', amount: 24900 }; // 249.00€
      break;
    case 'pro':
      priceData = { name: 'Formule Pro', amount: 49900 }; // 499.00€
      break;
    case 'premium':
      priceData = { name: 'Formule Premium', amount: 99900 }; // 999.00€
      break;
    default:
      return res.status(400).json({ error: 'Invalid plan' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: priceData.name,
              images: ['https://eliteweb-corp.vercel.app/eliteweb_corp_logo_1777248903543.png'],
            },
            unit_amount: priceData.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/index.html?payment=success`,
      cancel_url: `${req.headers.origin}/services.html?payment=cancelled`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
