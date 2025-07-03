# Religion and Sect Country Organizer
# This program processes country data with religion and sect information
# It organizes countries by religion and sect, then outputs to a text file
# 
# Input format: country|religion|sect (one per line)
# Output: Text file with religions ordered by country count (descending)
# For each religion: lists all countries, then sects ordered by country count (descending)
# Countries are listed plain (no bullets or numbers), one per line

def process_country_data():
    """
    Main function to process country-religion-sect data and generate organized output file
    """
    
    # Dictionary to store religion -> countries mapping
    religion_countries = {}
    # Dictionary to store religion -> sect -> countries mapping  
    religion_sect_countries = {}
    
    print("Enter country data in format: country|religion|sect")
    print("Press Enter on empty line to finish input")
    print()
    
    # Read input data
    while True:
        line = input().strip()
        if not line:
            break
            
        try:
            # Handle format: | country | religion | sect |
            # Remove leading/trailing pipes and split
            cleaned_line = line.strip('|').strip()
            parts = [part.strip() for part in cleaned_line.split('|')]
            
            if len(parts) != 3:
                print(f"Invalid format: {line}. Expected: country|religion|sect")
                continue
                
            country, religion, sect = parts
            
            # Add to religion_countries dictionary
            if religion not in religion_countries:
                religion_countries[religion] = []
            religion_countries[religion].append(country)
            
            # Add to religion_sect_countries dictionary
            if religion not in religion_sect_countries:
                religion_sect_countries[religion] = {}
            if sect not in religion_sect_countries[religion]:
                religion_sect_countries[religion][sect] = []
            religion_sect_countries[religion][sect].append(country)
            
        except Exception as e:
            print(f"Error processing line '{line}': {e}")
            continue
    
    # Sort religions by number of countries (descending)
    sorted_religions = sorted(religion_countries.keys(), 
                            key=lambda x: len(religion_countries[x]), 
                            reverse=True)
    
    # Generate output file
    with open("religion_sect_countries.txt", "w", encoding="utf-8") as f:
        for religion in sorted_religions:
            # Write religion header
            f.write(f"{religion}\n")
            
            # Write all countries for this religion
            for country in sorted(religion_countries[religion]):
                f.write(f"{country}\n")
            
            f.write("\n")  # Empty line after countries
            
            # Sort sects by number of countries (descending)
            sects = religion_sect_countries[religion]
            sorted_sects = sorted(sects.keys(), 
                                key=lambda x: len(sects[x]), 
                                reverse=True)
            
            # Write each sect and its countries
            for sect in sorted_sects:
                f.write(f"{sect}\n")
                for country in sorted(sects[sect]):
                    f.write(f"{country}\n")
                f.write("\n")  # Empty line after each sect
            
            f.write("="*50 + "\n\n")  # Separator between religions
    
    print(f"\nOutput written to 'religion_sect_countries.txt'")
    print(f"Processed {len(sorted_religions)} religions")
    total_countries = sum(len(countries) for countries in religion_countries.values())
    print(f"Total countries: {total_countries}")

def process_from_file(filename):
    """
    Alternative function to process data from a file instead of manual input
    """
    religion_countries = {}
    religion_sect_countries = {}
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                    
                try:
                    # Handle format: | country | religion | sect |
                    # Remove leading/trailing pipes and split
                    cleaned_line = line.strip('|').strip()
                    parts = [part.strip() for part in cleaned_line.split('|')]
                    
                    if len(parts) != 3:
                        print(f"Line {line_num}: Invalid format: {line}")
                        continue
                        
                    country, religion, sect = parts
                    
                    # Add to religion_countries dictionary
                    if religion not in religion_countries:
                        religion_countries[religion] = []
                    religion_countries[religion].append(country)
                    
                    # Add to religion_sect_countries dictionary
                    if religion not in religion_sect_countries:
                        religion_sect_countries[religion] = {}
                    if sect not in religion_sect_countries[religion]:
                        religion_sect_countries[religion][sect] = []
                    religion_sect_countries[religion][sect].append(country)
                    
                except Exception as e:
                    print(f"Line {line_num}: Error processing '{line}': {e}")
                    continue
        
        # Sort religions by number of countries (descending)
        sorted_religions = sorted(religion_countries.keys(), 
                                key=lambda x: len(religion_countries[x]), 
                                reverse=True)
        
        # Generate output file
        with open("religion_sect_countries.txt", "w", encoding="utf-8") as f:
            for religion in sorted_religions:
                # Write religion header
                f.write(f"{religion}\n")
                
                # Write all countries for this religion
                for country in sorted(religion_countries[religion]):
                    f.write(f"{country}\n")
                
                f.write("\n")  # Empty line after countries
                
                # Sort sects by number of countries (descending)
                sects = religion_sect_countries[religion]
                sorted_sects = sorted(sects.keys(), 
                                    key=lambda x: len(sects[x]), 
                                    reverse=True)
                
                # Write each sect and its countries
                for sect in sorted_sects:
                    f.write(f"{sect}\n")
                    for country in sorted(sects[sect]):
                        f.write(f"{country}\n")
                    f.write("\n")  # Empty line after each sect
                
                f.write("="*50 + "\n\n")  # Separator between religions
        
        print(f"\nOutput written to 'religion_sect_countries.txt'")
        print(f"Processed {len(sorted_religions)} religions")
        total_countries = sum(len(countries) for countries in religion_countries.values())
        print(f"Total countries: {total_countries}")
        
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found")
    except Exception as e:
        print(f"Error reading file: {e}")

if __name__ == "__main__":
    print("Choose input method:")
    print("1. Manual input")
    print("2. Read from file")
    choice = input("Enter choice (1 or 2): ").strip()
    
    if choice == "1":
        process_country_data()
    elif choice == "2":
        filename = input("Enter filename: ").strip()
        process_from_file(filename)
    else:
        print("Invalid choice. Using manual input.")
        process_country_data()