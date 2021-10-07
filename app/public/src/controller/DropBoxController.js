class DropBoxController {

    constructor (){

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg')
        this.namefileEl = this.snackModalEl.querySelector('.filename')
        this.timeleftEl = this.snackModalEl.querySelector('.timeleft')

        this.initEvents();
    }

    //iniciando eventos
    initEvents(){

        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFilesEl.click();//colocou a função clicar
        });

        this.inputFilesEl.addEventListener('change', event => {

            //console.log(event.target.files);
            this.uploadTask(event.target.files);

            this.modalShow();

            this.inputFilesEl.value = '';//Aqui zero a barra de progresso

            //this.snackModalEl.style.display = 'block';
            
        });
    }

    //método para esconder o modal
    modalShow(show = true){

        this.snackModalEl.style.display = (show) ? 'block' : 'none';

    }

    uploadTask(files){

        let promises = [];

        //convertendo o file em array (usando spread)
        [...files].forEach(file => {

            promises.push(new Promise((resolve, reject) => {
                
                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {

                    this.modalShow(false);

                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch (e) {
                        reject(e);
                    }
                };

                ajax.onerror = event => {

                    this.modalShow(false);
                    reject(event);

                };

                //Para a barra de progresso
                ajax.upload.onprogress = event => {

                    this.uploadProgress(event, file);
                    //console.log(event);

                }

                let formData = new FormData();
                formData.append('input-file', file);

                this.startUploadTime = Date.now();//Pegar o tempo exato que iniciou o upload

                ajax.send(formData);

            }));
            
        })

        return Promise.all(promises);
    }

    uploadProgress(event, file){

        let timeSpent = Date.now() - this.startUploadTime;
        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded/total) * 100);//Cálculo em inteiros
        let timeleft = ((100 - porcent) * timeSpent) / porcent;

        this.progressBarEl.style.width = `${porcent}%`;//atualizando a progressão da barra

        this.namefileEl.innerHTML = file.name;//atualizando o nome do arquivo
        this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);//atualizando o tempo que falta

        //console.log(timeSpent, timeleft, porcent);

    }

    //Método para formatar o tempo
    formatTimeToHuman(duration){

        let seconds = parseInt(duration / 1000) % 60;
        let minutes = parseInt(duration / (1000 * 60)) % 60;
        let hours = parseInt(duration / (1000 * 60 * 60)) % 24;

        if (hours > 0) {
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }

        if (minutes > 0) {
            return `${minutes} minutos e ${seconds} segundos`;
        }

        if (seconds > 0) {
            return `${seconds} segundos`;
        }

        return '';

    }

}