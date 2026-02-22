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

var fname = document.getElementById("inp11");
var lname = document.getElementById("inp12");
var email = document.getElementById("inp13");
var password = document.getElementById("inp14");
var btnn = document.getElementById("logg");

    
    btnn.addEventListener("click", function (e)
    {
        e.preventDefault();
        if (fname.value === "" || lname.value === "" || email.value === "" || password.value === "")
        {
            alert("Please Fill the filds");
        }
        else
        {
        localStorage.setItem("fname", fname.value.trim());
        localStorage.setItem("lname", lname.value.trim());
        localStorage.setItem("email", email.value.trim());
        localStorage.setItem("password", password.value.trim());
            setTimeout(() =>
            {
           window.location="Login.html"   
        },500)
        }

    }
    )

