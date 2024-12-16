class BoxShadowGenerator {
    constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, color, colorRef, opacity, opacityRef, inset, preview, rule, webKitRule, mozRule) {
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.preview = preview;
        this.rule = rule;
        this.webKitRule = webKitRule;
        this.mozRule = mozRule;
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.spreadRef.value = this.spread.value;
        this.blurRef.value = this.blur.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value || 1; // Opacidade padrão
        this.applyRule();
        this.showRule();
    }

    applyRule() {
        const rgbValue = this.hexToRgb(this.colorRef.value);
        const alpha = this.opacityRef.value || 1; // Opacidade padrão = 1
        const insetValue = this.inset.checked ? "inset" : ""; // Adicionar "inset" se checkbox estiver marcado

        this.preview.style.boxShadow = `${insetValue} 
            ${this.horizontalRef.value}px 
            ${this.verticalRef.value}px 
            ${this.blurRef.value}px 
            ${this.spreadRef.value}px 
            rgba(${rgbValue}, ${alpha})`;

        this.currentRule = this.preview.style.boxShadow;
    }

    showRule() {
        this.rule.innerText = this.currentRule;
        this.webKitRule.innerText = `-webkit-box-shadow: ${this.currentRule};`;
        this.mozRule.innerText = `-moz-box-shadow: ${this.currentRule};`;
    }

    updateValue(type, value) {
        switch (type) {
            case "horizontal":
                this.horizontalRef.value = value;
                break;
            case "vertical":
                this.verticalRef.value = value;
                break;
            case "spread":
                this.spreadRef.value = value;
                break;
            case "blur":
                this.blurRef.value = value;
                break;
            case "color":
                this.colorRef.value = value;
                break;
            case "opacity":
                this.opacityRef.value = value;
                break;
        }
        this.applyRule();
        this.showRule();
    }

    hexToRgb(hex) {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return "0, 0, 0"; // Retorna preto para valores inválidos
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    }
}

// Seleção de elementos do DOM
defineSelectors();
function defineSelectors() {
    const horizontal = document.querySelector("#horizontal");
    const horizontalRef = document.querySelector("#horizontal-value");
    const vertical = document.querySelector("#vertical");
    const verticalRef = document.querySelector("#vertical-value");
    const blur = document.querySelector("#blur");
    const blurRef = document.querySelector("#blur-value");
    const spread = document.querySelector("#spread");
    const spreadRef = document.querySelector("#spread-value");
    const preview = document.querySelector("#box");
    const color = document.querySelector("#color");
    const colorRef = document.querySelector("#color-value");
    const opacity = document.querySelector("#opacity");
    const opacityRef = document.querySelector("#opacity-value");
    const inset = document.querySelector("#inset");

    const rule = document.querySelector("#rule span");
    const webKitRule = document.querySelector("#webkit-rule span");
    const mozRule = document.querySelector("#moz-rule span");

    const boxShadow = new BoxShadowGenerator(
        horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, color, colorRef, opacity, opacityRef, inset, preview, rule, webKitRule, mozRule
    );

    boxShadow.initialize();

    // Eventos
    horizontal.addEventListener("input", (e) => {
        boxShadow.updateValue("horizontal", e.target.value);
    });

    vertical.addEventListener("input", (e) => {
        boxShadow.updateValue("vertical", e.target.value);
    });

    spread.addEventListener("input", (e) => {
        boxShadow.updateValue("spread", e.target.value);
    });

    blur.addEventListener("input", (e) => {
        boxShadow.updateValue("blur", e.target.value);
    });

    color.addEventListener("input", (e) => {
        boxShadow.updateValue("color", e.target.value);
    });

    opacity.addEventListener("input", (e) => {
        boxShadow.updateValue("opacity", e.target.value);
    });

    inset.addEventListener("change", () => {
        boxShadow.applyRule();
        boxShadow.showRule();
    });

    const rulesArea = document.querySelector("#rules-area")
    const copyInstructions = document.querySelector("#copy-instructions")

    rulesArea.addEventListener("click",()=>{
        const rules= rulesArea.innerText.replace(/^\s*\n/gm, "")

        navigator.clipboard.writeText(rules).then(()=>{
            copyInstructions.innerText = "Código copiado com sucesso!"

            setTimeout(()=>{
                copyInstructions.innerText = "Clique no quadro acima para copiar o código"
            },1000)
        })
    })
}
