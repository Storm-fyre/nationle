def generate_text_file(data):
    # Group left entities by right entities
    right_to_left = {}
    for left_entity, right_entity in data.items():
        if right_entity not in right_to_left:
            right_to_left[right_entity] = []
        right_to_left[right_entity].append(left_entity)
    
    # Sort right entities by number of associated left entities (largest to smallest)
    sorted_right_entities = sorted(right_to_left.keys(), 
                                 key=lambda x: len(right_to_left[x]), 
                                 reverse=True)
    
    # Generate the text file
    filename = "entity_groups.txt"
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            for right_entity in sorted_right_entities:
                f.write(f"{right_entity}\n")
                f.write("-" * len(right_entity) + "\n")
                for left_entity in right_to_left[right_entity]:
                    f.write(f"{left_entity}\n")
                f.write("\n")  # Empty line between groups
        
        print(f"Text file '{filename}' generated successfully!")
        
    except Exception as e:
        print(f"Error creating text file: {e}")

def main():
    print("Entity Data to Text File Generator")
    print("Enter your data in format 'left_entity: right_entity'")
    print("Press Enter on empty line to finish and generate text file")
    print("-" * 50)
    
    # Dictionary to store the data
    data = {}
    
    # Input data
    while True:
        line = input("Enter data (or press Enter to finish): ").strip()
        if not line:
            break
        
        # Parse the input
        if ':' in line:
            left_entity, right_entity = line.split(':', 1)
            left_entity = left_entity.strip()
            right_entity = right_entity.strip()
            data[left_entity] = right_entity
        else:
            print("Invalid format! Please use 'left_entity: right_entity' format")
    
    if not data:
        print("No data entered!")
        return
    
    print(f"\nData entered successfully! Total entries: {len(data)}")
    
    # Generate text file and exit
    generate_text_file(data)
    print("Program completed.")

if __name__ == "__main__":
    main()