class Element {
    /**
     *
     * @param {[]}args
     */
    constructor(args) {
        this.attributes = args[0].attributes;
        this.tagName = args[1];
    }

    setMultipleAttribute() {
        this.element = document.createElement(this.tagName);
        this.attributes.forEach(attribute => {
            for (let key in attribute) {
                if (key === 'classNames') {
                    for (let classname of attribute[key]) {
                        this.element.classList.add(classname);
                    }
                } else {
                    this.element.setAttribute(key, attribute[key]);
                }
            }
        })
        return this.element;
    };
}
