export default function(){this.compose`
        <a href="${"href"}" class="${"className"}">
            <svg class="spriteIcon">
                <use href="http://alexs-macbook-pro.local:5757/icon.svg#tabler-${"icon"}"></use>
            </svg>
        </a>
    `({name:"icon",callbacks:{test:function(s){this.observables.t=s}},observables:{t:0},style:"a {\n            text-decoration: none\n            & > svg {\n                height: 24px\n                width: 24px\n            }\n        }"})}