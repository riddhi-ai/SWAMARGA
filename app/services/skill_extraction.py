from typing import List

from .skill_dictionary import SKILL_ALIASES


def extract_skills_from_text(text: str) -> List[str]:

    if not text:
        return []

    text_lower = text.lower()

    found_skills = set()

    for alias, canonical_name in SKILL_ALIASES.items():

        if alias in text_lower:
            found_skills.add(canonical_name)

    return sorted(found_skills)


def extract_skills(text: str) -> List[str]:
    return extract_skills_from_text(text)