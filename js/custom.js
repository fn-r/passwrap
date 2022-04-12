function generatePassword() {
    let link = 'https://passwordinator.herokuapp.com'
    const num = checkboxes[0].checked
    const char = checkboxes[1].checked
    const caps = checkboxes[2].checked
    if (num || char || caps) {
        link += `?num=${num}&char=${char}&caps=${caps}&len=14`
    }
    console.log(link)
    fetch(link)
        .then((res) => res.json())
        .then((data) => password.value = data.data)
}

const password = document.querySelector('input[type="text"]')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', generatePassword)
})
const btn = document.querySelector('button')
btn.addEventListener('click', generatePassword)
generatePassword()