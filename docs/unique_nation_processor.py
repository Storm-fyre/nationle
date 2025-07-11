"""
This program analyzes a JSON file named 'questions.json' and maps country IDs to nation names using 'nations.json'.
The questions.json file is expected to contain a JSON object with a "categories" key,
which in turn contains a list of categories. Each category has a list of
questions, and each question is associated with a list of country IDs.

The nations.json file contains an array of objects with "id" and "name" fields.

The program performs the following steps:
1. Reads and parses both 'questions.json' and 'nations.json' files from the current directory.
2. Creates a mapping from country IDs to nation names.
3. Maps each country ID to the set of questions it is linked to.
4. Groups countries that share the exact same set of questions.
5. Prints out the groups of countries (where a group has more than one country) using nation names with sequential numbers.
6. Reports the total number of country arrays that were analyzed from the file and total indistinguishable countries.
"""

import json
from collections import defaultdict

def load_nations_mapping(nations_file_path):
    """
    Loads the nations.json file and creates a mapping from ID to nation name.

    Args:
        nations_file_path (str): The path to the nations JSON file.

    Returns:
        dict: A dictionary mapping country IDs to nation names.
    """
    try:
        with open(nations_file_path, 'r', encoding='utf-8') as f:
            nations_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: The file '{nations_file_path}' was not found.")
        print("Please make sure your nations file is named 'nations.json' and is in the same directory.")
        return {}
    except json.JSONDecodeError:
        print(f"Error: The file '{nations_file_path}' is not a valid JSON file.")
        return {}
    except Exception as e:
        print(f"An unexpected error occurred while loading nations: {e}")
        return {}

    # Create mapping from ID to nation name
    id_to_nation = {}
    for nation in nations_data:
        if 'id' in nation and 'name' in nation:
            id_to_nation[nation['id']] = nation['name']
    
    return id_to_nation

def analyze_country_questions(questions_file_path, nations_file_path):
    """
    Analyzes a JSON file to find countries that share the exact same set of questions,
    and displays the results using nation names instead of IDs.

    Args:
        questions_file_path (str): The path to the questions JSON file.
        nations_file_path (str): The path to the nations JSON file.

    Returns:
        None. Prints the results to the console.
    """
    # Load the nations mapping
    id_to_nation = load_nations_mapping(nations_file_path)
    if not id_to_nation:
        print("Failed to load nations mapping. Exiting.")
        return

    # Load the questions data
    try:
        with open(questions_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: The file '{questions_file_path}' was not found.")
        print("Please make sure your data file is named 'questions.json' and is in the same directory.")
        return
    except json.JSONDecodeError:
        print(f"Error: The file '{questions_file_path}' is not a valid JSON file.")
        return
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return

    # A dictionary to map each country ID to a set of questions it's associated with.
    country_to_questions_map = defaultdict(set)
    total_arrays_analyzed = 0

    # Step 1: Populate the country_to_questions_map
    for category in data['categories']:
        if 'questions' not in category:
            continue
        for question_data in category['questions']:
            # Ensure the question data is well-formed
            if 'question' in question_data and 'countries' in question_data:
                question_text = question_data['question']
                countries_list = question_data['countries']
                
                total_arrays_analyzed += 1
                
                for country_id in countries_list:
                    country_to_questions_map[country_id].add(question_text)

    # Step 2: Invert the map to group countries by their question set.
    question_set_to_countries_map = defaultdict(list)
    for country_id, questions_set in country_to_questions_map.items():
        immutable_question_set = frozenset(questions_set)
        question_set_to_countries_map[immutable_question_set].append(country_id)
        
    # Step 3: Print the results for groups with more than one country
    print("--- Analysis Results ---")
    
    found_groups = 0
    
    for country_group in question_set_to_countries_map.values():
        if len(country_group) > 1:
            found_groups += 1
            
            # Convert country IDs to nation names
            nation_names = []
            for country_id in country_group:
                if country_id in id_to_nation:
                    nation_names.append(id_to_nation[country_id])
                else:
                    nation_names.append(f"Unknown (ID: {country_id})")
            
            nation_names.sort()
            print(f"Group {found_groups}: Countries with the same set of questions: {nation_names}")

    if found_groups == 0:
        print("No groups of countries with the exact same set of questions were found.")
        
    print("\n--- Summary ---")
    print(f"Total number of country arrays analyzed: {total_arrays_analyzed}")
    print(f"Total number of nations loaded: {len(id_to_nation)}")
    print(f"Number of groups found: {found_groups}")


if __name__ == "__main__":
    # The script looks for both files in the same directory.
    questions_file_path = "questions.json"
    nations_file_path = "nations.json"
    analyze_country_questions(questions_file_path, nations_file_path)