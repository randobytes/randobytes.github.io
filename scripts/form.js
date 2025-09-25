const form = document.getElementById('subscribe-form');

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

        const json = await res.json();

        if (res.ok) {
            name.value = "";
            email.value = "";
            state.textContent = json.message || 'Subscribed successfully. Thank you! 🤗';
        } else {
            state.textContent = json.error || 'Oops, something went wrong 🙃';
        }
    } catch (err) {
        console.error(err);
        state.textContent = 'Oops, something went wrong 🙃';
    }
});
