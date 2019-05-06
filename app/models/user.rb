class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 8, allow_nil: true}
  
  has_one_attached :avatar
  validates :avatar, blob: { content_type: :image, size_range: 0..500.kilobytes }

  attr_reader :password
  after_initialize :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create password
  end
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password? password 
  end
  def self.find_by_credentials(lookup, password)
    user = User.with_attached_avatar.find_by(username: lookup) || User.with_attached_avatar.find_by(email: lookup)
    return user if user && user.is_password?(password)
    nil
  end
  def self.create_session_token
    SecureRandom::urlsafe_base64(16)
  end
  def ensure_session_token
    self.session_token ||= self.class.create_session_token
  end
  def reset_session_token!
    self.session_token = self.class.create_session_token
    self.save!
    self.session_token
  end
end
