const form = document.getElementById('subscribe-form');

form.innerHTML = '<div><input type="text" id="subscribe-name" name="name" placeholder="Your name" /></div>' +
    '<div><input type="email" id="subscribe-email" name="email" placeholder="you@email.com" required /></div>' +
    '<div><button type="submit" id="subscribe-button">Subscribe</button></div>' +
    '<div id="subscribe-state" class="small" aria-live="polite">No spam, just the good stuff. Unsubscribe at any time.</div>'

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const state = document.getElementById('subscribe-state');
    const button = document.getElementById('subscribe-button');
    const tfName = document.getElementById('subscribe-name');
    const tfEmail = document.getElementById('subscribe-email');

    button.disabled = true;
    tfName.disabled = true;
    tfEmail.disabled = true;
    state.textContent = 'Please wait...';

    const name = tfName.value.trim();
    const email = tfEmail.value.trim();

    if (!email) {
        state.textContent = 'Please enter your email.';
        return;
    }

    const OK_MESSAGE = 'Subscribed successfully. Thank you! 🤗'
    const ERROR_MESSAGE = 'Oops, something went wrong 🙃'
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
            tfName.value = '';
            tfEmail.value = '';
            state.textContent = OK_MESSAGE;
        } else {
            state.textContent = ERROR_MESSAGE;
        }
    } catch (err) {
        state.textContent = ERROR_MESSAGE;
    } finally {
        button.disabled = false;
        tfName.disabled = false;
        tfEmail.disabled = false;
    }
});
