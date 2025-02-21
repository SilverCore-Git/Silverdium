export default function salert(title, text, type) {
    Swal.fire({
        title: title,
        html: text,
        icon: type,
        confirmButtonText: 'Ok !',
        background: '#f0f0f0',
        color: '#333',
        confirmButtonColor: '#ff4090',
        timer: 10000,
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        }
    });
}