const fileInput = document.getElementById("fileUpload");
// 또는 const fileInput = $("#fileUpload").get(0);

fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
  console.log(selectedFile);
};