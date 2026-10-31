import json
import random

paths = [
    "d:/Assignment/backend/data/puppies.json",
    "d:/Assignment/backend/dist/data/puppies.json",
    "d:/Assignment/backend/src/data/puppies.json",
    "d:/Assignment/scraped_data/puppies.json"
]

with open(paths[0], "r", encoding="utf-8") as f:
    puppies = json.load(f)

ages = ["2 months", "2.5 months", "3 months", "3.5 months"]
origins_imported = ["Imported for you (Korea)", "Imported for you (Europe)", "Imported for you"]
origins_local = ["Available in Downtown Dubai showroom", "Local (Dubai Showroom)"]

for idx, p in enumerate(puppies):
    # Fix age
    if not p.get('age') or p['age'] == p['breed']:
        p['age'] = ages[idx % len(ages)]
    
    # Fix origin
    name_or_slug = (p['name'] + ' ' + p['slug']).lower()
    if 'korean' in name_or_slug or idx % 3 == 0:
        p['origin'] = origins_imported[idx % len(origins_imported)]
    else:
        p['origin'] = origins_local[idx % len(origins_local)]

    # Clean title
    p['title'] = f"{p['name']}, {p['breed']} puppy ({p['gender'].lower()})"

for path in paths:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(puppies, f, indent=2, ensure_ascii=False)

print("Cleaned up puppies data across all paths!")
