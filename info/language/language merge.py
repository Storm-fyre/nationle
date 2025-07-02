# Language-Country lookup program

# Dictionary mapping languages to their countries
language_countries = {
    "english": ["Antigua and Barbuda", "Australia", "Bahamas", "Barbados", "Belize", "Canada", "Dominica", "Fiji", "Gambia", "Ghana", "Grenada", "Guyana", "Ireland", "Jamaica", "Kiribati", "Liberia", "Mauritius", "Micronesia", "Namibia", "Nauru", "New Zealand", "Nigeria", "Palau", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Seychelles", "Sierra Leone", "Singapore", "Solomon Islands", "South Africa", "Trinidad and Tobago", "Uganda", "United Kingdom", "United States of America", "Zambia", "Zimbabwe"],
    "arabic": ["Algeria", "Bahrain", "Chad", "Egypt", "Iraq", "Jordan", "Kuwait", "Lebanon", "Libya", "Mauritania", "Morocco", "Oman", "Qatar", "Saudi Arabia", "Sudan", "Syrian Arab Republic", "Tunisia", "United Arab Emirates", "Yemen", "Palestine"],
    "spanish": ["Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominican Republic", "Ecuador", "El Salvador", "Equatorial Guinea", "Guatemala", "Honduras", "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru", "Spain", "Uruguay", "Venezuela"],
    "french": ["Benin", "Burkina Faso", "Cameroon", "France", "Gabon", "Guinea", "Mali", "Monaco", "Niger", "Senegal", "Togo"],
    "portuguese": ["Angola", "Brazil", "Cabo Verde", "Guinea-Bissau", "Mozambique", "Portugal", "Sao Tome and Principe"],
    "german": ["Austria", "Germany", "Liechtenstein", "Switzerland"],
    "russian": ["Belarus", "Kazakhstan", "Russian Federation"],
    "dutch": ["Belgium", "Netherlands", "Suriname"],
    "italian": ["Italy", "San Marino", "Vatican City"],
    "malay": ["Brunei", "Malaysia"],
    "greek": ["Cyprus", "Greece"],
    "korean": ["Democratic People's Republic of Korea", "Republic of Korea"],
    "somali": ["Djibouti", "Somalia"],
    "swahili": ["Kenya", "United Republic of Tanzania"],
    "romanian": ["Republic of Moldova", "Romania"],
    "pashto": ["Afghanistan"],
    "albanian": ["Albania"],
    "catalan": ["Andorra"],
    "armenian": ["Armenia"],
    "azerbaijani": ["Azerbaijan"],
    "bengali": ["Bangladesh"],
    "dzongkha": ["Bhutan"],
    "bosnian": ["Bosnia and Herzegovina"],
    "tswana": ["Botswana"],
    "bulgarian": ["Bulgaria"],
    "kirundi": ["Burundi"],
    "khmer": ["Cambodia"],
    "sango": ["Central African Republic"],
    "mandarin": ["China"],
    "comorian": ["Comoros"],
    "croatian": ["Croatia"],
    "czech": ["Czechia"],
    "lingala": ["Democratic Republic of the Congo"],
    "danish": ["Denmark"],
    "tigrinya": ["Eritrea"],
    "estonian": ["Estonia"],
    "swazi": ["Eswatini"],
    "amharic": ["Ethiopia"],
    "finnish": ["Finland"],
    "georgian": ["Georgia"],
    "haitian creole": ["Haiti"],
    "hungarian": ["Hungary"],
    "icelandic": ["Iceland"],
    "hindi": ["India"],
    "indonesian": ["Indonesia"],
    "persian": ["Iran"],
    "hebrew": ["Israel"],
    "japanese": ["Japan"],
    "kyrgyz": ["Kyrgyzstan"],
    "lao": ["Lao People's Democratic Republic"],
    "latvian": ["Latvia"],
    "sesotho": ["Lesotho"],
    "lithuanian": ["Lithuania"],
    "luxembourgish": ["Luxembourg"],
    "malagasy": ["Madagascar"],
    "chichewa": ["Malawi"],
    "dhivehi": ["Maldives"],
    "maltese": ["Malta"],
    "marshallese": ["Marshall Islands"],
    "mongolian": ["Mongolia"],
    "montenegrin": ["Montenegro"],
    "burmese": ["Myanmar"],
    "nepali": ["Nepal"],
    "macedonian": ["North Macedonia"],
    "norwegian": ["Norway"],
    "urdu": ["Pakistan"],
    "tok pisin": ["Papua New Guinea"],
    "filipino": ["Philippines"],
    "polish": ["Poland"],
    "kinyarwanda": ["Rwanda"],
    "samoan": ["Samoa"],
    "serbian": ["Serbia"],
    "slovak": ["Slovakia"],
    "slovene": ["Slovenia"],
    "dinka": ["South Sudan"],
    "sinhala": ["Sri Lanka"],
    "swedish": ["Sweden"],
    "tajik": ["Tajikistan"],
    "thai": ["Thailand"],
    "tetum": ["Timor-Leste"],
    "tongan": ["Tonga"],
    "turkish": ["Türkiye"],
    "turkmen": ["Turkmenistan"],
    "tuvaluan": ["Tuvalu"],
    "ukrainian": ["Ukraine"],
    "uzbek": ["Uzbekistan"],
    "bislama": ["Vanuatu"],
    "vietnamese": ["Vietnam"],
    "kituba": ["Republic of Congo"],
    "dioula": ["Ivory Coast"]
}

def main():
    print("Language-Country Lookup")
    print("Enter languages (one per line). Press Enter twice to finish.")
    print("-" * 50)
    
    languages = []
    
    # Get language input
    while True:
        lang = input("Enter language: ").strip().lower()
        if lang == "":
            if languages:  # If we have at least one language and get empty input
                break
            else:
                continue  # If no languages entered yet, continue asking
        languages.append(lang)
    
    # Find and display countries
    all_countries = []
    not_found = []
    
    for lang in languages:
        if lang in language_countries:
            all_countries.extend(language_countries[lang])
        else:
            not_found.append(lang)
    
    # Remove duplicates while preserving order
    unique_countries = []
    for country in all_countries:
        if country not in unique_countries:
            unique_countries.append(country)
    
    print("\n" + "="*50)
    print("COUNTRIES:")
    print("="*50)
    
    if unique_countries:
        for country in unique_countries:
            print(country)
    else:
        print("No countries found.")
    
    if not_found:
        print(f"\nNote: Language(s) not found: {', '.join(not_found)}")

if __name__ == "__main__":
    main()