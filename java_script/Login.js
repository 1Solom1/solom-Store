var lab1 = document.querySelectorAll(".lab1");
var inputs = document.querySelectorAll(".inp_log");

inputs.forEach((input, index) => {
    if (lab1[index] && input.value.trim() !== "") {
        lab1[index].style.transform = "translateY(-24px)";
        lab1[index].style.color = "rgb(112, 112, 112)";
    }
    
    input.addEventListener('input', () => {
        if (lab1[index]) {
            if (input.value.trim() !== "") {
                lab1[index].style.transform = "translateY(-24px)";
                lab1[index].style.color = "rgb(112, 112, 112)";
            } else {
                lab1[index].style.transform = "translateY(0)";
                lab1[index].style.color = "grey";
            }
        }
    });
    
    input.addEventListener('focus', () => {
        if (lab1[index]) {
            lab1[index].style.color = "rgb(112, 112, 112)";
            if (input.value.trim() === "") {
                lab1[index].style.transform = "translateY(-24px)";
            }
        }
    });
    
    input.addEventListener('blur', () => {
        if (lab1[index]) {
            if (input.value.trim() === "") {
                lab1[index].style.transform = "translateY(0)";
                lab1[index].style.color = "grey";
            } else {
                lab1[index].style.color = "rgb(112, 112, 112)";
            }
        }
    });
});



window.addEventListener("DOMContentLoaded", () => {
  var btnn = document.getElementById("btn2");
  var email = document.getElementById("lab110");
  var password = document.getElementById("lab111");
  var em = localStorage.getItem("email");
  var pas = localStorage.getItem("password");

  if (btnn) {
    // نتأكد ان الزر موجود
    btnn.addEventListener("click", function (e) {
      e.preventDefault();

      if (!email || !password) return; // نتأكد ان العناصر موجودة

      if (email.value === "" || password.value === "") {
        alert("Please Fill the Fields");
      } else if (email.value.trim() === em && password.value.trim() === pas) {
        localStorage.setItem("Logged", "true");
        setTimeout(() => {
          window.location = "index.html";
        }, 500);
      } else {
        alert("Password or Email is incorrect");
      }
    });
  }
});
