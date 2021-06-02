// SAMPLE: Set up css variables and color palette

export default function () {
    this.compose`
        <a href="${'href'}" class="${'className'}">
            <svg>
                <use @iconhref@ href="http://alexs-macbook-pro.local:5757/icon.svg#tabler-${'icon'}"></use>
            </svg>
        </a>
    `({
        name: "icon",
        callbacks: {
            test: function(tr) {
                this.observables.t = tr;
            },
            setIcon: function(iconName, sprite = "http://alexs-macbook-pro.local:5757/icon.svg#tabler-") {
                this.elements.iconhref.href.baseVal = sprite + iconName;
            },
        },
        observables: {
            t: 0,
        },
        style:
        `a {
            overflow: visible;
            margin: 0;
            color: unset;
            text-decoration: none;
            & > svg {
                overflow: hidden;
                height: 24px;
                width: 24px;
                padding: 0 4px;
                margin: 8px 4px;
                fill: none;
                stroke-width: 1;
                stroke: #000;
                stroke-linecap: round;
                stroke-linejoin: round;
                border-radius: ${this.globs.style.brdr};
                &:hover {
                    background: ${this.globs.style.bckg.a050};
                }
            }
        }`
    });
}
