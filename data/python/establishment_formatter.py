import json
from pathlib import Path

def load_data(file):
    p = Path(file)
    with open(p) as f:
        return json.load(f)

def parse_address(data):
    return f'{data["addr:housenumber"]} {data["addr:street"]}, {data["addr:city"]}, {data["addr:state"]}'
    
def parse_establishment(data):
    objects = []

    for element in data["elements"]:
        establishment_dict = {
        "address": "",
        "location": {
            "type": "Point",
            "coordinates": []
        },
        "establishments": {
            "data": {
                "name": "",
                "description": ""
            }
        }
    }
        
        if element["type"] == "node":
            if "tags" in element:
                if "addr:housenumber" in element["tags"] and "addr:street" in element["tags"] and "addr:city" in element["tags"] and "addr:state" in element["tags"]:
                    establishment_dict["address"] = parse_address(element["tags"])
                    establishment_dict["location"]["coordinates"] = [element["lat"], element["lon"]]
                    establishment_dict["establishments"]["data"]["name"] = element["tags"]["name"]
                    objects.append(establishment_dict)

    return objects


if __name__ == "__main__":
    data = load_data("C:/Users/19789/Documents/react-projects/tap-map/data/establishment_turbo.json")
    objects  = parse_establishment(data)
    with open("C:/Users/19789/Documents/react-projects/tap-map/data/establishments.json", "w", encoding="utf-8") as outfile:
        (json.dump(objects, outfile, ensure_ascii=True))