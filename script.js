document.addEventListener('DOMContentLoaded', function () {
    const countriesContainer = document.getElementById('countriesContainer');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('regionFilter');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const backButton = document.getElementById('backButton');
    let countriesData = [];

    toggleDarkModeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });

    function displayCountries(countries) {
        countriesContainer.innerHTML = '';
        let hasNonExcludedCountry = false;

        countries.forEach(country => {
            if (country.name.common === 'Israel') {
                return; // استثناء الاحتلال الاسرائيلي  من العرض
            }

            hasNonExcludedCountry = true;

            const card = document.createElement('div');
            card.className = 'card';
            card.addEventListener('click', () => showCountryDetails(country));

            card.innerHTML = `
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <div class="card-body">
                    <h3>${country.name.common}</h3>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            `;

            countriesContainer.appendChild(card);
        });

        if (!hasNonExcludedCountry) {
            countriesContainer.innerHTML = '<p>لا يوجد دولة بهذا الاسم</p>'; // عرض رسالة عند عدم وجود أي دول غير الاحتلال الإسرائيلي
        }
    }

    function showCountryDetails(country) {
        if (country.name.common === 'Israel') {
            alert('لا يوجد معلومات عن هذه الدولة');
            goBack();
            return;
        }

        backButton.style.display = 'block'; // إظهار زر العودة

        const countryDetailContainer = document.createElement('div');
        countryDetailContainer.className = 'country-detail';

        countryDetailContainer.innerHTML = `
            <button class="back-button" onclick="goBack()">Back</button>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <div class="details">
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Subregion:</strong> ${country.subregion}</p>
                <p><strong>Top Level Domain:</strong> ${country.tld.join(', ')}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                <p><strong>Border Countries:</strong> ${country.borders ? country.borders.join(', ') : 'None'}</p>
            </div>
        `;

        countriesContainer.innerHTML = '';
        countriesContainer.appendChild(countryDetailContainer);
    }

    window.goBack = function() {
        backButton.style.display = 'none'; // إخفاء زر العودة عند العودة لعرض الدول
        fetchCountries(); // إعادة تحميل البيانات وعرض الدول
    }
    
    function fetchCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                countriesData = data;
                displayCountries(countriesData);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }

    function filterCountries() {
        const searchTerm = searchInput.value.toLowerCase();
        const region = regionFilter.value;

        const filteredCountries = countriesData.filter(country => {
            return (
                country.name.common.toLowerCase().includes(searchTerm) &&
                (region === '' || country.region === region)
            );
        });

        displayCountries(filteredCountries);
    }

    searchInput.addEventListener('input', filterCountries);
    regionFilter.addEventListener('change', filterCountries);

    fetchCountries();
});
