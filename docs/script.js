document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const modeSelectionContainer = document.getElementById('mode-selection-container');
    const gameContainer = document.querySelector('.game-container');
    const modeButtonsContainer = document.getElementById('mode-buttons');
    const mainTitle = document.getElementById('main-title');
    const mainSubtitle = document.getElementById('main-subtitle');
    
    const countryGuessInput = document.getElementById('country-guess-input');
    const questionInput = document.getElementById('question-input');
    const typeQuestionBtn = document.getElementById('type-question-btn');
    const countryDropdown = document.getElementById('country-dropdown');
    const questionDropdown = document.getElementById('question-dropdown');
    const filterContainer = document.getElementById('filter-container');
    const submitTurnBtn = document.getElementById('submit-turn-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const turnLog = document.getElementById('turn-log');
    
    const winModal = document.getElementById('win-modal');
    const secretCountryNameSpan = document.getElementById('secret-country-name');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // --- EMBEDDED NATIONS DATA ---
    const allNations = [
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

    // --- Initializer ---
    function initialize() {
        fetch('modes.json')
            .then(response => response.json())
            .then(modesData => {
                showModeScreen(modesData);
            })
            .catch(error => {
                console.error("Could not load modes.json:", error);
                document.body.innerHTML = `<div style="text-align: center; padding: 50px; font-family: sans-serif;">
                    <h1>Error</h1><p>Could not load game modes. Please check the console.</p></div>`;
            });
    }

    function showModeScreen(modesData) {
        mainTitle.textContent = modesData.title;
        mainSubtitle.textContent = modesData.subtitle;
        modeButtonsContainer.innerHTML = ''; // Clear previous buttons

        modesData.modes.forEach(mode => {
            const button = document.createElement('button');
            button.className = 'mode-btn';
            button.innerHTML = `${mode.name}<span class="mode-description">${mode.description}</span>`;
            button.addEventListener('click', () => {
                startGame(mode);
            });
            modeButtonsContainer.appendChild(button);
        });

        // Show mode screen and hide game
        modeSelectionContainer.classList.remove('hidden');
        gameContainer.classList.add('hidden');
    }

    function startGame(mode) {
        // Hide mode screen and show game
        modeSelectionContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        
        let nationsForMode;
        if (mode.countries === "ALL") {
            nationsForMode = allNations;
        } else {
            const countryIds = new Set(mode.countries);
            nationsForMode = allNations.filter(nation => countryIds.has(nation.id));
        }

        fetch('questions.json')
            .then(response => response.json())
            .then(questionsData => {
                runGame(nationsForMode, questionsData);
            })
            .catch(error => {
                console.error("Could not load questions.json:", error);
                 gameContainer.innerHTML = `<div style="text-align: center; padding: 50px; font-family: sans-serif;">
                    <h1>Error</h1><p>Could not load question data. Please check the console.</p></div>`;
            });
    }

    function runGame(nations, questionsData) {
        // --- GAME STATE ---
        let secretCountry = null;
        let selectedCountryGuess = null;
        let selectedQuestion = null;
        let activeFilter = null;
        
        // --- CORE GAME LOGIC ---
        function initializeGame() {
            secretCountry = nations[Math.floor(Math.random() * nations.length)];
            console.log(`Secret Country: ${secretCountry.name} (ID: ${secretCountry.id})`); // For debugging

            resetTurnState();
            activeFilter = null;
            turnLog.innerHTML = '';

            winModal.classList.add('hidden');
            [countryGuessInput, questionInput].forEach(el => el.disabled = false);
            
            submitTurnBtn.classList.remove('hidden');
            newGameBtn.classList.add('hidden');
            
            renderFilterButtons();
            updateSubmitButtonState();
        }
        
        function resetTurnState() {
            selectedCountryGuess = null;
            selectedQuestion = null;
            countryGuessInput.value = '';
            questionInput.value = '';
            questionInput.readOnly = true; 
            updateSubmitButtonState();
        }

        function submitTurn() {
            if (!selectedCountryGuess || !selectedQuestion) return;

            const isYes = selectedQuestion.countries.includes(secretCountry.id);
            logTurn(selectedCountryGuess, selectedQuestion, isYes);

            // Check for a win AFTER logging the turn
            if (selectedCountryGuess.id === secretCountry.id) {
                showWinScreen();
            } else {
                resetTurnState();
            }
        }

        function showWinScreen() {
            secretCountryNameSpan.textContent = secretCountry.name;
            winModal.classList.remove('hidden');
            [countryGuessInput, questionInput].forEach(el => el.disabled = true);
            
            submitTurnBtn.classList.add('hidden');
            newGameBtn.classList.remove('hidden');
            
            filterContainer.style.pointerEvents = 'none';
        }

        // --- UI RENDERING & UPDATES ---
        
        function renderCountryGuesses(options = {}) {
            questionDropdown.style.display = 'none'; // Hide other dropdown
            const query = options.forceShowAll ? '' : countryGuessInput.value.toLowerCase();
            const filteredNations = nations.filter(n => n.name.toLowerCase().includes(query));
            
            countryDropdown.innerHTML = '';
            filteredNations.forEach(nation => {
                const item = createDropdownItem(nation.name, () => selectCountryGuess(nation));
                countryDropdown.appendChild(item);
            });
            countryDropdown.style.display = 'block';
        }

        function renderQuestions(options = {}) {
            countryDropdown.style.display = 'none'; // Hide other dropdown
            const query = options.forceShowAll ? '' : questionInput.value.toLowerCase();
            const questionsToDisplay = [];
            questionDropdown.innerHTML = '';

            const categoriesToRender = activeFilter 
                ? questionsData.categories.filter(c => c.name === activeFilter)
                : questionsData.categories;

            categoriesToRender.forEach(category => {
                category.questions
                    .filter(q => q.question.toLowerCase().includes(query))
                    .forEach(q => questionsToDisplay.push(q));
            });
            
            questionsToDisplay.sort((a, b) => a.question.localeCompare(b.question));

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
            // Re-render the questions for the new filter without clearing the input
            renderQuestions({ forceShowAll: true });
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
            questionInput.readOnly = true; 
            questionDropdown.style.display = 'none';
            updateSubmitButtonState();
        }

        // --- EVENT LISTENERS (specific to the game instance) ---
        countryGuessInput.addEventListener('input', () => renderCountryGuesses());
        questionInput.addEventListener('input', () => renderQuestions());

        // Open dropdowns on direct click of the input element only
        countryGuessInput.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        if (e.target === countryGuessInput) {
        renderCountryGuesses({ forceShowAll: true });
        }
    });

        questionInput.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        if (e.target === questionInput && questionInput.readOnly) {
        renderQuestions({ forceShowAll: true });
        }
    });

        submitTurnBtn.addEventListener('click', submitTurn);
        newGameBtn.addEventListener('click', initialize); // Use the main initialize to go back to modes
        
        typeQuestionBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            questionInput.readOnly = false;
            questionInput.focus();
            renderQuestions(); 
        });
        
        modalCloseBtn.addEventListener('click', () => {
            winModal.classList.add('hidden');
        });

        // Global listener to close dropdowns
        document.addEventListener('click', (e) => {
        const clickedElement = e.target;
        const searchWrapper = clickedElement.closest('.search-wrapper');
        const isInputClick = clickedElement === countryGuessInput || clickedElement === questionInput;
    
        // Only close dropdowns if click is completely outside search wrappers and not on inputs
        if (!searchWrapper && !isInputClick) {
            countryDropdown.style.display = 'none';
            questionDropdown.style.display = 'none';
            questionInput.readOnly = true;
        }
    });

        // --- INITIALIZE THE GAME ---
        initializeGame();
    }
    
    // --- START THE WHOLE PROCESS ---
    initialize();
});