export default class Customizator {
    constructor() {
        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');

        this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
        this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    }

    onScaleChange(e) {
        let scale;
        const body = document.querySelector('body');
        if (e.target.value) {
            scale = +e.target.value.replace(/x/g, "");
        }

        function recursy(element) {
            element.childNodes.forEach(node => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s/g, "").length > 0) {

                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ""))
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + 'px';
                    } else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + 'px';
                    }



                } else {
                    recursy(node);
                }
            })
        }

        recursy(body);

        console.log(scale);
    }


    onColorChange(e) { 
        const body = document.querySelector('body');
        body.style.backgroundColor = e.target.value;
    }

    render() {
        let scaleInputS = document.createElement('input'),
            scaleInputM = document.createElement('input'),
            panel = document.createElement('div');


        panel.append(this.btnBlock, this.colorPicker);

        let inpArr = [scaleInputS, scaleInputM];

        inpArr.forEach((item, i) => {
            item.classList.add('scale_btn');
            item.setAttribute('type', 'button');
            item.setAttribute('value', `${i == 0 ? 1 : 1.5}x`)
        })

        this.btnBlock.classList.add('scale');
        this.btnBlock.append(scaleInputS, scaleInputM);

        this.colorPicker.classList.add('color');
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');


        panel.classList.add('panel');

        document.querySelector('body').append(panel);

    }
}