const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach((counter) => {
        const target = Number(counter.dataset.target || 0);
        let value = 0;
        const step = Math.max(1, Math.ceil(target / 50));

        const timer = setInterval(() => {
            value += step;
            if (value >= target) {
                value = target;
                clearInterval(timer);
            }
            counter.textContent = String(value);
        }, 24);
    });
};

const aboutSection = document.querySelector('#sobre');
if (aboutSection) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters();
                    obs.disconnect();
                }
            });
        },
        { threshold: 0.35 }
    );

    observer.observe(aboutSection);
}

const revealElements = document.querySelectorAll('.service-card, .feature-box, .info-tile');
revealElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 80}ms`;
    element.classList.add('fade-in-up');
});

const form = document.querySelector('#contactForm');
const statusMessage = document.querySelector('#formStatus');

if (form && statusMessage) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            statusMessage.textContent = 'Por favor, revise os campos obrigatorios.';
            statusMessage.className = 'small mt-3 mb-0 text-danger';
            return;
        }

        const nome = document.querySelector('#nome')?.value.trim();
        statusMessage.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e retornaremos em breve.`;
        statusMessage.className = 'small mt-3 mb-0 text-success';

        form.reset();
        form.classList.remove('was-validated');
    });
}
