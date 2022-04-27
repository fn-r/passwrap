document.addEventListener("DOMContentLoaded", (function () {
    const e = document.querySelectorAll(".navbar-burger"),
        n = document.querySelectorAll(".navbar-menu");
    if (e.length && n.length)
        for (var t = 0; t < e.length; t++) e[t].addEventListener("click", (function () {
            for (var e = 0; e < n.length; e++) n[e].classList.toggle("is-active")
        }))
}));

function generatePassword() {
    async function fetchPassword(link) {
        try {
            const response = await fetch(link, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();
            password.value = result;
        } catch (err) {
            console.log(err);
        }
    }

    const password = document.querySelector('input[type="text"]')
    const range_value = document.getElementById('rangevalue').value

    const checkboxes_values = Array.from(checkboxes).map(checkbox => {
        let value = 0
        if (checkbox.checked) {
            value = Number(checkbox.value)
        }
        return value
    })
    const x = checkboxes_values.reduce((a, b) => a + b)
    const link = `https://random.justyy.workers.dev/api/random/?n=${range_value}&x=${x}`
    fetchPassword(link)
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const checkboxes_values = [1,2,4,8]
checkboxes.forEach((checkbox, i) => {
    checkbox.value = checkboxes_values[i]
    checkbox.addEventListener('click', generatePassword)
})

const btn = document.querySelector('button')
btn.addEventListener('click', generatePassword)

const input_range = document.querySelector('input[type="range"]')
input_range.addEventListener('input', () => {
    const range_value = document.getElementById('rangevalue')
    range_value.value= input_range.value
    generatePassword()
})
generatePassword()