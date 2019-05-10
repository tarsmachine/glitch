class Follow < ApplicationRecord
  validates :user_id, :channel_id, presence: true
  validates :user_id, uniqueness: {scope: :channel_id, message: "may only follow a channel once"}
  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id
    
  belongs_to :channel,
    class_name: :User,
    foreign_key: :channel_id
end
