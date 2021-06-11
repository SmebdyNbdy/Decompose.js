class deIf extends HTMLElement {
    constructor() {
        super();
        console.log(this.attributes);
        let dElse = this.querySelector("de-else");
        if (this.attributes.true) {
            if (dElse) dElse.remove();
            while (this.childElementCount > 0) {
                let child = this.children[0];
                child.remove();
                this.insertAdjacentElement("beforebegin", child);
            }
            this.remove()
            return this;
        } else {
            if (dElse) {
                while (dElse.childElementCount > 0) {
                    let child = dElse.children[0];
                    child.remove();
                    this.insertAdjacentElement("beforebegin", child);
                }
            }
            this.remove();
            return this;
        }
    }
}

customElements.define("de-else", class deElse extends HTMLElement {});
customElements.define("de-group", class deElse extends HTMLElement {});
customElements.define("de-if", deIf);
