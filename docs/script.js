document.addEventListener('DOMContentLoaded', () => {

    // --- EMBEDDED JSON DATA ---
    const nations = [
        { "id": 1, "name": "Russia" }, { "id": 2, "name": "Canada" }, { "id": 3, "name": "China" },
        { "id": 4, "name": "United States" }, { "id": 5, "name": "Brazil" }, { "id": 6, "name": "Australia" },
        { "id": 7, "name": "India" }, { "id": 8, "name": "Argentina" }, { "id": 9, "name": "Kazakhstan" },
        { "id": 10, "name": "Algeria" }, { "id": 11, "name": "DR Congo" }, { "id": 12, "name": "Saudi Arabia" },
        { "id": 13, "name": "Mexico" }, { "id": 14, "name": "Indonesia" }, { "id": 15, "name": "Sudan" },
        { "id": 16, "name": "Libya" }, { "id": 17, "name": "Iran" }, { "id": 18, "name": "Mongolia" },
        { "id": 19, "name": "Peru" }, { "id": 20, "name": "Chad" }, { "id": 21, "name": "Niger" },
        { "id": 22, "name": "Angola" }, { "id": 23, "name": "Mali" }, { "id": 24, "name": "South Africa" },
        { "id": 25, "name": "Colombia" }, { "id": 26, "name": "Ethiopia" }, { "id": 27, "name": "Bolivia" },
        { "id": 28, "name": "Mauritania" }, { "id": 29, "name": "Egypt" }, { "id": 30, "name": "Tanzania" },
        { "id": 31, "name": "Nigeria" }, { "id": 32, "name": "Venezuela" }, { "id": 33, "name": "Pakistan" },
        { "id": 34, "name": "Namibia" }, { "id": 35, "name": "Mozambique" }, { "id": 36, "name": "Turkey" },
        { "id": 37, "name": "Chile" }, { "id": 38, "name": "Zambia" }, { "id": 39, "name": "Myanmar" },
        { "id": 40, "name": "Afghanistan" }, { "id": 41, "name": "South Sudan" }, { "id": 42, "name": "France" },
        { "id": 43, "name": "Somalia" }, { "id": 44, "name": "Central African Republic" }, { "id": 45, "name": "Ukraine" },
        { "id": 46, "name": "Madagascar" }, { "id": 47, "name": "Botswana" }, { "id": 48, "name": "Kenya" },
        { "id": 49, "name": "Yemen" }, { "id": 50, "name": "Thailand" }, { "id": 51, "name": "Spain" },
        { "id": 52, "name": "Turkmenistan" }, { "id": 53, "name": "Cameroon" }, { "id": 54, "name": "Papua New Guinea" },
        { "id": 55, "name": "Sweden" }, { "id": 56, "name": "Uzbekistan" }, { "id": 57, "name": "Morocco" },
        { "id": 58, "name": "Iraq" }, { "id": 59, "name": "Paraguay" }, { "id": 60, "name": "Zimbabwe" },
        { "id": 61, "name": "Japan" }, { "id": 62, "name": "Germany" }, { "id": 63, "name": "Congo" },
        { "id": 64, "name": "Finland" }, { "id": 65, "name": "Vietnam" }, { "id": 66, "name": "Malaysia" },
        { "id": 67, "name": "Norway" }, { "id": 68, "name": "Ivory Coast" }, { "id": 69, "name": "Poland" },
        { "id": 70, "name": "Oman" }, { "id": 71, "name": "Italy" }, { "id": 72, "name": "Philippines" },
        { "id": 73, "name": "Ecuador" }, { "id": 74, "name": "Burkina Faso" }, { "id": 75, "name": "New Zealand" },
        { "id": 76, "name": "Gabon" }, { "id": 77, "name": "Guinea" }, { "id": 78, "name": "United Kingdom" },
        { "id": 79, "name": "Uganda" }, { "id": 80, "name": "Ghana" }, { "id": 81, "name": "Romania" },
        { "id": 82, "name": "Laos" }, { "id": 83, "name": "Guyana" }, { "id": 84, "name": "Belarus" },
        { "id": 85, "name": "Kyrgyzstan" }, { "id": 86, "name": "Senegal" }, { "id": 87, "name": "Syria" },
        { "id": 88, "name": "Cambodia" }, { "id": 89, "name": "Uruguay" }, { "id": 90, "name": "Suriname" },
        { "id": 91, "name": "Tunisia" }, { "id": 92, "name": "Nepal" }, { "id": 93, "name": "Bangladesh" },
        { "id": 94, "name": "Tajikistan" }, { "id": 95, "name": "Greece" }, { "id": 96, "name": "Nicaragua" },
        { "id": 97, "name": "North Korea" }, { "id": 98, "name": "Eritrea" }, { "id": 99, "name": "Benin" },
        { "id": 100, "name": "Honduras" }, { "id": 101, "name": "Liberia" }, { "id": 102, "name": "Bulgaria" },
        { "id": 103, "name": "Cuba" }, { "id": 104, "name": "Guatemala" }, { "id": 105, "name": "Iceland" },
        { "id": 106, "name": "South Korea" }, { "id": 107, "name": "Hungary" }, { "id": 108, "name": "Portugal" },
        { "id": 109, "name": "Jordan" }, { "id": 110, "name": "Serbia" }, { "id": 111, "name": "Azerbaijan" },
        { "id": 112, "name": "Austria" }, { "id": 113, "name": "United Arab Emirates" }, { "id": 114, "name": "Czech Republic" },
        { "id": 115, "name": "Panama" }, { "id": 116, "name": "Sierra Leone" }, { "id": 117, "name": "Ireland" },
        { "id": 118, "name": "Georgia" }, { "id": 119, "name": "Sri Lanka" }, { "id": 120, "name": "Lithuania" },
        { "id": 121, "name": "Latvia" }, { "id": 122, "name": "Togo" }, { "id": 123, "name": "Croatia" },
        { "id": 124, "name": "Bosnia and Herzegovina" }, { "id": 125, "name": "Costa Rica" }, { "id": 126, "name": "Slovakia" },
        { "id": 127, "name": "Dominican Republic" }, { "id": 128, "name": "Estonia" }, { "id": 129, "name": "Denmark" },
        { "id": 130, "name": "Netherlands" }, { "id": 131, "name": "Switzerland" }, { "id": 132, "name": "Bhutan" },
        { "id": 133, "name": "Taiwan" }, { "id": 134, "name": "Guinea-Bissau" }, { "id": 135, "name": "Moldova" },
        { "id": 136, "name": "Belgium" }, { "id": 137, "name": "Lesotho" }, { "id": 138, "name": "Armenia" },
        { "id": 139, "name": "Solomon Islands" }, { "id": 140, "name": "Albania" }, { "id": 141, "name": "Equatorial Guinea" },
        { "id": 142, "name": "Burundi" }, { "id": 143, "name": "Haiti" }, { "id": 144, "name": "Rwanda" },
        { "id": 145, "name": "North Macedonia" }, { "id": 146, "name": "Djibouti" }, { "id": 147, "name": "El Salvador" },
        { "id": 148, "name": "Israel" }, { "id": 149, "name": "Slovenia" }, { "id": 150, "name": "Fiji" },
        { "id": 151, "name": "Kuwait" }, { "id": 152, "name": "Eswatini" }, { "id": 153, "name": "Timor-Leste" },
        { "id": 154, "name": "Bahamas" }, { "id": 155, "name": "Montenegro" }, { "id": 156, "name": "Vanuatu" },
        { "id": 157, "name": "Qatar" }, { "id": 158, "name": "Gambia" }, { "id": 159, "name": "Jamaica" },
        { "id": 160, "name": "Kosovo" }, { "id": 161, "name": "Lebanon" }, { "id": 162, "name": "Cyprus" },
        { "id": 163, "name": "Palestine" }, { "id": 164, "name": "Brunei" }, { "id": 165, "name": "Trinidad and Tobago" },
        { "id": 166, "name": "Cape Verde" }, { "id": 167, "name": "Samoa" }, { "id": 168, "name": "Luxembourg" },
        { "id": 169, "name": "Comoros" }, { "id": 170, "name": "Mauritius" }, { "id": 171, "name": "Sao Tome and Principe" },
        { "id": 172, "name": "Kiribati" }, { "id": 173, "name": "Tonga" }, { "id": 174, "name": "Seychelles" },
        { "id": 175, "name": "Singapore" }, { "id": 176, "name": "Bahrain" }, { "id": 177, "name": "Micronesia" },
        { "id": 178, "name": "Barbados" }, { "id": 179, "name": "Andorra" }, { "id": 180, "name": "Saint Lucia" },
        { "id": 181, "name": "Palau" }, { "id": 182, "name": "Maldives" }, { "id": 183, "name": "Saint Vincent and the Grenadines" },
        { "id": 184, "name": "Grenada" }, { "id": 185, "name": "Malta" }, { "id": 186, "name": "Antigua and Barbuda" },
        { "id": 187, "name": "Saint Kitts and Nevis" }, { "id": 188, "name": "Dominica" }, { "id": 189, "name": "Liechtenstein" },
        { "id": 190, "name": "San Marino" }, { "id": 191, "name": "Marshall Islands" }, { "id": 192, "name": "Tuvalu" },
        { "id": 193, "name": "Monaco" }, { "id": 194, "name": "Vatican City" }, { "id": 195, "name": "Nauru" }
    ];

    const questionsData = { "categories": [{ "name": "Multinational Groupings", "questions": [{ "question": "Is your country a member of the G7?", "countries": [2, 4, 42, 61, 62, 71, 78] }, { "question": "Is your country a member of the G20?", "countries": [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 24, 36, 42, 61, 62, 71, 78, 107] }, { "question": "Is your country a member of BRICS?", "countries": [1, 3, 5, 7, 14, 17, 24, 26, 29, 114] }, { "question": "Is your country a member of the OECD?", "countries": [2, 4, 6, 13, 25, 36, 37, 42, 51, 55, 61, 62, 64, 67, 69, 71, 75, 78, 95, 106, 107, 108, 109, 113, 115, 118, 121, 122, 126, 127, 129, 130, 131, 132, 136, 149, 150, 168] }, { "question": "Is your country a member of OPEC?", "countries": [10, 12, 16, 17, 31, 32, 58, 63, 76, 114, 141, 152] }, { "question": "Is your country a member of OPEC+?", "countries": [1, 9, 10, 12, 13, 15, 16, 17, 31, 32, 41, 58, 63, 66, 70, 76, 112, 114, 141, 152, 164, 177] }, { "question": "Is your country a member of the EU (European Union)?", "countries": [42, 51, 55, 62, 64, 69, 71, 81, 95, 103, 108, 109, 113, 115, 118, 121, 122, 124, 127, 129, 130, 131, 136, 150, 162, 168, 186] }, { "question": "Is your country a member of ASEAN (Association of Southeast Asian Nations)?", "countries": [14, 39, 50, 65, 66, 72, 82, 88, 164, 176] }, { "question": "Is your country a member of NAFTA (North American Free Trade Agreement)?", "countries": [2, 4, 13] }, { "question": "Is your country a member of NATO (North Atlantic Treaty Organization)?", "countries": [2, 4, 36, 42, 51, 55, 62, 64, 67, 69, 71, 78, 81, 95, 103, 106, 108, 109, 115, 121, 122, 124, 127, 129, 130, 131, 136, 140, 145, 150, 156, 168] }, { "question": "Is your country a permanent member of UN security Council(Veto power)?", "countries": [1, 3, 4, 42, 78] }] }, { "name": "Geography", "questions": [{ "question": "Is your country land-locked?", "countries": [9, 18, 20, 21, 23, 26, 27, 38, 40, 41, 44, 47, 52, 56, 59, 60, 74, 79, 82, 84, 85, 92, 94, 99, 108, 111, 112, 113, 115, 127, 132, 133, 135, 137, 138, 142, 144, 145, 153, 168, 180, 190, 191, 195] }, { "question": "Is your country an Island?", "countries": [14, 46, 54, 61, 72, 75, 78, 104, 106, 118, 120, 128, 139, 143, 151, 154, 155, 157, 160, 162, 164, 165, 166, 167, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 185, 186, 187, 188, 189, 192, 193] }, { "question": "Is your nation a city-state?", "countries": [176, 194, 195] }, { "question": "Does your country have Mediterranean sea coast?", "countries": [10, 16, 29, 36, 42, 51, 57, 71, 87, 91, 95, 124, 125, 140, 149, 150, 156, 161, 162, 163, 186, 194] }, { "question": "Is your country considered Baltic country?", "countries": [121, 122, 129] }, { "question": "Is your country considered Nordic country?", "countries": [55, 64, 67, 106, 130] }, { "question": "Is your country considered a Scandinavian country?", "countries": [55, 67, 130] }, { "question": "Does your country have Black sea coast?", "countries": [1, 36, 45, 81, 103, 119] }] }, { "name": "Political & Historical", "questions": [{ "question": "Is your country an absolute monarchy?", "countries": [12, 70, 114, 153, 158, 164] }, { "question": "Is your country a constitutional monarchy?", "countries": [2, 6, 50, 51, 55, 57, 61, 66, 67, 75, 78, 88, 110, 130, 131, 133, 136, 137, 152, 168, 174, 177, 180, 190, 194] }, { "question": "Is your country a parliamentary republic?", "countries": [7, 24, 26, 33, 62, 64, 69, 71, 92, 93, 95, 103, 106, 108, 111, 113, 115, 118, 119, 121, 122, 124, 125, 127, 129, 135, 140, 145, 149, 150, 151, 156, 157, 161, 165, 167, 170, 172, 173, 176, 183, 186, 191] }, { "question": "Is your country transitional/ semi presidential/ presidential republic?", "countries": [1, 4, 5, 8, 9, 10, 11, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 52, 53, 56, 58, 59, 60, 63, 68, 72, 73, 74, 76, 77, 79, 80, 81, 83, 84, 85, 86, 87, 89, 90, 91, 94, 96, 99, 100, 101, 102, 105, 107, 109, 112, 116, 117, 123, 126, 128, 132, 134, 138, 139, 141, 142, 143, 144, 147, 148, 154, 155, 159, 160, 162, 166, 169, 171, 175, 178, 179, 181, 182, 184, 185, 187, 188, 189, 192, 193] }, { "question": "Is your country a single party state?", "countries": [3, 65, 82, 97, 98, 104] }, { "question": "Is your country a former Soviet republic?", "countries": [1, 9, 45, 52, 56, 84, 85, 94, 112, 119, 121, 122, 129, 135, 138] }, { "question": "Is your country a former Yugoslav republic?", "countries": [111, 124, 125, 145, 150, 156] }] }, { "name": "Technology", "questions": [{ "question": "Does your country have Nuclear Weapons?", "countries": [1, 3, 4, 7, 33, 42, 78, 97, 149] }] }] };

    // --- DOM ELEMENTS ---
    const countryGuessInput = document.getElementById('country-guess-input');
    const questionInput = document.getElementById('question-input');
    const countryDropdown = document.getElementById('country-dropdown');
    const questionDropdown = document.getElementById('question-dropdown');
    const filterContainer = document.getElementById('filter-container');
    const submitTurnBtn = document.getElementById('submit-turn-btn');
    const turnLog = document.getElementById('turn-log');
    const winMessage = document.getElementById('win-message');
    const secretCountryNameSpan = document.getElementById('secret-country-name');
    const playAgainBtn = document.getElementById('play-again-btn');

    // --- GAME STATE ---
    let secretCountry = null;
    let selectedCountryGuess = null;
    let selectedQuestion = null;
    let activeFilter = null;
    
    // --- CORE GAME LOGIC ---
    function initializeGame() {
        secretCountry = nations[Math.floor(Math.random() * nations.length)];
        console.log(`Secret Country: ${secretCountry.name}`); // For debugging

        resetTurnState();
        activeFilter = null;
        turnLog.innerHTML = '';

        winMessage.classList.add('hidden');
        [countryGuessInput, questionInput].forEach(input => input.disabled = false);
        
        renderFilterButtons();
        updateSubmitButtonState();
    }
    
    function resetTurnState() {
        selectedCountryGuess = null;
        selectedQuestion = null;
        countryGuessInput.value = '';
        questionInput.value = '';
        updateSubmitButtonState();
    }

    function submitTurn() {
        if (!selectedCountryGuess || !selectedQuestion) return;

        // 1. Check for a win
        if (selectedCountryGuess.id === secretCountry.id) {
            showWinScreen();
            return;
        }

        // 2. Process the turn if not a win
        const isYes = selectedQuestion.countries.includes(secretCountry.id);
        logTurn(selectedCountryGuess, selectedQuestion, isYes);
        
        // 3. Reset for the next turn
        resetTurnState();
    }

    function showWinScreen() {
        secretCountryNameSpan.textContent = secretCountry.name;
        winMessage.classList.remove('hidden');
        [countryGuessInput, questionInput, submitTurnBtn].forEach(el => el.disabled = true);
        filterContainer.style.pointerEvents = 'none';
    }

    // --- UI RENDERING & UPDATES ---
    
    function renderCountryGuesses() {
        const query = countryGuessInput.value.toLowerCase();
        const filteredNations = nations.filter(n => n.name.toLowerCase().includes(query));
        
        countryDropdown.innerHTML = '';
        filteredNations.forEach(nation => {
            const item = createDropdownItem(nation.name, () => selectCountryGuess(nation));
            countryDropdown.appendChild(item);
        });
        countryDropdown.style.display = 'block';
    }

    function renderQuestions() {
        const query = questionInput.value.toLowerCase();
        let questionsToDisplay = [];
        questionDropdown.innerHTML = '';

        const categoriesToRender = activeFilter 
            ? questionsData.categories.filter(c => c.name === activeFilter)
            : questionsData.categories;

        categoriesToRender.forEach(category => {
            const filteredQuestions = category.questions.filter(q => q.question.toLowerCase().includes(query));
            if (filteredQuestions.length > 0) {
                 if (activeFilter) {
                    const categoryTitle = createDropdownItem(category.name, null, 'category-title');
                    questionDropdown.appendChild(categoryTitle);
                }
                filteredQuestions.forEach(q => questionsToDisplay.push(q));
            }
        });
        
        if (!activeFilter) {
             questionsToDisplay.sort((a, b) => a.question.localeCompare(b.question));
        }

        questionsToDisplay.forEach(q => {
            const item = createDropdownItem(q.question, () => selectQuestion(q));
            questionDropdown.appendChild(item);
        });
        
        questionDropdown.style.display = 'block';
    }

    function createDropdownItem(text, onClick, extraClass = '') {
        const item = document.createElement('div');
        item.className = `dropdown-item ${extraClass}`;
        item.textContent = text;
        if (onClick) {
            item.addEventListener('click', onClick);
        }
        return item;
    }
    
    function logTurn(country, question, isYes) {
        const logItem = document.createElement('div');
        logItem.className = 'turn-log-item';

        const guessPart = document.createElement('div');
        guessPart.className = 'log-part';
        guessPart.innerHTML = `Guessed: <strong>${country.name}</strong>`;

        const questionPart = document.createElement('div');
        questionPart.className = 'log-part';
        questionPart.textContent = `Asked: ${question.question}`;
        
        const answerPart = document.createElement('div');
        answerPart.className = `log-answer ${isYes ? 'yes' : 'no'}`;
        answerPart.textContent = isYes ? 'YES' : 'NO';
        
        logItem.append(guessPart, questionPart, answerPart);
        turnLog.prepend(logItem);
    }
    
    function renderFilterButtons() {
        filterContainer.innerHTML = '';
        filterContainer.style.pointerEvents = 'auto';
        const allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.textContent = 'All Categories';
        allButton.addEventListener('click', () => setFilter(null));
        filterContainer.appendChild(allButton);

        questionsData.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category.name;
            button.addEventListener('click', () => setFilter(category.name));
            filterContainer.appendChild(button);
        });
    }

    function setFilter(categoryName) {
        activeFilter = categoryName;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const isActive = (!categoryName && btn.textContent === 'All Categories') || (btn.textContent === categoryName);
            btn.classList.toggle('active', isActive);
        });
        renderQuestions();
    }

    function updateSubmitButtonState() {
        submitTurnBtn.disabled = !(selectedCountryGuess && selectedQuestion);
    }

    // --- SELECTION HANDLERS ---
    
    function selectCountryGuess(nation) {
        selectedCountryGuess = nation;
        countryGuessInput.value = nation.name;
        countryDropdown.style.display = 'none';
        updateSubmitButtonState();
    }
    
    function selectQuestion(question) {
        selectedQuestion = question;
        questionInput.value = question.question;
        questionDropdown.style.display = 'none';
        updateSubmitButtonState();
    }

    // --- EVENT LISTENERS ---
    countryGuessInput.addEventListener('input', renderCountryGuesses);
    questionInput.addEventListener('input', renderQuestions);
    countryGuessInput.addEventListener('focus', renderCountryGuesses);
    questionInput.addEventListener('focus', renderQuestions);
    submitTurnBtn.addEventListener('click', submitTurn);
    playAgainBtn.addEventListener('click', initializeGame);

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            countryDropdown.style.display = 'none';
            questionDropdown.style.display = 'none';
        }
    });

    // --- INITIALIZE ---
    initializeGame();
});