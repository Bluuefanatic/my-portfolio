const profile = {
    name: "Joel Iziren",
    role: "Frontend Developer · Software Engineer",
    headline: "Building responsive web applications with React, Next.js, and modern tools.",
    intro:
        "I'm Joel Iziren, a Frontend Developer with hands-on experience building responsive web applications using React, Next.js, and Tailwind CSS. I specialize in reusable component design, form validation, and automated testing. Based in Nigeria, collaborating globally.",
    location: "Based in Nigeria · Available worldwide",
    statYears: "1+ year",
    statLaunches: "3+ projects",
    statTeams: "2 teams",
    email: "izirenjoel@gmail.com",
    linkedin: "https://www.linkedin.com/in/joel-iziren",
    github: "https://github.com/Bluuefanatic",
    resumeUrl: "resume.pdf",
};

const revealElements = document.querySelectorAll(".reveal");      // selects all element with 
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

const profileFields = document.querySelectorAll("[data-field]");
profileFields.forEach((field) => {
    const key = field.getAttribute("data-field");
    if (key && profile[key]) {
        field.textContent = profile[key];
    }
});

const emailLink = document.querySelector("[data-field='emailLink']");
if (emailLink) {
    emailLink.setAttribute("href", `mailto:${profile.email}`);
}

const linkedinLink = document.querySelector("[data-field='linkedinLink']");
if (linkedinLink) {
    linkedinLink.setAttribute("href", profile.linkedin);
}

const resumeLink = document.querySelector("[data-field='resumeLink']");
if (resumeLink) {
    resumeLink.setAttribute("href", profile.resumeUrl);
}

const revealOnIntersect = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((element) => {
    revealOnIntersect.observe(element);
});

const modal = document.querySelector("[data-modal]");
const modalTitle = document.getElementById("modal-title");
const modalSummary = document.querySelector("[data-modal-summary]");
const modalRole = document.querySelector("[data-modal-role]");
const modalDuration = document.querySelector("[data-modal-duration]");
const modalImpact = document.querySelector("[data-modal-impact]");
const modalHighlights = document.querySelector("[data-modal-highlights]");

const closeModalButtons = document.querySelectorAll("[data-modal-close]");
const projectButtons = document.querySelectorAll(".view-project");

const closeModal = () => {
    if (modal) {
        modal.classList.remove("is-open");
    }
};

const openModal = (button) => {
    if (!modal || !button) {
        return;
    }

    const title = button.getAttribute("data-project-title");
    const summary = button.getAttribute("data-project-summary");
    const role = button.getAttribute("data-project-role");
    const duration = button.getAttribute("data-project-duration");
    const impact = button.getAttribute("data-project-impact");
    const highlights = button.getAttribute("data-project-highlights");

    if (modalTitle) {
        modalTitle.textContent = title || "Project";
    }

    if (modalSummary) {
        modalSummary.textContent = summary || "";
    }

    if (modalRole) {
        modalRole.textContent = role || "";
    }

    if (modalDuration) {
        modalDuration.textContent = duration || "";
    }

    if (modalImpact) {
        modalImpact.textContent = impact || "";
    }

    if (modalHighlights) {
        modalHighlights.innerHTML = "";
        if (highlights) {
            highlights.split(",").forEach((item) => {
                const pill = document.createElement("span");
                pill.className = "pill";
                pill.textContent = item.trim();
                modalHighlights.appendChild(pill);
            });
        }
    }

    modal.classList.add("is-open");
};

projectButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button));
});

closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
});

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

const form = document.querySelector("[data-contact-form]");
const successMessage = document.querySelector(".form-success");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field, isValid) => {
    if (!field) {
        return;
    }

    if (isValid) {
        field.classList.remove("invalid");
    } else {
        field.classList.add("invalid");
    }
};

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameField = form.querySelector("#name")?.closest(".field");
        const emailField = form.querySelector("#email")?.closest(".field");
        const typeField = form.querySelector("#type")?.closest(".field");
        const budgetField = form.querySelector("#budget")?.closest(".field");
        const messageField = form.querySelector("#message")?.closest(".field");

        const nameValue = form.querySelector("#name")?.value.trim() || "";
        const emailValue = form.querySelector("#email")?.value.trim() || "";
        const typeValue = form.querySelector("#type")?.value.trim() || "";
        const budgetValue = form.querySelector("#budget")?.value.trim() || "";
        const messageValue = form.querySelector("#message")?.value.trim() || "";

        validateField(nameField, nameValue.length > 0);
        validateField(emailField, emailPattern.test(emailValue));
        validateField(typeField, typeValue.length > 0);
        validateField(budgetField, budgetValue.length > 0);
        validateField(messageField, messageValue.length > 0);

        const isValid =
            nameValue &&
            emailPattern.test(emailValue) &&
            typeValue &&
            budgetValue &&
            messageValue;

        if (successMessage) {
            successMessage.classList.toggle("is-visible", Boolean(isValid));
        }

        if (isValid) {
            form.reset();
        }
    });
}
