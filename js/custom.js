// function generatePassword() {
//     let link = 'https://passwordinator.herokuapp.com'
//     const num = checkboxes[0].checked
//     const char = checkboxes[1].checked
//     const caps = checkboxes[2].checked
//     if (num || char || caps) {
//         link += `?num=${num}&char=${char}&caps=${caps}&len=14`
//     }
//     console.log(link)
//     fetch(link)
//         .then((res) => res.json())
//         .then((data) => password.value = data.data)
// }

// const password = document.querySelector('input[type="text"]')
// const checkboxes = document.querySelectorAll('input[type="checkbox"]')
// checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('click', generatePassword)
// })
// const btn = document.querySelector('button')
// btn.addEventListener('click', generatePassword)
// generatePassword()

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