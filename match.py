import sys
import json

def calculate_match(user_skills, job_requirements):
    # Simple matching logic for the prototype
    user_skills = [s.lower().strip() for s in user_skills]
    job_requirements = [r.lower().strip() for r in job_requirements]
    
    matches = set(user_skills).intersection(set(job_requirements))
    score = (len(matches) / len(job_requirements)) * 100 if job_requirements else 0
    
    return {
        "score": round(score, 2),
        "matching_skills": list(matches),
        "recommendation": "¡Es un match perfecto!" if score > 70 else "Podría ser una buena oportunidad." if score > 40 else "Sigue buscando."
    }

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        user_skills = input_data.get("user_skills", [])
        job_requirements = input_data.get("job_requirements", [])
        
        result = calculate_match(user_skills, job_requirements)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
