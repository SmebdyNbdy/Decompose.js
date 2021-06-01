// Set up css variables and color palette

export default function () {
    this.compose`
        <a href="${'href'}" class="${'className'}">
            <svg class="spriteIcon">
                <use href="http://alexs-macbook-pro.local:5757/icon.svg#tabler-${'icon'}"></use>
            </svg>
        </a>
    `({
        name: "icon",
        callbacks: {
            test: function(tr) {
                this.observables.t = tr;
            }
        },
        observables: {
            t: 0,
        },
        style:
        `a {
            text-decoration: none
            & > svg {
                height: 24px
                width: 24px
            }
        }`,
    });
}
