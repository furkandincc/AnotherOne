from collections import Counter
import numpy as np
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import json


def calculate_genre_distribution(user_fav_films, diversity_factor=0.3):
    """Tür ağırlıklarını normalize ederek çeşitlilik faktörü uygula."""
    genre_counter = Counter()
    for film in user_fav_films:
        genre_counter[film['genre_1']] += 1
        genre_counter[film['genre_2']] += 1

    total_genres = sum(genre_counter.values())
    genre_distribution = {
        genre: ((count / total_genres) * (1 - diversity_factor) + diversity_factor)
        for genre, count in genre_counter.items()
    }

    total_weight = sum(genre_distribution.values())
    genre_distribution = {genre: (weight / total_weight) for genre, weight in genre_distribution.items()}
    return genre_distribution


def content_based_filtering(user_fav_ids, films, diversity_factor=0.3):
    """Kullanıcının favori filmlerine göre öneriler oluştur."""
    all_films = [
        {
            'ID': film['ID'],
            'name': film['name'],
            'description': f"{film['genre_1']} {film['genre_2']} puan:{film['puan']} pop:{film['pop']}",
            'genre_1': film['genre_1'],
            'genre_2': film['genre_2'],
            'des': film['description']
        }
        for film in films
    ]

    user_fav_films = [film for film in all_films if film['ID'] in user_fav_ids]
    if not user_fav_films:
        return []

    genre_distribution = calculate_genre_distribution(user_fav_films, diversity_factor)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([film['description'] for film in all_films])

    fav_descriptions = [film['description'] for film in user_fav_films]
    favorite_vector = vectorizer.transform(fav_descriptions).mean(axis=0)
    favorite_vector = np.asarray(favorite_vector)

    diversity_boost = np.array([1 + (1 - genre_distribution.get(film['genre_1'], 0)) for film in all_films])
    relation = cosine_similarity(favorite_vector, tfidf_matrix).flatten() * diversity_boost

    suggestion_list = sorted(
        zip(all_films, relation),
        key=lambda x: (
            x[1] * 0.6 + extract_puan(x[0]['description']) * 0.3 + extract_pop(x[0]['description']) * 0.1
        ),
        reverse=True
    )

    top_15_films = [suggestion[0] for suggestion in suggestion_list[:50]]
    random_suggestions = random.sample(top_15_films, 10)
    return random_suggestions


def extract_puan(description):
    """Film açıklamasından puanı çıkar."""
    match = re.search(r'puan:(\d+\.\d+)', description)
    return float(match.group(1)) if match else 0.0


def extract_pop(description):
    """Film açıklamasından popülerliği çıkar."""
    match = re.search(r'pop:(\d+)', description)
    return int(match.group(1)) if match else 0


def load_data_from_file(filename="film.json"):
    """Film verilerini JSON dosyasından oku."""
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    if isinstance(data, dict) and "films" in data:
        return data["films"]
    elif isinstance(data, list):
        return data
    else:
        raise ValueError("Unexpected JSON structure in the file.")


# Kullanıcı favorileri ve filmler
user_fav_ids = [1, 2, 3, 4, 5, 1200, 1212, 85, 957, 857]
films = load_data_from_file("film.json")

# Öneri oluşturma
suggestions = content_based_filtering(user_fav_ids, films, diversity_factor=0.1)

# Önerileri JSON dosyasına yaz
with open("outputFilm.json", "w", encoding="utf-8") as file:
    json.dump(suggestions, file, ensure_ascii=False, indent=4)