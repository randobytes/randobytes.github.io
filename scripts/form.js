const form = document.getElementById('subscribe-form');

form.innerHTML = '<div><input type="text" id="subscribe-name" name="name" placeholder="Your name" /></div>' +
    '<div><input type="email" id="subscribe-email" name="email" placeholder="you@email.com" required /></div>' +
    '<div><button type="submit" id="subscribe-button">Subscribe</button></div>' +
    '<div id="subscribe-state" aria-live="polite">&nbsp;</div>'

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const state = document.getElementById('subscribe-state');
    state.textContent = 'Please wait...';

    const name = document.getElementById('subscribe-name').value.trim();
    const email = document.getElementById('subscribe-email').value.trim();

    if (!email) {
        state.textContent = 'Please provide an email.';
        return;
    }

    const SITE_KEY = '6Le16ccrAAAAAHt00Pti9Gux0vsaSguIliYZ7zXs';
    const FN_URL = 'https://appkznwsowbybsengcir.functions.supabase.co/subscribe';

    try {
        const token = await grecaptcha.execute(SITE_KEY, { action: 'subscribe' });

        const res = await fetch(FN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                captcha: token,
                page_url: window.location.href,
                action: 'subscribe'
            })
        });

        if (res.ok) {
            document.getElementById('subscribe-name').value = '';
            document.getElementById('subscribe-email').value = '';
            state.textContent = 'Subscribed successfully. Thank you! 🤗';
        } else {
            state.textContent = 'Oops, something went wrong 🙃';
        }
    } catch (err) {
        state.textContent = 'Oops, something went wrong 🙃';
    }
});
