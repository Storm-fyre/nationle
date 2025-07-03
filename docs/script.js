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

    // --- GLOBAL VARIABLES ---
    let allNations = [];

    // --- Initializer ---
    function initialize() {
        // Load nations data first
        fetch('nations.json')
            .then(response => response.json())
            .then(nationsData => {
                allNations = nationsData;
                // Then load modes
                return fetch('modes.json');
            })
            .then(response => response.json())
            .then(modesData => {
                showModeScreen(modesData);
            })
            .catch(error => {
                console.error("Could not load required data files:", error);
                document.body.innerHTML = `<div style="text-align: center; padding: 50px; font-family: sans-serif;">
                    <h1>Error</h1><p>Could not load game data. Please check that nations.json and modes.json are available.</p></div>`;
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