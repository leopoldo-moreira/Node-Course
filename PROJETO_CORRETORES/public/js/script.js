const toRemove = (btnId) => {
  const urlToRemove = `/broker/remove/${btnId}`;
  window.location.href = urlToRemove;
}

const toEdit = (btnId) => {
  const urlToEdit = `/broker/edit/${btnId}`;
  window.location.href = urlToEdit;
}

const message = () => {
  const msgElement = document.getElementById('message');
    if (msgElement) {
      setTimeout(() => {
        msgElement.style.display = 'none';
      },3000)
    }
}