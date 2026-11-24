class NavbarComponent extends HTMLElement {

    connectedCallback() {

        const title =
            this.getAttribute("title") || "Acme School";

        this.innerHTML = `
            <header class="header">

                <h1>${title}</h1>

            </header>
        `;
    }

}

customElements.define(
    "navbar-component",
    NavbarComponent
);