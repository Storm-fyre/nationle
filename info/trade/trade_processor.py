import json
import re
from collections import defaultdict

def read_trade_data(filename):
    """Read and parse the trade.txt file"""
    trades = []
    
    with open(filename, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Split by multiple newlines (3 full lines gap means 4 newlines total)
    lines = content.strip().split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:  # Skip empty lines
            continue
            
        # Parse the format: "Country: Export - Import"
        match = re.match(r'^([^:]+):\s*([^-]+)\s*-\s*(.+)$', line)
        if match:
            country = match.group(1).strip()
            export = match.group(2).strip()
            import_item = match.group(3).strip()
            trades.append({
                'country': country,
                'export': export,
                'import': import_item
            })
    
    return trades

def read_nations_mapping(filename):
    """Read the nations.json file and create name to ID mapping"""
    with open(filename, 'r', encoding='utf-8') as file:
        nations = json.load(file)
    
    # Create a mapping from country name to ID
    name_to_id = {}
    for nation in nations:
        name_to_id[nation['name']] = nation['id']
    
    return name_to_id

def process_trade_data(trades, name_to_id):
    """Process trade data and group by exports and imports"""
    exports_by_product = defaultdict(list)
    imports_by_product = defaultdict(list)
    
    for trade in trades:
        country = trade['country']
        export = trade['export']
        import_item = trade['import']
        
        # Get country ID from mapping
        country_id = name_to_id.get(country)
        
        if country_id is not None:
            exports_by_product[export].append(country_id)
            imports_by_product[import_item].append(country_id)
        else:
            print(f"Warning: Country '{country}' not found in nations.json")
    
    return exports_by_product, imports_by_product

def create_questions_json(product_by_country, question_template):
    """Create the questions JSON structure"""
    questions = []
    
    for product, countries in product_by_country.items():
        # Sort countries list for consistency
        countries.sort()
        
        question = {
            "question": question_template.replace('X', product),
            "countries": countries
        }
        questions.append(question)
    
    return {"questions": questions}

def main():
    try:
        # Read input files
        print("Reading trade data...")
        trades = read_trade_data('trade.txt')
        
        print("Reading nations mapping...")
        name_to_id = read_nations_mapping('nations.json')
        
        print("Processing trade data...")
        exports_by_product, imports_by_product = process_trade_data(trades, name_to_id)
        
        # Create JSON structures
        print("Creating export questions...")
        export_questions = create_questions_json(
            exports_by_product, 
            "Is 'X' the largest export of your country?"
        )
        
        print("Creating import questions...")
        import_questions = create_questions_json(
            imports_by_product, 
            "Is 'X' the largest import of your country?"
        )
        
        # Write output file with proper formatting
        print("Writing output file...")
        with open('refined_trade.txt', 'w', encoding='utf-8') as file:
            # Custom JSON formatting function
            def write_json_with_inline_arrays(data):
                # First, convert to standard JSON
                json_str = json.dumps(data, indent=2)
                
                # Then fix the arrays to be on single lines
                import re
                
                # Pattern to match arrays that span multiple lines
                def fix_array(match):
                    # Extract numbers from the matched array
                    array_content = match.group(0)
                    numbers = re.findall(r'\d+', array_content)
                    return '[' + ', '.join(numbers) + ']'
                
                # Replace multi-line arrays with single-line arrays
                json_str = re.sub(r'\[\s*\n(?:\s*\d+,?\s*\n)*\s*\]', fix_array, json_str)
                
                return json_str
            
            # Write both JSONs
            file.write(write_json_with_inline_arrays(export_questions))
            file.write('\n')
            file.write(write_json_with_inline_arrays(import_questions))
        
        print("Processing complete!")
        print(f"Processed {len(trades)} trade records")
        print(f"Generated {len(export_questions['questions'])} export questions")
        print(f"Generated {len(import_questions['questions'])} import questions")
        
    except FileNotFoundError as e:
        print(f"Error: File not found - {e}")
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format - {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()