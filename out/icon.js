export default function(){this.compose`
        <a href="${"href"}" class="${"className"}">
            <svg>
                <use @iconhref@ href="http://alexs-macbook-pro.local:5757/icon.svg#tabler-${"icon"}"></use>
            </svg>
        </a>
    `({name:"icon",callbacks:{test:function(n){this.observables.t=n},setIcon:function(n,e="http://alexs-macbook-pro.local:5757/icon.svg#tabler-"){this.elements.iconhref.href.baseVal=e+n}},observables:{t:0},style:`a {\n            overflow: visible;\n            margin: 0;\n            color: unset;\n            text-decoration: none;\n            & > svg {\n                overflow: hidden;\n                height: 24px;\n                width: 24px;\n                padding: 0 4px;\n                margin: 8px 4px;\n                fill: none;\n                stroke-width: 1;\n                stroke: #000;\n                stroke-linecap: round;\n                stroke-linejoin: round;\n                border-radius: ${this.globs.style.brdr};\n                &:hover {\n                    background: ${this.globs.style.bckg.a050};\n                }\n            }\n        }`})}