const body = document.querySelector('body');
const button = document.querySelector('#button');
const colorBtn = document.querySelector('#color');
const colorBox = document.querySelector('.color-box');
const picker = document.querySelector('#picker');

const root = document.documentElement;

const style = getComputedStyle(document.body);

const allScheme = document.querySelectorAll('.scheme');

button.addEventListener('click', (e) => {
    changeMode(e);
})

colorBtn.addEventListener('click', () => {
    changeColor();
})

root.addEventListener('click', (e) => {
    if(e.target != colorBox && e.target != colorBtn && e.target != picker){
        if(colorBox.classList.contains('box-active')){
            colorBox.classList.remove('box-active');
        }
    }
    
})

picker.addEventListener('input', () => {
    let inputColor = picker.value;
    
    // *** stackoverflow link ****
    // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black

    let c = inputColor.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    // body.style.backgroundColor =  inputColor;
    root.style.setProperty('--bg-color', inputColor);

    if(luma < 128){
        root.style.setProperty('--color', '#fff');
    }else{
        root.style.setProperty('--color', '#000');
    }

})


allScheme.forEach(scheme => {
    scheme.addEventListener('click', (e) => {
        body.className = '';

        switch (e.target.dataset.scheme) {
            case 'one':
                body.classList.add('color1');
                break;
            case 'two':
                body.classList.add('color2');
                break;
            case 'three':
                body.classList.add('color3');
                break;
            case 'picker':
                body.classList.add('color4');
                break;
            default:
                break;
        }
    })

})

   

function changeMode(e){

    let mode = e.target.dataset.mode;
    
    if(mode === 'dark'){
        colorBox.classList.remove('box-active');
        button.dataset.mode = 'light';
        button.innerText = 'Light Mode'
        body.className = "";
        body.classList.add('dark');
    }else{
        colorBox.classList.remove('box-active');
        button.dataset.mode = 'dark';
        button.innerText = 'Dark Mode'
        body.className = '';
        body.classList.add('light');
    }
}

function changeColor(){
    colorBox.classList.toggle('box-active');
}
