class DropBoxController {

    constructor (){

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');

        this.initEvents();
    }

    //iniciando eventos
    initEvents(){

        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFilesEl.click();//colocou a função clicar
        });

        this.inputFilesEl.addEventListener('change', event => {

            console.log(event.target.files)

            this.snackModalEl.style.display = 'block';
            
        })
    }

}