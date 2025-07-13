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
    const giveUpBtn = document.getElementById('give-up-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const turnLog = document.getElementById('turn-log');
    
    const winModal = document.getElementById('win-modal');
    const secretCountryNameSpan = document.getElementById('secret-country-name');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    const giveUpModal = document.getElementById('give-up-modal');
    const giveUpCountryNameSpan = document.getElementById('give-up-country-name');
    const giveUpModalCloseBtn = document.getElementById('give-up-modal-close-btn');

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
        let usedCountries = new Set(); // Track countries that have been used
        let gameEnded = false; // Track if the game has ended (won or given up)
        
        // --- CORE GAME LOGIC ---
        function initializeGame() {
            secretCountry = nations[Math.floor(Math.random() * nations.length)];
            console.log(`Secret Country: ${secretCountry.name} (ID: ${secretCountry.id})`); // For debugging

            resetTurnState();
            activeFilter = null;
            usedCountries.clear(); // Clear used countries for new game
            gameEnded = false; // Reset game ended state
            turnLog.innerHTML = '';

            // Hide all modals
            winModal.classList.add('hidden');
            giveUpModal.classList.add('hidden');
            
            // Enable inputs
            [countryGuessInput, questionInput].forEach(el => el.disabled = false);
            
            // Remove correct answer styling from input field
            countryGuessInput.classList.remove('correct-answer-input');
            
            // Reset button states
            submitTurnBtn.classList.remove('hidden');
            giveUpBtn.classList.remove('hidden');
            newGameBtn.classList.add('hidden');
            newGameBtn.textContent = 'Play Again'; // Set button text
            
            renderFilterButtons();
            updateSubmitButtonState();
        }
        
        function resetTurnState() {
            selectedCountryGuess = null;
            selectedQuestion = null;
            // Only clear input if game hasn't ended
            if (!gameEnded) {
                countryGuessInput.value = '';
            }
            questionInput.value = '';
            questionInput.readOnly = true; 
            countryDropdown.style.display = 'none';
            questionDropdown.style.display = 'none';
            updateSubmitButtonState();
        }

        // --- MODIFIED FUNCTION ---
        function submitTurn() {
            if (!selectedCountryGuess || !selectedQuestion) return;

            const isYes = selectedQuestion.countries.includes(secretCountry.id);
            logTurn(selectedCountryGuess, selectedQuestion, isYes);

            // Use setTimeout to ensure the DOM has rendered the new log item before we try to scroll to it.
            // A 50ms delay is imperceptible but robust.
            setTimeout(() => {
                const newLogItem = turnLog.firstChild;
                if (newLogItem) {
                    const rect = newLogItem.getBoundingClientRect();
                    const isVisible = (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );
                    // If the new item is NOT visible, scroll it into view.
                    if (!isVisible) {
                        newLogItem.scrollIntoView({ behavior: "smooth", block: "end" });
                    }
                }
            }, 50);

            // Add the country to used countries
            usedCountries.add(selectedCountryGuess.id);

            // Check for a win AFTER logging the turn
            if (selectedCountryGuess.id === secretCountry.id) {
                gameEnded = true;
                // Add styling to show correct answer in input field
                countryGuessInput.classList.add('correct-answer-input');
                showWinScreen();
            } else {
                resetTurnState();
            }
        }

        function giveUp() {
            gameEnded = true;
            // Set the correct country in the input field
            countryGuessInput.value = secretCountry.name;
            selectedCountryGuess = secretCountry;
            // Add styling to show the answer
            countryGuessInput.classList.add('correct-answer-input');
            showGiveUpScreen();
        }

        function showWinScreen() {
            secretCountryNameSpan.textContent = secretCountry.name;
            winModal.classList.remove('hidden');
            [countryGuessInput, questionInput].forEach(el => el.disabled = true);
            
            submitTurnBtn.classList.add('hidden');
            giveUpBtn.classList.add('hidden');
            newGameBtn.classList.remove('hidden');
            
            filterContainer.style.pointerEvents = 'none';
        }

        function showGiveUpScreen() {
            giveUpCountryNameSpan.textContent = secretCountry.name;
            giveUpModal.classList.remove('hidden');
            [countryGuessInput, questionInput].forEach(el => el.disabled = true);
            
            submitTurnBtn.classList.add('hidden');
            giveUpBtn.classList.add('hidden');
            newGameBtn.classList.remove('hidden');
            
            filterContainer.style.pointerEvents = 'none';
        }

        // --- UI RENDERING & UPDATES ---
        
        function renderCountryGuesses() {
            questionDropdown.style.display = 'none'; // Hide other dropdown
            const query = countryGuessInput.value.toLowerCase().trim();
            
            // Only show dropdown if user has typed something and game hasn't ended
            if (query === '' || gameEnded) {
                countryDropdown.style.display = 'none';
                return;
            }
            
            // Filter countries that start with the query
            const filteredNations = nations.filter(n => 
                n.name.toLowerCase().startsWith(query)
            );
            
            countryDropdown.innerHTML = '';
            filteredNations.forEach(nation => {
                const isUsed = usedCountries.has(nation.id);
                
                let displayText = nation.name;
                let extraClass = '';
                let clickHandler = null;
                
                if (isUsed) {
                    displayText = `${nation.name} (Already Submitted)`;
                    extraClass = 'used-country';
                    // No click handler for used countries
                } else {
                    clickHandler = () => selectCountryGuess(nation);
                }
                
                const item = createDropdownItem(displayText, clickHandler, extraClass);
                countryDropdown.appendChild(item);
            });
            
            countryDropdown.style.display = filteredNations.length > 0 ? 'block' : 'none';
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
            
            // Don't sort - preserve original order from questions.json
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
            
            // Create All Categories button
            const allButton = document.createElement('button');
            allButton.className = 'filter-btn active';
            allButton.textContent = 'All Categories';
            allButton.addEventListener('click', () => setFilter(null));
            
            // Check if mobile
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                // Mobile: organize by rows
                const categoriesWithRows = questionsData.categories.map(category => ({
                    ...category,
                    mobileRow: category.mobileRow || 1 // Default to row 1 if not specified
                }));
                
                // Group categories by row
                const rowGroups = {};
                categoriesWithRows.forEach(category => {
                    if (!rowGroups[category.mobileRow]) {
                        rowGroups[category.mobileRow] = [];
                    }
                    rowGroups[category.mobileRow].push(category);
                });
                
                // Create row containers
                const sortedRows = Object.keys(rowGroups).sort((a, b) => Number(a) - Number(b));
                
                sortedRows.forEach(rowNum => {
                    const rowContainer = document.createElement('div');
                    rowContainer.className = 'filter-row';
                    
                    // Add All Categories button to first row
                    if (rowNum === sortedRows[0]) {
                        rowContainer.appendChild(allButton);
                    }
                    
                    // Add category buttons for this row
                    rowGroups[rowNum].forEach(category => {
                        const button = document.createElement('button');
                        button.className = 'filter-btn';
                        button.textContent = category.name;
                        button.addEventListener('click', () => setFilter(category.name));
                        rowContainer.appendChild(button);
                    });
                    
                    filterContainer.appendChild(rowContainer);
                });
                
                // Check for overflow and adjust button sizes
                adjustButtonSizesIfOverflow();
                
            } else {
                // Desktop: original behavior with flex-wrap
                filterContainer.appendChild(allButton);
                
                questionsData.categories.forEach(category => {
                    const button = document.createElement('button');
                    button.className = 'filter-btn';
                    button.textContent = category.name;
                    button.addEventListener('click', () => setFilter(category.name));
                    filterContainer.appendChild(button);
                });
            }
        }
        function adjustButtonSizesIfOverflow() {
            const rows = filterContainer.querySelectorAll('.filter-row');
            
            rows.forEach(row => {
                const buttons = row.querySelectorAll('.filter-btn');
                if (buttons.length === 0) return;
                
                // Reset button styles to get natural width
                buttons.forEach(btn => {
                    btn.style.fontSize = '';
                    btn.style.padding = '';
                    btn.style.minWidth = '';
                });
                
                // Check if row overflows
                const containerWidth = filterContainer.offsetWidth;
                const buttonsWidth = Array.from(buttons).reduce((total, btn) => {
                    return total + btn.offsetWidth + parseFloat(getComputedStyle(btn).marginLeft) + parseFloat(getComputedStyle(btn).marginRight);
                }, 0);
                
                // If overflow, reduce button sizes
                if (buttonsWidth > containerWidth) {
                    const scaleFactor = containerWidth / buttonsWidth * 0.95; // 95% to ensure no overflow
                    
                    buttons.forEach(btn => {
                        const currentFontSize = parseFloat(getComputedStyle(btn).fontSize);
                        const currentPadding = parseFloat(getComputedStyle(btn).paddingLeft);
                        
                        btn.style.fontSize = `${currentFontSize * scaleFactor}px`;
                        btn.style.padding = `${currentPadding * scaleFactor}px`;
                        btn.style.minWidth = 'auto';
                    });
                }
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
            submitTurnBtn.disabled = !(selectedCountryGuess && selectedQuestion) || gameEnded;
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

        // Helper function to validate and select country by name
        function validateAndSelectCountry(countryName) {
            const exactMatch = nations.find(nation => 
                nation.name.toLowerCase() === countryName.toLowerCase()
            );
            if (exactMatch && !usedCountries.has(exactMatch.id)) {
                selectCountryGuess(exactMatch);
                return true;
            }
            return false;
        }

        // --- EVENT LISTENERS (specific to the game instance) ---
        countryGuessInput.addEventListener('input', () => {
            if (!gameEnded) {
                renderCountryGuesses();
                // Clear selection when user types
                selectedCountryGuess = null;
                updateSubmitButtonState();
            }
        });

        countryGuessInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !gameEnded) {
                e.preventDefault();
                const query = countryGuessInput.value.trim();
                
                // Try to find exact match first
                if (validateAndSelectCountry(query)) {
                    return;
                }
                
                // If no exact match, try to select the first available (non-used) item in dropdown
                const firstAvailableItem = countryDropdown.querySelector('.dropdown-item:not(.used-country)');
                if (firstAvailableItem) {
                    const countryName = firstAvailableItem.textContent;
                    const nation = nations.find(n => n.name === countryName);
                    if (nation && !usedCountries.has(nation.id)) {
                        selectCountryGuess(nation);
                    }
                }
            }
        });

        countryGuessInput.addEventListener('blur', () => {
            if (!gameEnded) {
                // Small delay to allow click events on dropdown to fire first
                setTimeout(() => {
                    const query = countryGuessInput.value.trim();
                    if (query && !selectedCountryGuess) {
                        validateAndSelectCountry(query);
                    }
                }, 150);
            }
        });

        questionInput.addEventListener('input', () => {
            if (!gameEnded) {
                renderQuestions();
            }
        });

        // Open dropdowns on direct click of the input element only
        countryGuessInput.addEventListener('click', (e) => {
            if (!gameEnded) {
                e.stopPropagation(); // Prevent event bubbling
                if (e.target === countryGuessInput) {
                    if (countryGuessInput.value.trim()) {
                        renderCountryGuesses();
                    }
                }
            }
        });

        questionInput.addEventListener('click', (e) => {
            if (!gameEnded) {
                e.stopPropagation(); // Prevent event bubbling
                if (e.target === questionInput && questionInput.readOnly) {
                    renderQuestions({ forceShowAll: true });
                }
            }
        });

        submitTurnBtn.addEventListener('click', submitTurn);
        giveUpBtn.addEventListener('click', giveUp);
        newGameBtn.addEventListener('click', initializeGame);
        
        typeQuestionBtn.addEventListener('click', (e) => {
            if (!gameEnded) {
                e.stopPropagation(); 
                questionInput.readOnly = false;
                questionInput.focus();
                renderQuestions(); 
            }
        });
        
        modalCloseBtn.addEventListener('click', () => {
            winModal.classList.add('hidden');
        });

        giveUpModalCloseBtn.addEventListener('click', () => {
            giveUpModal.classList.add('hidden');
        });

        // Global listener to close dropdowns
        document.addEventListener('click', (e) => {
            if (!gameEnded) {
                const clickedElement = e.target;
                const searchWrapper = clickedElement.closest('.search-wrapper');
                const isInputClick = clickedElement === countryGuessInput || clickedElement === questionInput;
        
                // Only close dropdowns if click is completely outside search wrappers and not on inputs
                if (!searchWrapper && !isInputClick) {
                    countryDropdown.style.display = 'none';
                    questionDropdown.style.display = 'none';
                    questionInput.readOnly = true;
                }
            }
        });
        window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        setTimeout(adjustButtonSizesIfOverflow, 100);
    }
    });

        // --- INITIALIZE THE GAME ---
        initializeGame();
    }
    
    // --- START THE WHOLE PROCESS ---
    initialize();
});