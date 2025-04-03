from collections import Counter
import numpy as np
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import json


def calculate_genre_distribution(user_fav_seriess, diversity_factor=0.3):
    """Tür ağırlıklarını normalize ederek çeşitlilik faktörü uygula."""
    genre_counter = Counter()
    for series in seriess:
        genre_counter[series['genre_1']] += 1
        genre_counter[series['genre_2']] += 1

    total_genres = sum(genre_counter.values())
    genre_distribution = {
        genre: ((count / total_genres) * (1 - diversity_factor) + diversity_factor)
        for genre, count in genre_counter.items()
    }

    total_weight = sum(genre_distribution.values())
    genre_distribution = {genre: (weight / total_weight) for genre, weight in genre_distribution.items()}
    return genre_distribution


def content_based_filtering(user_fav_ids, seriess, diversity_factor=0.3):
    """Kullanıcının favori serieslerine göre öneriler oluştur."""
    all_seriess = [
        {
            'ID': series['ID'],
            'name': series['name'],
            'description': f"{series['genre_1']} {series['genre_2']} puan:{series['puan']} pop:{series['pop']}",
            'genre_1': series['genre_1'],
            'genre_2': series['genre_2'],
            'des': series['description'],
            'epi': series['episodes']
        }
        for series in seriess
    ]

    user_fav_seriess = [series for series in all_seriess if series['ID'] in user_fav_ids]
    if not user_fav_seriess:
        return []

    genre_distribution = calculate_genre_distribution(user_fav_seriess, diversity_factor)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([series['description'] for series in all_seriess])

    fav_descriptions = [series['description'] for series in user_fav_seriess]
    favorite_vector = vectorizer.transform(fav_descriptions).mean(axis=0)
    favorite_vector = np.asarray(favorite_vector)

    diversity_boost = np.array([1 + (1 - genre_distribution.get(series['genre_1'], 0)) for series in all_seriess])
    relation = cosine_similarity(favorite_vector, tfidf_matrix).flatten() * diversity_boost

    suggestion_list = sorted(
        zip(all_seriess, relation),
        key=lambda x: (
            x[1] * 0.6 + extract_puan(x[0]['description']) * 0.3 + extract_pop(x[0]['description']) * 0.1
        ),
        reverse=True
    )

    top_15_seriess = [suggestion[0] for suggestion in suggestion_list[:50]]
    random_suggestions = random.sample(top_15_seriess, 10)
    return random_suggestions


def extract_puan(description):
    """Film açıklamasından puanı çıkar."""
    match = re.search(r'puan:(\d+\.\d+)', description)
    return float(match.group(1)) if match else 0.0


def extract_pop(description):
    """Film açıklamasından popülerliği çıkar."""
    match = re.search(r'pop:(\d+)', description)
    return int(match.group(1)) if match else 0


def load_data_from_file(filename="series.json"):
    """Film verilerini JSON dosyasından oku."""
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    if isinstance(data, dict) and "seriess" in data:
        return data["seriess"]
    elif isinstance(data, list):
        return data
    else:
        raise ValueError("Unexpected JSON structure in the file.")


# Kullanıcı favorileri ve diziler
user_fav_ids = [1, 2, 3, 4, 5, 1200, 1212, 85, 957, 857]
seriess = load_data_from_file("series.json")

# Öneri oluşturma
suggestions = content_based_filtering(user_fav_ids, seriess, diversity_factor=0.1)

# Önerileri JSON dosyasına yaz
with open("outputSeries.json", "w", encoding="utf-8") as file:
    json.dump(suggestions, file, ensure_ascii=False, indent=4)