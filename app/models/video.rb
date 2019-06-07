class Video < ApplicationRecord
  validates :user_id, presence: true
  validates :title, presence: true
  
  has_one_attached :thumbnail
  has_one_attached :source

  validates :thumbnail, presence: true, blob: { content_type: :image, size_range: 0..500.kilobytes }
  validates :source, presence: true, blob: { content_type: :video, size_range: 0..40.megabytes }

  belongs_to :user
end
