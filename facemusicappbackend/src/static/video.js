
//Define object constants
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const constraints = { video: true };
//var image;

function ShowCam() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
    Webcam.attach('#canvas');
}
window.onload = ShowCam;

//Hook into button event to display image to canvas
captureButton.addEventListener('click', () => {
    //Post imageUrl to server
    Webcam.snap( function(data_uri) {
        var form = document.getElementById('myForm');
        var blob = dataURItoBlob(data_uri)
        var formData = new FormData(form);
        formData.append("file", blob);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/");
        xmlhttp.send(formData);
    } );
});

//Convert from dataURI to blob
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}


// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });

/*function postImage () {
    const Http = new XMLHttpRequest();
    const url = "temp";
    Http.open("POST", url);
    Http.send();
}*/