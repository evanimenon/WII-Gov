const dropArea = document.querySelector('.drop-section');
const listSection = document.querySelector('.list-section');
const fileSelector = document.querySelector('.file-selector');
const fileSelectorInput = document.querySelector('.file-selector-input');

// upload files with browse button
fileSelector.onclick = () => fileSelectorInput.click();
fileSelectorInput.onchange = () => {
    [...fileSelectorInput.files].forEach((file) => {
        if (typeValidation(file.type)) {
            uploadFile(file);
        }
    });
};

// when file is over the drag area
dropArea.ondragover = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add('drag-over-effect');
};

// when file is dropped onto drag area
dropArea.ondrop = (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over-effect');
    
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (typeValidation(file.type)) {
                    uploadFile(file);
                }
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file) => {
            if (typeValidation(file.type)) {
                uploadFile(file);
            }
        });
    }
};

// when file leaves the drag area
dropArea.ondragleave = () => {
    dropArea.classList.remove('drag-over-effect');
};

// check the file type
function typeValidation(type) {
    var splitType = type.split('/')[0];
    if (type === 'image' || splitType === 'pdf') {
        return true;
    }
    return false;
}

// upload file function
function uploadFile(file) {
    var http = new XMLHttpRequest();
    var data = new FormData();
    data.append('file', file);
    
    http.onload = () => {
        // Handle completion
    };
    
    http.upload.onprogress = (e) => {
        var percentComplete = (e.loaded / e.total) * 100;
        console.log(percentComplete);
    };
    
    http.open('POST', 'sender.php', true);
    http.send(data);
}
