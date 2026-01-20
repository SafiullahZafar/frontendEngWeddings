const BASE_URL = "https://pub-3da68da30f7d42fd98069199a4c5b1e0.r2.dev";

export const galleryGroups = {
  group1: {
    images: Array.from({ length: 26 }, (_, i) =>
      `${BASE_URL}/group1/images/img${i + 1}.jpg`
    ),
    videos: Array.from({ length: 32 }, (_, i) =>
      `${BASE_URL}/group1/videos/vid${i + 1}.mp4`
    ),
  },

  group2: {
    images: Array.from({ length: 32 }, (_, i) =>
      `${BASE_URL}/group2/images/img${i + 1}.jpg`
    ),
    videos: Array.from({ length: 5 }, (_, i) =>
      `${BASE_URL}/group2/videos/vid${i + 1}.mp4`
    ),
  },

  group3: {
    images: Array.from({ length: 50 }, (_, i) =>
      `${BASE_URL}/group3/images/img${i + 1}.jpg`
    ),
    videos: Array.from({ length: 4 }, (_, i) =>
      `${BASE_URL}/group3/videos/vid${i + 1}.mp4`
    ),
  },

  group4: {
    images: Array.from({ length: 18 }, (_, i) =>
      `${BASE_URL}/group4/images/img${i + 1}.jpg`
    ),
    videos: Array.from({ length: 14 }, (_, i) =>
      `${BASE_URL}/group4/videos/vid${i + 1}.mp4`
    ),
  },

  group5: {
    images: Array.from({ length: 100 }, (_, i) =>
      `${BASE_URL}/group5/images/img${i + 1}.jpg`
    ),
    videos: Array.from({ length: 67 }, (_, i) =>
      `${BASE_URL}/group5/videos/vid${i + 1}.mp4`
    ),
  },

  group6: {
    images: Array.from({ length: 89 }, (_, i) =>
      `${BASE_URL}/group6/images/img${i + 1}.jpg`
    ),
    videos: Array.from({ length: 13 }, (_, i) =>
      `${BASE_URL}/group6/videos/vid${i + 1}.mp4`
    ),
  },
};
